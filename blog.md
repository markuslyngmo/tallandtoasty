---
layout: page
title: Blog
permalink: /blog/
---
# 📝 Blog

Mostly early morning runs, café life, saunas, and the occasional trip.

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in posts_by_year %}
<div class="blog-year">{{ year.name }}</div>
<ul class="blog-posts">
  {% for post in year.items %}
  <li>
    <time>{{ post.date | date: "%d %b" }}</time>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>
{% endfor %}
