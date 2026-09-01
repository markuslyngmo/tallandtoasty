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
      playSound("switch");
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

  /* ---------- Sound engine (synthesized, no audio files) ---------- */
  var soundToggle = document.querySelector(".sound-toggle");
  var soundMuted = localStorage.getItem("tt-sound") === "off";
  var audioCtx = null;

  function ensureAudioCtx() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone(ctx, t, freqFrom, freqTo, gainPeak, duration) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freqFrom, t);
    osc.frequency.exponentialRampToValueAtTime(freqTo, t + duration * 0.8);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(gainPeak, t + duration * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  function noiseClick(ctx, t, freq, gainPeak, duration) {
    var size = Math.max(1, Math.floor(ctx.sampleRate * duration));
    var buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
    var noise = ctx.createBufferSource();
    noise.buffer = buffer;
    var filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = freq;
    filter.Q.value = 1.1;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(gainPeak, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(t);
    noise.stop(t + duration + 0.01);
  }

  // Plays regardless of the mute setting — used only for the sound toggle's own feedback.
  function playRaw(kind) {
    var ctx = ensureAudioCtx();
    if (!ctx) return;
    try {
      var t = ctx.currentTime;
      if (kind === "click") {
        tone(ctx, t, 720, 320, 0.09, 0.09);
      } else if (kind === "search") {
        tone(ctx, t, 520, 900, 0.08, 0.09);
      } else if (kind === "toggle-on") {
        tone(ctx, t, 500, 780, 0.08, 0.07);
        tone(ctx, t + 0.06, 780, 1040, 0.07, 0.07);
      } else if (kind === "toggle-off") {
        tone(ctx, t, 420, 220, 0.07, 0.09);
      } else if (kind === "switch") {
        // A light switch flick: a sharp click, then a slightly duller settle.
        noiseClick(ctx, t, 1500, 0.12, 0.014);
        noiseClick(ctx, t + 0.05, 850, 0.1, 0.022);
      }
    } catch (e) { /* ignore */ }
  }

  function playSound(kind) {
    if (soundMuted) return;
    playRaw(kind);
  }
  window.ttPlaySound = playSound;

  function paintSoundToggle() {
    if (!soundToggle) return;
    soundToggle.textContent = soundMuted ? "🔇" : "🔊";
    soundToggle.classList.toggle("is-muted", soundMuted);
    soundToggle.setAttribute("aria-label", soundMuted ? "Unmute click sound" : "Mute click sound");
  }
  paintSoundToggle();

  if (soundToggle) {
    soundToggle.addEventListener("click", function () {
      var turningOn = soundMuted;
      soundMuted = !soundMuted;
      localStorage.setItem("tt-sound", soundMuted ? "off" : "on");
      paintSoundToggle();
      // Always audible, even when muting — it's the direct confirmation for this button.
      playRaw(turningOn ? "toggle-on" : "toggle-off");
    });
  }

  document.addEventListener("click", function (e) {
    if (soundMuted) return;
    var link = e.target.closest && e.target.closest("a[href]");
    if (!link || e.defaultPrevented) return;

    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      playSound("click");
      return;
    }

    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#") {
      playSound("click");
      return;
    }
    if (link.target === "_blank" || link.hasAttribute("download") || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) {
      playSound("click");
      return;
    }

    // Same-tab navigation: play the sound, then give it a beat to be heard before leaving the page.
    e.preventDefault();
    playSound("click");
    var dest = link.href;
    setTimeout(function () { window.location.href = dest; }, 110);
  });

  /* ---------- Easter egg: 5x click the logo ---------- */
  var brand = document.querySelector(".brand");
  if (brand) {
    var brandHref = brand.getAttribute("href");
    var clicks = 0, clickTimer = null, navTimer = null;
    brand.addEventListener("click", function (e) {
      e.preventDefault();
      clicks++;
      clearTimeout(clickTimer);
      clearTimeout(navTimer);
      clickTimer = setTimeout(function () { clicks = 0; }, 1500);

      if (clicks >= 5) {
        clicks = 0;
        clearTimeout(clickTimer);
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
      } else {
        // Give more clicks a moment to arrive before navigating home like a normal logo click.
        navTimer = setTimeout(function () {
          window.location.href = brandHref;
        }, 350);
      }
    });
  }
})();
