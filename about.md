---
layout: page
title: "About Me"
permalink: /about/
description: "Café owner, runner, and general five-country kid. A few facts about Markus, some of them interactive."
---
<div class="about-intro">
  <img class="about-photo" src="{{ '/assets/images/blog/img_1259.jpeg' | relative_url }}" alt="Markus at Bislett Stadion">
  <div>
    <h1>🦒 Hi there. I'm Markus.</h1>
    <p>Café owner, runner, and general five-country kid. A few facts about me — some of them interactive.</p>
  </div>
</div>

<div class="about-fact">
  <div class="about-fact-text">
    <p>I run <a href="https://maps.app.goo.gl/asKFtVdchrPNeq5p8">Baker Hansen</a> at Torshov. Seven days a week, my hands know exactly what a properly proofed loaf feels like.</p>
  </div>
  <div class="about-fact-widget">
    <div class="about-widget">
      <button class="about-widget-btn" id="oven-btn" type="button">🥐 What's fresh right now?</button>
      <p class="about-widget-note" id="oven-note"></p>
    </div>
  </div>
</div>

<div class="about-fact">
  <p>I'm <button class="height-toggle-btn" id="height-toggle" type="button">186cm</button> tall — which is more or less why this blog is called "tall and toasty." I'm easy to find at the café. I'm the tall one.</p>
</div>

<div class="about-fact">
  <div class="about-fact-text">
    <p>My husband Stian runs a café too, so our dinner conversations don't sound like most people's.</p>
  </div>
  <div class="about-fact-widget">
    <div class="about-widget">
      <button class="about-widget-btn" id="dinner-btn" type="button">🍽️ Tonight's topic</button>
      <p class="about-widget-note" id="dinner-note"></p>
    </div>
  </div>
</div>

<div class="about-fact">
  <div class="about-fact-text">
    <p>We also share custody of Mino, Stian's family's rescued street dog, who has strong opinions about pastry.</p>
  </div>
  <div class="about-fact-widget">
    <div class="about-widget">
      <button class="about-widget-btn" id="pet-mino-btn" type="button">🐾 Pet Mino</button>
      <div class="paw-trail-zone" id="paw-zone"></div>
      <p class="about-widget-note" id="mino-note"></p>
    </div>
  </div>
</div>

<div class="about-fact">
  <div class="about-fact-text">
    <p>I grew up split between five places — Nittedal, Manila, Vestby, Dar es Salaam, and The Hague — before landing in Oslo fourteen years ago. Not a single stretch of continuous schooling in there.</p>
  </div>
  <div class="about-fact-widget">
    <div class="about-widget">
      <div class="places-chain">
        <span class="place-pill">Nittedal</span><span class="place-arrow">→</span>
        <span class="place-pill">Manila</span><span class="place-arrow">→</span>
        <span class="place-pill">Vestby</span><span class="place-arrow">→</span>
        <span class="place-pill">Dar es Salaam</span><span class="place-arrow">→</span>
        <span class="place-pill">The Hague</span><span class="place-arrow">→</span>
        <span class="place-pill">Oslo</span>
      </div>
      <button class="about-widget-btn" id="distance-btn" type="button">📏 Add it all up</button>
      <div class="distance-total" id="distance-total">0 km</div>
      <p class="distance-caption" id="distance-caption"></p>
    </div>
  </div>
</div>

<div class="about-fact">
  <div class="about-fact-text">
    <p>When I'm not behind the till, I'm usually chasing a new 5K PR at <a href="https://maps.app.goo.gl/vmjXj41zGhNkkEin8">Bislett Stadion</a>, working through my <a href="{{ '/training-plan/' | relative_url }}">training plan</a>.</p>
  </div>
  <div class="about-fact-widget">
    <div class="about-widget">
      <button class="about-widget-btn" id="pr-btn" type="button">⏱️ Reveal my Bislett PR</button>
      <div class="stopwatch-time" id="pr-time">00:00</div>
      <p class="about-widget-note" id="pr-note"></p>
    </div>
  </div>
</div>

<div class="about-fact">
  <div class="about-fact-text">
    <p>Or unwinding at a sauna somewhere on <a href="{{ '/my-oslo-guide/' | relative_url }}">my Oslo list</a>. I've tried enough of them to have a strong opinion on the ranking.</p>
  </div>
  <div class="about-fact-widget">
    <div class="about-widget">
      <button class="about-widget-btn" id="sauna-btn" type="button">🎡 Which sauna tonight?</button>
      <p class="about-widget-note" id="sauna-note"></p>
    </div>
  </div>
</div>

<div class="about-fact">
  <div class="about-fact-text">
    <p>Stian and I are also increasingly arguing over whether a 35mm film camera was a good idea.</p>
  </div>
  <div class="about-fact-widget">
    <div class="about-widget">
      <button class="about-widget-btn" id="camera-btn" type="button">🎞️ Good idea or bad idea?</button>
      <p class="about-widget-note" id="camera-note"></p>
    </div>
  </div>
</div>

<p>In short: a kid from five countries who ended up with the most beautiful man in the universe, a rescue dog, and a bakery that opens at 07:00 sharp. Stop by Baker Hansen sometime, and I'll happily tell you why your pickled red onion is wrong.</p>

<p>Curious what a given week actually looks like? Check out <a href="{{ '/now/' | relative_url }}">Now</a>, or just come say hi at the café.</p>

<div class="about-explore">
  <h2>Beyond the counter</h2>
  <div class="about-explore-grid">
    <a href="{{ '/now/' | relative_url }}">📍 Now<span>What I'm up to lately</span></a>
    <a href="{{ '/training-plan/' | relative_url }}">🏋️ Training Plan<span>The actual weekly plan</span></a>
    <a href="{{ '/my-oslo-guide/' | relative_url }}">🏙️ My Oslo Guide<span>Cafés, saunas, runs</span></a>
    <a href="{{ '/map/' | relative_url }}">🗺️ Run Map<span>Every run, real GPS</span></a>
  </div>
</div>

<script src="{{ '/assets/js/about.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
