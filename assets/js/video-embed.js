(function () {
  "use strict";

  var thumbs = document.querySelectorAll(".video-thumb");
  thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      var card = thumb.closest(".video-card");
      var id = card.getAttribute("data-video-id");
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1";
      iframe.title = card.querySelector(".video-title") ? card.querySelector(".video-title").textContent : "YouTube video";
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.className = "video-iframe";
      thumb.replaceWith(iframe);
    });
  });
})();
