/**
 * Google Flow Prompt Guide - Main Application Logic
 * Implements the Guided Prompt Tool workflow from the Revised PRD.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // Application State
  // --------------------------------------------------------------------------
  const state = {
    currentTutorial: null,
    currentCategory: "all",
    searchQuery: "",
    userInputs: {},
    currentFlowStepIndex: 0,
    hasCopied: false
  };

  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  const mainView = document.getElementById("mainView");
  const tutorialView = document.getElementById("tutorialView");
  const promptCardsGrid = document.getElementById("promptCardsGrid");
  const categoryFilterTabs = document.getElementById("categoryFilterTabs");
  const librarySearchInput = document.getElementById("librarySearchInput");
  const toastContainer = document.getElementById("toastContainer");

  // Navigation elements
  const navHomeBtn = document.getElementById("navHomeBtn");
  const footerHomeBtn = document.getElementById("footerHomeBtn");
  const navFeaturedLink = document.getElementById("navFeaturedLink");
  const navLibraryLink = document.getElementById("navLibraryLink");
  const heroExploreBtn = document.getElementById("heroExploreBtn");
  const heroFeaturedBtn = document.getElementById("heroFeaturedBtn");
  const featuredStartBtn = document.getElementById("featuredStartBtn");
  const tutorialBackBtn = document.getElementById("tutorialBackBtn");

  // Tutorial Header Elements
  const tutHeaderBadge = document.getElementById("tutHeaderBadge");
  const tutHeaderDuration = document.getElementById("tutHeaderDuration");
  const tutTitle = document.getElementById("tutTitle");
  const tutSubtitle = document.getElementById("tutSubtitle");
  const tutPreviewImage = document.getElementById("tutPreviewImage");
  const tutReqList = document.getElementById("tutReqList");
  const tutorialToolBadge = document.getElementById("tutorialToolBadge");

  // Step 1 Elements
  const step1Title = document.getElementById("step1Title");
  const refImageElement = document.getElementById("refImageElement");
  const downloadRefImageBtn = document.getElementById("downloadRefImageBtn");
  const refNoticeText = document.getElementById("refNoticeText");

  // Step 2 Elements
  const step2Title = document.getElementById("step2Title");
  const variablesFormContainer = document.getElementById("variablesFormContainer");
  const generatePromptBtn = document.getElementById("generatePromptBtn");

  // Step 3 Elements
  const promptTextDisplay = document.getElementById("promptTextDisplay");
  const copyPromptBtn = document.getElementById("copyPromptBtn");
  const copyBtnIcon = document.getElementById("copyBtnIcon");
  const copyBtnText = document.getElementById("copyBtnText");
  const promptStatusBadge = document.getElementById("promptStatusBadge");

  // Step 4 Elements
  const openFlowActionBtn = document.getElementById("openFlowActionBtn");

  // Step 5 Elements
  const flowTabsNav = document.getElementById("flowTabsNav");
  const flowTabContent = document.getElementById("flowTabContent");
  const faqItemsContainer = document.getElementById("faqItemsContainer");

  // Final Action Elements
  const tryAnotherPromptBtn = document.getElementById("tryAnotherPromptBtn");
  const shareTutorialBtn = document.getElementById("shareTutorialBtn");

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  function init() {
    renderLibraryCards();
    setupEventListeners();
    handleRouting();
    window.addEventListener("hashchange", handleRouting);
  }

  // --------------------------------------------------------------------------
  // Routing & View Management
  // --------------------------------------------------------------------------
  function handleRouting() {
    const hash = window.location.hash;
    if (hash.startsWith("#tutorial/")) {
      const slug = hash.replace("#tutorial/", "");
      const found = TUTORIALS.find(t => t.slug === slug || t.id === slug);
      if (found) {
        showTutorial(found);
        return;
      }
    }

    // Default to main landing view
    showMainView();
  }

  function showMainView() {
    tutorialView.classList.remove("active");
    mainView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showTutorial(tutorial) {
    state.currentTutorial = tutorial;
    state.hasCopied = false;
    state.currentFlowStepIndex = 0;

    // Reset user inputs to defaults
    state.userInputs = {};
    if (tutorial.variables) {
      tutorial.variables.forEach(v => {
        state.userInputs[v.id] = v.default || "";
      });
    }

    // Populate Header
    tutHeaderBadge.textContent = tutorial.badge || "Featured Tutorial";
    tutHeaderDuration.textContent = `⏱️ ${tutorial.duration || "10s Video"}`;
    tutTitle.textContent = `${tutorial.emoji || "🎬"} ${tutorial.title}`;
    tutSubtitle.textContent = tutorial.description;
    tutPreviewImage.src = tutorial.previewImage;
    tutPreviewImage.alt = tutorial.title;
    tutorialToolBadge.textContent = `Tool: ${tutorial.tool || "Google Flow"}`;

    // Requirements list
    tutReqList.innerHTML = tutorial.requirements.map(req => `
      <div class="tut-req-item">
        <span class="req-check">✓</span>
        <span>${req.text}</span>
      </div>
    `).join("");

    // Step 1: Reference Image
    step1Title.textContent = `Step 1 — Get the ${tutorial.title.split(" ").slice(-2).join(" ")} Image`;
    refImageElement.src = tutorial.referenceImage;
    refImageElement.alt = `${tutorial.title} Reference Image`;
    downloadRefImageBtn.href = tutorial.referenceImage;
    downloadRefImageBtn.download = tutorial.referenceFilename || "reference_image.jpg";
    refNoticeText.textContent = tutorial.referenceNotice || "For the most accurate result, use this exact reference image.";

    // Step 2: Variables Form
    step2Title.textContent = `Step 2 — Enter Your Information`;
    renderVariablesForm(tutorial);

    // Step 3: Compile Prompt
    updateCompiledPrompt();

    // Step 4: Google Flow Link
    openFlowActionBtn.href = tutorial.toolUrl || "https://labs.google/flow";

    // Step 5: Visual Walkthrough Tabs
    renderFlowStepTabs(tutorial);
    renderActiveFlowStepContent();

    // Step 5 FAQ / Troubleshooting
    renderTroubleshooting(tutorial);

    // Switch views
    mainView.classList.add("hidden");
    tutorialView.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --------------------------------------------------------------------------
  // Step 2: Dynamic Form Rendering
  // --------------------------------------------------------------------------
  function renderVariablesForm(tutorial) {
    if (!tutorial.variables || tutorial.variables.length === 0) {
      variablesFormContainer.innerHTML = `<p class="text-secondary">No custom parameters required for this prompt.</p>`;
      return;
    }

    variablesFormContainer.innerHTML = tutorial.variables.map(v => {
      if (v.type === "select") {
        const optionsHtml = v.options.map(opt => `
          <option value="${opt.value}" ${opt.value === state.userInputs[v.id] ? "selected" : ""}>
            ${opt.label}
          </option>
        `).join("");

        return `
          <div class="form-group">
            <label class="form-label" for="var_${v.id}">
              <span>${v.label}</span>
              ${v.help ? `<span class="form-label-tip">${v.help}</span>` : ""}
            </label>
            <select class="form-select" id="var_${v.id}" data-var-id="${v.id}">
              ${optionsHtml}
            </select>
          </div>
        `;
      }

      // Default text input
      return `
        <div class="form-group">
          <label class="form-label" for="var_${v.id}">
            <span>${v.label}</span>
            <span class="form-label-tip">Live auto-updates prompt</span>
          </label>
          <input 
            type="text" 
            class="form-input" 
            id="var_${v.id}" 
            data-var-id="${v.id}" 
            value="${state.userInputs[v.id] || ""}" 
            placeholder="${v.placeholder || ""}"
            autocomplete="off"
          />
          ${v.help ? `<span class="form-help">${v.help}</span>` : ""}
        </div>
      `;
    }).join("");

    // Attach input listeners for live updates
    tutorial.variables.forEach(v => {
      const inputEl = document.getElementById(`var_${v.id}`);
      if (inputEl) {
        inputEl.addEventListener("input", (e) => {
          state.userInputs[v.id] = e.target.value;
          updateCompiledPrompt();
        });
        inputEl.addEventListener("change", (e) => {
          state.userInputs[v.id] = e.target.value;
          updateCompiledPrompt();
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // Step 3: Dynamic Prompt Compilation & Copy
  // --------------------------------------------------------------------------
  function updateCompiledPrompt() {
    if (!state.currentTutorial) return;

    const rawPrompt = state.currentTutorial.promptTemplate(state.userInputs);
    promptTextDisplay.textContent = rawPrompt;

    // Reset copy button status if modified
    copyBtnIcon.textContent = "📋";
    copyBtnText.textContent = "Copy Prompt";
    copyPromptBtn.classList.remove("btn-success");
    promptStatusBadge.textContent = "Ready to paste";
  }

  async function copyPromptToClipboard(showToastAlert = true) {
    if (!state.currentTutorial) return;
    const textToCopy = state.currentTutorial.promptTemplate(state.userInputs);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for non-https or restricted environments
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      state.hasCopied = true;
      copyBtnIcon.textContent = "✅";
      copyBtnText.textContent = "Copied!";
      copyPromptBtn.classList.add("btn-success");
      promptStatusBadge.textContent = "✅ Copied to clipboard!";

      if (showToastAlert) {
        showToast("✨ Exact prompt copied to clipboard! Ready to paste into Google Flow.", "success");
      }

      setTimeout(() => {
        copyBtnIcon.textContent = "📋";
        copyBtnText.textContent = "Copy Prompt";
        copyPromptBtn.classList.remove("btn-success");
      }, 3500);

    } catch (err) {
      console.error("Failed to copy:", err);
      showToast("Select prompt text above to copy manually", "info");
    }
  }

  // --------------------------------------------------------------------------
  // Step 5: Visual Step-by-Step UI Guide & Simulator
  // --------------------------------------------------------------------------
  function renderFlowStepTabs(tutorial) {
    if (!tutorial.flowSteps) return;

    flowTabsNav.innerHTML = tutorial.flowSteps.map((step, idx) => `
      <button class="flow-tab-btn ${idx === state.currentFlowStepIndex ? "active" : ""}" data-flow-tab="${idx}">
        <span>${step.stepNumber}</span>
        <span>${step.title}</span>
      </button>
    `).join("");

    const tabButtons = flowTabsNav.querySelectorAll(".flow-tab-btn");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabIdx = parseInt(btn.dataset.flowTab, 10);
        state.currentFlowStepIndex = tabIdx;
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderActiveFlowStepContent();
      });
    });
  }

  function renderActiveFlowStepContent() {
    if (!state.currentTutorial || !state.currentTutorial.flowSteps) return;
    const currentStep = state.currentTutorial.flowSteps[state.currentFlowStepIndex];
    if (!currentStep) return;

    const currentPromptSnippet = state.currentTutorial.promptTemplate(state.userInputs).substring(0, 110) + "...";

    let mockupHtml = "";
    if (currentStep.uiHighlight === "upload-characters" || currentStep.uiHighlight === "upload-zone") {
      mockupHtml = `
        <div class="mock-flow-ui">
          <div class="mock-window-bar">
            <div class="mock-window-dots"><span></span><span></span><span></span></div>
            <div class="mock-app-title">Google Flow — Characters</div>
            <span style="font-size: 0.7rem; color: #10b981;">● Step 1</span>
          </div>
          <div class="mock-screen-content">
            <div style="display: flex; gap: 10px; margin-bottom: 8px;">
              <span style="background: rgba(0, 240, 255, 0.15); color: #00f0ff; border: 1px solid #00f0ff; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">
                👤 Characters
              </span>
              <span style="background: rgba(255, 255, 255, 0.05); color: #94a3b8; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem;">
                All Media
              </span>
            </div>
            <div class="mock-upload-zone highlight-target">
              <span class="pulse-pointer">1. UPLOAD IMAGE HERE</span>
              <div style="font-size: 1.6rem; margin-bottom: 6px;">🏙️</div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">Upload Reference Image</div>
              <div style="font-size: 0.72rem; color: #94a3b8;">Select <strong>${state.currentTutorial.referenceFilename}</strong></div>
            </div>
          </div>
        </div>
      `;
    } else if (currentStep.uiHighlight === "add-to-prompt") {
      mockupHtml = `
        <div class="mock-flow-ui">
          <div class="mock-window-bar">
            <div class="mock-window-dots"><span></span><span></span><span></span></div>
            <div class="mock-app-title">Google Flow — All Media</div>
            <span style="font-size: 0.7rem; color: #00f0ff;">● Step 2</span>
          </div>
          <div class="mock-screen-content">
            <div style="display: flex; gap: 10px; margin-bottom: 8px;">
              <span style="background: rgba(255, 255, 255, 0.05); color: #94a3b8; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem;">
                👤 Characters
              </span>
              <span style="background: rgba(0, 240, 255, 0.15); color: #00f0ff; border: 1px solid #00f0ff; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">
                All Media ✓
              </span>
            </div>
            <div style="position: relative; background: #0c0e15; border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${state.currentTutorial.referenceImage}" style="width: 48px; height: 36px; object-fit: cover; border-radius: 4px; border: 1px solid #334155;">
                <div>
                  <div style="font-size: 0.78rem; font-weight: 600; color: #fff;">${state.currentTutorial.referenceFilename}</div>
                  <div style="font-size: 0.68rem; color: #10b981;">Ready in library</div>
                </div>
              </div>
              <div style="position: relative;">
                <button style="background: rgba(255,255,255,0.1); border: 1px solid #64748b; color: #fff; border-radius: 4px; padding: 2px 8px; font-size: 0.85rem; cursor: pointer;">⋮</button>
                <div style="position: absolute; right: 0; top: 100%; margin-top: 6px; background: #1a1e2e; border: 1px solid var(--accent-cyan); border-radius: 6px; padding: 6px 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.8); z-index: 10; white-space: nowrap;">
                  <span class="pulse-pointer" style="top: -12px; right: -5px;">CLICK THIS</span>
                  <div style="font-size: 0.75rem; font-weight: 700; color: #00f0ff; display: flex; align-items: center; gap: 6px;">
                    <span>➕</span> Add to Prompt
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (currentStep.uiHighlight === "prompt-input") {
      mockupHtml = `
        <div class="mock-flow-ui">
          <div class="mock-window-bar">
            <div class="mock-window-dots"><span></span><span></span><span></span></div>
            <div class="mock-app-title">Google Flow — Main Prompt Box</div>
            <span style="font-size: 0.7rem; color: #10b981;">● Media Attached</span>
          </div>
          <div class="mock-screen-content">
            <div style="display: flex; gap: 8px; align-items: center; padding: 6px 10px; background: rgba(0,240,255,0.06); border-radius: 6px; font-size: 0.75rem;">
              <span>🖼️</span>
              <span style="color: #00f0ff;">[Image Reference: ${state.currentTutorial.referenceFilename}]</span>
            </div>
            <div class="mock-prompt-area highlight-target" style="position: relative;">
              <span class="pulse-pointer">PASTE PROMPT (Ctrl+V)</span>
              <div style="color: #00f0ff; font-weight: 800; font-size: 0.82rem; margin-bottom: 6px;">YOUR NAME: ${(state.userInputs.name || 'GANESH').toUpperCase()}</div>
              <div style="color: #94a3b8; font-size: 0.72rem; line-height: 1.4;">${currentPromptSnippet}</div>
            </div>
          </div>
        </div>
      `;
    } else {
      // Generate button highlight
      mockupHtml = `
        <div class="mock-flow-ui">
          <div class="mock-window-bar">
            <div class="mock-window-dots"><span></span><span></span><span></span></div>
            <div class="mock-app-title">Google Flow — Video Generator</div>
            <span style="font-size: 0.7rem; color: #10b981;">● Ready</span>
          </div>
          <div class="mock-screen-content" style="text-align: center; padding: 24px 20px;">
            <div style="font-size: 0.82rem; color: #cbd5e1; margin-bottom: 14px;">Reference pinned & prompt entered with your name.</div>
            <button class="mock-generate-btn highlight-target" style="padding: 12px 24px; font-size: 0.95rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
              <span>🎥 Click Generate Video</span>
            </button>
            <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 12px;">Watch your name light up the Burj Khalifa!</div>
        </div>
      `;
    }

    flowTabContent.innerHTML = `
      <div class="flow-step-detail">
        <div class="flow-step-text">
          <h4>${currentStep.stepNumber} ${currentStep.title}</h4>
          <p>${currentStep.instruction}</p>
          <div class="flow-tip-bubble">
            <strong>Pro Tip:</strong> ${currentStep.note}
          </div>
        </div>
        <div class="flow-step-visual">
          ${mockupHtml}
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // Step 5 FAQ / Troubleshooting
  // --------------------------------------------------------------------------
  function renderTroubleshooting(tutorial) {
    if (!tutorial.troubleshooting || tutorial.troubleshooting.length === 0) {
      faqItemsContainer.innerHTML = `<p class="text-secondary">Standard Google Flow settings are optimal for this prompt.</p>`;
      return;
    }

    faqItemsContainer.innerHTML = tutorial.troubleshooting.map((item, idx) => `
      <div class="faq-item">
        <button class="faq-question" data-faq-idx="${idx}">
          <span>${item.q}</span>
          <span>▾</span>
        </button>
        <div class="faq-answer">
          ${item.a}
        </div>
      </div>
    `).join("");
  }

  // --------------------------------------------------------------------------
  // Library Cards Rendering
  // --------------------------------------------------------------------------
  function renderLibraryCards() {
    let filtered = TUTORIALS.filter(t => {
      // Category filter
      if (state.currentCategory !== "all" && t.category !== state.currentCategory) {
        return false;
      }
      // Search filter
      if (state.searchQuery.trim() !== "") {
        const query = state.searchQuery.toLowerCase();
        const matchesTitle = t.title.toLowerCase().includes(query);
        const matchesDesc = t.description.toLowerCase().includes(query);
        const matchesCategory = t.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    });

    if (filtered.length === 0) {
      promptCardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
          <div style="font-size: 2rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 1.25rem; margin-bottom: 8px;">No matching prompts found</h3>
          <p style="color: var(--text-secondary);">Try searching for "Burj", "Times Square", or reset filters.</p>
        </div>
      `;
      return;
    }

    promptCardsGrid.innerHTML = filtered.map(t => `
      <article class="prompt-card" data-slug="${t.slug}">
        <div class="card-media-wrapper">
          <img src="${t.previewImage}" alt="${t.title}" class="card-thumb" loading="lazy">
          ${t.badge ? `<span class="card-badge-floating">${t.badge}</span>` : ""}
          <span class="card-tool-tag">${t.tool || "Google Flow"}</span>
        </div>
        <div class="card-body">
          <div class="card-category">${t.category}</div>
          <h3 class="card-title">${t.emoji || "✨"} ${t.title}</h3>
          <p class="card-desc">${t.description}</p>
          <div class="card-footer">
            <span class="card-duration">⏱️ ${t.duration || "10s video"}</span>
            <span class="card-action-text">View Tutorial →</span>
          </div>
        </div>
      </article>
    `).join("");

    // Attach card click handlers
    const cards = promptCardsGrid.querySelectorAll(".prompt-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const slug = card.dataset.slug;
        window.location.hash = `tutorial/${slug}`;
      });
    });
  }

  // --------------------------------------------------------------------------
  // Event Listeners
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Navigation
    navHomeBtn.addEventListener("click", () => {
      window.location.hash = "";
      showMainView();
    });

    footerHomeBtn.addEventListener("click", () => {
      window.location.hash = "";
      showMainView();
    });

    tutorialBackBtn.addEventListener("click", () => {
      window.location.hash = "";
      showMainView();
    });

    navFeaturedLink.addEventListener("click", (e) => {
      e.preventDefault();
      showMainView();
      document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
    });

    navLibraryLink.addEventListener("click", (e) => {
      e.preventDefault();
      showMainView();
      document.getElementById("library").scrollIntoView({ behavior: "smooth" });
    });

    heroExploreBtn.addEventListener("click", () => {
      document.getElementById("library").scrollIntoView({ behavior: "smooth" });
    });

    heroFeaturedBtn.addEventListener("click", () => {
      window.location.hash = "tutorial/burj-khalifa-name-video";
    });

    featuredStartBtn.addEventListener("click", () => {
      window.location.hash = "tutorial/burj-khalifa-name-video";
    });

    // Step 2 & 3 Actions
    generatePromptBtn.addEventListener("click", () => {
      updateCompiledPrompt();
      document.getElementById("step3Card").scrollIntoView({ behavior: "smooth", block: "center" });
      showToast("✨ Personalized prompt generated and ready to copy!", "info");
    });

    copyPromptBtn.addEventListener("click", () => {
      copyPromptToClipboard(true);
    });

    // Step 4 Action: Open Google Flow
    openFlowActionBtn.addEventListener("click", () => {
      if (!state.hasCopied) {
        copyPromptToClipboard(false);
      }
      showToast("🚀 Opening Google Flow! Your prompt is on your clipboard.", "success");
    });

    // Final Celebration Actions
    tryAnotherPromptBtn.addEventListener("click", () => {
      window.location.hash = "";
      showMainView();
      setTimeout(() => {
        document.getElementById("library").scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    shareTutorialBtn.addEventListener("click", async () => {
      const shareUrl = window.location.href;
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareUrl);
          showToast("🔗 Tutorial link copied to clipboard! Share with friends.", "success");
        } else {
          showToast(`Share this URL: ${shareUrl}`, "info");
        }
      } catch (e) {
        showToast("Share URL: " + window.location.href, "info");
      }
    });

    // Category Filtering
    const filterButtons = categoryFilterTabs.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.currentCategory = btn.dataset.category;
        renderLibraryCards();
      });
    });

    // Search Input
    librarySearchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderLibraryCards();
    });
  }

  // --------------------------------------------------------------------------
  // Toast Alert Notification System
  // --------------------------------------------------------------------------
  function showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = "toast";
    
    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "warning") icon = "⚠️";

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentNode) {
          toastContainer.removeChild(toast);
        }
      }, 350);
    }, 4000);
  }

  // Run App
  init();
});
