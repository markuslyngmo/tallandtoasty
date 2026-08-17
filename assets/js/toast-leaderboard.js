(function () {
  "use strict";

  var list = document.getElementById("toast-leaderboard");
  var posts = window.ttPosts;
  if (!list || !posts || !posts.length) return;

  var namespace = "tallandtoasty";

  function setStatus(text) {
    list.innerHTML = "";
    var li = document.createElement("li");
    li.className = "toast-leaderboard-status";
    li.textContent = text;
    list.appendChild(li);
  }

  Promise.all(
    posts.map(function (post) {
      return fetch("https://abacus.jasoncameron.dev/get/" + namespace + "/" + post.slug)
        .then(function (r) { return r.json(); })
        .then(function (data) { return { post: post, count: data.value || 0 }; })
        .catch(function () { return { post: post, count: 0 }; });
    })
  ).then(function (results) {
    var toasted = results.filter(function (r) { return r.count > 0; });
    toasted.sort(function (a, b) { return b.count - a.count; });
    var top = toasted.slice(0, 5);

    if (!top.length) {
      setStatus("Nobody's toasted a post yet — be the first!");
      return;
    }

    list.innerHTML = "";
    var medals = ["🥇", "🥈", "🥉"];

    top.forEach(function (r, i) {
      var li = document.createElement("li");
      li.className = "toast-leaderboard-item";

      var rank = document.createElement("span");
      rank.className = "tl-rank";
      rank.textContent = medals[i] || (i + 1) + ".";

      var link = document.createElement("a");
      link.className = "tl-title";
      link.href = r.post.url;
      link.textContent = r.post.title;

      var count = document.createElement("span");
      count.className = "tl-count";
      count.textContent = "🍞 " + r.count;

      li.appendChild(rank);
      li.appendChild(link);
      li.appendChild(count);
      list.appendChild(li);
    });
  }).catch(function () {
    setStatus("Couldn't load toast counts right now.");
  });
})();
