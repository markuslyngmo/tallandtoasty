---
layout: page
title: Blog
permalink: /blog/
---
# 📝 Blog

Mostly early morning runs, café life, saunas, and the occasional trip.

{% assign recent_posts = site.posts | slice: 0, 7 %}
{% for post in recent_posts %}
<article class="full-post">
  <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
  <p class="post-meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b, %Y" }}</time></p>
  {{ post.content }}
</article>
{% endfor %}

{% assign older_posts = site.posts | slice: 7, 100 %}
{% if older_posts.size > 0 %}
<div class="section-label">Older posts</div>
{% assign posts_by_year = older_posts | group_by_exp: "post", "post.date | date: '%Y'" %}
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
{% endif %}
