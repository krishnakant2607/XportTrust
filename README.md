# XportTrust - Export Financing Platform

A trust-first digital platform for small exporters, providing instant invoice factoring and financing. Built as a free, hosted MVP demo.

## 🎯 Features

- **Exporter Onboarding**: Simple registration with GST and business details
- **Invoice Upload & OCR**: Drag-and-drop invoice upload with automatic text extraction
- **Risk Assessment**: Mock buyer risk scoring (0-100 scale)
- **Instant Offers**: Automated financing offers with transparent fee breakdown
- **Escrow Protection**: Smart escrow for high-risk buyers
- **Admin Dashboard**: Monitor platform metrics and activity
- **Fully Mocked APIs**: No paid dependencies or real payment processing

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Database**: Supabase (Free Postgres)
- **Auth**: NextAuth with Email Magic Links
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **OCR**: Tesseract.js (client-side)
- **State**: Zustand
- **Hosting**: Vercel (Free)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier)
- Vercel account (free tier)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd xporttrust
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**

- Go to [supabase.com](https://supabase.com) and create a new project
- Once created, go to Project Settings → API
- Copy your project URL and anon/public key
- Go to SQL Editor and run the SQL from `supabase-schema.sql`
- (Optional) Set up Storage: Create a bucket named "invoices" with public access

4. **Configure environment variables**

Create `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

# Mailtrap (optional for email - or skip and use localStorage auth)
MAILTRAP_USER=your-mailtrap-user
MAILTRAP_PASS=your-mailtrap-pass
```

To generate a secret for NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Using the Demo

### As an Exporter

1. **Sign Up**: Navigate to `/auth/signup` and create an account
2. **Upload Invoice**: Click "Upload Invoice" and drag/drop a file
3. **Fill Details**: The OCR will attempt to extract data, or enter manually
4. **Review Offer**: Get instant financing offer based on buyer risk
5. **Accept**: Accept the offer and watch the simulated payout process
6. **View Dashboard**: Track all invoices and funding status

### As Admin

1. Navigate to `/admin` to view the admin dashboard
2. See metrics: total invoices, exporters, average advance %, total funded
3. View charts: status distribution and buyer risk heatmap
4. Monitor recent activity

## 📊 Mock Data & APIs

The app includes several mock APIs that simulate real services:

- **`/api/mock/risk`**: Buyer risk scoring (GET)
- **`/api/mock/bank`**: Bank payout simulation (POST)
- **`/api/mock/insurance`**: Insurance cover issuance (POST)

Mock buyer data in `lib/mockData.ts`:
- Maple Home: Risk Score 74 (Low Risk)
- Casa Decor: Risk Score 49 (Medium Risk)
- Unknown Importer: Risk Score 22 (High Risk)

## 🌐 Deployment to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables from `.env.local`
- Deploy!

3. **Update NEXTAUTH_URL**
After deployment, update your `.env.local` in Vercel:
```
NEXTAUTH_URL=https://your-app.vercel.app
```

## 📁 Project Structure

```
xporttrust/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── auth/
│   │   ├── signin/page.tsx     # Sign in
│   │   └── signup/page.tsx     # Sign up
│   ├── dashboard/page.tsx      # Exporter dashboard
│   ├── admin/page.tsx          # Admin dashboard
│   └── api/
│       └── mock/               # Mock API routes
├── components/
│   ├── ui/                     # shadcn/ui components
│   └── dashboard/              # Dashboard components
├── lib/
│   ├── supabaseClient.ts       # Supabase client
│   ├── mockData.ts             # Mock data & logic
│   ├── ocr.ts                  # OCR utilities
│   ├── store.ts                # Zustand store
│   └── utils.ts                # Helper functions
└── supabase-schema.sql         # Database schema
```

## 🎨 Design System

### Colors
- Primary: `#2563EB` (Blue 600)
- Accent: `#F59E0B` (Amber 500)
- Background: `#F9FAFB` (Gray 50)
- Success: `#10B981` (Green 500)
- Error: `#EF4444` (Red 500)

### Typography
- Font: Inter
- Base size: 14-18px
- Headings: Semi-bold

## 🔒 Security Notes (For Production)

This is a **prototype/demo** app. For production:

1. Implement proper authentication (not localStorage)
2. Add server-side validation for all inputs
3. Set up proper RLS policies in Supabase
4. Use environment-specific configs
5. Add rate limiting and CORS
6. Implement proper error handling
7. Add audit logs
8. Encrypt sensitive data
9. Use real payment processing (Razorpay, Stripe, etc.)
10. Comply with financial regulations

## 📝 License

MIT - Free to use for demonstration and learning purposes.

## 🤝 Contributing

This is a prototype project. Feel free to fork and modify for your needs!

---

**Built with ❤️ for small exporters**
