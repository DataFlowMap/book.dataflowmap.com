# Domain Setup Guide: Hover + Cloudflare + Netlify

Complete guide for setting up `book.dataflowmap.com` using Hover for domain registration, Cloudflare for DNS/CDN, and Netlify for hosting.

## Architecture Overview

```
Domain Registration (Hover)
    ↓
DNS Management (Cloudflare)
    ↓
Hosting (Netlify)
    ↓
Your Website
```

**Why this setup?**
- **Hover**: Simple domain registrar, good prices, no upsells
- **Cloudflare**: Free DNS, CDN, SSL, DDoS protection, better performance
- **Netlify**: Easy static site hosting, automatic builds from GitHub

---

## Part 1: Initial Netlify Deployment

Do this first to get your Netlify subdomain.

### Step 1: Deploy to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Sign up/login (use GitHub for easier integration)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"Deploy with GitHub"**
5. Select repository: `nryberg/book.dataflowmap.com`
6. Verify settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Branch: `main`
7. Click **"Deploy site"**

### Step 2: Note Your Netlify Subdomain

After deployment, Netlify assigns a subdomain like:
```
https://sparkly-unicorn-123456.netlify.app
```

**Important**: Save this URL. You'll need it for Cloudflare setup.

You can also set a custom subdomain:
1. Go to **Site settings** → **Domain management** → **Custom domains**
2. Click **"Options"** → **"Edit site name"**
3. Choose something memorable like: `dataflowmap-book.netlify.app`

---

## Part 2: Cloudflare Setup

### Step 1: Add Domain to Cloudflare

1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Sign up/login
3. Click **"Add a site"**
4. Enter: `dataflowmap.com` (your root domain)
5. Choose **Free** plan
6. Click **"Continue"**

### Step 2: Cloudflare DNS Scan

Cloudflare will scan your existing DNS records. Review them but don't worry about perfect accuracy - you'll add the book subdomain next.

### Step 3: Add DNS Record for Subdomain

1. In Cloudflare dashboard, go to **DNS** → **Records**
2. Click **"Add record"**
3. Add a CNAME record:

```
Type:    CNAME
Name:    book
Target:  dataflowmap-book.netlify.app  (your Netlify subdomain)
Proxy:   ☁️ Proxied (orange cloud - ENABLED)
TTL:     Auto
```

**Important**: 
- Use **Proxied** (orange cloud) to get Cloudflare's CDN and protection
- Remove `https://` from the target, just use the subdomain

### Step 4: Get Cloudflare Nameservers

Cloudflare will show you two nameservers like:
```
carter.ns.cloudflare.com
jocelyn.ns.cloudflare.com
```

**Copy these** - you'll need them for Hover.

---

## Part 3: Hover Configuration

### Step 1: Login to Hover

