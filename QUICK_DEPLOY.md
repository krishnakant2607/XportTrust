# 🎯 Quick Deploy to Vercel - 5 Minutes

## Option 1: Automated Script (Easiest)

```bash
cd "/Users/krishnakant/Desktop/Jar /xporttrust"
./deploy.sh
```

The script will:
- ✅ Build your project
- ✅ Commit changes to Git
- ✅ Push to GitHub
- ✅ Deploy to Vercel

---

## Option 2: Manual Steps (Quick)

### 1. Commit your code
```bash
cd "/Users/krishnakant/Desktop/Jar /xporttrust"
git add .
git commit -m "Ready for deployment - XportTrust v2.0"
```

### 2. Create GitHub Repository
- Go to: https://github.com/new
- Name: `xporttrust`
- Click "Create repository"

### 3. Push to GitHub
```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/xporttrust.git
git push -u origin main
```

### 4. Deploy on Vercel
- Go to: https://vercel.com/new
- Import your `xporttrust` repository
- Click "Deploy" (no configuration needed!)
- Wait 2-3 minutes ⏱️
- Done! 🎉

---

## Option 3: Vercel CLI (For Developers)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd "/Users/krishnakant/Desktop/Jar /xporttrust"
vercel --prod
```

---

## Environment Variables to Add

After deployment, add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-app.vercel.app
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## Your Deployed URLs

After deployment, you'll get:
- **Production**: `https://xporttrust.vercel.app`
- **Preview**: Auto-generated for each push
- **Custom Domain**: Add in Vercel settings

---

## Test Your Deployment

Visit these pages:
1. `/` - Landing page
2. `/auth/signup` - Sign up
3. `/dashboard` - Dashboard
4. `/marketplace` - Marketplace
5. `/compliance` - Compliance
6. `/admin` - Admin

---

## Need Help?

Read the full guide: `VERCEL_DEPLOYMENT.md`

---

**Total Time: 5-10 minutes** ⚡
