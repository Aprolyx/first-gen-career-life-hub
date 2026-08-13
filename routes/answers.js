const express = require('express');
const Answer = require('../models/Answer');

const router = express.Router();

// GET ANSWERS FOR A QUESTION
router.get('/question/:questionId', async function(req, res) {
  try {
    const answers = await Answer.find({
      question: req.params.questionId
    })
      .populate('author', 'username')
      .sort({ createdAt: 1 });

    res.json(answers);

  } catch (error) {
    res.status(500).json({
      message: 'Server error while loading answers.'
    });
  }
});

// CREATE AN ANSWER
router.post('/', async function(req, res) {
  try {
    const { body, question, author } = req.body;

    if (!body || !question || !author) {
      return res.status(400).json({
        message: 'Answer, question, and author are required.'
      });
    }

    const answer = new Answer({
      body: body,
      question: question,
      author: author
    });

    await answer.save();

    res.status(201).json(answer);

  } catch (error) {
    res.status(500).json({
      message: 'Server error while creating answer.'
    });
  }
});

module.exports = router;
