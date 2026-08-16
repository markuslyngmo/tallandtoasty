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

  /* ---------- Toast this post — real shared count via abacus.jasoncameron.dev ---------- */
  var btn = document.querySelector(".toast-btn");
  if (btn) {
    var slug = btn.getAttribute("data-slug");
    var namespace = "tallandtoasty";
    var toastedKey = "tt-toast-" + slug;
    var toasted = localStorage.getItem(toastedKey) === "1";
    var count = null;

    function paint() {
      var countEl = btn.querySelector(".toast-count");
      if (countEl) countEl.textContent = count === null ? "" : "(" + count + ")";
      btn.classList.toggle("toasted", toasted);
      btn.setAttribute("aria-pressed", toasted ? "true" : "false");
    }
    paint();

    fetch("https://abacus.jasoncameron.dev/get/" + namespace + "/" + slug)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        count = data.value || 0;
        paint();
      })
      .catch(function () { /* counter service unreachable, fail quietly */ });

    btn.addEventListener("click", function () {
      if (toasted) return;
      toasted = true;
      localStorage.setItem(toastedKey, "1");
      paint();
      burstConfetti(btn);

      fetch("https://abacus.jasoncameron.dev/hit/" + namespace + "/" + slug)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          count = data.value;
          paint();
        })
        .catch(function () { /* keep optimistic local state if the request fails */ });
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
