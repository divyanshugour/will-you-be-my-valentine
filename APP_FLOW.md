# Will You Be My Valentine - App Flow

## 📱 Complete User Journey

### **Phase 1: User A Creates Valentine**

1. **Form Page** (Default landing page)
   - User A enters their name
   - Selects Valentine day from dropdown:
     - 🌷 Propose Day
     - 🍫 Chocolate Day
     - 🧸 Teddy Day
     - 🤝 Promise Day
     - 🤗 Hug Day
     - 💋 Kiss Day
     - 💖 Valentine's Day
   - Adds optional GIF/Image URL
   - Writes romantic message
   - Clicks "Generate Link"

2. **Data Stored in Firebase**
   - Valentine stored in Firebase Realtime Database
   - Day selection stored (used for theming only)
   - Day is NOT included in the URL
   - Unique ID generated (format: `val_timestamp_random`)

3. **Share Page**
   - User A gets shareable link: `https://yoursite.com?id=val_xxxxx`
   - Link has NO day parameter in URL
   - User A can copy & share via WhatsApp, SMS, etc.

---

### **Phase 2: User B Opens Shared Link**

1. **Link Redirect**
   - User B clicks shared link
   - App detects `?id=xxxxx` in URL
   - Fetches data from Firebase

2. **Valentine Display Page**
   - **Theme Applied:** Based on the day User A selected
   - **Header:** Shows "🎀 [User A Name] Says: 🎀"
   - **Content:**
     - User A's GIF/Image (centered)
     - "Will you be my Valentine?" text
     - User A's personal message
     - Yes/No buttons

3. **Interactive Buttons**
   - **Yes Button:**
     - Grows larger on click
     - Shows celebration: "🎉 You said YES! 🎉"
     - Displays celebration emojis and message
   
   - **No Button:**
     - Changes message on hover/click: "are you sure?", "fir se soch lo", etc.
     - Button escapes from cursor (moves around)
     - Yes button grows with each No click
     - Classic playful prank effect

---

## 🎨 Theme System

Each day has its own color scheme and emoji:

| Day | Theme | Colors | Emoji |
|-----|-------|--------|-------|
| Propose Day | Purple gradient | #667eea → #764ba2 | 🌷 |
| Chocolate Day | Brown gradient | #8B4513 → #D2691E | 🍫 |
| Teddy Day | Pink gradient | #FFB6C1 → #FF69B4 | 🧸 |
| Promise Day | Red/Orange | #FF6B6B → #FF8E72 | 🤝 |
| Hug Day | Yellow/Orange | #FFD93D → #FFA502 | 🤗 |
| Kiss Day | Hot Pink | #FF69B4 → #FF1493 | 💋 |
| Valentine's Day | Pink/Purple | #ff9ac8 → #ff6ea1 | 💖 |

**Important:** Theme is applied ONLY from the stored day value in Firebase, NOT from URL. This ensures:
- ✅ User A can share same link multiple times
- ✅ No URL pollution
- ✅ Clean, beautiful shareable links
- ✅ Each day maintains its unique visual identity

---

## 🗄️ Firebase Structure

```
valentines/
  └── val_1707033600000_abc12345/
      ├── name: "John"
      ├── day: "kissday"
      ├── imageUrl: "https://media.giphy.com/..."
      ├── message: "I love you so much..."
      └── createdAt: "2024-02-04T18:00:00.000Z"
```

**Database Rules:**
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

---

## 🚀 Deployment Checklist

- [ ] Firebase Realtime Database is created and accessible
- [ ] Database rules allow read/write
- [ ] `.env` file has all Firebase credentials (VITE_ prefix)
- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] Environment variables set in Vercel dashboard
- [ ] Test create a valentine from form
- [ ] Test open shared link from different browser/device
- [ ] Verify theme applies correctly
- [ ] Verify Yes/No button functionality

---

## 📝 Technical Notes

- **Framework:** React 18 + Vite
- **Database:** Firebase Realtime Database
- **Hosting:** Vercel
- **Styling:** CSS with dynamic theme gradients
- **Animation:** CSS keyframes for hearts, buttons, celebrations
- **No Authentication:** Public read/write (test mode)

