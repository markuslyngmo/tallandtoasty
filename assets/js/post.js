(function () {
  "use strict";

  /* ---------- Reading progress: giraffe running along the top ---------- */
  var fill = document.querySelector(".progress-track .fill");
  var runner = document.querySelector(".progress-track .runner");

  function updateProgress() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var height = doc.scrollHeight - doc.clientHeight;
    var pct = height > 0 ? (scrollTop / height) * 100 : 0;
    if (fill) fill.style.width = pct + "%";
    if (runner) runner.style.left = pct + "%";
  }
  if (fill || runner) {
    document.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- Toast this post ---------- */
  var btn = document.querySelector(".toast-btn");
  if (btn) {
    var slug = btn.getAttribute("data-slug");
    var key = "tt-toast-" + slug;
    var toasted = localStorage.getItem(key) === "1";
    var countKey = "tt-toast-count-" + slug;
    var baseCount = parseInt(btn.getAttribute("data-base-count") || "0", 10);
    var count = parseInt(localStorage.getItem(countKey) || baseCount, 10);

    function paint() {
      var countEl = btn.querySelector(".toast-count");
      if (countEl) countEl.textContent = "(" + count + ")";
      btn.classList.toggle("toasted", toasted);
      btn.setAttribute("aria-pressed", toasted ? "true" : "false");
    }
    paint();

    btn.addEventListener("click", function () {
      if (toasted) return;
      toasted = true;
      count++;
      localStorage.setItem(key, "1");
      localStorage.setItem(countKey, String(count));
      paint();
      burstConfetti(btn);
    });
  }

  function burstConfetti(origin) {
    var rect = origin.getBoundingClientRect();
    var emojis = ["🍞", "🔥", "🧡"];
    for (var i = 0; i < 16; i++) {
      var piece = document.createElement("span");
      piece.textContent = emojis[i % emojis.length];
      piece.style.position = "fixed";
      piece.style.left = rect.left + rect.width / 2 + "px";
      piece.style.top = rect.top + "px";
      piece.style.fontSize = 14 + Math.random() * 10 + "px";
      piece.style.pointerEvents = "none";
      piece.style.zIndex = 9999;
      piece.style.transition = "transform 0.9s cubic-bezier(.2,.8,.3,1), opacity 0.9s ease";
      document.body.appendChild(piece);
      var angle = Math.random() * Math.PI - Math.PI / 2 - Math.PI / 2;
      var dist = 60 + Math.random() * 90;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist - 40;
      requestAnimationFrame(function (p, dx, dy) {
        return function () {
          p.style.transform = "translate(" + dx + "px," + dy + "px) rotate(" + (Math.random() * 360) + "deg)";
          p.style.opacity = "0";
        };
      }(piece, dx, dy));
      (function (p) { setTimeout(function () { p.remove(); }, 950); })(piece);
    }
  }
})();
