/**
 * Google Flow Prompt Guide - Tutorial Data Store
 * Structured around Tutorials as specified in the PRD.
 */

const TUTORIALS = [
  {
    id: "burj-khalifa",
    slug: "burj-khalifa-name-video",
    title: "Put Your Name on Burj Khalifa",
    emoji: "🏙️",
    badge: "Viral Landmark #1",
    featured: true,
    category: "Landmarks",
    duration: "10s Cinematic Video",
    tool: "Google Flow",
    toolUrl: "https://labs.google/flow",
    description: "Create this cinematic 10-second Burj Khalifa LED light show video displaying your custom name in neon lights using Google Flow.",
    previewImage: "assets/images/burj_khalifa_preview.jpg",
    referenceImage: "assets/images/burj_khalifa_ref.jpg",
    referenceFilename: "burj_khalifa_reference.jpg",
    referenceNotice: "For the most accurate result, use this exact reference image. It anchors the lighting, architecture, and Dubai fountain reflections.",
    requirements: [
      { text: "Google Flow (or VideoFX)", icon: "✨" },
      { text: "Burj Khalifa Reference Image (Included)", icon: "🖼️" },
      { text: "Your Personalized Prompt", icon: "📋" }
    ],
    variables: [
      {
        id: "name",
        label: "Enter Your Name",
        type: "text",
        placeholder: "e.g. GANESH, ALEX, SOPHIA",
        default: "GANESH",
        help: "At the top, change only 'YOUR NAME: GANESH' to your name. Everything else is pre-calibrated."
      }
    ],
    promptTemplate: (vars) => {
      const name = (vars.name || "GANESH").trim().toUpperCase();
      
      return `YOUR NAME: ${name}
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
Keep the name large, sharp, vertically aligned, centered, and clearly readable.`;
    },
    flowSteps: [
      {
        stepNumber: "①",
        title: "Go to Characters → Upload Image",
        instruction: "In Google Flow, navigate to Characters in the side menu and upload the downloaded Burj Khalifa reference image.",
        note: "This loads your image into Google Flow's visual asset library.",
        uiHighlight: "upload-characters"
      },
      {
        stepNumber: "②",
        title: "Open All Media → ⋮ → Add to Prompt",
        instruction: "Go to All Media, click the three vertical dots (⋮) on your uploaded Burj Khalifa image, and select 'Add to Prompt'.",
        note: "This anchors the Burj Khalifa architecture and Dubai lighting directly into the video model.",
        uiHighlight: "add-to-prompt"
      },
      {
        stepNumber: "③",
        title: "Paste the Prompt & Check Your Name",
        instruction: "Paste your copied prompt into the main prompt box. At the top, make sure 'YOUR NAME: ...' contains your custom name.",
        note: "TEXT ACCURACY IS CRITICAL: The prompt instructs the model to preserve exact spelling and vertical alignment.",
        uiHighlight: "prompt-input"
      },
      {
        stepNumber: "④",
        title: "Click Generate 🎥",
        instruction: "Click Generate 🎥. The video will start with the tower unlit for 3s, then light up from bottom to top with your name for the final 3s.",
        note: "Estimated render time is ~60-90 seconds in Google Flow.",
        uiHighlight: "generate-btn"
      }
    ],
    troubleshooting: [
      {
        q: "What if the text spelling is slightly incorrect?",
        a: "Ensure your name is typed in ALL CAPS after 'YOUR NAME:'. The prompt has strict anti-hallucination rules ('TEXT ACCURACY IS CRITICAL')."
      },
      {
        q: "How to make sure the building doesn't morph?",
        a: "Make sure you used 'All Media → ⋮ → Add to Prompt' so the image is physically pinned as the reference."
      },
      {
        q: "When does the name appear in the video?",
        a: "As instructed in the prompt, the first 3 seconds show the building natural, followed by lighting activation revealing your name, held for the final 3 seconds."
      }
    ]
  },
  {
    id: "times-square",
    slug: "times-square-billboard-takeover",
    title: "Times Square Billboard Takeover",
    emoji: "🌆",
    badge: "Trending #2",
    featured: false,
    category: "Urban Billboards",
    duration: "10s Viral Video",
    tool: "Google Flow",
    toolUrl: "https://labs.google/flow",
    description: "Take over the gigantic central LED screen in New York's Times Square with your brand, handle, or custom announcement.",
    previewImage: "assets/images/times_square.jpg",
    referenceImage: "assets/images/times_square.jpg",
    referenceFilename: "times_square_reference.jpg",
    referenceNotice: "Use this high-resolution Times Square reference image to anchor the yellow cabs, crowd atmosphere, and billboard matrix.",
    requirements: [
      { text: "Google Flow (or VideoFX)", icon: "✨" },
      { text: "Times Square Reference Image", icon: "🖼️" },
      { text: "Custom Headline Prompt", icon: "📋" }
    ],
    variables: [
      {
        id: "headline",
        label: "Your Billboard Text / Brand",
        type: "text",
        placeholder: "e.g. GANESH PRODUCTIONS, YOUR BRAND",
        default: "GANESH",
        help: "This headline will dominate the center Times Square jumbo billboard display."
      },
      {
        id: "subtext",
        label: "Sub-headline / Tagline",
        type: "text",
        placeholder: "e.g. THE FUTURE IS HERE, COMING SOON",
        default: "NEON NIGHTS • LIVE IN NYC",
        help: "Secondary tagline beneath your main name."
      }
    ],
    promptTemplate: (vars) => {
      const headline = (vars.headline || "GANESH").trim().toUpperCase();
      const subtext = (vars.subtext || "NEON NIGHTS • LIVE IN NYC").trim().toUpperCase();
      
      return `BILLBOARD HEADLINE: "${headline}"
BILLBOARD SUBTITLE: "${subtext}"

Use the uploaded Times Square street level image as the exact visual foundation.
Maintain the bustling crowd, yellow taxicabs streaming with motion blur, and surrounding iconic Broadway neon marquees.
The gigantic central high-definition LED billboard screen displays bold glowing typography: "${headline}" in crisp hyper-bright electric cyan neon lettering with secondary text "${subtext}" below.
Camera motion: Smooth low-angle Steadicam glide walking through the buzzing crowd, looking upwards toward the glowing billboard as light pulses illuminate pedestrians.
4K cinematic footage, realistic rainy asphalt reflections, anamorphic blue lens flare, cinematic shutter speed.`;
    },
    flowSteps: [
      {
        stepNumber: "①",
        title: "Upload the Times Square Image",
        instruction: "Save and upload the reference image to Google Flow's input media panel.",
        note: "Keeps the iconic Broadway signs and NYC yellow cabs intact.",
        uiHighlight: "upload-zone"
      },
      {
        stepNumber: "②",
        title: "Paste the Personalized Prompt",
        instruction: "Copy and paste your generated prompt containing your brand/name.",
        note: "Quotes around the headline ensure strict spelling retention.",
        uiHighlight: "prompt-input"
      },
      {
        stepNumber: "③",
        title: "Configure Motion & Generate",
        instruction: "Select Camera Move: Forward Dolly / Pan Up, and click Generate.",
        note: "Creates realistic pedestrian flow and cab light streaks.",
        uiHighlight: "generate-btn"
      }
    ],
    troubleshooting: [
      {
        q: "What if the text appears on multiple screens?",
        a: "Specify 'only the center vertical jumbotron displays the text' in the prompt modifier."
      }
    ]
  },
  {
    id: "luxury-car",
    slug: "luxury-car-cinematic-ad",
    title: "Cinematic Luxury Car Commercial",
    emoji: "🚗",
    badge: "Trending #3",
    featured: false,
    category: "Cinematic Ads",
    duration: "10s Commercial Cut",
    tool: "Google Flow",
    toolUrl: "https://labs.google/flow",
    description: "Generate a multi-million-dollar hypercar commercial gliding through rainy neon streets with your personalized badge or plate.",
    previewImage: "assets/images/luxury_car.jpg",
    referenceImage: "assets/images/luxury_car.jpg",
    referenceFilename: "luxury_hypercar_reference.jpg",
    referenceNotice: "Anchors the sleek matte carbon fiber aerodynamics, rain droplets, and wet asphalt lighting.",
    requirements: [
      { text: "Google Flow (or VideoFX)", icon: "✨" },
      { text: "Hypercar Reference Image", icon: "🖼️" },
      { text: "Automotive Commercial Prompt", icon: "📋" }
    ],
    variables: [
      {
        id: "carBrand",
        label: "Plate / Brand Name",
        type: "text",
        placeholder: "e.g. GANESH-GT, APEX 01",
        default: "GANESH-GT",
        help: "Displayed on the custom illuminated front intake badge and license plate."
      },
      {
        id: "weatherEffect",
        label: "Atmosphere & Weather",
        type: "select",
        options: [
          { value: "heavy nighttime rain with glistening water droplets and neon puddles", label: "Night Rain & Wet Reflections (Recommended)" },
          { value: "foggy neon cyberpunk dawn with volumetric headlight beams", label: "Cyberpunk Fog & Headlights" },
          { value: "dramatic golden hour sunset flare reflecting off carbon fiber hood", label: "Golden Hour Sunset" }
        ],
        default: "heavy nighttime rain with glistening water droplets and neon puddles"
      }
    ],
    promptTemplate: (vars) => {
      const brand = (vars.carBrand || "GANESH-GT").trim().toUpperCase();
      const weather = vars.weatherEffect || "heavy nighttime rain with glistening water droplets and neon puddles";
      
      return `CUSTOM AUTOMOTIVE BADGE: "${brand}"

Use the uploaded matte black hypercar image as the precise vehicle and environmental reference.
Atmosphere: ${weather}.
The exotic supercar initiates motion, headlights illuminating with sharp dual LED signatures, exhaust tips glowing faint cherry red as it accelerates smoothly down the asphalt.
The custom plate and front illuminated emblem proudly displays "${brand}".
Camera: Cinematic rolling car rig tracking shot sweeping low along the driver side wheel rims, water mist kicking up from the tires, shallow depth of field.
Shot on 35mm anamorphic lens, 8k commercial color grade, raytraced wet asphalt reflections, slow-motion 60fps feel.`;
    },
    flowSteps: [
      {
        stepNumber: "①",
        title: "Upload the Hypercar Image",
        instruction: "Download and attach the car reference image into Google Flow.",
        note: "Preserves the supercar's exact aggressive body curves.",
        uiHighlight: "upload-zone"
      },
      {
        stepNumber: "②",
        title: "Insert Tailored Prompt",
        instruction: "Copy the prompt with your chosen car badge and atmospheric settings.",
        note: "Highlights wet reflection shaders in the video diffusion model.",
        uiHighlight: "prompt-input"
      },
      {
        stepNumber: "③",
        title: "Render Cinematic Commercial",
        instruction: "Set Motion Strength to 6 and hit Generate.",
        note: "Generates realistic camera sweep and wheel spinning dynamics.",
        uiHighlight: "generate-btn"
      }
    ],
    troubleshooting: [
      {
        q: "What if the car wheels look static?",
        a: "Add 'realistic motion blurred rim rotation and tire smoke' to your prompt."
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.TUTORIALS = TUTORIALS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { TUTORIALS };
}
