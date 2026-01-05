---
layout: layouts/post.njk
title: This is a Draft Post
date: 2026-01-05
author: Nick Ryberg
draft: true
excerpt: This post is marked as a draft and will only appear when running with the drafts flag enabled.
---

This is a sample draft post to demonstrate the drafts feature.

## Draft Functionality

When you mark a post with `draft: true` in the frontmatter, it will be excluded from the production build but can be previewed locally using:

```bash
npm run start:drafts
```

## Why Use Drafts?

- Work on posts before they're ready to publish
- Preview content locally without deploying
- Keep your blog organized with work-in-progress posts

This post won't appear on the live site unless you deploy with the DRAFTS flag enabled.
