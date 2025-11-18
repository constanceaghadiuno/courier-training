# Quick Deployment Guide

## Option 1: Lovable.dev (Easiest)
1. Go to lovable.dev
2. Create new project
3. Upload your project files or connect to GitHub
4. Lovable will auto-detect Vite config and deploy
5. Done!

## Option 2: Replit
1. Go to replit.com
2. Click "Create Repl"
3. Choose "Import from GitHub" or upload files
4. Replit will detect Node.js and install dependencies
5. Click "Run" - it'll start on port 3000
6. Click the URL to view your deployed site

## Option 3: Vercel (Professional, Free)
1. Push your code to GitHub
2. Go to vercel.com and sign in with GitHub
3. Click "Import Project"
4. Select your repository
5. Vercel auto-detects Vite - just click "Deploy"
6. You get a free .vercel.app domain

## Option 4: Netlify (Also Professional, Free)
1. Push your code to GitHub  
2. Go to netlify.com and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

## Option 5: GitHub Pages (Free, Static Hosting)
1. Push code to GitHub repository
2. In repo settings → Pages
3. Source: GitHub Actions
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

5. Site will be at: `https://yourusername.github.io/courier-training/`

## Quick Start (Local Testing)

```bash
# 1. Extract files
tar -xzf courier-training.tar.gz
cd courier-training

# 2. Install dependencies  
npm install

# 3. Run development server
npm run dev

# 4. Open browser to http://localhost:3000
```

## What You Get

✅ Modern, fast React app  
✅ Mobile-responsive design  
✅ Progress tracking (localStorage)  
✅ All your content organized in 3 modules  
✅ Clean, professional look  
✅ No database required  
✅ Works on any static hosting

## Customization

### Change Colors
Edit `tailwind.config.js` to customize the color scheme

### Modify Content  
Content is in `src/*-content.json` files - edit these to update text

### Add Analytics
Add Google Analytics or similar in `index.html`

## Notes

- No backend needed - everything runs client-side
- Progress is saved in browser localStorage
- Free to host anywhere that supports static sites
- No ongoing costs
- No maintenance required

---

Choose the platform that feels easiest. Lovable and Replit are probably the simplest for just getting it online quickly.
