# Brown Girls Rituals - Custom Domain Hosting Tutorial

This guide will walk you through connecting your website to a custom domain (like browngirlsrituals.com) and hosting it live.

---

## Table of Contents
1. [Option 1: Netlify (Recommended - Free)](#option-1-netlify-recommended---free)
2. [Option 2: Vercel (Free)](#option-2-vercel-free)
3. [Option 3: GitHub Pages (Free)](#option-3-github-pages-free)
4. [Option 4: Traditional Web Hosting (Paid)](#option-4-traditional-web-hosting-paid)
5. [Domain Setup Guide](#domain-setup-guide)
6. [Connecting Contact Form to Email](#connecting-contact-form-to-email)

---

## Option 1: Netlify (Recommended - Free)

Netlify is the easiest and most reliable free option for hosting static websites.

### Step 1: Create a Netlify Account
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up with GitHub, GitLab, Bitbucket, or email

### Step 2: Download Your Website Files
1. Your built website files are in `/mnt/okcomputer/output/app/dist/`
2. Download this folder to your computer
3. Zip the contents of the `dist` folder (not the folder itself)

### Step 3: Deploy to Netlify
1. Log into Netlify
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your zipped `dist` folder
4. Wait for deployment (usually takes under a minute)
5. Your site will be live at a random URL like `random-name-123.netlify.app`

### Step 4: Connect Custom Domain
1. In Netlify dashboard, go to your site → "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `browngirlsrituals.com`)
4. Netlify will show you DNS records to add

### Step 5: Configure DNS (Domain Provider)
1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Find DNS management or Nameservers section
3. Add the DNS records Netlify provided:
   - **A Record**: Point `@` to Netlify's IP (usually `75.2.60.5`)
   - **CNAME Record**: Point `www` to your Netlify URL

   OR use Netlify's nameservers:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`

4. Save changes and wait 24-48 hours for DNS propagation

### Step 6: Enable HTTPS (SSL)
1. In Netlify, go to Domain settings → HTTPS
2. Click "Verify DNS configuration"
3. Netlify will automatically provision a free SSL certificate
4. Enable "Force HTTPS" for security

---

## Option 2: Vercel (Free)

Vercel is another excellent free hosting option.

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub or email

### Step 2: Deploy
1. Click "Add New Project"
2. Choose "Upload" option
3. Upload your `dist` folder as a zip file
4. Vercel will deploy automatically

### Step 3: Custom Domain
1. Go to Project Settings → Domains
2. Add your domain
3. Follow Vercel's DNS instructions
4. SSL certificate is automatic

---

## Option 3: GitHub Pages (Free)

Good option if you want version control.

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Create new repository named `browngirlsrituals`
3. Make it public

### Step 2: Upload Files
1. Download your `dist` folder
2. Extract it
3. Upload all files to the repository root
4. Commit the changes

### Step 3: Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, folder: / (root)
4. Save
5. Your site will be at `username.github.io/browngirlsrituals`

### Step 4: Custom Domain
1. In repository root, create file named `CNAME`
2. Add your domain: `browngirlsrituals.com`
3. Go to Settings → Pages → Custom domain
4. Add your domain
5. Configure DNS with your registrar:
   - **A Records**: Point to GitHub IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **CNAME**: Point `www` to `username.github.io`

---

## Option 4: Traditional Web Hosting (Paid)

For more control, use traditional hosting.

### Recommended Hosts:
- **Bluehost** (~$3/month)
- **SiteGround** (~$3/month)
- **HostGator** (~$3/month)
- **DreamHost** (~$3/month)

### Steps:
1. Purchase hosting plan
2. Log into cPanel (control panel)
3. Find "File Manager"
4. Navigate to `public_html` folder
5. Upload all files from your `dist` folder
6. Your site is live!

### For Custom Domain:
1. Purchase domain from registrar
2. Point domain's nameservers to your host:
   - Usually provided in hosting welcome email
   - Example: `ns1.bluehost.com`, `ns2.bluehost.com`
3. Wait for propagation (up to 48 hours)

---

## Domain Setup Guide

### Where to Buy Domains:

| Registrar | Price/Year | Notes |
|-----------|------------|-------|
| Namecheap | ~$9-15 | Good prices, free WHOIS privacy |
| Google Domains | ~$12 | Simple interface, good support |
| GoDaddy | ~$12-20 | Popular, frequent sales |
| Cloudflare | ~$9 | At-cost pricing, no markup |
| Porkbun | ~$9 | Low prices, free features |

### Recommended for You:
**Namecheap** - Best balance of price and features

### Steps to Buy:
1. Go to [namecheap.com](https://www.namecheap.com)
2. Search for `browngirlsrituals.com`
3. Add to cart
4. Create account
5. Complete purchase
6. You'll receive DNS management access

---

## Connecting Contact Form to Email

Since this is a static website, you need a form service to handle contact form submissions.

### Option 1: Formspree (Recommended - Free)

**Free tier:** 50 submissions/month

1. Go to [formspree.io](https://formspree.io)
2. Create free account
3. Create new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xnqkvpzy`)
5. In your admin panel, go to Email Settings
6. Paste the Formspree URL in the appropriate field
7. Test the form on your website

### Option 2: Netlify Forms (If using Netlify)

1. Add this attribute to your form: `netlify`
2. Example: `<form name="contact" netlify>`
3. Submissions appear in Netlify dashboard
4. Can forward to email

### Option 3: EmailJS (Free tier available)

1. Go to [emailjs.com](https://www.emailjs.com)
2. Create account
3. Set up email service (Gmail, Outlook, etc.)
4. Create email template
5. Get your Service ID, Template ID, and Public Key
6. Add EmailJS SDK to your site
7. Configure in admin panel

### Option 4: GetForm

1. Go to [getform.io](https://getform.io)
2. Create free account
3. Create new form
4. Copy form endpoint
5. Configure in admin panel

---

## Updating Your Website

After making changes in the admin panel:

### For Netlify:
1. Changes are saved in browser storage
2. To update live site, re-download `dist` folder
3. Re-upload to Netlify
4. OR use Netlify CLI for automatic deployments

### For GitHub Pages:
1. Download updated `dist` folder
2. Push changes to GitHub repository
3. GitHub Pages updates automatically

---

## Recommended Setup Summary

**For Brown Girls Rituals, I recommend:**

1. **Domain:** Namecheap (~$12/year)
2. **Hosting:** Netlify (Free)
3. **Contact Form:** Formspree (Free tier)
4. **Email:** Use your domain email (hello@browngirlsrituals.com)
   - Set up with Google Workspace ($6/month) or Zoho Mail (Free)

**Total Cost:** ~$12/year (just domain)

---

## Troubleshooting

### Site not loading?
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Clear browser cache
- Try accessing with `www.` prefix

### HTTPS not working?
- Wait 24 hours after DNS setup
- Check SSL certificate status in hosting dashboard
- Force HTTPS redirect

### Contact form not sending?
- Verify form service is configured correctly
- Check spam folder
- Test with different email address

---

## Need Help?

If you get stuck:
1. Netlify Docs: [docs.netlify.com](https://docs.netlify.com)
2. Namecheap Support: [namecheap.com/support](https://www.namecheap.com/support/)
3. Contact your hosting provider's support

---

## Quick Checklist

- [ ] Purchase domain (browngirlsrituals.com)
- [ ] Create Netlify account
- [ ] Upload website files to Netlify
- [ ] Configure DNS with domain registrar
- [ ] Enable HTTPS/SSL
- [ ] Set up contact form (Formspree)
- [ ] Configure admin email settings
- [ ] Test contact form
- [ ] Test admin panel login
- [ ] Share your new website!

---

**Your website is ready to go live!** 🕯️✨
