// server.js
require('dotenv').config();                // 1. load .env up top
const express = require('express');
const path = require('path');
const db = require('./db/db');             // 2. import your MySQL pool
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 3. Static assets (css/js/img)
app.use(express.static(path.join(__dirname, 'public')));

// 4. Parsers for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 5. Mount your feature routes
app.use('/auth', authRoutes);
app.use('/booking', bookingRoutes);

// 6. Your existing "view" routes
app.get('/',        (req, res) => res.sendFile(path.join(__dirname, 'views/index.html')));
app.get('/services',(req, res) => res.sendFile(path.join(__dirname, 'views/services.html')));
app.get('/booking', (req, res) => res.sendFile(path.join(__dirname, 'views/booking.html')));
app.get('/about',   (req, res) => res.sendFile(path.join(__dirname, 'views/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views/contact.html')));
app.get('/contact/success', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/contact_success.html'))
);

// 7. Contact form handler
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact Form:', name, email, message);

  // If AJAX request, send JSON response
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({ status: 'ok', message: `Thanks, ${name}! We got your message.` });
  }

  // Otherwise redirect to success page
  res.redirect('/contact/success');
});

// 8. (Optional) Quick DB-test endpoint
app.get('/db-test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    res.send(`DB time: ${rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB connection failed');
  }
});

// 9. Start server
app.listen(PORT, () =>
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
);
