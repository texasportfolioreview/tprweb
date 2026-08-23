/* =========================================================
   Texas Portfolio Review — shared site behavior
   Mobile nav toggle + the "book a free consultation" modal.
   No dependencies, no build step — include this file on
   every page after the shared header/modal markup.
   ========================================================= */
(function () {
  "use strict";

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.querySelector("[data-nav-links]");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = !navLinks.hasAttribute("hidden");
      if (isOpen) {
        navLinks.setAttribute("hidden", "");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        navLinks.removeAttribute("hidden");
        navToggle.setAttribute("aria-expanded", "true");
      }
    });

    // Collapse the mobile menu back to the desktop state on resize.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) {
        navLinks.removeAttribute("hidden");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        navLinks.setAttribute("hidden", "");
      }
    });
  }

  /* ---------------- Student work filter (student-work.html only) ---------------- */
  var filterBar = document.querySelector("[data-work-filters]");
  var workCards = document.querySelectorAll("[data-work-category]");

  if (filterBar && workCards.length) {
    filterBar.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-filter]");
      if (!btn) return;

      var filterButtons = filterBar.querySelectorAll("[data-filter]");
      filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");

      var category = btn.getAttribute("data-filter");
      workCards.forEach(function (card) {
        var show = category === "all" || card.getAttribute("data-work-category") === category;
        card.hidden = !show;
      });
    });
  }

  /* ---------------- Consultation modal ---------------- */
  var backdrop = document.getElementById("consult-modal");
  if (!backdrop) return;

  var openButtons = document.querySelectorAll("[data-open-consult]");
  var closeButtons = backdrop.querySelectorAll("[data-close-consult]");
  var dialog = backdrop.querySelector(".modal");
  var form = document.getElementById("consult-form");
  var successPanel = document.getElementById("consult-success");
  var lastFocused = null;

  function openModal(event) {
    if (event) event.preventDefault();
    lastFocused = document.activeElement;
    backdrop.removeAttribute("hidden");
    document.body.style.overflow = "hidden";

    // Reset to the form view every time the modal is opened.
    if (form) form.hidden = false;
    if (successPanel) successPanel.hidden = true;

    var firstField = backdrop.querySelector("input, select, textarea");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    backdrop.setAttribute("hidden", "");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  openButtons.forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });
  closeButtons.forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });

  backdrop.addEventListener("click", function (event) {
    if (event.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !backdrop.hasAttribute("hidden")) {
      closeModal();
    }
  });

  // Basic focus trap: keep Tab cycling inside the dialog while it's open.
  backdrop.addEventListener("keydown", function (event) {
    if (event.key !== "Tab" || !dialog) return;
    var focusable = dialog.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Submit handling. This is a static site with no backend wired up yet —
  // swap this for a real POST (e.g. to Formspree, Netlify Forms, or your
  // own endpoint) by replacing the block below with a fetch() call to
  // form.action and only showing the success panel once that resolves.
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      form.hidden = true;
      if (successPanel) successPanel.hidden = false;
      form.reset();
    });
  }
})();
