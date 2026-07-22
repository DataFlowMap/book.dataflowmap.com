# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies (Node.js 18+ required)
npm start            # Dev server at http://localhost:8080
npm run build        # Build to _site/
```

**Preview draft posts:**
```bash
npm run start:drafts
```

There are no tests or linting configured.

## Architecture

This is an [Eleventy](https://www.11ty.dev/) static site for "The Data Flow Map" book by Nick Ryberg. Built output goes to `_site/`, deployed via Netlify.

**Key config:** `.eleventy.js` — defines the `posts` collection (filtered by `DRAFTS` env var, sorted newest-first), the `readableDate` filter, passes through `src/css` and `src/images`, and sets `src/` as input.

**Environment variables:**
- `DRAFTS=true` — includes posts with `draft: true` in frontmatter

**Global site data:** `src/_data/site.json` — single source of truth for title, author, purchase links, and navigation menu.

**Templates:** Nunjucks (`.njk`) in `src/_includes/`:
- `layouts/base.njk` — root HTML shell; links the single stylesheet `src/css/main.css` and the Fraunces/Inter web fonts
- `layouts/page.njk` — standard content pages
- `layouts/post.njk` — blog post layout
- `partials/` — header, footer, cta (call-to-action buttons)

**Styling:** One stylesheet, `src/css/main.css`. Editorial design — Fraunces (serif) headings, Inter body, brand-blue (`#2563eb`) accent. Blog rules use `--blog-*` variables; site-wide content rules use `:has()` guards so they don't leak into the blog.

**Blog posts:** Markdown files in `src/blog/`. Required frontmatter:
```markdown
---
layout: layouts/post.njk
title: Post Title
date: 2026-01-24
author: Nick Ryberg
excerpt: Summary shown on listing page
draft: true   # optional — excludes from production builds
---
```

**Content pages** (`src/*.md`) use `layout: layouts/page.njk` and are listed in the navigation via `src/_data/site.json`.

To add a page to the nav, add an entry to the `navigation` array in `src/_data/site.json`.
