---
layout: full
title: "About Me"
permalink: /about/
description: "Café owner, runner, and a kid who grew up in five different places. A few facts about Markus, some of them interactive."
---
<section class="dark-hero">
  <div class="dark-hero-inner">
    <div class="dark-hero-text">
      <h1>🦒 Hi there.<br>I'm Markus.</h1>
      <p>I've been running cafés for twelve years. Since 2024, that's been <a href="https://maps.app.goo.gl/asKFtVdchrPNeq5p8">Baker Hansen on Vogts gate</a>.</p>
      <p>I've lived in Oslo for fourteen years, after growing up in five different places.</p>
      <p>When I'm not behind the till, I'm chasing 5K PRs at Bislett Stadion, trying saunas around the city, and writing about it here.</p>
    </div>
    <div class="dark-hero-photo-wrap">
      <img class="dark-hero-photo" src="{{ '/assets/images/blog/img_1259.jpeg' | relative_url }}" alt="Markus at Bislett Stadion">
    </div>
  </div>
</section>

<div class="content-wrap">
  <div class="about-grid">
    <div class="about-card reveal">
      <p>I run <a href="https://maps.app.goo.gl/asKFtVdchrPNeq5p8">Baker Hansen</a> on Vogts gate. We open at 07:00, so my days start early.</p>
      <p>I'm also <button class="height-toggle-btn" id="height-toggle" type="button">186cm</button> tall. That's more or less where the name "tall and toasty" comes from. I'm easy to find at the café. I'm the tall one.</p>
      <button class="about-card-btn" id="oven-btn" type="button">🥐 What's fresh right now?</button>
      <p class="about-card-note" id="oven-note"></p>
    </div>

    <div class="about-card reveal">
      <p>My husband Stian runs a café too. So yes, we talk about work at dinner. A lot.</p>
      <button class="about-card-btn" id="dinner-btn" type="button">🍽️ Tonight's topic</button>
      <p class="about-card-note" id="dinner-note"></p>
      <p>We also argue more and more about whether a 35mm film camera was a good idea.</p>
      <button class="about-card-btn" id="camera-btn" type="button">🎞️ Good idea or bad idea?</button>
      <p class="about-card-note" id="camera-note"></p>
    </div>

    <div class="about-card span-2 reveal">
      <p>I grew up in five places: Nittedal, Manila, Vestby, Dar es Salaam and The Hague. Then I moved to Oslo fourteen years ago. I never got to stay at one school for long.</p>
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
      <p>When I'm not at work I'm usually at <a href="https://maps.app.goo.gl/vmjXj41zGhNkkEin8">Bislett Stadion</a> trying to beat my 5K PR, or following my <a href="{{ '/training-plan/' | relative_url }}">training plan</a>.</p>
      <button class="about-card-btn" id="pr-btn" type="button">⏱️ Reveal my Bislett PR</button>
      <div class="stopwatch-time" id="pr-time">00:00</div>
      <p class="about-card-note" id="pr-note"></p>
    </div>

    <div class="about-card reveal">
      <p>Or I'm in a sauna. I've tried enough of the ones on <a href="{{ '/my-oslo-guide/' | relative_url }}">my Oslo list</a> to have strong opinions about which is best.</p>
      <button class="about-card-btn" id="sauna-btn" type="button">🎡 Which sauna tonight?</button>
      <p class="about-card-note" id="sauna-note"></p>
    </div>
  </div>

  <div class="about-outro">
    <p>In short: a kid from five different places who ended up with the most beautiful man in the universe and a bakery that opens at 07:00 sharp. Stop by Baker Hansen sometime, and I'll happily tell you why your pickled red onion is wrong.</p>

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
