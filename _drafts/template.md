---
layout: post
title: "POST TITLE HERE"
date: 2026-08-17T07:00 +0000
slug: post-title-here
tags: [running]
---
<!--
HVORDAN BRUKE DENNE MALEN
1. Kopier denne filen til _posts/-mappen og gi den navnet:
   YYYY-MM-DD-post-title-here.md
   Datoen i filnavnet må starte likt som "date:" over (år-måned-dag),
   og "post-title-here" bør matche "slug:".
2. Fyll inn tittel, dato og tags.
   Eksisterende tags (bruk gjerne samme for konsistens):
   café, food, gear, life, oslo, running, sauna, travel
   Du kan sette flere, f.eks. tags: [running, oslo]
3. Bytt ut bildet under med et ekte bilde fra /assets/images/blog/
   (eller slett bilde-linjen hvis posten ikke skal ha hovedbilde).
4. Skriv teksten din i avsnittene under.
5. Valgfritt: behold Strava-embedden nederst hvis det er en løpetur
   — bytt ut data-embed-id og data-token med dine egne fra Stravas
   embed-kode. Slett hele <div>-en hvis den ikke trengs.
6. Valgfritt: behold training-stat-boksen hvis du har konkrete
   puls/sone-tall fra økta (se tipset om å koble poster til
   Training Plan-siden). Fjern den hvis ikke aktuelt.
7. Slett HELE denne kommentarblokken (fra <!-- til -->) før du
   publiserer.
-->

![beskrivelse av bildet](/assets/images/blog/BILDENAVN.jpeg)

Skriv innledningen her — hva skjedde, hvordan følte det seg.

Mer tekst her — detaljer, refleksjoner, hva som var bra eller tøft.

<!-- Strava-embed (valgfritt, for løpeturer) -->
<div class="strava-embed-placeholder" data-embed-type="activity" data-embed-id="DITT_ACTIVITY_ID" data-style="standard" data-from-embed="false" data-token="DIN_TOKEN"></div>

<!-- Training stat-boks (valgfritt, hvis du har konkrete tall) -->
{% include training-stat.html zone="Zone 4" range="157–169 BPM" avg="163 BPM" peak="171 BPM" time="15 min" pace="4x4 min @ 14.2 km/h" note="valgfri kort kommentar" %}
