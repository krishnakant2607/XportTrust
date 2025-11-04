# 🧪 LOCAL TESTING GUIDE - XportTrust v2.0

## ✅ Server is LIVE!

Your XportTrust app is now running locally at:
**http://localhost:3000**

---

## 📋 Complete Testing Checklist

### 1. Landing Page Testing ✨

**URL**: http://localhost:3000

**Test Items**:
- [ ] Hero section loads with live stats dashboard
- [ ] Gradient text and animations work
- [ ] "Start Your Application" button (blue) is visible
- [ ] "View Live Demo" button (black/white) is visible
- [ ] All 6 feature cards display correctly
- [ ] "How It Works" section shows all 4 steps with equal-sized cards
- [ ] Step numbers (01, 02, 03, 04) are visible with correct colors:
  - 01 = Blue
  - 02 = Purple
  - 03 = Orange
  - 04 = Green
- [ ] Testimonials section shows 3 customer reviews
- [ ] "Try Live Demo" button in CTA section is visible (white text on blue background)
- [ ] Footer displays all links correctly
- [ ] Scroll behavior is smooth
- [ ] All hover effects work

---

### 2. Sign Up Page Testing 📝

**URL**: http://localhost:3000/auth/signup

**Test Items**:
- [ ] Form displays all fields:
  - Company Name
  - GST Number
  - Email
  - Bank Account
  - IFSC Code
- [ ] All input fields are functional
- [ ] "Create Account" button works
- [ ] Form validation works
- [ ] Success message appears after submission
- [ ] Data saves to localStorage

**Test Data**:
```
Company: Kumar Brass Exports
GST: 09AAAAA1234A1Z5
Email: kumar@brassexports.com
Bank Account: 123456789012
IFSC: HDFC0001234
```

---

### 3. Sign In Page Testing 🔐

**URL**: http://localhost:3000/auth/signin

**Test Items**:
- [ ] Email input field works
- [ ] "Send Magic Link" button works
- [ ] Mock authentication message appears
- [ ] Link to Sign Up page works

---

### 4. Dashboard Testing 🏠

**URL**: http://localhost:3000/dashboard

**Test Items**:
- [ ] Welcome message displays
- [ ] "Upload Invoice" button visible and clickable
- [ ] GST Refund Widget shows:
  - [ ] Nov 2024: ₹45,000 (Status badge)
  - [ ] Oct 2024: ₹38,500
  - [ ] Sep 2024: ₹42,000
- [ ] Compliance Alerts card displays:
  - [ ] LUT Renewal alert (Dec 15, 2024)
  - [ ] IEC Code alert (Feb 28, 2025)
- [ ] Invoice table displays correctly
- [ ] "Marketplace" link in header works

**Invoice Upload Flow**:
1. [ ] Click "Upload Invoice"
2. [ ] Modal opens
3. [ ] File upload area works
4. [ ] OCR extraction works (simulated)
5. [ ] Invoice details populate
6. [ ] "Get Financing Offer" button appears
7. [ ] Click to get offer
8. [ ] Offer modal shows:
   - [ ] Advance amount
   - [ ] Interest rate
   - [ ] Fees breakdown
   - [ ] Risk score
9. [ ] "Accept Offer" button works
10. [ ] Payout animation plays
11. [ ] Invoice status updates to "Funded"

---

### 5. Marketplace Testing 🛒

**URL**: http://localhost:3000/marketplace

**Test Items**:
- [ ] Page title: "Verified Global Buyers"
- [ ] Search bar works
- [ ] Filter buttons work:
  - [ ] All Buyers
  - [ ] High Trust (80+)
  - [ ] Medium Trust (60-79)
  - [ ] Verified Only
- [ ] 10 buyer cards display:
  - [ ] ABC Trading Inc. (USA)
  - [ ] Euro Imports GmbH (Germany)
  - [ ] Dubai Wholesale LLC (UAE)
  - [ ] London Distributors (UK)
  - [ ] Singapore Traders (Singapore)
  - [ ] Tokyo Trading Co. (Japan)
  - [ ] Dubai Interiors (UAE)
  - [ ] Australian Imports (Australia)
  - [ ] Nordic Designs (Sweden)
  - [ ] African Arts (South Africa)
- [ ] Each card shows:
  - [ ] Company name
  - [ ] Country
  - [ ] Trust score (color-coded)
  - [ ] Verified badge
  - [ ] Products category
  - [ ] "View Profile" button
- [ ] Search filters buyers correctly
- [ ] Category filters work

---

### 6. Compliance Page Testing 📄

**URL**: http://localhost:3000/compliance

**Test Items**:
- [ ] GST Refund Tracker section displays
- [ ] 3 months of refund data show:
  - [ ] November 2024: ₹45,000 (Filed)
  - [ ] October 2024: ₹38,500 (Approved)
  - [ ] September 2024: ₹42,000 (Received)
- [ ] Progress bars work correctly
- [ ] Status badges show right colors
- [ ] Document Manager section displays
- [ ] 4 compliance documents show:
  - [ ] Letter of Undertaking (LUT)
  - [ ] IEC Code
  - [ ] Bank Certificate
  - [ ] RCMC Certificate
- [ ] Each document card shows:
  - [ ] Document name
  - [ ] Issue date
  - [ ] Expiry date
  - [ ] Status badge
  - [ ] "View" and "Download" buttons
- [ ] Alerts work for expiring documents

---

### 7. Admin Dashboard Testing 📊

