"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

export function HearthEmbersCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const sceneRef = useRef<{
    material: THREE.PointsMaterial | null;
    particles: THREE.Points | null;
    renderer: THREE.WebGLRenderer | null;
  }>({
    material: null,
    particles: null,
    renderer: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false, // High performance
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } catch {
      return;
    }
    sceneRef.current.renderer = renderer;

    // 2. 3D Particle Geometry (Atmospheric Floating Woodfire Embers)
    const particleCount = window.innerWidth < 768 ? 45 : 85;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread across width and depth
      positions[i * 3] = (Math.random() - 0.5) * 80;
      // Start from bottom hearth
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60 - 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // Upward drifting speed + slight horizontal sway
      velocities[i * 3] = (Math.random() - 0.5) * 0.04;
      velocities[i * 3 + 1] = 0.05 + Math.random() * 0.08;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;

      scales[i] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // 3. Particle Material (Soft glowing circular point)
    // Generate circular glow texture programmatically (zero network fetch)
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 32;
    textureCanvas.height = 32;
    const ctx = textureCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(255, 200, 120, 0.8)");
      gradient.addColorStop(0.7, "rgba(220, 80, 20, 0.3)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(textureCanvas);

    const initialColor = theme === "dark" ? new THREE.Color("#FF7A30") : new THREE.Color("#D99A2B");
    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: initialColor,
      opacity: theme === "dark" ? 0.75 : 0.5,
    });
    sceneRef.current.material = material;

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    sceneRef.current.particles = particles;

    // 4. Mouse Interactive Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCameraX = mouseX * 4;
      targetCameraY = mouseY * 3;
    };

    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // 5. Lifecycle-Aware Render Loop (Pauses off-screen & on hidden tab)
    let animId: number | null = null;
    let clock = new THREE.Clock();
    let isIntersecting = true;
    let isDocumentVisible = typeof document !== "undefined" ? document.visibilityState === "visible" : true;

    const render = () => {
      if (!isIntersecting || !isDocumentVisible) {
        animId = null;
        return;
      }

      const delta = clock.getDelta();

      // Camera silky lerp for 3D parallax depth
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Particle physics: Rise upwards, sway, reset when exceeding top
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        array[i * 3] += velocities[i * 3] + Math.sin(clock.elapsedTime + i) * 0.015;
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3 + 2] += velocities[i * 3 + 2];

        // Reset to bottom when floating past top of screen
        if (array[i * 3 + 1] > 35) {
          array[i * 3 + 1] = -35;
          array[i * 3] = (Math.random() - 0.5) * 80;
        }
      }
      posAttr.needsUpdate = true;

      // Subtle rotation
      particles.rotation.y = clock.elapsedTime * 0.02;

      renderer?.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    const resumeRendering = () => {
      if (!animId && isIntersecting && isDocumentVisible) {
        clock.start();
        animId = requestAnimationFrame(render);
      }
    };

    // Pause when tab is inactive
    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      if (isDocumentVisible) {
        resumeRendering();
      } else if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Pause when scrolled past hero section
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          resumeRendering();
        } else if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Start render loop
    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }, []);

  // Update particle colors smoothly when theme changes
  useEffect(() => {
    if (sceneRef.current.material) {
      const targetColor = theme === "dark" ? new THREE.Color("#FF7A30") : new THREE.Color("#D99A2B");
      sceneRef.current.material.color.set(targetColor);
      sceneRef.current.material.opacity = theme === "dark" ? 0.75 : 0.5;
    }
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      aria-hidden="true"
    />
  );
}