1. Go to [https://www.hover.com](https://www.hover.com)
2. Login to your account
3. Go to your domain: `dataflowmap.com`

### Step 2: Change Nameservers

1. Click on **"Nameservers"** or **"Edit Nameservers"**
2. Select **"Use custom nameservers"** or **"Edit"**
3. Replace Hover's default nameservers with Cloudflare's:
   ```
   carter.ns.cloudflare.com
   jocelyn.ns.cloudflare.com
   ```
   (Use the exact nameservers Cloudflare gave you)
4. Click **"Save"**

### Step 3: Wait for Propagation

- DNS changes can take 24-48 hours but usually complete in 2-4 hours
- Hover will send you an email when nameserver changes are complete
- Cloudflare will email you when your site is active

**Check status**: 
- In Cloudflare dashboard, wait for **"Status: Active"**
- Or use: `dig book.dataflowmap.com` to check DNS

---

## Part 4: Configure Netlify for Custom Domain

### Step 1: Add Custom Domain to Netlify

1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `book.dataflowmap.com`
4. Click **"Verify"**
5. Netlify will show a warning about DNS - click **"Add domain"** anyway
   (You've already set up DNS in Cloudflare)

### Step 2: Disable Netlify's Automatic SSL

Since Cloudflare handles SSL, you need to configure this properly:

1. In Netlify: **Site settings** → **Domain management** → **HTTPS**
2. Note: Netlify may show SSL as "waiting" - this is fine
3. Cloudflare will handle SSL encryption

---

## Part 5: Cloudflare SSL Configuration

### Step 1: Configure SSL/TLS Settings

1. In Cloudflare dashboard, go to **SSL/TLS**
2. Choose encryption mode: **Full (strict)** is recommended
   - But if Netlify SSL is pending, temporarily use **Full**
   - Upgrade to **Full (strict)** once Netlify provisions SSL

### Step 2: Enable Always Use HTTPS

1. In Cloudflare: **SSL/TLS** → **Edge Certificates**
2. Turn on **"Always Use HTTPS"**
3. This redirects all HTTP to HTTPS automatically

---

## Part 6: Verification & Testing

### Step 1: Check DNS Propagation

Use these tools:
- https://www.whatsmydns.net - Enter `book.dataflowmap.com`
- Command line: `dig book.dataflowmap.com`

Look for:
```
book.dataflowmap.com.  300  IN  CNAME  dataflowmap-book.netlify.app.
```

### Step 2: Test Your Site

1. Visit `http://book.dataflowmap.com` (should redirect to HTTPS)
2. Visit `https://book.dataflowmap.com` (should load your site)
3. Check SSL certificate:
   - Click the padlock in browser
   - Should show Cloudflare SSL certificate

### Step 3: Test All Pages

- Home: `https://book.dataflowmap.com/`
- About: `https://book.dataflowmap.com/about/`
- Author: `https://book.dataflowmap.com/author/`
- Buy: `https://book.dataflowmap.com/buy/`
- Resources: `https://book.dataflowmap.com/resources/`

---

## Troubleshooting

### DNS Not Resolving

**Problem**: `book.dataflowmap.com` doesn't load

**Solutions**:
1. Wait longer - DNS propagation can take up to 48 hours
2. Check nameservers in Hover are exactly what Cloudflare provided
3. Verify CNAME record in Cloudflare:
   - Name: `book`
   - Target: `your-site.netlify.app`
   - Proxied: ON (orange cloud)

### SSL Certificate Errors

**Problem**: Browser shows "Not Secure" warning

**Solutions**:
1. In Cloudflare: Verify SSL/TLS mode is **Full** or **Full (strict)**
2. Wait 15-30 minutes for SSL to provision
3. Clear browser cache and try again
4. Try incognito/private browsing mode

### Site Shows Netlify's 404 Page

**Problem**: Site loads but shows "Page not found"

**Solutions**:
1. In Netlify, verify the domain is added: `book.dataflowmap.com`
2. Check that the site deployed successfully
3. Verify the `_site` directory has content after build

### Cloudflare Shows "Active" But Site Doesn't Load

**Problem**: Cloudflare is active but subdomain doesn't work

**Solutions**:
1. Verify CNAME record has correct target (your Netlify subdomain)
2. Make sure Proxied (orange cloud) is ENABLED
3. Check if Netlify has accepted the custom domain

---

## Performance Optimization (Optional)

### Cloudflare Settings

1. **Caching**:
   - Go to **Caching** → **Configuration**
   - Caching Level: **Standard**
   - Browser Cache TTL: **4 hours** or higher

2. **Speed Optimizations**:
   - Go to **Speed** → **Optimization**
   - Auto Minify: Enable HTML, CSS, JavaScript
   - Brotli: Enable

3. **Page Rules** (Optional):
   - Create rule for `book.dataflowmap.com/*`
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 month

---

## Quick Reference

### DNS Configuration
```
Type:     CNAME
Name:     book
Target:   your-site.netlify.app
Proxied:  ☁️ ON (orange cloud)
```

### Nameservers at Hover
```
Use the nameservers Cloudflare provided
(something.ns.cloudflare.com)
```

### SSL/TLS Mode in Cloudflare
```
Full (strict) - Recommended
or
Full - If Netlify SSL is pending
```

---

## Timeline Expectations

- **Netlify deployment**: 2-5 minutes
- **Cloudflare setup**: 10 minutes
- **Hover nameserver change**: 2-4 hours (can take up to 48 hours)
- **Cloudflare activation**: After nameserver propagation
- **SSL provisioning**: 15-30 minutes after DNS is active
- **Full site live**: Usually 4-6 hours total

---

## Benefits of This Setup

✅ **Fast**: Cloudflare CDN serves your site from global edge locations
✅ **Secure**: Free SSL, DDoS protection, automatic HTTPS
✅ **Reliable**: 99.9%+ uptime with Netlify + Cloudflare
✅ **Simple**: Automatic deployments from GitHub
✅ **Free**: All services have generous free tiers

---

## Support Resources

- **Hover Support**: https://help.hover.com
- **Cloudflare Docs**: https://developers.cloudflare.com
- **Netlify Docs**: https://docs.netlify.com
- **DNS Checker**: https://www.whatsmydns.net

---

## Next Steps After Setup

1. ✅ Verify site is live at `https://book.dataflowmap.com`
2. Set up Cloudflare Web Analytics (free, privacy-friendly)
3. Configure email forwarding in Cloudflare (if needed)
4. Enable Cloudflare's security features
5. Add your site to Google Search Console