**URL**: http://localhost:3000/admin

**Test Items**:
- [ ] Page title: "XportTrust Admin"
- [ ] 4 stat cards display:
  - [ ] Total Invoices
  - [ ] Active Exporters
  - [ ] Avg Advance %
  - [ ] Total Funded
- [ ] Invoice Status Chart (Bar chart) displays
- [ ] Buyer Risk Score Chart (Bar chart) displays
- [ ] Insurance Coverage Chart (Pie chart) displays
- [ ] Recent Invoices table displays
- [ ] All charts are responsive
- [ ] Data updates when invoices are added

---

### 8. API Testing 🔌

**Test Mock APIs**:

#### Risk API:
```bash
curl "http://localhost:3000/api/mock/risk?buyerName=ABC%20Corp"
```

Expected response:
```json
{
  "buyer_name": "ABC Corp",
  "risk_score": 75-85,
  "rating": "A",
  "ecgc_cover_available": true,
  "recommendations": "Approved for financing..."
}
```

#### Bank Payout API:
```bash
curl -X POST http://localhost:3000/api/mock/bank \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000000, "account": "123456789"}'
```

Expected response:
```json
{
  "success": true,
  "transaction_id": "TXN...",
  "amount": 1000000,
  "status": "completed",
  "message": "Payout successful"
}
```

#### Insurance API:
```bash
curl -X POST http://localhost:3000/api/mock/insurance \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000000, "buyer": "ABC Corp"}'
```

Expected response:
```json
{
  "success": true,
  "policy_number": "ECGC...",
  "coverage_amount": 750000,
  "premium": 7500,
  "status": "active"
}
```

---

### 9. Navigation Testing 🧭

**Test all links work**:
- [ ] Logo → Home page
- [ ] Sign In → Sign in page
- [ ] Get Started → Sign up page
- [ ] View Demo → Dashboard
- [ ] Marketplace link → Marketplace
- [ ] Compliance link → Compliance
- [ ] Admin link → Admin dashboard
- [ ] Footer links work

---

### 10. Responsive Design Testing 📱

**Test different screen sizes**:
- [ ] Desktop (1920x1080) - Full layout
- [ ] Laptop (1366x768) - Adjusted layout
- [ ] Tablet (768x1024) - 2-column grids
- [ ] Mobile (375x667) - Single column

**Use Chrome DevTools**:
1. Open DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test different devices:
   - [ ] iPhone SE
   - [ ] iPhone 14 Pro
   - [ ] iPad Air
   - [ ] Samsung Galaxy S20

---

### 11. Performance Testing ⚡

**Lighthouse Audit**:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Desktop" mode
4. Click "Analyze page load"

**Target Scores**:
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 90+

---

### 12. Browser Compatibility Testing 🌐

**Test in multiple browsers**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 🐛 Known Issues & Workarounds

### Issue: Charts not displaying
**Solution**: Refresh the page. Charts load on client-side render.

### Issue: Invoice upload doesn't work
**Solution**: The OCR is simulated. Any PDF will work, data is mocked.

### Issue: Data doesn't persist
**Solution**: Data is stored in localStorage. Clear browser data to reset.

---

## 🎯 End-to-End Test Scenario

**Complete User Flow (5 minutes)**:

1. **Landing Page** (http://localhost:3000)
   - View features
   - Click "Get Started"

2. **Sign Up** (http://localhost:3000/auth/signup)
   - Fill form with test data
   - Submit

3. **Dashboard** (http://localhost:3000/dashboard)
   - Upload invoice
   - Get financing offer
   - Accept offer
   - See payout animation

4. **Marketplace** (http://localhost:3000/marketplace)
   - Search for "ABC"
   - Filter by "High Trust"
   - View buyer profile

5. **Compliance** (http://localhost:3000/compliance)
   - Check GST refunds
   - View documents
   - Check expiry alerts

6. **Admin** (http://localhost:3000/admin)
   - View statistics
   - Check charts
   - Review recent invoices

---

## ✅ Pre-Deployment Checklist

Before deploying to Vercel, verify:

- [ ] All 7 pages load without errors
- [ ] All buttons are visible and work
- [ ] All forms function correctly
- [ ] All charts display data
- [ ] All APIs return correct responses
- [ ] Mobile view works properly
- [ ] No console errors in browser
- [ ] All images/icons load
- [ ] Animations work smoothly
- [ ] localStorage data persists

---

## 🚀 Ready to Deploy?

If all tests pass, you're ready to deploy to Vercel!

Follow these guides:
1. **QUICK_DEPLOY.md** - 5-minute deployment
2. **DEPLOYMENT_READY.md** - Complete deployment guide
3. **VERCEL_DEPLOYMENT.md** - Detailed instructions

---

## 🆘 Troubleshooting

### Server won't start:
```bash
cd "/Users/krishnakant/Desktop/Jar /xporttrust"
rm -rf .next node_modules
npm install
npm run dev
```

### Port 3000 already in use:
```bash
# Kill existing process
pkill -f "next dev"

# Or use different port
PORT=3001 npm run dev
```

### Changes not reflecting:
```bash
# Clear cache
rm -rf .next
npm run dev
```

---

## 📊 Testing Progress

Current Status: **LIVE AND RUNNING** ✅

Server: http://localhost:3000  
Status: Active 🟢  
Build: Successful ✅  

---

**Happy Testing!** 🎉

Test thoroughly, then deploy with confidence! 🚀
