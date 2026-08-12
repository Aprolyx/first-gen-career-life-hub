const express = require('express');

const app = express();

app.use(express.json());

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
