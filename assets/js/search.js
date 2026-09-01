(function () {
  "use strict";

  var overlay = document.getElementById("search-overlay");
  if (!overlay) return;

  var input = document.getElementById("search-input");
  var resultsEl = document.getElementById("search-results");
  var hintEl = document.getElementById("search-hint");
  var openers = document.querySelectorAll("[data-search-open]");
  var closers = overlay.querySelectorAll("[data-search-close]");

  var posts = null;
  var loading = false;

  function loadPosts(then) {
    if (posts) { then(); return; }
    if (loading) return;
    loading = true;
    fetch("/search.json")
      .then(function (res) { return res.json(); })
      .then(function (data) {
        posts = data;
        loading = false;
        then();
      })
      .catch(function () {
        loading = false;
        hintEl.textContent = "Search is unavailable right now — try again in a bit.";
      });
  }

  function openSearch() {
    overlay.hidden = false;
    document.body.classList.add("search-open-lock");
    loadPosts(function () {});
    input.focus();
  }

  function closeSearch() {
    overlay.hidden = true;
    document.body.classList.remove("search-open-lock");
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function score(post, q) {
    var title = post.title.toLowerCase();
    var tags = (post.tags || []).join(" ").toLowerCase();
    var excerpt = (post.excerpt || "").toLowerCase();
    if (title.indexOf(q) === 0) return 100;
    if (title.indexOf(q) > -1) return 70;
    if (tags.indexOf(q) > -1) return 50;
    if (excerpt.indexOf(q) > -1) return 20;
    return 0;
  }

  function render(matches, q) {
    resultsEl.innerHTML = "";
    if (!q) {
      hintEl.hidden = false;
      hintEl.textContent = "Search through every post on this blog.";
      return;
    }
    hintEl.hidden = true;
    if (!matches.length) {
      var empty = document.createElement("li");
      empty.className = "search-empty";
      empty.textContent = 'No posts match "' + q + '".';
      resultsEl.appendChild(empty);
      return;
    }
    matches.slice(0, 8).forEach(function (post) {
      var li = document.createElement("li");
      var tagsHtml = (post.tags || [])
        .map(function (t) { return '<span class="search-tag">' + escapeHtml(t) + "</span>"; })
        .join("");
      li.innerHTML =
        '<a href="' + post.url + '" class="search-result">' +
        '<span class="search-result-title">' + escapeHtml(post.title) + "</span>" +
        '<span class="search-result-meta"><time>' + escapeHtml(post.date) + "</time>" + tagsHtml + "</span>" +
        "</a>";
      resultsEl.appendChild(li);
    });
  }

  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (!posts) { render([], q); return; }
    if (!q) { render([], q); return; }
    var matches = posts
      .map(function (post) { return { post: post, s: score(post, q) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .map(function (r) { return r.post; });
    render(matches, q);
  }

  openers.forEach(function (btn) {
    btn.addEventListener("click", openSearch);
  });
  closers.forEach(function (btn) {
    btn.addEventListener("click", closeSearch);
  });

  input.addEventListener("input", function () {
    loadPosts(function () { runSearch(input.value); });
  });

  document.addEventListener("keydown", function (e) {
    if (!overlay.hidden && e.key === "Escape") {
      closeSearch();
      return;
    }
    if (overlay.hidden && e.key === "/" ) {
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      openSearch();
    }
  });
})();
