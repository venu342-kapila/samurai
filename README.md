# 🏏 Samurai Cricket Club — Expense Tracker

A **free, mobile-first** web app for tracking your cricket team's expenses, contributions, and sponsorships. Works on any phone browser. No hosting costs.

---

## 💰 What It Does

| Feature | Description |
|---------|-------------|
| **Record Expenses** | Ground fees, equipment, travel, umpire fees, etc. |
| **Track Contributions** | Member dues, match-day collections |
| **Log Sponsorships** | Sponsor payments and funds |
| **Live Balance** | Always see: Total Income − Total Expenses = Balance |
| **Member Management** | Add team members, see who recorded what |
| **Search & Filter** | Find transactions by type, member, or keyword |
| **Works Offline** | PWA — install on phone home screen like a native app |
| **Export / Import** | Share data as JSON files via WhatsApp or email |

---

## 🚀 Setup Guide (10 Minutes, Completely Free)

### Step 1: Local Mode (Instant — No Setup)

Just open `index.html` in your phone browser. You can start recording transactions immediately. Data is saved on your device.

**To share with team:** Send the `index.html` file via WhatsApp/email. Each person opens it in their phone browser.

> ⚠️ In local mode, each person has their own separate data. Use **Export/Import** to share snapshots.

---

### Step 2: Cloud Mode (Shared Data — Free via Google Sheets)

This lets **everyone on the team see the same data** in real time. Uses Google Sheets as a free database.

#### 2a. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet
2. Name it **"Samurai Cricket Club Finances"** (or any name you like)
3. Keep it open — the app will create the required columns automatically

#### 2b. Add the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Copy the **entire contents** of the `Code.gs` file from this project and paste it in
4. Click **💾 Save** (or Ctrl+S)

#### 2c. Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Select type" → choose **Web app**
3. Set these options:
   - **Description:** `Samurai Expense Tracker API`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. You'll be asked to authorize — click **Review Permissions** → select your Google account → **Allow**
6. **Copy the Web App URL** (looks like `https://script.google.com/macros/s/AKfyc.../exec`)

#### 2d. Connect the App

1. Open the expense tracker app (index.html)
2. Tap the **⚙️ Settings** icon (top right)
3. Paste the Web App URL into the **Google Apps Script URL** field
4. Set your name as the **Default Recorder**
5. Tap **Save Settings**

✅ Done! The app now reads/writes to your Google Sheet. Share the same URL with all team members.

---

### Step 3 (Optional): Free Hosting on GitHub Pages

Instead of sharing the HTML file, host it online so everyone gets the same URL:

1. Create a free [GitHub](https://github.com) account
2. Create a new repository (e.g., `samurai-expenses`)
3. Upload these files: `index.html`, `manifest.json`, `sw.js`
4. Go to **Settings → Pages → Source → Deploy from branch → main**
5. Your app is live at: `https://yourusername.github.io/samurai-expenses/`

Share this URL with all team members. Free forever.

---

## 📱 Install on Phone (PWA)

Once the app is hosted (GitHub Pages or any HTTPS URL):

**Android:**
1. Open the URL in Chrome
2. Tap the **"Add to Home Screen"** prompt (or Menu → Install app)

**iPhone:**
1. Open the URL in Safari
2. Tap **Share → Add to Home Screen**

The app now works like a native app — with an icon on your home screen and offline support.

---

## 📊 How the Balance Works

```
Team Balance = (All Contributions + All Sponsorships) − All Expenses
```

- **Contributions** (green, +): Money coming IN from team members (dues, match fees, etc.)
- **Sponsorships** (blue, +): Money coming IN from sponsors
- **Expenses** (red, −): Money going OUT (ground, gear, travel, etc.)

The dashboard always shows the live balance based on all recorded transactions.

---

## 🔄 Sharing Data Without Cloud

If you don't want to use Google Sheets:

1. The **Treasurer** maintains the master copy of the app
2. Other members tell the Treasurer their expenses (in person, via WhatsApp)
3. The Treasurer records everything in the app
4. Periodically, the Treasurer goes to **Settings → Export JSON** and shares the file with the team
5. Team members tap **Settings → Import JSON** to see the latest data

---

## 📁 Project Files

| File | Purpose |
|------|---------|
| `index.html` | The complete app (HTML + CSS + JS in one file) |
| `manifest.json` | PWA manifest for phone installation |
| `sw.js` | Service worker for offline support |
| `Code.gs` | Google Apps Script — paste into your Sheet's script editor |
| `README.md` | This setup guide |

---

## 💡 Tips

- **Categories** help you track where money goes (Ground Fees, Equipment, Travel, etc.)
- Use **Export** regularly as a backup
- The Google Sheet itself is a great **backup** — you can always open it directly to see all data
- You can add the **same Apps Script URL** on all team members' phones — everyone shares the same data

---

## 🆓 Cost Breakdown

| Component | Cost |
|-----------|------|
| Google Sheets (database) | **Free** |
| Google Apps Script (API) | **Free** |
| GitHub Pages (hosting) | **Free** |
| The app itself | **Free** |
| **Total** | **₹0 / $0** |

---

Built with ❤️ for Samurai Cricket Club
