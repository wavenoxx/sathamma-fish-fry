# SATHAMMA FISH FRY — MASTER PHOTOGRAPHY & IMAGE GENERATION BRIEF

This production brief defines the complete photographic specifications for all image assets across the Sathamma Fish Fry website. Every entry specifies the target file name, precise aspect ratio, recommended 2x retina pixel dimensions (capped at 2400px on the long edge), section cropping rules across all breakpoints, and strict composition directives (subject positioning and dark negative space reservations).

Total unique image files required: **16 assets** (15 on-page assets across Hero, Specials, About, and Gallery + 1 Open Graph social share card).

---

## Master Production Schedule

| File Name | Slot ID | Target Section | Aspect Ratio | Rendered Breakpoints | Dimensions (2x Retina) | Composition Core & Negative Space |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `hero-desktop.jpg` | `hero-desktop` | Hero (Desktop) | **16:9** | `>= 640px` (hidden on `< 640px`) | **2400 × 1350 px** | Lower right 1/3; left & upper 2/3 dark & empty for title and embers |
| `hero-mobile.jpg` | `hero-mobile` | Hero (Mobile) | **9:16** | `< 640px` (hidden on `>= 640px`) | **1080 × 1920 px** | Lower 1/2; upper 1/2 dark & clean for header logo & navigation |
| `special-fish-fry.jpg` | `special-1` | Specials (Plate 01) | **21:9** | `< 640px` (16:9 crop), `>= 640px` (21:9) | **2100 × 900 px** | Centered within middle 16:9 safe zone; outer 1/3 margins deep black |
| `special-fish-curry.jpg` | `special-2` | Specials (Plate 02) | **4:5** | `< 640px` (4:5), `>= 640px` (4:5) | **1200 × 1500 px** | Lower 2/3 on slate; upper 1/3 dark negative space with rising steam |
| `special-pulusu-portrait.jpg` | `special-3-portrait` | Specials (Plate 03 Mobile) | **4:5** | `< 640px` (4:5) (hidden on `>= 640px`) | **1160 × 1450 px** | Centered top-down 45° angle; delicate rim lighting, dark borders |
| `special-pulusu-wide.jpg` | `special-3-wide` | Specials (Plate 03 Desktop) | **16:11** | `>= 640px` (16:11) (hidden on `< 640px`) | **1280 × 880 px** | Right 2/3 of frame; left 1/3 dark textured table surface |
| `special-natu-kodi.jpg` | `special-4` | Specials (Plate 04) | **21:9** | `< 640px` (16:9 crop), `>= 640px` (21:9) | **2100 × 900 px** | Centered within middle 16:9 safe zone; outer horizontal margins dark |
| `about-kitchen.jpg` | `about-portrait` | About (Left Framed Card) | **4:5** | `< 640px` (4:5), `>= 640px` (4:5) | **1200 × 1500 px** | Center-weighted; ingredients on dark prep table; quiet moody margins |
| `about-river.jpg` | `about-wide` | About (Panoramic Landscape) | **21:9** | `< 640px` (16:9 crop), `>= 640px` (21:9) | **2100 × 900 px** | Shoreline in lower 1/3; tranquil dusk water & sky across; centered for 16:9 crop |
| `gallery-1.jpg` | `gallery-1` | Gallery (Plate 01 & Modal) | **16:10** | `< 640px` (16:10), `>= 640px` (16:10) | **1600 × 1000 px** | Fresh river catch resting in center; chillies & lime; dark damp wood surround |
| `gallery-2.jpg` | `gallery-2` | Gallery (Plate 02 & Modal) | **4:5** | `< 640px` (4:5), `>= 640px` (4:5) | **1200 × 1500 px** | Lower half pan over hearth embers; top half ambient darkness and warm glow |
| `gallery-3.jpg` | `gallery-3` | Gallery (Plate 03 & Modal) | **4:5** | `< 640px` (4:5), `>= 640px` (4:5) | **1200 × 1500 px** | Macro focus on vibrant spices in center; outer edges soft shadow |
| `gallery-4.jpg` | `gallery-4` | Gallery (Plate 04 & Modal) | **4:5** | `< 640px` (4:5), `>= 640px` (4:5) | **1200 × 1500 px** | Simmering curry pot centered lower; upper frame deep charcoal shadows |
| `gallery-5.jpg` | `gallery-5` | Gallery (Plate 05 & Modal) | **4:5** | `< 640px` (4:5), `>= 640px` (4:5) | **1200 × 1500 px** | Brass plate centered; garnish on right; dark background framing left & top |
| `gallery-6.jpg` | `gallery-6` | Gallery (Plate 06 & Modal) | **21:9** | `< 640px` (16:9 crop), `>= 640px` (21:9) | **2100 × 900 px** | Krishna reservoir twilight; boats in center; sky & water fade to dark borders |
| `og.jpg` | `og-share` | Open Graph / Social Card | **1200:630** (~1.91:1) | All social previews | **1200 × 630 px** | Plate sits in right 1/2; left 1/2 remains clean dark negative space |

