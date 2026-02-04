# Quick Start Guide

## 🚀 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm build

# Preview production build
npm preview
```

Dev server runs at: `http://localhost:5173`

---

## 📋 Project Structure

```
will-you-be-my-valentine/
├── src/
│   ├── components/
│   │   ├── ValentineForm.jsx      # Form to create valentine
│   │   ├── ViewValentine.jsx      # View valentine with Yes/No
│   │   └── ShareLink.jsx          # Share link display
│   ├── App.jsx                    # Main app logic & routing
│   ├── App.css                    # All styling
│   ├── firebase.js                # Firebase config
│   └── main.jsx                   # Entry point
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite config
├── .env                           # Firebase credentials
├── APP_FLOW.md                    # Detailed flow documentation
└── DEPLOYMENT.md                  # Deployment instructions
```

---

## ⚙️ Environment Setup

Your `.env` file is already configured with:
- ✅ Firebase API Key
- ✅ Auth Domain
- ✅ Database URL
- ✅ Project ID
- ✅ Storage Bucket
- ✅ Messaging Sender ID
- ✅ App ID

All variables use `VITE_` prefix for Vite compatibility.

---

## 🧪 Testing Locally

### Test Form Submission
1. Open `http://localhost:5173`
2. Fill in the form with test data
3. Click "Generate Link"
4. Copy the generated link

### Test Valentine View
1. Open shared link (same browser or new browser)
2. Verify theme colors match selected day
3. Test Yes button (should show celebration)
4. Test No button (message should change, Yes button grows)

---

## 📦 Dependencies

- **react** (18.2.0) - UI framework
- **react-dom** (18.2.0) - React rendering
- **firebase** (10.0.0) - Backend database
- **vite** (5.0.0) - Build tool
- **@vitejs/plugin-react** (4.0.0) - React support for Vite

---

## 🔒 Firebase Database Rules

When you create Firebase project, set these rules:

```json
{
  "rules": {
    "valentines": {
      ".read": true,
      ".write": true,
      "$uid": {
        ".validate": "newData.hasChildren(['name', 'day', 'message'])"
      }
    }
  }
}
```

This allows:
- Anyone to read any valentine
- Anyone to create new valentine
- Requires `name`, `day`, and `message` fields

---

## 🎯 Key Features Implemented

✅ Form with 7 Valentine days  
✅ Unique ID generation (no day in URL)  
✅ Firebase Realtime Database storage  
✅ Dynamic theme based on day  
✅ Yes button grows on No click  
✅ No button message changes  
✅ Celebration animation on Yes  
✅ Responsive design  
✅ Smooth animations  

---

## 🚢 Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions.

Quick steps:
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy!

---

## 💡 Tips

- **Link Format:** `https://yoursite.com?id=val_1707033600000_abc12345`
- **Day NOT in URL:** Theme is applied from database value only
- **Test Mode:** Firebase allows read/write without authentication
- **Custom Domain:** Can be added after deployment to Vercel

---

## ❓ FAQ

**Q: Why isn't the form visible?**  
A: Clear browser cache and hard refresh (Ctrl+Shift+R)

**Q: Valentine not loading?**  
A: Check Firebase Database URL is accessible and rules allow read

**Q: How do I change the default page?**  
A: Edit `src/App.jsx` line 14: `setMode('form')` → change to `'home'` or `'share'`

**Q: Can I add more days?**  
A: Yes! Add to `days` array in `ValentineForm.jsx` and add theme in `ViewValentine.jsx`

