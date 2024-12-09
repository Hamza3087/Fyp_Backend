const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Bilalkhan:Pakistan@cluster1.moct8fi.mongodb.net/EmpoweredAI')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Export the app for Vercel
module.exports = app;