*(Note: The Visit section utilizes an architectural 3-column data grid with live directions links and does not mount an image container).*

---

## Detailed Production Specifications

### 1. `hero-desktop.jpg`
- **Slot ID**: `hero-desktop`
- **Section**: Hero (Desktop Viewport `>= 640px`, active up to 4K displays)
- **Aspect Ratio**: `16 / 9`
- **Recommended Pixel Dimensions**: `2400 × 1350 px`
- **Cropping & Breakpoint Behavior**: Rendered in full-viewport container with `object-cover object-center`. On ultra-wide monitors, vertical edges are cropped; on standard 16:9 / 16:10 screens, the entire frame is shown.
- **Composition & Negative Space**:
  - **Subject Placement**: Golden-brown fried fish steaks resting on a rustic weathered wooden platter situated strictly in the **lower-right third** of the frame.
  - **Negative Space**: The **entire left half and top third** must remain deep, velvety dark (#14100D), free of bright highlights, permitting the floating 3D WebGL embers and the brand wordmark to float with absolute contrast.

### 2. `hero-mobile.jpg`
- **Slot ID**: `hero-mobile`
- **Section**: Hero (Mobile Viewport `< 640px`)
- **Aspect Ratio**: `9 / 16`
- **Recommended Pixel Dimensions**: `1080 × 1920 px`
- **Cropping & Breakpoint Behavior**: Rendered in mobile full-screen container (`h-screen min-h-[100svh]`) with `object-cover object-center`.
- **Composition & Negative Space**:
  - **Subject Placement**: The plate of fresh fish fry rests in the **lower 40%** of the portrait frame.
  - **Negative Space**: The **upper 60%** must be clean, solid charcoal-black darkness with subtle atmospheric warmth, leaving ample visual breathing room for the sticky header, utility bar, and intro reveal animations.

### 3. `special-fish-fry.jpg`
- **Slot ID**: `special-1`
- **Section**: Specials — Plate No. 01 (Sathamma Special Fish Fry Monolith)
- **Aspect Ratio**: `21 / 9`
- **Recommended Pixel Dimensions**: `2100 × 900 px`
- **Cropping & Breakpoint Behavior**:
  - `< 640px`: Rendered in `aspect-[16/9]` container with `object-cover object-center` (crops ~12% from each horizontal side).
  - `>= 640px`: Rendered in `aspect-[21/9]` container displaying the full panoramic width.
- **Composition & Negative Space**:
  - **Subject Placement**: Thick-cut freshwater fish steaks freshly fried to deep mahogany, garnished with crisp curry leaves and halved lime, positioned squarely in the **center 50%** (middle 16:9 safe zone).
  - **Negative Space**: Left 25% and right 25% must taper into rich, shadowy darkness (#161210 slate) with faint wooden textures, so that when cropped to 16:9 on mobile devices, no food or garnish is cut off.

### 4. `special-fish-curry.jpg`
- **Slot ID**: `special-2`
- **Section**: Specials — Plate No. 02 (Natu Style Fish Curry)
- **Aspect Ratio**: `4 / 5`
- **Recommended Pixel Dimensions**: `1200 × 1500 px`
- **Cropping & Breakpoint Behavior**: Rendered in `aspect-[4/5]` across all breakpoints (< 640px, 640–1023px, >= 1024px) with zero aspect distortion.
- **Composition & Negative Space**:
  - **Subject Placement**: A shallow, dark artisanal earthenware or cast vessel filled with simmering fish curry in rich red-amber tamarind gravy, occupying the **lower two-thirds**.
  - **Negative Space**: Upper one-third must remain quiet, moody dark background with delicate wisps of steam rising upwards into the darkness.

### 5. `special-pulusu-portrait.jpg`
- **Slot ID**: `special-3-portrait`
- **Section**: Specials — Plate No. 03 (Chepala Pulusu Mobile Viewport `< 640px`)
- **Aspect Ratio**: `4 / 5`
- **Recommended Pixel Dimensions**: `1160 × 1450 px`
- **Cropping & Breakpoint Behavior**: Rendered strictly on mobile viewports (< 640px) inside `aspect-[4/5]`.
- **Composition & Negative Space**:
  - **Subject Placement**: Steaming traditional Chepala Pulusu with fresh river fish steaks immersed in tangy tamarind broth, photographed top-down at a 45° angle, filling the center of the vertical frame.
  - **Negative Space**: Top and side edges softly fade into shadowy table margins.

### 6. `special-pulusu-wide.jpg`
- **Slot ID**: `special-3-wide`
- **Section**: Specials — Plate No. 03 (Chepala Pulusu Desktop Viewport `>= 640px`)
- **Aspect Ratio**: `16 / 11`
- **Recommended Pixel Dimensions**: `1280 × 880 px`
- **Cropping & Breakpoint Behavior**: Rendered on tablet and desktop viewports (`>= 640px`) inside `aspect-[16/11]`.
- **Composition & Negative Space**:
  - **Subject Placement**: Artisanal vessel of Chepala Pulusu positioned in the **right two-thirds** of the landscape frame.
  - **Negative Space**: Left one-third remains dark, quiet negative space with subtle table texture, balancing the adjacent card layout.

### 7. `special-natu-kodi.jpg`
- **Slot ID**: `special-4`
- **Section**: Specials — Plate No. 04 (Natu Kodi Pulusu Anchor Monolith)
- **Aspect Ratio**: `21 / 9`
- **Recommended Pixel Dimensions**: `2100 × 900 px`
- **Cropping & Breakpoint Behavior**:
  - `< 640px`: Rendered in `aspect-[16/9]` with `object-cover object-center`.
  - `>= 640px`: Rendered in `aspect-[21/9]` panoramic width.
- **Composition & Negative Space**:
  - **Subject Placement**: Village country chicken curry (Natu Kodi) with rustic bone-in cuts in rich spiced gravy, resting in the **center 50%** of the panorama.
  - **Negative Space**: Outer left and right thirds remain deep shadowed negative space to prevent mobile crop clipping.

### 8. `about-kitchen.jpg`
- **Slot ID**: `about-portrait`
- **Section**: About — Left Framed Heritage Portrait Card
- **Aspect Ratio**: `4 / 5`
- **Recommended Pixel Dimensions**: `1200 × 1500 px`
- **Cropping & Breakpoint Behavior**: Rendered in `aspect-[4/5]` across all breakpoints (< 640px, 640–1023px, >= 1024px).
- **Composition & Negative Space**:
  - **Subject Placement**: The quiet preparation counter of the artisanal kitchen, raw spices, fresh curry leaves, and cooking vessels arranged with organic simplicity. Warm, unhurried side illumination. Strictly no people in frame.
  - **Negative Space**: Surrounding borders maintain dark vignetted shadows.

### 9. `about-river.jpg`
- **Slot ID**: `about-wide`
- **Section**: About — Bottom Architectural River Landscape Monograph
- **Aspect Ratio**: `21 / 9`
- **Recommended Pixel Dimensions**: `2100 × 900 px`
- **Cropping & Breakpoint Behavior**:
  - `< 640px`: Rendered in `aspect-[16/9]` with `object-cover object-center`.
  - `>= 640px`: Rendered in `aspect-[21/9]` expansive panorama.
- **Composition & Negative Space**:
  - **Subject Placement**: The scenic edge of the Krishna river backwaters near Vizag Colony at dusk. Quiet waters reflecting twilight sky with silhouette hills in background.
  - **Negative Space**: Horizon placed along lower third; sky and calm reflective water occupy upper two-thirds, centered cleanly for 16:9 mobile crop.

### 10. `gallery-1.jpg`
- **Slot ID**: `gallery-1`
- **Section**: Gallery — Plate 01 Panorama & Lightbox Modal
- **Aspect Ratio**: `16 / 10`
- **Recommended Pixel Dimensions**: `1600 × 1000 px`
- **Cropping & Breakpoint Behavior**: Rendered in `aspect-[16/10]` across grid and lightbox modal.
- **Composition & Negative Space**:
  - **Subject Placement**: Freshly caught river fish resting on dark, damp timber before seasoning, accompanied by halved local lime and green chilies.
  - **Negative Space**: Outer edges blend into damp, shadowy wood surface.

### 11. `gallery-2.jpg`
- **Slot ID**: `gallery-2`
- **Section**: Gallery — Plate 02 Tall Window & Lightbox Modal
- **Aspect Ratio**: `4 / 5`
- **Recommended Pixel Dimensions**: `1200 × 1500 px`
- **Cropping & Breakpoint Behavior**: Rendered in `aspect-[4/5]` in exhibition grid.
- **Composition & Negative Space**:
  - **Subject Placement**: Cooking skillet simmering over low kitchen fire, warm amber highlights on fish pieces.
  - **Negative Space**: Upper half fades into warm ambient kitchen darkness.

### 12. `gallery-3.jpg`
- **Slot ID**: `gallery-3`
- **Section**: Gallery — Plate 03 Triptych & Lightbox Modal
- **Aspect Ratio**: `4 / 5`
- **Recommended Pixel Dimensions**: `1200 × 1500 px`
- **Cropping & Breakpoint Behavior**: Rendered in `aspect-[4/5]` across all breakpoints.
- **Composition & Negative Space**:
  - **Subject Placement**: Close-up tactile macro of freshly ground red chili powder, crushed coriander, turmeric, and sea salt.
  - **Negative Space**: Deep shadow surrounding the spice mound.

### 13. `gallery-4.jpg`
- **Slot ID**: `gallery-4`
- **Section**: Gallery — Plate 04 Triptych & Lightbox Modal
- **Aspect Ratio**: `4 / 5`
- **Recommended Pixel Dimensions**: `1200 × 1500 px`
- **Cropping & Breakpoint Behavior**: Rendered in `aspect-[4/5]` across all breakpoints.
- **Composition & Negative Space**:
  - **Subject Placement**: Bubbling fish curry gravy with aromatic oil sheen and fresh curry leaves.
  - **Negative Space**: Top third reserved for dark steam contrast.

### 14. `gallery-5.jpg`
- **Slot ID**: `gallery-5`
- **Section**: Gallery — Plate 05 Triptych & Lightbox Modal
- **Aspect Ratio**: `4 / 5`
- **Recommended Pixel Dimensions**: `1200 × 1500 px`
- **Cropping & Breakpoint Behavior**: Rendered in `aspect-[4/5]` across all breakpoints.
- **Composition & Negative Space**:
  - **Subject Placement**: Golden-brown fish fry and pulusu served hot on an authentic brass plate with red onion rings.
  - **Negative Space**: Left and top dark background table setting.

### 15. `gallery-6.jpg`
- **Slot ID**: `gallery-6`
- **Section**: Gallery — Plate 06 Grand Monolith & Lightbox Modal
- **Aspect Ratio**: `21 / 9`
- **Recommended Pixel Dimensions**: `2100 × 900 px`
- **Cropping & Breakpoint Behavior**:
  - `< 640px`: Rendered in `aspect-[16/9]` with `object-cover object-center`.
  - `>= 640px`: Rendered in `aspect-[21/9]` panoramic landscape.
- **Composition & Negative Space**:
  - **Subject Placement**: Sunset docking point at Vizag Colony reservoir. Silhouetted country fishing boats resting on quiet reflective water in center.
  - **Negative Space**: Twilight sky and calm water fade into deep shadowed margins.

### 16. `og.jpg`
- **Slot ID**: `og-share`
- **Section**: Metadata Open Graph / Twitter Social Share Card
- **Aspect Ratio**: `1200 / 630` (~1.91:1)
- **Recommended Pixel Dimensions**: `1200 × 630 px`
- **Cropping & Breakpoint Behavior**: Rendered on social media links (WhatsApp, Twitter, LinkedIn, Facebook).
- **Composition & Negative Space**:
  - **Subject Placement**: Golden-brown river fish fry placed in right half of the card.
  - **Negative Space**: Left half remains completely clean, dark, and empty with no text overlay.
