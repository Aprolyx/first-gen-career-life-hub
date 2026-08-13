const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// GET ALL CATEGORIES
router.get('/', async function(req, res) {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.json(categories);

  } catch (error) {
    res.status(500).json({
      message: 'Server error while loading categories.'
    });
  }
});

// CREATE A CATEGORY
router.post('/', async function(req, res) {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: 'Name and description are required.'
      });
    }

    const existingCategory = await Category.findOne({ name: name });

    if (existingCategory) {
      return res.status(400).json({
        message: 'Category already exists.'
      });
    }

    const category = new Category({
      name: name,
      description: description
    });

    await category.save();

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({
      message: 'Server error while creating category.'
    });
  }
});

module.exports = router;