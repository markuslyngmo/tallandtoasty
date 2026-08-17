(function () {
  "use strict";

  var mapEl = document.getElementById("run-map");
  var points = window.runMapPoints;
  if (!mapEl || !points || !points.length || typeof L === "undefined") return;

  var map = L.map(mapEl, { scrollWheelZoom: false }).setView([points[0].lat, points[0].lng], 13);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
    subdomains: "abcd"
  }).addTo(map);

  var runIcon = L.divIcon({
    className: "run-map-marker",
    html: "👟",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });

  var bounds = [];
  points.forEach(function (p) {
    var marker = L.marker([p.lat, p.lng], { icon: runIcon }).addTo(map);
    var popupHtml =
      "<strong>" + p.title + "</strong>" +
      (p.location ? "<br>" + p.location : "") +
      '<br><a href="' + p.url + '">Read the post &rarr;</a>';
    marker.bindPopup(popupHtml);
    bounds.push([p.lat, p.lng]);
  });

  if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }
})();
