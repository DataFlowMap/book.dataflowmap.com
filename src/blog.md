---
layout: layouts/page.njk
title: Blog
description: Insights on data analysis, visualization, and thinking about data flow
permalink: /blog/
---

## Latest Posts

{% if collections.posts.length > 0 %}
<div class="blog-list">
{% for post in collections.posts %}
<article class="blog-preview">
<h3 class="blog-preview-title">
<a href="{{ post.url }}">{{ post.data.title }}</a>
</h3>
<div class="blog-preview-meta">
<time datetime="{{ post.date }}">{{ post.date | readableDate }}</time>
{% if post.data.author %}
<span class="blog-preview-author">by {{ post.data.author }}</span>
{% endif %}
</div>
{% if post.data.excerpt %}
<p class="blog-preview-excerpt">{{ post.data.excerpt }}</p>
{% endif %}
<a href="{{ post.url }}" class="read-more">Read more →</a>
</article>
{% endfor %}
</div>
{% else %}
<p>No blog posts yet. Check back soon!</p>
{% endif %}
