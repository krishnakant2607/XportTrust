# Deployment Guide - XportTrust

## Complete Step-by-Step Deployment to Vercel & Supabase

### Part 1: Set Up Supabase (Database)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Enter project name: `xporttrust`
   - Set a strong database password (save it!)
   - Choose region closest to your users
   - Wait 2-3 minutes for setup

2. **Get API Credentials**
   - Go to Project Settings → API
   - Copy `Project URL` (looks like: https://xxx.supabase.co)
   - Copy `anon public` key (long string starting with eyJ...)
   - Save both - you'll need them later!

3. **Create Database Tables**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"
   - Copy entire contents of `supabase-schema.sql`
   - Paste and click "Run"
   - You should see "Success. No rows returned"

4. **Set Up Storage (Optional but Recommended)**
   - Click "Storage" in left sidebar
   - Click "New Bucket"
   - Name: `invoices`
   - Toggle "Public bucket" ON
   - Click "Create bucket"

5. **Verify Setup**
   - Click "Table Editor"
   - You should see tables: exporters, invoices, offers, fundings
   - Click on "exporters" - you should see 3 sample rows

### Part 2: Deploy to Vercel

1. **Push Code to GitHub**
   ```bash
   # If you haven't initialized git yet
   git init
   git add .
   git commit -m "Initial XportTrust deployment"
   
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/xporttrust.git
   git branch -M main
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL
   ```
   Value: Your Supabase Project URL from Part 1 Step 2

   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
   Value: Your Supabase anon key from Part 1 Step 2

   ```
   NEXTAUTH_URL
   ```
   Value: Leave blank for now (we'll update after first deployment)

   ```
   NEXTAUTH_SECRET
   ```
   Value: Run this command in your terminal to generate:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and use it here.

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: https://xporttrust-xxx.vercel.app

5. **Update NEXTAUTH_URL**
   - Copy your deployment URL
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Edit `NEXTAUTH_URL`
   - Set value to your deployment URL (e.g., https://xporttrust-xxx.vercel.app)
   - Click "Save"
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Part 3: Test Your Deployment

1. **Visit Your Site**
   - Go to your Vercel URL
   - You should see the landing page

2. **Test Sign Up Flow**
   - Click "Get Started"
   - Fill in the form
   - Click "Create Account"
   - You should be redirected to dashboard

3. **Test Invoice Upload**
   - Click "Upload Invoice"
   - Either drag/drop a file or enter details manually
   - Click "Upload & Continue"
   - You should see an offer modal

4. **Test Admin Dashboard**
   - Go to `/admin` path on your site
   - You should see charts and metrics

### Part 4: Optional - Custom Domain

1. **In Vercel Dashboard**
   - Go to Project → Settings → Domains
   - Click "Add"
   - Enter your domain (e.g., xporttrust.com)
   - Follow DNS instructions from your domain registrar

2. **Update Environment**
   - Update `NEXTAUTH_URL` to your custom domain
   - Redeploy

### Troubleshooting

**Problem: "Supabase connection error"**
- Check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly
- Make sure you included the "NEXT_PUBLIC_" prefix
- Verify the values have no extra spaces

**Problem: "Database tables not found"**
- Go to Supabase SQL Editor
- Run the schema SQL again
- Check Table Editor to verify tables exist

**Problem: "Sign up doesn't work"**
- This demo uses localStorage for auth (not production-ready)
- Make sure browser allows localStorage
- Check browser console for errors

**Problem: "Upload doesn't work"**
- This is normal - OCR works client-side and may fail on some files
- Just enter details manually
- Make sure you fill all required fields

### Cost Breakdown (All FREE!)

- ✅ Supabase Free Tier: 500MB database, 1GB storage
- ✅ Vercel Hobby Plan: Free hosting, 100GB bandwidth/month
- ✅ No credit card required for either service
- ✅ Perfect for demo/prototype/portfolio

### What's Next?

Now you have a fully functional demo! Here's what you can do:

1. **Share**: Send the Vercel URL to stakeholders
2. **Present**: Use it in pitch decks and demos
3. **Iterate**: Add features based on feedback
4. **Scale**: When ready, upgrade to production services

### Production Checklist

When moving to production:
- [ ] Replace localStorage auth with real NextAuth
- [ ] Add proper Supabase RLS policies
- [ ] Integrate real payment gateway (Razorpay/Stripe)
- [ ] Add real OCR API (Google Cloud Vision, AWS Textract)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Add analytics (PostHog, Mixpanel)
- [ ] Implement proper error handling
- [ ] Add comprehensive tests
- [ ] Set up CI/CD pipeline
- [ ] Get security audit
- [ ] Comply with financial regulations

---

**Need Help?** Open an issue on GitHub or email support@xporttrust.demo
