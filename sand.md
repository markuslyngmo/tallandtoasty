---
layout: page
title: "Sandbox"
permalink: /sand/
---
# 🏜️ Sandbox

Pour some colored sand and watch it pile up. Click and drag inside the box below (or touch and drag on mobile). Pick a color, pick a brush, go wild.

<div class="sand-toolbar">
  <div class="sand-swatches">
    <button class="sand-swatch active" type="button" data-color="1" style="--swatch-color:#E8C27A" aria-label="Sand"></button>
    <button class="sand-swatch" type="button" data-color="2" style="--swatch-color:#5C3A21" aria-label="Giraffe brown"></button>
    <button class="sand-swatch" type="button" data-color="3" style="--swatch-color:#4A7C59" aria-label="Leaf green"></button>
    <button class="sand-swatch" type="button" data-color="4" style="--swatch-color:#C06014" aria-label="Sunset orange"></button>
    <button class="sand-swatch" type="button" data-color="5" style="--swatch-color:#4A90C0" aria-label="Sky blue"></button>
    <button class="sand-swatch" type="button" data-color="6" style="--swatch-color:#F4EBD0" aria-label="Cream"></button>
  </div>
  <div class="sand-brushes">
    <button class="sand-brush" type="button" data-size="1">Fine</button>
    <button class="sand-brush active" type="button" data-size="2">Medium</button>
    <button class="sand-brush" type="button" data-size="4">Thick</button>
  </div>
  <button class="sand-clear" type="button">🧹 Clear</button>
</div>

<div class="sand-canvas-wrap">
  <canvas id="sand-canvas" aria-label="Falling sand simulator"></canvas>
</div>

*Inspired by [thisissand.com](https://thisissand.com), rebuilt savanna-style.*

<script src="{{ '/assets/js/sand.js' | relative_url }}" defer></script>
