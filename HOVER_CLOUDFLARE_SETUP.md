# Domain Setup Guide: Hover + Cloudflare + Netlify

Complete guide for setting up `dataflowmap.com` using Hover for domain registration, Cloudflare for DNS/CDN, and Netlify for hosting.

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
5. Select repository: `DataFlowMap/book.dataflowmap.com`
6. Verify settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Branch: `main`
7. Click **"Deploy site"**

### Step 2: Note Your Netlify Subdomain

After deployment, Netlify assigns a subdomain. For this site, the Netlify URL is:
```
https://dataflowmap.netlify.app
```

**Important**: Save this URL. You'll need it for Cloudflare setup.

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

### Step 3: Add DNS Records for Root Domain

1. In Cloudflare dashboard, go to **DNS** → **Records**
2. Click **"Add record"**
3. Add A records for Netlify's load balancer:

**First A record:**
```
Type:    A
Name:    @  (represents root domain)
Target:  75.2.60.5  (Netlify's primary load balancer IP)
Proxy:   ☁️ Proxied (orange cloud - ENABLED)
TTL:     Auto
```

**Second A record (for redundancy):**
```
Type:    A
Name:    @
Target:  99.83.190.102  (Netlify's secondary load balancer IP)
Proxy:   ☁️ Proxied (orange cloud - ENABLED)
TTL:     Auto
```

**Important**:
- Use **Proxied** (orange cloud) to get Cloudflare's CDN and protection
- Use `@` for the root domain (not a subdomain)

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
- Or use: `dig dataflowmap.com` to check DNS

---

## Part 4: Configure Netlify for Custom Domain

### Step 1: Add Custom Domain to Netlify

1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `dataflowmap.com`
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
- https://www.whatsmydns.net - Enter `dataflowmap.com`
- Command line: `dig dataflowmap.com`

Look for:
```
dataflowmap.com.  300  IN  A  75.2.60.5
```

### Step 2: Test Your Site

1. Visit `http://dataflowmap.com` (should redirect to HTTPS)
2. Visit `https://dataflowmap.com` (should load your site)
3. Check SSL certificate:
   - Click the padlock in browser
   - Should show Cloudflare SSL certificate

### Step 3: Test All Pages

- Home: `https://dataflowmap.com/`
- About: `https://dataflowmap.com/about/`
- Author: `https://dataflowmap.com/author/`
- Buy: `https://dataflowmap.com/buy/`
- Resources: `https://dataflowmap.com/resources/`

---

## Troubleshooting

### DNS Not Resolving

**Problem**: `dataflowmap.com` doesn't load

**Solutions**:
1. Wait longer - DNS propagation can take up to 48 hours
2. Check nameservers in Hover are exactly what Cloudflare provided
3. Verify A records in Cloudflare:
   - Name: `@`
   - Target: `75.2.60.5` and `99.83.190.102`
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
1. In Netlify, verify the domain is added: `dataflowmap.com`
2. Check that the site deployed successfully
3. Verify the `_site` directory has content after build

### Cloudflare Shows "Active" But Site Doesn't Load

**Problem**: Cloudflare is active but domain doesn't work

**Solutions**:
1. Verify A records have correct Netlify IPs (75.2.60.5 and 99.83.190.102)
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
   - Create rule for `dataflowmap.com/*`
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 month

---

## Quick Reference

### DNS Configuration
```
Type:     A
Name:     @  (root domain)
Target:   75.2.60.5 (and 99.83.190.102 for redundancy)
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

1. ✅ Verify site is live at `https://dataflowmap.com`
2. Set up Cloudflare Web Analytics (free, privacy-friendly)
3. Configure email forwarding in Cloudflare (if needed)
4. Enable Cloudflare's security features
5. Add your site to Google Search Console
