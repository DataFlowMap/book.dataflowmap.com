# The Data Flow Map - Book Website

Static website for "The Data Flow Map" by Nick Ryberg, built with Eleventy and hosted on Netlify.

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/DataFlowMap/book.dataflowmap.com.git
cd book.dataflowmap.com
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:8080`

The site will automatically rebuild when you make changes to files.

### Preview with Draft Blog Posts

To preview draft blog posts locally:

```bash
npm run start:drafts              # Show drafts
```

### Build for Production

```bash
npm run build
```

This generates the static site in the `_site` directory.

## 📁 Project Structure

```
book-site/
├── .eleventy.js          # Eleventy configuration
├── package.json          # Dependencies and scripts
├── netlify.toml          # Netlify deployment config
├── src/
│   ├── _data/            # Global data files
│   │   └── site.json     # Site metadata (title, links, etc.)
│   ├── _includes/        # Templates and layouts
│   │   ├── layouts/
│   │   │   ├── base.njk  # Base HTML template
│   │   │   ├── page.njk  # Page layout
│   │   │   └── post.njk  # Blog post layout
│   │   └── partials/
│   │       ├── header.njk
│   │       ├── footer.njk
│   │       └── cta.njk   # Call-to-action buttons
│   ├── css/
│   │   └── main.css      # Site stylesheet (editorial: Fraunces + Inter)
│   ├── images/           # Images (book cover, logo, etc.)
│   ├── blog/             # Blog posts
│   │   └── *.md          # Individual blog posts
│   ├── index.md          # Home page
│   ├── about.md          # About the book
│   ├── author.md         # About the author
│   ├── blog.md           # Blog listing page
│   ├── buy.md            # Purchase page
│   └── resources.md      # Resources page
└── _site/                # Generated site (git-ignored)
```

## 🎨 Customization

### Update Book Information

Edit `src/_data/site.json` to update:
- Book title and subtitle
- Purchase links
- Navigation menu
- Author information

### Add Content

Content pages are Markdown files in the `src/` directory. Each page has frontmatter:

```markdown
---
layout: layouts/page.njk
title: Page Title
description: Page description for SEO
---

## Your content here
```

### Modify Styles

All styling lives in `src/css/main.css`. Colors, fonts, and spacing are driven by CSS variables in the `:root` selector (e.g. `--primary-color`, `--font-serif`, `--font-sans`) for easy customization.

### Add Images

1. Place images in `src/images/`
2. Reference them in your content: `![Alt text](/images/your-image.jpg)`

### Working with the Blog

#### Adding a New Blog Post

Create a new `.md` file in `src/blog/` with this frontmatter:

```markdown
---
layout: layouts/post.njk
title: Your Post Title
date: 2026-01-05
author: Nick Ryberg
excerpt: A brief summary for the blog listing page
---

Your content here...
```

#### Using Draft Posts

Mark posts as drafts to exclude them from production builds:

```markdown
---
layout: layouts/post.njk
title: Work in Progress
date: 2026-01-05
author: Nick Ryberg
draft: true
excerpt: This post is still being written
---

Draft content...
```

Draft posts:
- **Won't appear** in production builds (`npm run build`)
- **Will appear** when using `npm run start:drafts` or `npm run build:drafts`
- Are useful for working on content before publishing

#### Blog Features

- Chronological post listing (newest first)
- Individual post pages with optimized reading layout
- Author attribution and publish dates
- Excerpt summaries on listing page
- Code syntax highlighting
- Responsive design across all 5 visual themes

## 🌐 Deployment to Netlify

### Option 1: Connect GitHub Repository (Recommended)

1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub account
4. Select the `book.dataflowmap.com` repository
5. Netlify will auto-detect the settings from `netlify.toml`
6. Click "Deploy site"

### Option 2: Manual Deploy

```bash
npm run build
# Upload the _site folder to Netlify
```

### Custom Domain Setup

1. In Netlify, go to Site settings → Domain management
2. Add custom domain: `dataflowmap.com`
3. Follow Netlify's instructions to configure DNS:
   - Add A records pointing to Netlify's load balancer IPs
   - Or use Cloudflare for CDN and DNS management (see HOVER_CLOUDFLARE_SETUP.md)

## 📝 Content Updates

### Adding a New Page

1. Create a new `.md` file in `src/`
2. Add frontmatter with layout and title
3. Write your content in Markdown
4. Add the page to navigation in `src/_data/site.json`

### Updating Purchase Links

Edit the `purchaseLinks` object in `src/_data/site.json`:

```json
"purchaseLinks": {
  "springer": "https://link.springer.com/book/...",
  "amazon": "https://www.amazon.com/...",
  "otherRetailer": "https://..."
}
```

## 🛠️ Tech Stack

- **Static Site Generator**: [Eleventy](https://www.11ty.dev/)
- **Templating**: Nunjucks
- **Hosting**: [Netlify](https://www.netlify.com/)
- **Version Control**: Git/GitHub

## 📄 License

Copyright © Nick Ryberg. All rights reserved.

## 🤝 Contributing

This is a personal book website. If you find issues or have suggestions, please open an issue on GitHub.
