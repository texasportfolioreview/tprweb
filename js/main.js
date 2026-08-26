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

  /* ---------------- Reveal-on-scroll ---------------- */
  var revealEls = document.querySelectorAll("main > section");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------------- Reading-rail scrollspy (about.html only) ---------------- */
  var railLinks = document.querySelectorAll(".rail-nav a[data-target]");
  if (railLinks.length && "IntersectionObserver" in window) {
    var railTargets = Array.prototype.map
      .call(railLinks, function (a) { return document.getElementById(a.getAttribute("data-target")); })
      .filter(Boolean);

    var railObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        railLinks.forEach(function (a) {
          a.classList.toggle("on", a.getAttribute("data-target") === entry.target.id);
        });
      });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });

    railTargets.forEach(function (t) { railObserver.observe(t); });
  }

  /* ---------------- Work gallery lightbox (student-work.html) ---------------- */
  var workModal = document.getElementById("work-modal");
  if (workModal) {
    var galleryItems = document.querySelectorAll("[data-work-target]");
    var workSlidesWrap = document.getElementById("work-modal-slides");
    var workDotsWrap = document.getElementById("work-modal-dots");
    var workTitleEl = document.getElementById("work-modal-title");
    var workTagEl = document.getElementById("work-modal-tag");
    var workDescEl = document.getElementById("work-modal-desc");
    var workLastFocused = null;
    var workSlideIndex = 0;

    function showWorkSlide(i) {
      var slides = workSlidesWrap.querySelectorAll("img");
      var dots = workDotsWrap.querySelectorAll("button");
      if (!slides.length) return;
      workSlideIndex = (i + slides.length) % slides.length;
      slides.forEach(function (slide, si) { slide.classList.toggle("is-active", si === workSlideIndex); });
      dots.forEach(function (dot, di) { dot.classList.toggle("is-active", di === workSlideIndex); });
    }

    function openWork(id) {
      var record = document.getElementById("work-" + id);
      if (!record) return;
      workLastFocused = document.activeElement;

      workTitleEl.textContent = record.getAttribute("data-title") || "";
      workTagEl.textContent = record.getAttribute("data-tag") || "";
      var descSource = record.querySelector("p");
      workDescEl.textContent = descSource ? descSource.textContent : "";

      var images = record.querySelectorAll("img");
      workSlidesWrap.innerHTML = "";
      workDotsWrap.innerHTML = "";
      images.forEach(function (img, i) {
        var clone = img.cloneNode(true);
        clone.className = "work-card__slide" + (i === 0 ? " is-active" : "");
        workSlidesWrap.appendChild(clone);

        if (images.length > 1) {
          var dot = document.createElement("button");
          dot.type = "button";
          dot.setAttribute("aria-label", "Image " + (i + 1) + " of " + images.length);
          if (i === 0) dot.classList.add("is-active");
          workDotsWrap.appendChild(dot);
        }
      });
      workModal.classList.toggle("has-multiple", images.length > 1);
      workSlideIndex = 0;

      workModal.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
      workModal.querySelector(".modal__close").focus();
    }

    function closeWork() {
      workModal.setAttribute("hidden", "");
      document.body.style.overflow = "";
      if (workLastFocused && typeof workLastFocused.focus === "function") workLastFocused.focus();
    }

    galleryItems.forEach(function (btn) {
      btn.addEventListener("click", function () {
        openWork(btn.getAttribute("data-work-target"));
      });
    });

    workModal.querySelector("[data-close-work]").addEventListener("click", closeWork);

    workModal.addEventListener("click", function (event) {
      if (event.target === workModal) { closeWork(); return; }
      if (event.target.closest("[data-slide-prev]")) { showWorkSlide(workSlideIndex - 1); return; }
      if (event.target.closest("[data-slide-next]")) { showWorkSlide(workSlideIndex + 1); return; }
      var dotBtn = event.target.closest("#work-modal-dots button");
      if (dotBtn) {
        var dots = Array.prototype.slice.call(workDotsWrap.querySelectorAll("button"));
        showWorkSlide(dots.indexOf(dotBtn));
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !workModal.hasAttribute("hidden")) closeWork();
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

  /* ---------------- Shared AJAX form submit ----------------
     Posts to the form's own action (Formspree) via fetch so an in-page
     success/error panel can be shown instead of a redirect to Formspree's
     page. Without JS, the form's action/method still POST it there
     directly (Formspree's own thank-you page is shown instead of ours,
     but the submission still goes through). */
  function bindAjaxForm(form, successPanel, errorPanel) {
    if (!form) return;
    form.addEventListener("submit", function (event) {
      if (!form.reportValidity()) { event.preventDefault(); return; }
      event.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      if (errorPanel) errorPanel.hidden = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.hidden = true;
            if (successPanel) successPanel.hidden = false;
            form.reset();
          } else {
            return response.json().then(function (data) {
              var message =
                data && data.errors && data.errors.length
                  ? data.errors.map(function (e) { return e.message; }).join(", ")
                  : "Something went wrong — please try again or email us directly.";
              var formError = new Error(message);
              formError.isFormError = true;
              throw formError;
            });
          }
        })
        .catch(function (err) {
          if (errorPanel) {
            errorPanel.textContent =
              err && err.isFormError && err.message
                ? err.message
                : "Something went wrong — please check your connection and try again, or email us directly.";
            errorPanel.hidden = false;
          }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ---------------- Welcome page (post-purchase) form ----------------
     Only present on welcome.html. Prefills the plan name from the
     ?plan= query param Stripe's payment-link redirect appends, both into
     the heading and a hidden field so it's included in the submission. */
  var welcomeForm = document.getElementById("welcome-form");
  if (welcomeForm) {
    var planName = new URLSearchParams(window.location.search).get("plan");
    if (planName) {
      var planField = document.getElementById("wf-plan");
      var planHeading = document.querySelector("[data-plan-target]");
      if (planField) planField.value = planName;
      if (planHeading) planHeading.textContent = planName;
    }
    bindAjaxForm(
      welcomeForm,
      document.getElementById("welcome-success"),
      document.getElementById("welcome-error")
    );
  }

  /* ---------------- Consultation modal ---------------- */
  var backdrop = document.getElementById("consult-modal");
  if (!backdrop) return;

  var openButtons = document.querySelectorAll("[data-open-consult]");
  var closeButtons = backdrop.querySelectorAll("[data-close-consult]");
  var dialog = backdrop.querySelector(".modal");
  var form = document.getElementById("consult-form");
  var successPanel = document.getElementById("consult-success");
  var errorPanel = document.getElementById("consult-error");
  var lastFocused = null;

  function openModal(event) {
    if (event) event.preventDefault();
    lastFocused = document.activeElement;
    backdrop.removeAttribute("hidden");
    document.body.style.overflow = "hidden";

    // Reset to the form view every time the modal is opened.
    if (form) form.hidden = false;
    if (successPanel) successPanel.hidden = true;
    if (errorPanel) errorPanel.hidden = true;

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

  bindAjaxForm(form, successPanel, errorPanel);
})();
