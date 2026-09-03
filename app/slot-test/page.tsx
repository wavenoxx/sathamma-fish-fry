import React from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";

export default function SlotTestPage() {
  return (
    <main className="min-h-screen bg-ink flex flex-col items-center justify-center p-8">
      <div className="w-[320px]">
        <ImageSlot id="special-1" selfAspect />
      </div>
    </main>
  );
}
