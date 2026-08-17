---
layout: page
title: "Videos"
permalink: /videos/
---
# 🎥 Videos

Clips from running, café life, and whatever else ends up on camera. Click a thumbnail to play &mdash; nothing loads from YouTube until you do. More on the <a href="https://www.youtube.com/@MarkusLyngmo" target="_blank" rel="noopener">YouTube channel</a>.

<div class="video-grid">
  {% for video in site.data.videos %}
  <div class="video-card" data-video-id="{{ video.id }}">
    <button class="video-thumb" type="button" style="background-image:url('https://i.ytimg.com/vi/{{ video.id }}/hqdefault.jpg')" aria-label="Play {{ video.title }}">
      <span class="video-play-btn">&#9658;</span>
    </button>
    <p class="video-title">{{ video.title }}</p>
  </div>
  {% else %}
  <p class="video-empty">No videos added yet &mdash; check back soon.</p>
  {% endfor %}
</div>

<script src="{{ '/assets/js/video-embed.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
