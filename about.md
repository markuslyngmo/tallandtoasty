---
layout: about
title: "About Me"
permalink: /about/
description: "Café owner, runner, and general five-country kid. A few facts about Markus, some of them interactive."
---
<section class="about-hero">
  <div class="about-hero-inner">
    <div class="about-hero-text">
      <h1>🦒 Hi there.<br>I'm Markus.</h1>
      <p>I started baking bread before I was old enough to legally serve it, and never really stopped.</p>
      <p>I've spent the last fourteen years building <a href="https://maps.app.goo.gl/asKFtVdchrPNeq5p8">Baker Hansen</a> from the ground up in Torshov, one 05:50 opening at a time.</p>
      <p>These days, when I'm not behind the till, I'm chasing 5K PRs at Bislett Stadion and slowly turning this blog into a small, weird corner of the internet.</p>
    </div>
    <div class="about-hero-photo-wrap">
      <img class="about-hero-photo" src="{{ '/assets/images/blog/img_1259.jpeg' | relative_url }}" alt="Markus at Bislett Stadion">
    </div>
  </div>
  <svg class="about-cloud" viewBox="0 0 1999 454" preserveAspectRatio="none" aria-hidden="true">
    <path class="cloud-back" d="M824.001 403L875.501 422H1999V63.1446C1977.5 77.3383 1961.18 93.6986 1958 93.5001C1950 93.0001 1946 25.5001 1846 11.5001C1746 -2.49994 1705.5 70.0001 1698.5 69.5001C1691.5 69.0001 1678 -0.499932 1559 0.500068C1440 1.50007 1439.5 117 1432.5 119.5C1425.5 122 1363.5 79.0001 1292 113.5C1220.5 148 1244.5 212 1237.5 216C1230.5 220 1191 172 1106.5 198.5C1022 225 1035 289 1024 291C1013 293 967.001 231.5 875.501 278C784.001 324.5 824.001 403 824.001 403Z"/>
    <path class="cloud-front" d="M1347 413C1365.5 413 1395.5 375 1538.5 375C1681.5 375 1717 404 1729 403.5C1741 403 1752.5 323.5 1914.5 322.5C1947.52 322.296 1975.45 324.357 1999 327.767V453.5H0V393.684C29.7494 380.632 86.3331 368.933 191.5 375C399.5 387 447.5 444 457 444C466.5 444 488 390.5 676 375C864 359.5 931.5 413 940 413C948.5 413 990 340.5 1155.5 346.5C1321 352.5 1328.5 413 1347 413Z"/>
  </svg>
</section>

<div class="about-content">
  <div class="about-grid">
    <div class="about-card reveal">
      <p>I run <a href="https://maps.app.goo.gl/asKFtVdchrPNeq5p8">Baker Hansen</a> at Torshov. Seven days a week, my hands know exactly what a properly proofed loaf feels like.</p>
      <p>I'm also <button class="height-toggle-btn" id="height-toggle" type="button">186cm</button> tall — more or less why this blog is called "tall and toasty." I'm easy to find at the café. I'm the tall one.</p>
      <button class="about-card-btn" id="oven-btn" type="button">🥐 What's fresh right now?</button>
      <p class="about-card-note" id="oven-note"></p>
    </div>

    <div class="about-card reveal">
      <p>My husband Stian runs a café too, so our dinner conversations don't sound like most people's.</p>
      <button class="about-card-btn" id="dinner-btn" type="button">🍽️ Tonight's topic</button>
      <p class="about-card-note" id="dinner-note"></p>
      <p>We're also increasingly arguing over whether a 35mm film camera was a good idea.</p>
      <button class="about-card-btn" id="camera-btn" type="button">🎞️ Good idea or bad idea?</button>
      <p class="about-card-note" id="camera-note"></p>
    </div>

    <div class="about-card span-2 reveal">
      <p>I grew up split between five places — Nittedal, Manila, Vestby, Dar es Salaam, and The Hague — before landing in Oslo fourteen years ago. Not a single stretch of continuous schooling in there.</p>
      <div class="places-chain">
        <span class="place-pill">Nittedal</span><span class="place-arrow">→</span>
        <span class="place-pill">Manila</span><span class="place-arrow">→</span>
        <span class="place-pill">Vestby</span><span class="place-arrow">→</span>
        <span class="place-pill">Dar es Salaam</span><span class="place-arrow">→</span>
        <span class="place-pill">The Hague</span><span class="place-arrow">→</span>
        <span class="place-pill">Oslo</span>
      </div>
      <button class="about-card-btn" id="distance-btn" type="button">📏 Add it all up</button>
      <div class="distance-total" id="distance-total">0 km</div>
      <p class="distance-caption" id="distance-caption"></p>
    </div>

    <div class="about-card reveal">
      <p>When I'm not behind the till, I'm usually chasing a new 5K PR at <a href="https://maps.app.goo.gl/vmjXj41zGhNkkEin8">Bislett Stadion</a>, working through my <a href="{{ '/training-plan/' | relative_url }}">training plan</a>.</p>
      <button class="about-card-btn" id="pr-btn" type="button">⏱️ Reveal my Bislett PR</button>
      <div class="stopwatch-time" id="pr-time">00:00</div>
      <p class="about-card-note" id="pr-note"></p>
    </div>

    <div class="about-card reveal">
      <p>Or unwinding at a sauna somewhere on <a href="{{ '/my-oslo-guide/' | relative_url }}">my Oslo list</a>. I've tried enough of them to have a strong opinion on the ranking.</p>
      <button class="about-card-btn" id="sauna-btn" type="button">🎡 Which sauna tonight?</button>
      <p class="about-card-note" id="sauna-note"></p>
    </div>
  </div>

  <div class="about-outro">
    <p>In short: a kid from five countries who ended up with the most beautiful man in the universe and a bakery that opens at 07:00 sharp. Stop by Baker Hansen sometime, and I'll happily tell you why your pickled red onion is wrong.</p>

    <p>Curious what a given week actually looks like? Check out <a href="{{ '/now/' | relative_url }}">Now</a>, or just come say hi at the café.</p>
  </div>

  <div class="about-explore">
    <h2>Beyond the counter</h2>
    <div class="about-explore-grid">
      <a href="{{ '/now/' | relative_url }}">📍 Now<span>What I'm up to lately</span></a>
      <a href="{{ '/training-plan/' | relative_url }}">🏋️ Training Plan<span>The actual weekly plan</span></a>
      <a href="{{ '/my-oslo-guide/' | relative_url }}">🏙️ My Oslo Guide<span>Cafés, saunas, runs</span></a>
      <a href="{{ '/map/' | relative_url }}">🗺️ Run Map<span>Every run, real GPS</span></a>
    </div>
  </div>
</div>

<script src="{{ '/assets/js/about.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
