---
layout: page
title: "Run Map"
permalink: /map/
---
# 🗺️ Run Map

Every pin is a real run, plotted from the actual GPS start point &mdash; click one to jump to the post about that run.

<div id="run-map"></div>

<script>
  window.runMapPoints = [
    {% for point in site.data.run_map %}
    {"lat": {{ point.lat }}, "lng": {{ point.lng }}, "title": {{ point.title | jsonify }}, "location": {{ point.location | jsonify }}, "url": {{ point.url | relative_url | jsonify }}}{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin="" defer></script>
<script src="{{ '/assets/js/run-map.js' | relative_url }}?v={{ site.time | date: '%s' }}" defer></script>
