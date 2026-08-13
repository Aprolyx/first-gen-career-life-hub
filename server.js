require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
const PORT = 3001;

app.get('/', function(req, res) {
  res.send('First-Gen Career & Life Hub API is running!');
});

app.get('/api/categories', function(req, res) {
  res.json([
    'College & Education',
    'Career & Workplace',
    'Money & Adulting',
    'Confidence & Imposter Syndrome',
    'Lessons & Life Advice'
  ]);
});


app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
