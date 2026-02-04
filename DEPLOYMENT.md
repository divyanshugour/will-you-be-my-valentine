# Deployment to Vercel

## Prerequisites
- GitHub account with the repository pushed
- Vercel account (free at https://vercel.com)
- Firebase project configured

## Step-by-Step Deployment

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Updated valentine app with all features"
git push origin main
```

### 2. Connect to Vercel

**Option A: Using Vercel Dashboard (Easiest)**
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository `will-you-be-my-valentine`
4. Click "Import"

**Option B: Using Vercel CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts to link your project

### 3. Set Environment Variables in Vercel

After connecting your repo, go to:
1. Project Settings → Environment Variables
2. Add these variables:

```
VITE_FIREBASE_API_KEY=AIzaSyBG3Z1HBK_DCrp0BCRX84rLJnSdHtjJ-F0
VITE_FIREBASE_AUTH_DOMAIN=will-you-be-my-valentine-a0935.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://will-you-be-my-valentine-a0935.firebaseio.com
VITE_FIREBASE_PROJECT_ID=will-you-be-my-valentine-a0935
VITE_FIREBASE_STORAGE_BUCKET=will-you-be-my-valentine-a0935.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=485737430924
VITE_FIREBASE_APP_ID=1:485737430924:web:ae40c7a4e1837d423ea0a9
```

### 4. Deploy

**If using dashboard:** Vercel auto-deploys on every push to main

**If using CLI:**
```bash
vercel --prod
```

### 5. Custom Domain (Optional)

1. In Vercel project settings → Domains
2. Add your custom domain
3. Update DNS settings according to Vercel's instructions

## Your Live App

Once deployed, you'll get a URL like: `https://will-you-be-my-valentine-xxxxx.vercel.app`

## Key Features

✅ **User A Flow:**
- Fills form with name, chooses Valentine day, adds GIF URL, writes message
- Gets shareable link (no day in URL, stored in Firebase)

✅ **User B Flow:**
- Opens shared link
- Sees valentine with theme based on selected day
- "Will you be my Valentine?" message with User A's message
- User A's GIF displayed
- Yes/No buttons with scaling logic (No button moves/changes message, Yes button grows)

✅ **7 Valentine Days:**
- 🌷 Propose Day (Purple theme)
- 🍫 Chocolate Day (Brown theme)
- 🧸 Teddy Day (Pink theme)
- 🤝 Promise Day (Red/Orange theme)
- 🤗 Hug Day (Yellow/Orange theme)
- 💋 Kiss Day (Hot Pink theme)
- 💖 Valentine's Day (Original pink/purple theme)

✅ **Each day has its own theme colors** - applied dynamically when viewing

## Troubleshooting

**Valentine not loading?**
- Check Firebase Database Rules are set to allow read/write in test mode
- Verify environment variables are correctly set in Vercel

**Styling looks wrong?**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Links not working?**
- Make sure Firebase Database URL is accessible
- Check Firebase project is active

