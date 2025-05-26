require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB models
const ApartmentSchema = new mongoose.Schema({
  title: String,
  img: String,
  lat: Number,
  lng: Number,
  brokerEmail: String
});
const Apartment = mongoose.model('Apartment', ApartmentSchema);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get all apartments
app.get('/api/apartments', async (req, res) => {
  const apartments = await Apartment.find();
  res.json(apartments);
});

// Add a new apartment (for admin/broker)
app.post('/api/apartments', async (req, res) => {
  const apt = new Apartment(req.body);
  await apt.save();
  res.json(apt);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message, brokerEmail, apartmentId } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: brokerEmail,
    subject: `Apartment Inquiry - Apartment ID: ${apartmentId}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));