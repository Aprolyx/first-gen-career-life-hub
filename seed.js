const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Category = require('./models/Category');
const Question = require('./models/Question');

dotenv.config();

const categories = [
  {
    name: 'Career & Workplace',
    description:
      'Questions about resumes, interviews, workplace expectations, networking, and professional growth.'
  },
  {
    name: 'College & Education',
    description:
      'Questions about college, degrees, graduate school, and navigating education as a first-generation student.'
  },
  {
    name: 'Confidence & Imposter Syndrome',
    description:
      'Questions about confidence, belonging, self-doubt, and navigating spaces where you may feel like the first.'
  },
  {
    name: 'Lessons & Life Advice',
    description:
      'Questions about mistakes, lessons learned, personal growth, and advice you wish someone had shared earlier.'
  },
  {
    name: 'Money & Adulting',
    description:
      'Questions about budgeting, credit, housing, saving money, and navigating adult responsibilities.'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected.');

    const existingCategories = await Category.find();

    if (existingCategories.length > 0) {
      console.log('Categories already exist. No new categories were added.');
    } else {
      await Category.insertMany(categories);

      console.log('Example categories added.');
    }

    console.log('Seed complete.');

    await mongoose.connection.close();

  } catch (error) {
    console.error('Seed failed:', error.message);

    await mongoose.connection.close();
  }
}

seedDatabase();