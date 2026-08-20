require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');

// Connect to MongoDB
connectDB();

// Create Express application
const app = express();
// Allow the server to read JSON
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);

const PORT = process.env.PORT || 3001;

// Home test route
app.get('/', function(req, res) {
  res.send('First-Gen Career & Life Hub API is running!');
});

// Start server
app.listen(PORT, '0.0.0.0', function() {
  console.log(`Server is running on port ${PORT}`);
});