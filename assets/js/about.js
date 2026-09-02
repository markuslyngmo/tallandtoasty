(function () {
  "use strict";

  function play(kind) {
    if (window.ttPlaySound) window.ttPlaySound(kind);
  }

  /* ---------- Click ripple on every widget button ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    document.querySelectorAll(".about-card-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 1.3;
        var ripple = document.createElement("span");
        ripple.className = "btn-ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
        btn.appendChild(ripple);
        ripple.addEventListener("animationend", function () { ripple.remove(); });
      });
    });
  }

  /* ---------- Height toggle ---------- */
  var heightBtn = document.getElementById("height-toggle");
  if (heightBtn) {
    var metric = true;
    heightBtn.addEventListener("click", function () {
      metric = !metric;
      heightBtn.textContent = metric ? "186cm" : "6′1″";
      play("click");
    });
  }

  /* ---------- Café: what's fresh ---------- */
  var ovenBtn = document.getElementById("oven-btn");
  var ovenNote = document.getElementById("oven-note");
  if (ovenBtn && ovenNote) {
    var bakes = [
      "Cinnamon buns, first batch, still too hot to eat.",
      "Sourdough loaves, six of them, all pre-ordered.",
      "The last chocolate croissant. It has your name on it.",
      "A tray of cardamom buns cooling by the window.",
      "Nothing yet — ask again in ten minutes.",
      "Rye bread, fresh enough to fog up the display case."
    ];
    var lastBake = -1;
    ovenBtn.addEventListener("click", function () {
      var i;
      do { i = Math.floor(Math.random() * bakes.length); } while (i === lastBake && bakes.length > 1);
      lastBake = i;
      ovenNote.textContent = bakes[i];
      ovenNote.classList.add("filled");
      play("ding");
    });
  }

  /* ---------- Dinner conversation randomizer ---------- */
  var dinnerBtn = document.getElementById("dinner-btn");
  var dinnerNote = document.getElementById("dinner-note");
  if (dinnerBtn && dinnerNote) {
    var topics = [
      "Proofing times for tomorrow's sourdough.",
      "Whether we're short-staffed for Easter week.",
      "Who's opening at 05:50 tomorrow.",
      "Croissant lamination technique, again.",
      "Whether the espresso machine needs descaling.",
      "Staff schedules for next month, already."
    ];
    var lastTopic = -1;
    dinnerBtn.addEventListener("click", function () {
      var i;
      do { i = Math.floor(Math.random() * topics.length); } while (i === lastTopic && topics.length > 1);
      lastTopic = i;
      dinnerNote.textContent = "“" + topics[i] + "”";
      dinnerNote.classList.add("filled");
      play("click");
    });
  }

  /* ---------- Pet Mino ---------- */
  var minoBtn = document.getElementById("pet-mino-btn");
  var pawZone = document.getElementById("paw-zone");
  var minoNote = document.getElementById("mino-note");
  if (minoBtn && pawZone) {
    minoBtn.addEventListener("click", function () {
      for (var i = 0; i < 4; i++) {
        (function (i) {
          setTimeout(function () {
            var paw = document.createElement("span");
            paw.className = "paw-print";
            paw.textContent = "🐾";
            paw.style.left = 6 + i * 22 + Math.random() * 8 + "px";
            pawZone.appendChild(paw);
            setTimeout(function () { paw.remove(); }, 1150);
          }, i * 130);
        })(i);
      }
      if (minoNote) {
        minoNote.textContent = "Mino is Stian's family's rescued street dog. Excellent at looking sad near the pastry case.";
        minoNote.classList.add("filled");
      }
      play("paw");
    });
  }

  /* ---------- Childhood distance counter ---------- */
  var distanceBtn = document.getElementById("distance-btn");
  var distanceTotal = document.getElementById("distance-total");
  var distanceCaption = document.getElementById("distance-caption");
  if (distanceBtn && distanceTotal) {
    var TARGET_KM = 35464;
    var running = false;
    var pills = document.querySelectorAll(".place-pill");
    var arrows = document.querySelectorAll(".place-arrow");
    distanceBtn.addEventListener("click", function () {
      if (running) return;
      running = true;
      play("stamp");
      pills.forEach(function (p) { p.classList.remove("lit"); });
      arrows.forEach(function (a) { a.classList.remove("lit"); });
      var start = null;
      var duration = 1500;
      var lastLit = -1;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min(1, (ts - start) / duration);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(TARGET_KM * eased);
        distanceTotal.textContent = current.toLocaleString("en-US") + " km";

        // Light up each stop on the route as the count-up "travels" past it.
        var litCount = 1 + Math.floor(eased * (pills.length - 1));
        if (litCount !== lastLit) {
          lastLit = litCount;
          pills.forEach(function (p, i) { p.classList.toggle("lit", i < litCount); });
          arrows.forEach(function (a, i) { a.classList.toggle("lit", i < litCount - 1); });
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          running = false;
          pills.forEach(function (p) { p.classList.add("lit"); });
          arrows.forEach(function (a) { a.classList.add("lit"); });
          if (distanceCaption) {
            distanceCaption.textContent = "That's about 88% of the way around the Earth. 🌍";
          }
        }
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- 5K PR stopwatch ---------- */
  var prBtn = document.getElementById("pr-btn");
  var prTime = document.getElementById("pr-time");
  var prNote = document.getElementById("pr-note");
  if (prBtn && prTime) {
    var PR_SECONDS = 22 * 60 + 50;
    var prRunning = false;
    prBtn.addEventListener("click", function () {
      if (prRunning) return;
      prRunning = true;
      play("click");
      var start = null;
      var duration = 1000;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min(1, (ts - start) / duration);
        var eased = 1 - Math.pow(1 - progress, 3);
        var currentSeconds = Math.round(PR_SECONDS * eased);
        var mm = Math.floor(currentSeconds / 60);
        var ss = currentSeconds % 60;
        prTime.textContent = (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          prRunning = false;
          if (prNote) {
            prNote.innerHTML = '24 Jul 2026 at Bislett Stadion — <a href="/new-5k-pr-at-bislett-stadion/">read about it</a>';
            prNote.classList.add("filled");
          }
        }
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Sauna spinner ---------- */
  var saunaBtn = document.getElementById("sauna-btn");
  var saunaNote = document.getElementById("sauna-note");
  if (saunaBtn && saunaNote) {
    var saunas = [
      { name: "Sukkerbiten", line: "The one I recommend first, every time." },
      { name: "Salt Sauna", line: "Best for that post-plunge euphoric feeling." },
      { name: "Sagene Folkebad", line: "My pick for a proper winter session." }
    ];
    var spinning = false;
    saunaBtn.addEventListener("click", function () {
      if (spinning) return;
      spinning = true;
      play("click");
      var ticks = 0;
      var maxTicks = 9;
      var interval = setInterval(function () {
        var flash = saunas[Math.floor(Math.random() * saunas.length)];
        saunaNote.textContent = flash.name + " …";
        saunaNote.classList.add("filled");
        ticks++;
        if (ticks >= maxTicks) {
          clearInterval(interval);
          var pick = saunas[Math.floor(Math.random() * saunas.length)];
          saunaNote.innerHTML = "<strong>" + pick.name + "</strong> — " + pick.line + ' <a href="/how-i-rank-oslos-saunas/">See the full ranking →</a>';
          spinning = false;
        }
      }, 90);
    });
  }

  /* ---------- Film camera coin flip ---------- */
  var cameraBtn = document.getElementById("camera-btn");
  var cameraNote = document.getElementById("camera-note");
  if (cameraBtn && cameraNote) {
    cameraBtn.addEventListener("click", function () {
      var good = Math.random() < 0.5;
      cameraNote.textContent = good ? "GOOD IDEA 🎉" : "BAD IDEA 😅";
      cameraNote.className = "about-card-note filled coin-result " + (good ? "good" : "bad");
      play("coin");
    });
  }
})();
