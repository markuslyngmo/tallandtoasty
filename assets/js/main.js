(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  var stored = localStorage.getItem("tt-theme");
  if (stored) root.setAttribute("data-theme", stored);

  function currentIsDark() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function paintToggle() {
    if (!toggle) return;
    toggle.textContent = currentIsDark() ? "🌙 Night" : "☀️ Day";
  }
  paintToggle();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentIsDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("tt-theme", next);
      paintToggle();
    });
  }

  /* ---------- Wrap tables for horizontal scroll on narrow screens ---------- */
  document.querySelectorAll(".page-frame table, main table").forEach(function (table) {
    if (table.parentElement.classList.contains("table-scroll")) return;
    var wrap = document.createElement("div");
    wrap.className = "table-scroll";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Giraffe-spot cursor trail ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && !("ontouchstart" in window)) {
    var lastSpot = 0;
    document.addEventListener("mousemove", function (e) {
      var now = Date.now();
      if (now - lastSpot < 90) return;
      lastSpot = now;
      var spot = document.createElement("span");
      spot.className = "spot-trail";
      spot.textContent = "🟫";
      spot.style.left = e.clientX + (Math.random() * 10 - 5) + "px";
      spot.style.top = e.clientY + (Math.random() * 10 - 5) + "px";
      spot.style.fontSize = 8 + Math.random() * 6 + "px";
      document.body.appendChild(spot);
      setTimeout(function () { spot.remove(); }, 900);
    });
  }

  /* ---------- Easter egg: Konami code stampede ---------- */
  var konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  var progress = 0;
  var animals = ["🦒", "🦓", "🦁", "🐘", "🦏", "🐆"];

  document.addEventListener("keydown", function (e) {
    var key = e.key;
    if (key === konami[progress]) {
      progress++;
      if (progress === konami.length) {
        progress = 0;
        runStampede();
      }
    } else {
      progress = key === konami[0] ? 1 : 0;
    }
  });

  function runStampede() {
    var banner = document.createElement("div");
    banner.className = "stampede-banner";
    banner.textContent = "🦒 You found the safari secret! Stampede incoming...";
    document.body.appendChild(banner);
    setTimeout(function () { banner.remove(); }, 3200);

    for (var i = 0; i < 14; i++) {
      (function (i) {
        setTimeout(function () {
          var animal = document.createElement("span");
          animal.className = "stampede";
          animal.textContent = animals[Math.floor(Math.random() * animals.length)];
          animal.style.bottom = 4 + Math.random() * 60 + "px";
          animal.style.animationDuration = 2 + Math.random() * 1.6 + "s";
          document.body.appendChild(animal);
          setTimeout(function () { animal.remove(); }, 3400);
        }, i * 120);
      })(i);
    }
  }

  /* ---------- Console easter egg ---------- */
  console.log(
    "%c🦒 Hey there, curious developer.",
    "font-size:16px;font-weight:bold;color:#4A7C59;"
  );
  console.log(
    "%cTry the Konami code somewhere on this site: ↑ ↑ ↓ ↓ ← → ← → b a",
    "font-size:12px;color:#C06014;"
  );

  /* ---------- Easter egg: 5x click the logo ---------- */
  var brand = document.querySelector(".brand");
  if (brand) {
    var clicks = 0, clickTimer = null;
    brand.addEventListener("click", function (e) {
      clicks++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(function () { clicks = 0; }, 1500);
      if (clicks >= 5) {
        clicks = 0;
        e.preventDefault();
        var mark = brand.querySelector(".brand-mark");
        if (mark) {
          mark.style.transition = "transform 0.6s ease";
          mark.style.transform = "scale(2.4) rotate(360deg)";
          setTimeout(function () { mark.style.transform = ""; }, 650);
        }
        var banner = document.createElement("div");
        banner.className = "stampede-banner";
        banner.textContent = "🦒 This giraffe has excellent posture. 5 clicks earned!";
        document.body.appendChild(banner);
        setTimeout(function () { banner.remove(); }, 2600);
      }
    });
  }
})();
