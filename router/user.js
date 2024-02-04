const express = require("express")
const db = require("../db")
const crypto = require('crypto-js');
const router = express.Router()


// Registerr

router.post('/register', (req, res) => {
    const { username, password } = req.body;    
    const passwordHash = crypto.SHA256(password).toString();
    
    db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Registration failed' });
      } else {
        res.status(201).json({ message: 'Registration successful', userId: results.insertId });
      }
    });
  });
  
  // Login

  router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // console.log(username);
    // console.log(password);
    const passwordHash = crypto.SHA256(password).toString();
      
    db.query('SELECT * FROM users WHERE username = ? AND password_hash = ?', [username, passwordHash], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Login failed' });
      } else if (results.length === 0) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        res.json({ message: 'Login successful', user: results[0] });
      }
    });
  });

  module.exports = router