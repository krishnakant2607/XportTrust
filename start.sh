#!/bin/bash

# XportTrust Quick Start Script
# Run this to start the development server

echo "🚀 Starting XportTrust v2.0..."
echo ""

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clear Next.js cache
echo "🧹 Clearing cache..."
rm -rf .next

# Start dev server
echo "✨ Starting server..."
echo ""
echo "Your app will be available at:"
echo "👉 http://localhost:3000"
echo ""
echo "📄 Pages to try:"
echo "   • http://localhost:3000 (Landing)"
echo "   • http://localhost:3000/marketplace (Buyers)"
echo "   • http://localhost:3000/compliance (GST & Compliance)"
echo "   • http://localhost:3000/admin (Analytics)"
echo ""

npm run dev
