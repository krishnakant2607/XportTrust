#!/bin/bash

# XportTrust - Automated Deployment Script for Vercel
# This script prepares and deploys your app to Vercel

set -e  # Exit on error

echo "🚀 XportTrust Deployment Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found. Are you in the project root?${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Checking project structure...${NC}"
sleep 1
echo -e "${GREEN}✓ Project structure verified${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${BLUE}Step 2: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 3: Build the project locally to catch errors
echo -e "${BLUE}Step 3: Building project locally...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo -e "${RED}✗ Build failed. Fix errors before deploying.${NC}"
    exit 1
fi
echo ""

# Step 4: Git status
echo -e "${BLUE}Step 4: Checking Git status...${NC}"
git status --short
echo ""

# Step 5: Commit changes
echo -e "${YELLOW}Do you want to commit all changes? (y/n)${NC}"
read -r COMMIT_CHOICE
if [ "$COMMIT_CHOICE" = "y" ]; then
    echo "Enter commit message:"
    read -r COMMIT_MSG
    git add .
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✓ Changes committed${NC}"
fi
echo ""

# Step 6: Push to GitHub
echo -e "${YELLOW}Have you already created a GitHub repository? (y/n)${NC}"
read -r GITHUB_CHOICE

if [ "$GITHUB_CHOICE" = "y" ]; then
    echo "Enter your GitHub repository URL (e.g., https://github.com/username/xporttrust.git):"
    read -r REPO_URL
    
    # Check if remote exists
    if git remote | grep -q origin; then
        echo "Remote 'origin' already exists. Updating..."
        git remote set-url origin "$REPO_URL"
    else
        git remote add origin "$REPO_URL"
    fi
    
    echo -e "${BLUE}Pushing to GitHub...${NC}"
    git push -u origin main
    echo -e "${GREEN}✓ Pushed to GitHub${NC}"
else
    echo -e "${YELLOW}⚠ You need to create a GitHub repository first!${NC}"
    echo "1. Go to https://github.com/new"
    echo "2. Create a repository named 'xporttrust'"
    echo "3. Come back and run this script again"
    exit 0
fi
echo ""

# Step 7: Deploy to Vercel
echo -e "${YELLOW}Do you want to deploy to Vercel now? (y/n)${NC}"
read -r VERCEL_CHOICE

if [ "$VERCEL_CHOICE" = "y" ]; then
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
        npm install -g vercel
    fi
    
    echo -e "${BLUE}Logging into Vercel...${NC}"
    vercel login
    
    echo -e "${BLUE}Deploying to Vercel...${NC}"
    vercel --prod
    
    echo -e "${GREEN}✓ Deployed to Vercel!${NC}"
else
    echo -e "${YELLOW}Skipping Vercel deployment${NC}"
    echo "To deploy later, run: vercel --prod"
fi
echo ""

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo "1. Set up Supabase (optional)"
echo "2. Configure environment variables in Vercel"
echo "3. Test your deployed app"
echo ""
echo "Read VERCEL_DEPLOYMENT.md for detailed instructions"
