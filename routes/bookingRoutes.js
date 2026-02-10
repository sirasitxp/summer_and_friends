// routes/bookingRoutes.js
const express = require('express');
const router  = express.Router();
const db      = require('../db/db');

router.post('/', async (req, res) => {
  const { clientName, email, date, service } = req.body;
  if (!clientName || !email || !date || !service) {
    return res.status(400).send('Missing fields');
  }

  try {
    await db.query(
      `INSERT INTO bookings (name, email, date, time, service)
       VALUES (?, ?, ?, ?, ?)`,
      [clientName, email, date, '00:00:00', service]
    );
    res.send('Booking confirmed');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving booking');
  }
});

router.get('/history', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving bookings');
  }
});

module.exports = router;
