# 🚀 Deploy XportTrust to Vercel - Complete Guide

## Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Git installed locally

---

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)
```bash
cd "/Users/krishnakant/Desktop/Jar /xporttrust"
git init
```

### 1.2 Create `.gitignore` file
Make sure you have a `.gitignore` that excludes:
```
node_modules
.next
.env.local
.DS_Store
*.log
.vercel
```

### 1.3 Commit your code
```bash
git add .
git commit -m "Initial commit - XportTrust v2.0"
```

---

## Step 2: Push to GitHub

### 2.1 Create a new repository on GitHub
1. Go to https://github.com/new
2. Repository name: `xporttrust`
3. Description: "Trust-first digital platform for small exporters"
4. Keep it **Public** or **Private** (your choice)
5. DO NOT initialize with README (you already have one)
6. Click "Create repository"

### 2.2 Push your code
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/xporttrust.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Method A: Using Vercel Website (Recommended)

#### 3.1 Sign up/Login to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

#### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Find your `xporttrust` repository
3. Click "Import"

#### 3.3 Configure Project
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)

#### 3.4 Add Environment Variables
Click "Environment Variables" and add these:

| Name | Value | Note |
|------|-------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://placeholder.supabase.co` | Replace later with real Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `placeholder-key-for-now` | Replace later with real key |
| `NEXTAUTH_SECRET` | Generate random string | Use: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | Will be auto-generated |

#### 3.5 Deploy!
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your app will be live at `https://xporttrust-xxx.vercel.app`

---

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
cd "/Users/krishnakant/Desktop/Jar /xporttrust"
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: xporttrust
# - Directory: ./
# - Override settings? N

# Production deployment
vercel --prod
```

---

## Step 4: Set Up Supabase (Optional but Recommended)

### 4.1 Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Create new organization (if needed)
4. Click "New Project"
   - Name: `xporttrust`
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
5. Wait 2 minutes for setup

### 4.2 Run Database Schema
1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy contents of `supabase-schema.sql` from your project
4. Paste and click "Run"
5. Verify tables are created in "Table Editor"

### 4.3 Get API Credentials
1. Go to Settings → API
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### 4.4 Update Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Update:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon public key
4. Redeploy: Deployments → Latest → "Redeploy"

---

## Step 5: Configure Custom Domain (Optional)

### 5.1 Add Domain in Vercel
1. Go to project Settings → Domains
2. Enter your domain (e.g., `xporttrust.com`)
3. Click "Add"

### 5.2 Update DNS
Vercel will show you DNS records to add:
- **A Record**: Point to Vercel IP
- **CNAME**: Point `www` to `cname.vercel-dns.com`

### 5.3 Update Environment Variables
Update `NEXTAUTH_URL` to your custom domain

---

## Step 6: Post-Deployment Checklist

### ✅ Test All Pages
- [ ] Landing page: `https://your-app.vercel.app/`
- [ ] Sign Up: `/auth/signup`
- [ ] Sign In: `/auth/signin`
- [ ] Dashboard: `/dashboard`
- [ ] Admin: `/admin`
- [ ] Marketplace: `/marketplace`
- [ ] Compliance: `/compliance`

### ✅ Test Mock APIs
```bash
# Replace with your deployed URL
curl https://your-app.vercel.app/api/mock/risk?buyerName=ABC%20Corp
curl -X POST https://your-app.vercel.app/api/mock/bank \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000000}'
```

### ✅ Check Performance
1. Run Lighthouse audit in Chrome DevTools
2. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 90+

### ✅ Enable Analytics (Optional)
1. Go to Vercel project → Analytics
2. Enable "Web Analytics"
3. Track page views, performance, etc.

---

## Common Issues & Solutions

### Issue 1: Build Fails
**Error**: `Module not found` or `Cannot find package`
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Issue 2: Environment Variables Not Working
**Solution**: 
- Make sure they're prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/updating variables

### Issue 3: 404 on Routes
**Solution**: 
- Next.js App Router uses file-based routing
- Check that all pages are in `app/` directory
- Verify file names match URL paths

### Issue 4: API Routes Not Working
**Solution**:
- API routes must be in `app/api/*/route.ts`
- Check that you're exporting `GET`, `POST`, etc.
- Verify CORS settings if calling from external domain

---

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- ✅ Deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Run build checks before deployment
- ✅ Provide deployment logs and analytics

### Update Flow:
```bash
# Make changes locally
git add .
git commit -m "Add new feature"
git push origin main

# Vercel automatically deploys! 🚀
```

---

## Free Tier Limits (Vercel Hobby)

- ✅ **Bandwidth**: 100GB/month
- ✅ **Builds**: Unlimited
- ✅ **Deployments**: Unlimited
- ✅ **Custom Domains**: Unlimited
- ✅ **Team Members**: 1
- ✅ **Serverless Functions**: 100GB-hrs

**This is MORE than enough for a prototype/demo!**

---

## Production Checklist (Before Going Live)

- [ ] Set up real authentication (NextAuth with database)
- [ ] Configure actual Supabase database
- [ ] Add real payment processing (if needed)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Add GDPR/privacy policy pages
- [ ] Configure HTTPS/SSL (auto-enabled by Vercel)
- [ ] Set up custom domain
- [ ] Add Google Analytics or similar
- [ ] Test on mobile devices
- [ ] Run security audit
- [ ] Set up backups for Supabase
- [ ] Add rate limiting to APIs
- [ ] Configure CORS properly

---

## Cost Estimates (if you outgrow free tier)

### Vercel Pro ($20/month)
- Unlimited team members
- Advanced analytics
- Priority support

### Supabase Pro ($25/month)
- 8GB database
- 100GB bandwidth
- Daily backups

**Total for small production app: ~$45/month**

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Discord**: https://vercel.com/discord
- **GitHub Issues**: Create in your repo

---

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm deployment-url

# Pull environment variables
vercel env pull

# Link local project to Vercel
vercel link
```

---

**🎉 Your XportTrust app is now live on Vercel!**

Share your demo: `https://your-project.vercel.app`

---

*Last updated: November 2025*
