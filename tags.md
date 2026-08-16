---
layout: page
title: "Tags"
permalink: /tags/
---
# 🏷️ Browse by topic

<div class="tag-cloud">
  {% assign sorted_tags = site.tags | sort %}
  {% for tag in sorted_tags %}
    <a class="tag-pill" href="{{ '/tags/' | append: tag[0] | relative_url | append: '/' }}">
      {{ tag[0] }} <span class="tag-count">{{ tag[1].size }}</span>
    </a>
  {% endfor %}
</div>
