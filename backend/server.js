const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());


app.use(express.json());


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const userEmail = 'poovarasan@netflixclone.com';
  const userPassword = 'Remember@9';

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required.',
    });
  }

  if (
    email.trim().toLowerCase() === userEmail &&
    password.trim() === userPassword
  ) {
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password.',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});