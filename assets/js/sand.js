(function () {
  "use strict";

  var canvas = document.getElementById("sand-canvas");
  if (!canvas) return;
  var wrap = canvas.parentElement;
  var ctx = canvas.getContext("2d", { alpha: false });

  var CELL = 5; // grain size in CSS pixels
  var ASPECT = 0.62; // canvas height / width

  var BG = "rgb(26,19,12)";
  var PALETTE = [
    BG,
    "rgb(232,194,122)", // sand
    "rgb(92,58,33)",    // giraffe brown
    "rgb(74,124,89)",   // leaf green
    "rgb(192,96,20)",   // sunset orange
    "rgb(74,144,192)",  // sky blue
    "rgb(244,235,208)"  // cream
  ];

  var COLS, ROWS, grid;
  var currentColor = 1;
  var brushRadius = 2;
  var pointerDown = false;
  var pointerGrid = null;
  var lastWrapWidth = 0;

  function idx(x, y) { return y * COLS + x; }

  function resize() {
    var wrapWidth = Math.floor(wrap.clientWidth);
    if (Math.abs(wrapWidth - lastWrapWidth) < 8) return;
    lastWrapWidth = wrapWidth;

    COLS = Math.max(40, Math.floor(wrapWidth / CELL));
    ROWS = Math.max(24, Math.round(COLS * ASPECT));

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.width = (COLS * CELL) + "px";
    canvas.style.height = (ROWS * CELL) + "px";
    canvas.width = Math.round(COLS * CELL * dpr);
    canvas.height = Math.round(ROWS * CELL * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    grid = new Uint8Array(COLS * ROWS);
  }

  function step() {
    for (var y = ROWS - 2; y >= 0; y--) {
      var leftToRight = Math.random() < 0.5;
      for (var i = 0; i < COLS; i++) {
        var x = leftToRight ? i : COLS - 1 - i;
        var c = grid[idx(x, y)];
        if (!c) continue;

        var below = idx(x, y + 1);
        if (!grid[below]) {
          grid[below] = c;
          grid[idx(x, y)] = 0;
          continue;
        }

        var dir = Math.random() < 0.5 ? -1 : 1;
        var bx1 = x + dir;
        var bx2 = x - dir;
        if (bx1 >= 0 && bx1 < COLS && !grid[idx(bx1, y + 1)]) {
          grid[idx(bx1, y + 1)] = c;
          grid[idx(x, y)] = 0;
          continue;
        }
        if (bx2 >= 0 && bx2 < COLS && !grid[idx(bx2, y + 1)]) {
          grid[idx(bx2, y + 1)] = c;
          grid[idx(x, y)] = 0;
        }
      }
    }
  }

  function spawn() {
    if (!pointerDown || !pointerGrid) return;
    var cx = pointerGrid.x;
    var cy = pointerGrid.y;
    var r = brushRadius;
    for (var dy = -r; dy <= r; dy++) {
      for (var dx = -r; dx <= r; dx++) {
        if (dx * dx + dy * dy > r * r) continue;
        if (Math.random() > 0.5) continue;
        var x = cx + dx;
        var y = cy + dy;
        if (x < 0 || x >= COLS || y < 0 || y >= ROWS) continue;
        if (!grid[idx(x, y)]) grid[idx(x, y)] = currentColor;
      }
    }
  }

  function render() {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
    for (var y = 0; y < ROWS; y++) {
      for (var x = 0; x < COLS; x++) {
        var c = grid[idx(x, y)];
        if (!c) continue;
        ctx.fillStyle = PALETTE[c] || BG;
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }
  }

  function loop() {
    spawn();
    step();
    render();
    requestAnimationFrame(loop);
  }

  resize();
  requestAnimationFrame(loop);

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  function getGridPos(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = COLS / rect.width;
    var scaleY = ROWS / rect.height;
    return {
      x: Math.floor((clientX - rect.left) * scaleX),
      y: Math.floor((clientY - rect.top) * scaleY)
    };
  }

  function pointerMove(clientX, clientY) {
    pointerGrid = getGridPos(clientX, clientY);
  }

  canvas.addEventListener("mousedown", function (e) {
    pointerDown = true;
    pointerMove(e.clientX, e.clientY);
  });
  window.addEventListener("mouseup", function () { pointerDown = false; });
  canvas.addEventListener("mousemove", function (e) {
    pointerMove(e.clientX, e.clientY);
  });
  canvas.addEventListener("mouseleave", function () { pointerGrid = null; });

  canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    pointerDown = true;
    var t = e.touches[0];
    pointerMove(t.clientX, t.clientY);
  }, { passive: false });
  canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var t = e.touches[0];
    pointerMove(t.clientX, t.clientY);
  }, { passive: false });
  canvas.addEventListener("touchend", function () { pointerDown = false; });
  canvas.addEventListener("touchcancel", function () { pointerDown = false; });

  var swatches = document.querySelectorAll(".sand-swatch");
  for (var s = 0; s < swatches.length; s++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        currentColor = parseInt(btn.getAttribute("data-color"), 10);
        for (var j = 0; j < swatches.length; j++) swatches[j].classList.remove("active");
        btn.classList.add("active");
      });
    })(swatches[s]);
  }

  var brushBtns = document.querySelectorAll(".sand-brush");
  for (var b = 0; b < brushBtns.length; b++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        brushRadius = parseInt(btn.getAttribute("data-size"), 10);
        for (var j = 0; j < brushBtns.length; j++) brushBtns[j].classList.remove("active");
        btn.classList.add("active");
      });
    })(brushBtns[b]);
  }

  var clearBtn = document.querySelector(".sand-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", function () { grid.fill(0); });
  }
})();
