# XportTrust - Quick Reference Guide

## 🎯 What is XportTrust?

A complete invoice factoring platform demo for small exporters (like Moradabad brassware sellers) to get instant financing on their export invoices.

## ✅ What's Included

### Core Features (All Working!)
- ✅ Modern landing page with features & CTA
- ✅ Exporter signup/signin (using localStorage for demo)
- ✅ Invoice upload with drag-and-drop
- ✅ Client-side OCR using Tesseract.js
- ✅ Mock buyer risk scoring (0-100)
- ✅ Automated offer generation
- ✅ Simulated payout animation
- ✅ Admin dashboard with charts
- ✅ Mock APIs (risk, bank, insurance)
- ✅ Responsive design with Tailwind CSS
- ✅ All free dependencies (no billing required)

### Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, how-it-works |
| `/auth/signup` | Exporter registration |
| `/auth/signin` | Sign in with email |
| `/dashboard` | Exporter dashboard (upload, view invoices) |
| `/admin` | Admin metrics & charts |
| `/api/mock/risk` | Mock risk API (GET) |
| `/api/mock/bank` | Mock bank payout API (POST) |
| `/api/mock/insurance` | Mock insurance API (POST) |

## 🎮 Demo Flow

### As Exporter
1. Visit homepage → Click "Get Started"
2. Fill signup form (any test data works)
3. Redirected to dashboard
4. Click "Upload Invoice"
5. Drag file OR manually enter:
   - Invoice No: INV-001
   - Buyer Name: Maple Home (try different buyers!)
   - Amount: 50000
   - Currency: INR
6. Click "Upload & Continue"
7. Instantly see offer modal with:
   - Risk score
   - Advance % (75-85% based on risk)
   - Fee breakdown
   - Escrow requirement
8. Click "Accept Offer"
9. Watch payout animation
10. See "Funded" status in dashboard

### As Admin
1. Go to `/admin`
2. View metrics:
   - Total invoices
   - Active exporters
   - Average advance %
   - Total funded
3. See charts:
   - Pie chart: invoice status distribution
   - Bar chart: buyer risk scores
4. Review recent activity table

## 🎨 Mock Buyer Database

Pre-configured buyers with risk scores:

| Buyer Name | Risk Score | Advance % | Escrow Required? |
|------------|-----------|-----------|------------------|
| Maple Home | 74 | 85% | No |
| Casa Decor | 49 | 80% | Yes |
| Unknown Importer | 22 | 75% | Yes |
| Global Artisans LLC | 88 | 85% | No |
| European Crafts GmbH | 65 | 80% | No |

**Try uploading invoices with different buyer names!**

## 💡 Key Components

### Dashboard Components
- `UploadModal.tsx` - Invoice upload with OCR
- `OfferModal.tsx` - Financing offer display
- `PayoutModal.tsx` - Animated payout simulation

### Libraries & APIs
- **OCR**: Tesseract.js (client-side, free)
- **Charts**: Recharts
- **Forms**: react-hook-form + zod
- **State**: Zustand
- **UI**: shadcn/ui components
- **Icons**: Lucide React

## 🔧 Customization Ideas

### Change Offer Calculation
Edit `lib/mockData.ts` → `generateOffer()` function
```typescript
const advancePct = buyerRiskScore > 70 ? 85 : buyerRiskScore > 50 ? 80 : 75;
const feePct = 2; // Change to 1.5 or 3
const insurancePct = 0.75; // Adjust insurance cost
```

### Add New Mock Buyers
Edit `lib/mockData.ts` → `mockBuyers` array
```typescript
{ name: "Your Buyer", score: 82, country: "USA" }
```

### Change Theme Colors
Edit `tailwind.config.ts` or use inline classes:
- Primary: `bg-blue-600` → `bg-purple-600`
- Success: `text-green-600` → `text-emerald-600`

### Add More Stats
Edit `app/dashboard/page.tsx` → `stats` object
```typescript
const stats = {
  // Add: avgInvoiceAmount, totalFees, etc.
}
```

## 📊 Data Storage

**Currently**: Uses localStorage (demo only)
- User data: `localStorage.getItem('user')`
- Invoices: `localStorage.getItem('invoices')`

**For Production**: Replace with Supabase
1. Uncomment Supabase client usage
2. Replace localStorage calls with Supabase queries
3. Set up proper authentication

## 🚀 Deployment Checklist

Before deploying:
- [ ] Create Supabase project
- [ ] Run `supabase-schema.sql`
- [ ] Get API keys
- [ ] Create `.env.local` with real values
- [ ] Test locally (`npm run dev`)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel
- [ ] Update `NEXTAUTH_URL` to production URL
- [ ] Test live site

## 🎯 Demo Talking Points

When presenting this prototype:

1. **Problem**: Small exporters wait 30-90 days for payment, hurting cash flow
2. **Solution**: XportTrust advances 80-85% within 24 hours
3. **Trust Mechanism**: 
   - Real-time buyer risk scoring
   - ECGC insurance (95% cover)
   - Escrow for high-risk transactions
4. **Tech Stack**: 100% free, modern, scalable
5. **Target**: Moradabad brassware cluster (5000+ exporters)
6. **Traction**: Demo ready for investor/partner pitches

## 🛠 Troubleshooting

**Invoice upload not working?**
- OCR may fail on some files - just enter manually
- Check browser console for errors
- Ensure all required fields filled

**Charts not showing?**
- Need at least 1 invoice uploaded
- Visit `/dashboard` first, upload invoice
- Then check `/admin`

**Lost data after refresh?**
- Expected! Using localStorage
- For persistent data, integrate Supabase

**Styling looks broken?**
- Run `npm install` to ensure all dependencies
- Clear browser cache
- Check for console errors

## 📝 Next Steps

### For MVP (1-2 weeks)
- [ ] Integrate real Supabase backend
- [ ] Add proper NextAuth email login
- [ ] Implement file upload to Supabase Storage
- [ ] Add export to PDF for receipts
- [ ] Create agent portal for KYC

### For Beta (1 month)
- [ ] Integrate Razorpay for real payouts
- [ ] Connect to ECGC API for insurance
- [ ] Add real buyer database (ICEGATE)
- [ ] Implement escrow smart contracts
- [ ] Set up SMS notifications

### For Production (3 months)
- [ ] Security audit
- [ ] Regulatory compliance
- [ ] Load testing
- [ ] Customer support system
- [ ] Marketing site
- [ ] Mobile app

## 🤝 Support

- **Documentation**: See README.md and DEPLOYMENT.md
- **Issues**: Open GitHub issue
- **Questions**: Check code comments

---

**Remember**: This is a PROTOTYPE. Perfect for demos, pitches, and validation. Not for handling real money yet! 💰
