(function () {
  "use strict";

  var canvas = document.getElementById("sand-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d", { alpha: false });

  var COLS = 220;
  var ROWS = 140;
  canvas.width = COLS;
  canvas.height = ROWS;

  var BG = [26, 19, 12];
  var PALETTE = [
    BG,
    [232, 194, 122], // sand
    [92, 58, 33],    // giraffe brown
    [74, 124, 89],   // leaf green
    [192, 96, 20],   // sunset orange
    [74, 144, 192],  // sky blue
    [244, 235, 208]  // cream
  ];

  var grid = new Uint8Array(COLS * ROWS);
  var imageData = ctx.createImageData(COLS, ROWS);

  var currentColor = 1;
  var brushRadius = 2;
  var pointerDown = false;
  var pointerGrid = null;

  function idx(x, y) { return y * COLS + x; }

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
    var data = imageData.data;
    for (var i = 0; i < grid.length; i++) {
      var col = PALETTE[grid[i]] || BG;
      var o = i * 4;
      data[o] = col[0];
      data[o + 1] = col[1];
      data[o + 2] = col[2];
      data[o + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function loop() {
    spawn();
    step();
    render();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

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
