# Deployment Guide

Complete guide for deploying the Data Flow Map book website to Netlify at `dataflowmap.com`.

## Prerequisites

- [ ] GitHub account with repository access
- [ ] Netlify account (free tier is sufficient)
- [ ] Domain `dataflowmap.com` with DNS access

## Step-by-Step Deployment

### 1. Prepare the Repository

```bash
# Clone the repository
git clone https://github.com/DataFlowMap/book.dataflowmap.com.git
cd book.dataflowmap.com

# Install dependencies and test locally
npm install
npm start

# If everything looks good, commit your changes
git add .
git commit -m "Initial site setup"
git push origin main
```

### 2. Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select the repository: `DataFlowMap/book.dataflowmap.com`

### 3. Configure Build Settings

Netlify should auto-detect settings from `netlify.toml`, but verify:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `_site`
- **Node version**: 18

Click **"Deploy site"**

### 4. Set Up Custom Domain

#### Option A: Using Netlify DNS (Recommended)

1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `dataflowmap.com`
4. Netlify will provide nameservers
5. Update your domain registrar's nameservers to Netlify's nameservers
6. Netlify will automatically provision SSL certificate

#### Option B: Using External DNS

1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `dataflowmap.com`
4. In your DNS provider, add A records (or use Cloudflare - see HOVER_CLOUDFLARE_SETUP.md):
   ```
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify's load balancer)
   TTL: 3600
   ```
5. Wait for DNS propagation (can take 24-48 hours)
6. Netlify will automatically provision SSL certificate

### 5. Enable HTTPS

1. In Netlify, go to **Site settings** → **Domain management** → **HTTPS**
2. Click **"Verify DNS configuration"**
3. Click **"Provision certificate"**
4. Enable **"Force HTTPS"** to redirect all HTTP traffic to HTTPS

### 6. Configure Redirects (Optional)

If you want `www.dataflowmap.com` to redirect to `dataflowmap.com`:

1. In DNS, add CNAME for `www` pointing to `dataflowmap.com`
2. In Netlify, the `netlify.toml` already handles redirects

### 7. Test the Deployment

1. Visit `https://dataflowmap.com`
2. Test all pages and links
3. Verify mobile responsiveness
4. Check that purchase links work correctly
5. Test on different browsers

## Continuous Deployment

Now that the site is connected to GitHub:

1. Any push to the `main` branch will trigger a new deployment
2. Netlify will build and deploy automatically
3. Build status and logs are available in the Netlify dashboard

## Making Updates

```bash
# Make your changes locally
npm start  # Test locally

# Commit and push
git add .
git commit -m "Description of changes"
git push origin main

# Netlify will automatically deploy
```

## Monitoring and Analytics

### Netlify Analytics (Optional Paid Feature)

1. Go to **Site settings** → **Analytics**
2. Enable Netlify Analytics for traffic insights

### Google Analytics (Free Alternative)

Add to `src/_includes/layouts/base.njk` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Build Fails

1. Check build logs in Netlify dashboard
2. Verify `package.json` dependencies
3. Test build locally: `npm run build`

### Domain Not Working

1. Verify DNS settings are correct
2. Wait for DNS propagation (up to 48 hours)
3. Check Netlify's DNS verification status

### SSL Certificate Issues

1. Ensure DNS is properly configured
2. Wait for certificate provisioning (can take a few minutes)
3. If problems persist, contact Netlify support

## Performance Optimization

### Image Optimization

- Compress images before uploading
- Use appropriate formats (WebP, JPEG, PNG)
- Consider lazy loading for images

### Caching

Netlify automatically handles caching. You can customize in `netlify.toml`:

```toml
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## Security

- Netlify provides free SSL certificates via Let's Encrypt
- Enable **Force HTTPS** in domain settings
- Keep dependencies updated: `npm audit` and `npm update`

## Backup

- Your code is backed up in GitHub
- Netlify maintains deployment history
- You can rollback to any previous deployment in the Netlify dashboard

## Support

- Netlify Documentation: https://docs.netlify.com
- Eleventy Documentation: https://www.11ty.dev/docs/
- GitHub Issues: For site-specific problems
