# 🚀 QUICK START GUIDE

## For Students - East Star Hotel Booking System

### ⚡ 3 Steps to Run the Project

#### **Step 1: Install Dependencies** (One-time only)
```bash
npm install
```
Wait for installation to complete (~1-2 minutes)

---

#### **Step 2: Start the Backend Server**

Open terminal and run:
```bash
npm start
```

You should see:
```
🚀 East Star Hotel Server Running!
📡 Server: http://localhost:3001
```

**⚠️ Keep this terminal open!**

---

#### **Step 3: Start JSON Server**

Open **ANOTHER terminal** (new tab/window) and run:
```bash
npm run json-server
```

You should see:
```
JSON Server is running on http://localhost:3000
```

**⚠️ Keep both terminals open!**

---

#### **Step 4: Open the Website**

1. Open `XRAY.HTML` in your web browser
   - Or use Live Server extension in VS Code
   - Or just double-click the file

2. Fill the booking form and click "Book Now"

3. ✅ Success! Receipt should download automatically

---

## 📊 View All Bookings (Admin Panel)

Open `admin.html` in your browser to see:
- All bookings in a table
- Total revenue
- Download receipts
- Search bookings

---

## 🎯 Testing the System

### Test Booking Details:
- **Name:** Your Name
- **Email:** student@example.com
- **Check-In:** Tomorrow's date
- **Check-Out:** 3 days later
- **Room Type:** VIP
- **Adults:** 2
- **Children:** 1

Click **Book Now** and watch the magic! 🎉

---

## 🐛 Common Issues

### "Cannot connect to server"
**Fix:** Make sure both servers are running (ports 3000 and 3001)

### "Port already in use"
**Fix:** Close other programs or restart your computer

### Dependencies not installing
**Fix:** Make sure you have Node.js installed. Download from: https://nodejs.org/

---

## 📁 Where is Everything?

- **Bookings Database:** `db.json`
- **PDF Receipts:** `receipts/` folder
- **Backend Code:** `server.js`
- **Frontend Code:** `script.js`

---

## 🎓 What Does Each Server Do?

### Server 1 (Port 3001) - Custom Server
- Receives booking requests
- Calculates prices
- Generates PDF receipts
- Saves to database

### Server 2 (Port 3000) - JSON Server
- Creates REST API automatically
- Allows viewing all data
- No code needed!

---

## ✨ Features

✅ Book hotel rooms
✅ Automatic price calculation
✅ PDF receipt generation
✅ Download receipts
✅ Admin dashboard
✅ Search bookings
✅ View statistics

---

## 🎯 Your Assignment Tasks

### Basic (Everyone):
1. ✅ Run the project
2. ✅ Create 5 different bookings
3. ✅ View bookings in admin panel
4. ✅ Download a receipt

### Intermediate:
1. ✅ Add phone number field to booking form
2. ✅ Show phone number in receipt PDF
3. ✅ Explain how frontend talks to backend

### Advanced:
1. ✅ Add a cancellation feature
2. ✅ Create email notifications
3. ✅ Add booking confirmation page

---

## 🆘 Need Help?

1. Read error messages carefully
2. Check both terminal windows
3. Make sure both servers are running
4. Press F12 in browser to see console errors

---

**Ready? Let's go! 🚀**

Run: `npm install` → `npm start` → `npm run json-server`
