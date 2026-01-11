# 🏨 East Star Hotel - Booking System

## 📚 Student Assignment - Grade 12

This is a **hotel booking website** with a backend for managing bookings and generating receipts.

---

## 🎯 What You'll Learn

1. **Frontend** (HTML, CSS, JavaScript) - User interface
2. **Backend** (JSON Server + Node.js) - Server & database
3. **REST API** - Communication between frontend & backend
4. **PDF Generation** - Creating downloadable receipts

---

## 📁 Project Structure

```
my-web/
├── XRAY.HTML          ← Website (Frontend)
├── style.css          ← Styling
├── script.js          ← Frontend JavaScript
├── db.json            ← Database (stores bookings)
├── server.js          ← Backend server
├── package.json       ← Dependencies list
└── receipts/          ← Folder for PDF receipts (auto-created)
```

---

## 🚀 How to Run the Project

### **Step 1: Install Dependencies**

Open terminal in this folder and run:

```bash
npm install
```

This will install:
- `json-server` - Creates REST API automatically
- `express` - Web server framework
- `pdfkit` - PDF generation library
- `cors` - Allows frontend to talk to backend

### **Step 2: Start the Backend Server**

```bash
npm start
```

You should see:
```
🚀 East Star Hotel Server Running!
📡 Server: http://localhost:3001
```

### **Step 3: Start JSON Server** (in a NEW terminal)

Open **another terminal** and run:

```bash
npm run json-server
```

You should see:
```
JSON Server is running on http://localhost:3000
```

### **Step 4: Open the Website**

Open `XRAY.HTML` in your browser or use Live Server.

---

## 🧪 How to Test

1. **Fill the booking form** on the website
2. Click **"Book Now"**
3. You should see:
   - ✅ Success message with booking ID
   - 📄 PDF receipt downloads automatically
   - 💾 Booking saved in `db.json`

---

## 🔍 Understanding the Backend

### **JSON Server** (Port 3000)
- Automatically creates REST API from `db.json`
- Endpoints:
  - `GET http://localhost:3000/bookings` - View all bookings
  - `GET http://localhost:3000/info` - Hotel information
  - `GET http://localhost:3000/roomPrices` - Room prices

### **Custom Server** (Port 3001)
- Located in `server.js`
- Features:
  - Receives booking data from frontend
  - Calculates total price
  - Saves booking to `db.json`
  - Generates PDF receipt
  - Sends receipt download link

---

## 📡 API Endpoints

### **POST** `/api/book` - Create a new booking
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "checkIn": "2026-01-15",
  "checkOut": "2026-01-18",
  "adults": "2 Adults",
  "children": "1 Child",
  "roomType": "VIP"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking confirmed successfully!",
  "booking": { ... },
  "receiptUrl": "/receipts/receipt_1736589234567.pdf"
}
```

### **GET** `/api/bookings` - Get all bookings

### **GET** `/receipts/:filename` - Download receipt PDF

---

## 🎨 Customization Ideas

### Easy:
1. Change room prices in `db.json`
2. Modify hotel name and contact info
3. Add more room types

### Medium:
1. Add email confirmation (using `nodemailer`)
2. Create admin dashboard to view all bookings
3. Add booking cancellation feature

### Advanced:
1. Add payment integration
2. Create user authentication
3. Add booking calendar
4. Send SMS notifications

---

## 🐛 Troubleshooting

### **Problem:** "Cannot POST /api/book"
**Solution:** Make sure `server.js` is running (`npm start`)

### **Problem:** "Failed to fetch"
**Solution:** Check if both servers are running (ports 3000 and 3001)

### **Problem:** No receipt downloads
**Solution:** Check if `receipts/` folder exists and has write permissions

### **Problem:** "Port already in use"
**Solution:** Close other programs using ports 3000 or 3001

---

## 📝 Learning Resources

- **JSON Server:** https://github.com/typicode/json-server
- **Express.js:** https://expressjs.com/
- **PDFKit:** https://pdfkit.org/
- **Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## ✅ Checklist for Students

- [ ] Installed Node.js
- [ ] Ran `npm install`
- [ ] Started both servers (3000 and 3001)
- [ ] Successfully created a booking
- [ ] Downloaded a receipt
- [ ] Checked `db.json` to see saved bookings
- [ ] Understood how frontend calls backend
- [ ] Read through `server.js` code

---

## 🌟 Assignment Tasks

### Level 1 (Basic):
1. Run the project successfully
2. Create 3 different bookings
3. Explain what each file does

### Level 2 (Intermediate):
1. Add a new field to the booking form (e.g., phone number)
2. Update backend to save this field
3. Show it in the PDF receipt

### Level 3 (Advanced):
1. Create a "View All Bookings" page
2. Add ability to search bookings by name
3. Calculate and show total revenue

---

## 📞 Support

If you have issues:
1. Check console for errors (F12 in browser)
2. Check terminal for server errors
3. Make sure both servers are running
4. Verify `db.json` is not corrupted

---

**Good luck with your assignment! 🚀**

Made with ❤️ for Grade 12 Students
