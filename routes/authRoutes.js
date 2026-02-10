const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db/db');

// Serve signup page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// Process signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password]
    );
    res.send('Signup successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// Serve login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Process login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT id FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    if (rows.length > 0) {
      res.send('Login successful');
    } else {
      res.send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
