// ===================================
// EAST STAR HOTEL - BACKEND SERVER
// ===================================
// This server works WITH json-server to add extra features
// Run this file with: node server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001; // Different port from json-server (which runs on 3000)

// ===================================
// MIDDLEWARE (Helper functions)
// ===================================
app.use(cors()); // Allow requests from browser
app.use(bodyParser.json()); // Parse JSON data
app.use(express.static('.')); // Serve HTML, CSS, JS files

// ===================================
// CREATE RECEIPTS FOLDER
// ===================================
const receiptsDir = path.join(__dirname, 'receipts');
if (!fs.existsSync(receiptsDir)) {
    fs.mkdirSync(receiptsDir);
}

// ===================================
// FUNCTION: Calculate Total Price
// ===================================
function calculatePrice(roomType, checkIn, checkOut) {
    const prices = {
        'Single Standard': 1500,
        'Double Standard': 2500,
        'Twin': 3000,
        'Delux': 4500,
        'Suit': 6000,
        'VIP': 8000
    };

    const price = prices[roomType] || 2500;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const nights = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));

    return {
        pricePerNight: price,
        numberOfNights: nights > 0 ? nights : 1,
        totalPrice: price * (nights > 0 ? nights : 1)
    };
}

// ===================================
// FUNCTION: Generate PDF Receipt
// ===================================
function generateReceipt(booking) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const fileName = `receipt_${booking.id}.pdf`;
        const filePath = path.join(receiptsDir, fileName);

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Header with hotel name
        doc.fontSize(25).fillColor('#007B9E').text('EAST STAR HOTEL', { align: 'center' });
        doc.fontSize(12).fillColor('#666').text('Dire Dawa, Ethiopia', { align: 'center' });
        doc.moveDown();

        // Receipt title
        doc.fontSize(18).fillColor('#333').text('BOOKING RECEIPT', { align: 'center' });
        doc.moveDown();

        // Booking ID and Date
        doc.fontSize(10).fillColor('#666').text(`Receipt Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.fontSize(12).fillColor('#007B9E').text(`Booking ID: ${booking.id}`, { align: 'left' });
        doc.moveDown(2);

        // Customer Information
        doc.fontSize(14).fillColor('#007B9E').text('Customer Information:', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor('#333');
        doc.text(`Name: ${booking.name}`);
        doc.text(`Email: ${booking.email}`);
        doc.moveDown(2);

        // Booking Details
        doc.fontSize(14).fillColor('#007B9E').text('Booking Details:', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor('#333');
        doc.text(`Room Type: ${booking.roomType}`);
        doc.text(`Check-In Date: ${booking.checkIn}`);
        doc.text(`Check-Out Date: ${booking.checkOut}`);
        doc.text(`Number of Adults: ${booking.adults}`);
        doc.text(`Number of Children: ${booking.children}`);
        doc.text(`Number of Nights: ${booking.numberOfNights}`);
        doc.moveDown(2);

        // Price Breakdown
        doc.fontSize(14).fillColor('#007B9E').text('Price Details:', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor('#333');
        doc.text(`Price per Night: ${booking.pricePerNight} ETB`);
        doc.text(`Total Nights: ${booking.numberOfNights}`);
        doc.moveDown();
        doc.fontSize(14).fillColor('#007B9E').text(`TOTAL AMOUNT: ${booking.totalPrice} ETB`, { bold: true });
        doc.moveDown(3);

        // Footer
        doc.fontSize(10).fillColor('#666');
        doc.text('Thank you for choosing East Star Hotel!', { align: 'center' });
        doc.text('For inquiries: +251 911 22 33 44 | info@eaststarhotel.com', { align: 'center' });

        doc.end();

        stream.on('finish', () => {
            resolve(fileName);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

// ===================================
// API ENDPOINT: Create Booking & Generate Receipt
// ===================================
app.post('/api/book', async (req, res) => {
    try {
        const bookingData = req.body;

        // Calculate pricing
        const pricing = calculatePrice(
            bookingData.roomType,
            bookingData.checkIn,
            bookingData.checkOut
        );

        // Create booking with ID
        const booking = {
            id: Date.now(), // Simple ID based on timestamp
            ...bookingData,
            ...pricing,
            bookingDate: new Date().toISOString(),
            status: 'Confirmed'
        };

        // Save to db.json using JSON Server
        const dbPath = path.join(__dirname, 'db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        db.bookings.push(booking);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

        // Generate PDF receipt
        const receiptFileName = await generateReceipt(booking);

        // Send response
        res.json({
            success: true,
            message: 'Booking confirmed successfully!',
            booking: booking,
            receiptUrl: `/receipts/${receiptFileName}`
        });

        console.log(`✅ New booking created: ${booking.id} for ${booking.name}`);

    } catch (error) {
        console.error('❌ Error creating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Booking failed. Please try again.'
        });
    }
});

// ===================================
// API ENDPOINT: Download Receipt
// ===================================
app.get('/receipts/:filename', (req, res) => {
    const filePath = path.join(receiptsDir, req.params.filename);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send('Receipt not found');
    }
});

// ===================================
// API ENDPOINT: Get All Bookings
// ===================================
app.get('/api/bookings', (req, res) => {
    try {
        const dbPath = path.join(__dirname, 'db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        res.json(db.bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
});

// ===================================
// START SERVER
// ===================================
app.listen(PORT, () => {
    console.log(`\n🚀 East Star Hotel Server Running!`);
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`📋 JSON Server should run on: http://localhost:3000`);
    console.log(`\n💡 To start JSON Server, run: npm run json-server\n`);
});
