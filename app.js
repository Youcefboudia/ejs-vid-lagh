const qr = require('qrcode');
const express = require('express');
const app = express();

// Define an array to store user data
const users = [
  { id: 1, name: 'John Doe', profileUrl: '/profile/1' },
  { id: 2, name: 'Jane Smith', profileUrl: '/profile/2' },
  // Add more user data as needed
];

// Generate QR code for each user and store the image URLs
const userQRCodes = [];
users.forEach((user) => {
  const qrCodeImage = `qrcodes/user_${user.id}.png`;
  userQRCodes.push({ userId: user.id, qrCodeImage });
  qr.toFile(qrCodeImage, user.profileUrl);  
});

// Serve the QR code images
app.use('/qrcodes', express.static('qrcodes'));

app.get('/scan/:userId', (req, res) => {
  const userId = req.params.userId;

  const userQRCode = userQRCodes.find((item) => item.userId === parseInt(userId));
  if (userQRCode) {
    res.redirect(userQRCode.qrCodeImage);
  } else {
    res.send('Invalid QR code');
    }
});

