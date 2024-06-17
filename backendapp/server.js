// server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://mongohub:Cand6&ff001@cluster0.i2feedp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Nodemailer transporter setup (use your SMTP settings)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codeforcerdev@gmail.com', // Replace with your email address
    pass: 'bxlesltvxhnxxmkf' // Replace with your email password
  }
});


//Youtube api
const YOUTUBE_API_KEY = 'AIzaSyBZmkPE1yvid_BgMMMiIYTqS_qf3PHX4Vw';

app.get('/api/videos', async (req, res) => {
  const { subject } = req.query;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: subject,
          key: YOUTUBE_API_KEY,
        },
      }
    );
    const videos = response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
    }));
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).send('Error fetching videos');
  }
});
// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Send welcome email
    const mailOptions = {
      from: 'codeforcerdev@gmail.com',
      to: email,
      subject: 'Welcome to QuickLearn!',
      html: `<h1>Welcome, ${username}!</h1><p>Thank you for registering with QuickLearn.</p><br/><img src="./vite.svg" alt="Welcome Image" style="width: 100%; max-width: 600px;">`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed:', error);
        return res.status(500).json({ message: 'Registration successful but failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Registration successful' });
      }
    });

  } catch (error) {
    console.error('Registration failed:', error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    return res.status(200).json({ token });

  } catch (error) {
    console.error('Login failed:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
});

// Protected route example (dashboard)
app.get('/api/dashboard', verifyToken, (req, res) => {
  jwt.verify(req.token, 'your_secret_key', (err, authData) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    } else {
      return res.json({ message: 'Welcome to the dashboard!', authData });
    }
  });
});

// Verify token function
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
