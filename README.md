# FlowGuide — Google Flow Prompt Guide 🚀

> **"Don't know what prompt to use? We give you the exact prompt and show you exactly how to create it."**

FlowGuide is a guided prompt tool designed to help creators reproduce viral AI videos using **Google Flow**. It eliminates the guesswork by providing:

1. **The Exact Reference Image** required by Google Flow to anchor architectural geometry and lighting.
2. **The Exact Prompt & Personalizer** allowing you to substitute your name or brand with 1-click clipboard copy.
3. **Click-by-Click Visual Instructions** demonstrating how to use Google Flow (Characters → Upload Image → All Media → Add to Prompt → Paste → Generate).
4. **Troubleshooting Guides** answering what to do if text is distorted, building geometry changes, or lights need more bloom.

---

## 🏙️ Featured Tutorial: Put Your Name on Burj Khalifa

Create a cinematic 10-second Burj Khalifa LED light show video with your custom name in Google Flow.

### Exact Google Flow Steps:
1. **Download the Reference Image**: Included in `assets/images/burj_khalifa_ref.jpg`.
2. **Open Google Flow**: Go to [labs.google/flow](https://labs.google/flow).
3. **Go to Characters → Upload Image**: Upload the Burj Khalifa reference image.
4. **Open All Media → ⋮ → Add to Prompt**: Attach the asset directly as the visual reference.
5. **Paste Prompt**:
   ```text
   YOUR NAME: GANESH
   Use the uploaded Burj Khalifa image as the exact visual reference. Preserve the building's architecture, proportions, perspective, lighting, and surroundings.
   Create a cinematic 10-second shot. The camera slowly pushes toward the Burj Khalifa during a beautiful golden-blue evening.
   The name specified after "YOUR NAME:" appears vertically on the facade of the Burj Khalifa as elegant, realistic illuminated architectural lettering. Use exactly the name provided after "YOUR NAME:". The letters must be clearly readable and spelled exactly as provided.
   Make the text look physically integrated into the building's exterior, naturally following the curvature and perspective of the tower. It should feel like a real luxury LED/light projection or architectural display, not floating text or a digital overlay.
   The lettering should have a bright warm golden-white/champagne-gold glow, matching premium architectural lighting. Add a subtle realistic glow and natural light spill onto the surrounding glass facade.
   Start with the building without the name for the first 3 seconds. Then the lights gradually activate from bottom to top, revealing the specified name across the tower. Hold the fully illuminated name clearly visible for the final 3 seconds.
   Photorealistic, premium Dubai atmosphere, cinematic lighting, realistic reflections, volumetric light, subtle lens flare, smooth camera movement, highly detailed.
   TEXT ACCURACY IS CRITICAL:
   The only visible text must be the exact name provided after "YOUR NAME:".
   Do not misspell it, alter the letters, add extra words, duplicate the text, or create random symbols.
   Do not add logos, captions, subtitles, numbers, or watermarks.
   Keep the name large, sharp, vertically aligned, centered, and clearly readable.
   ```
6. **Click Generate 🎥**: Watch your name illuminate the Dubai night sky.

---

## 💻 Tech Stack
- **HTML5 & Vanilla JavaScript**: Zero bloat, responsive, fast.
- **Vanilla CSS**: Obsidian Dark theme with glassmorphic accents and micro-animations.
- **Data-Driven Architecture**: Easily extensible tutorial library in `js/data.js`.

---

## 🛠️ Running Locally

```bash
# Clone the repository
git clone https://github.com/GaneshMacharla/promptguide.git

# Navigate into directory
cd promptguide

# Run with Python HTTP server
python -m http.server 3000

# Or with Node.js
npx serve .
```

Open `http://localhost:3000` in your browser.
