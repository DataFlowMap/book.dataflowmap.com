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
│   │   │   └── page.njk  # Page layout
│   │   └── partials/
│   │       ├── header.njk
│   │       ├── footer.njk
│   │       └── cta.njk   # Call-to-action buttons
│   ├── css/
│   │   └── main.css      # Styles
│   ├── images/           # Images (book cover, etc.)
│   ├── index.md          # Home page
│   ├── about.md          # About the book
│   ├── author.md         # About the author
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

Edit `src/css/main.css` to customize the look and feel. CSS variables are defined in the `:root` selector for easy theming.

### Add Images

1. Place images in `src/images/`
2. Reference them in your content: `![Alt text](/images/your-image.jpg)`

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
2. Add custom domain: `book.dataflowmap.com`
3. Follow Netlify's instructions to configure DNS:
   - Add a CNAME record pointing `book` to your Netlify subdomain
   - Or use Netlify DNS for easier management

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
