---
layout: layouts/base.njk
title: Home
---

<section class="hero">
  <div class="container">
    <h1>{{ site.title }}</h1>
    <p class="subtitle">{{ site.subtitle }}</p>
    <p class="description">{{ site.description }}</p>
    <div class="cta-buttons">
      <a href="{{ site.purchaseLinks.amazon }}" class="btn btn-primary" target="_blank" rel="noopener">Buy on Amazon</a>
      <a href="/about/" class="btn btn-secondary">Learn More</a>
    </div>
  </div>
</section>

<section class="page-content">
  <div class="container">

## A Universal Framework for Data Analysis

Whether you're working in spreadsheets, databases, or AI models, you'll learn how to elevate your analytical skills, tell compelling stories, and align your team for smarter decisions.

<div class="features-grid">
<div class="feature">
<h3>Elevated Analytic Thinking</h3>
<p>Move beyond tool-specific approaches to develop a universal mental model for data analysis that works across any platform.</p>
</div>
<div class="feature">
<h3>Three Core Motions</h3>
<p>Master the framework's three essential movements—source, focus, build—along with the section tagging action to simplify complexity.</p>
</div>
<div class="feature">
<h3>Practical Applications</h3>
<p>Apply concepts to real data using Python, SQL, and Excel with hands-on examples and practical demonstrations.</p>
</div>
</div>

## Who This Book Is For

Aspiring data professionals and experienced analysts alike—from beginners to seasoned data engineers focused on data collection, analysis, and decision making.

- Data analysts looking to communicate more effectively
- Business professionals working with data
- Engineers transitioning between platforms
- Anyone wanting to think more clearly about data

{% include "partials/cta.njk" %}

  </div>
</section>
