const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// GET QUESTIONS FOR A CATEGORY
router.get('/category/:categoryId', async function(req, res) {
  try {
    const questions = await Question.find({
      category: req.params.categoryId
    })
      .populate('author', 'username')
      .sort({ createdAt: 1 });

    res.json(questions);

  } catch (error) {
    res.status(500).json({
      message: 'Server error while loading questions.'
    });
  }
});

// CREATE A QUESTION
router.post('/', async function(req, res) {
  try {
    const { title, body, category, author } = req.body;

    if (!title || !body || !category || !author) {
      return res.status(400).json({
        message: 'Title, body, category, and author are required.'
      });
    }

    const question = new Question({
      title: title,
      body: body,
      category: category,
      author: author
    });

    await question.save();

    res.status(201).json(question);

  } catch (error) {
    res.status(500).json({
      message: 'Server error while creating question.'
    });
  }
});

module.exports = router;