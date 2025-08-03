require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const argon2 = require('argon2');
const cors = require('cors');
const db = require('./db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // 1. Import it
const app = express();
const port = 3000;

const SECRET_KEY = '...';

// 2. Use cookieParser middleware BEFORE your routes
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.json());

const corsOptions = {
  origin: 'http://thing-fountain.gl.at.ply.gg:49108',
  credentials: true
};

app.use(cors(corsOptions));

// Your logging middleware (can be before or after cookieParser, but after cors is good)
app.use((req, res, next) => {
  console.log("=== Incoming Request ===");
  console.log("URL:", req.url);
  // Now req.cookies should be defined if cookies were sent
  console.log("Cookies received:", req.cookies); // Should show { test: 'peler' } now
  console.log("Raw Cookie Header:", req.headers.cookie); // Still good for comparison
  console.log("========================");
  next();
});

// Your route
app.get('/setcookie/:value', (req, res) => {
  const cookieValue = req.params.value;
  console.log(`Setting cookie: ${cookieValue}`);

  // Now req.cookies should be accessible here too
  const existingTestCookie = req.cookies?.test;
  console.log(`Existing 'test' cookie received: ${existingTestCookie}`); // Should show 'peler' on 2nd request

  res.cookie('test', cookieValue, {
    httpOnly: false,
    secure: false,
    maxAge: 60 * 60 * 1000,
    path: '/',
    // domain: '.gl.at.ply.gg',
    // sameSite: 'none'
  });

  res.send(`Cookie 'test' set to: ${cookieValue}. Previously received: ${existingTestCookie || 'None'}`);
});

app.get('/readcookie', (req, res) => {
  const testCookie = req.cookies.test;
  console.log(`Cookie received: ${testCookie}`);
  if (testCookie) {
    res.send(`The value of the 'test' cookie is: ${testCookie}`);
  } else {
    res.send('No "test" cookie was found. Please visit /setcookie/your-value first.');
  }
});

app.get('/deletecookie', (req, res) => {
  res.clearCookie('test');
  res.send('Cookie deleted');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});