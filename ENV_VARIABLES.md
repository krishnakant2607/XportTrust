# 🔐 Environment Variables for Vercel

Copy these into Vercel Dashboard → Settings → Environment Variables

---

## Required Variables

### 1. NEXTAUTH_SECRET
```
Ymbz1C1C1FnxLk8bUR4XlU9OTyZe4W2iaVNXVJuFvDc=
```
**Purpose**: Encrypts JWT tokens for authentication  
**Scope**: Production, Preview, Development

---

### 2. NEXTAUTH_URL
```
https://your-project-name.vercel.app
```
**Purpose**: Base URL for authentication callbacks  
**Scope**: Production  
**Note**: Replace with your actual Vercel URL after first deployment

For preview/dev:
- Preview: `https://your-project-name-git-main.vercel.app`
- Development: `http://localhost:3000`

---

### 3. NEXT_PUBLIC_SUPABASE_URL
```
https://placeholder.supabase.co
```
**Purpose**: Supabase project URL (currently using mock data)  
**Scope**: Production, Preview, Development  
**Note**: Replace with real Supabase URL when you set it up

---

### 4. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
placeholder-key-for-demo-purposes
```
**Purpose**: Supabase anonymous key (currently using mock data)  
**Scope**: Production, Preview, Development  
**Note**: Replace with real anon key when you set up Supabase

---

## Optional Variables (For Production)

### 5. NEXT_PUBLIC_APP_URL
```
https://your-custom-domain.com
```
**Purpose**: Custom domain URL  
**Scope**: Production

---

### 6. NODE_ENV
```
production
```
**Purpose**: Sets Node.js environment  
**Scope**: Production  
**Note**: Usually auto-set by Vercel

---

## How to Add in Vercel

### Method 1: Vercel Dashboard
1. Go to your project in Vercel
2. Settings → Environment Variables
3. Click "Add New"
4. Enter Name and Value
5. Select scope (Production, Preview, Development)
6. Click "Save"

### Method 2: Vercel CLI
```bash
vercel env add NEXTAUTH_SECRET production
# Paste: Ymbz1C1C1FnxLk8bUR4XlU9OTyZe4W2iaVNXVJuFvDc=

vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://placeholder.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste: placeholder-key-for-demo-purposes
```

### Method 3: Copy-Paste Ready Format
```
NEXTAUTH_SECRET=Ymbz1C1C1FnxLk8bUR4XlU9OTyZe4W2iaVNXVJuFvDc=
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key-for-demo-purposes
```

---

## After Adding Variables

**Important**: Redeploy your app after adding/changing environment variables!

1. Go to Deployments tab
2. Click ⋯ next to latest deployment
3. Click "Redeploy"
4. Select "Use existing Build Cache" (faster)
5. Click "Redeploy"

Or via CLI:
```bash
vercel --prod
```

---

## When to Update

### Update NEXTAUTH_URL:
- ✅ After first deployment (use Vercel URL)
- ✅ When adding custom domain

### Update Supabase Variables:
- ✅ When you set up real Supabase project
- ✅ Get from Supabase → Settings → API

---

## Security Notes

🔒 **NEVER commit these to Git!**  
✅ They're already in `.gitignore` via `.env*.local`  
✅ Only add them in Vercel dashboard  
✅ Generate new `NEXTAUTH_SECRET` if exposed

---

## Testing Variables

After deployment, test if variables are loaded:

```bash
# Check if public variables are accessible
curl https://your-app.vercel.app/api/test
```

Or add a test API route:
```typescript
// app/api/test/route.ts
export async function GET() {
  return Response.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAuthSecret: !!process.env.NEXTAUTH_SECRET
  });
}
```

---

## Troubleshooting

### Variables not working?
- ✅ Check spelling (case-sensitive)
- ✅ Verify scope (Production/Preview/Development)
- ✅ Redeploy after changes
- ✅ Check Vercel logs for errors

### Getting undefined?
- ✅ Client-side vars must start with `NEXT_PUBLIC_`
- ✅ Server-side vars don't need prefix
- ✅ Restart dev server locally after .env changes

---

**Your variables are ready!** 🎉  
Add them to Vercel and deploy!
