# First-Gen Career & Life Hub

First-Gen Career & Life Hub is a full-stack forum designed to create a supportive online community for first-generation students and professionals.

Users can create an account, log in, explore topic categories, ask questions, and respond to questions posted by other members of the community.

## Purpose

Being first-generation can mean navigating college, careers, finances, confidence, and adulthood without always having someone to ask for guidance.

This application provides a space where first-generation users can share questions, experiences, and advice with one another.

## Features

- User registration with form validation
- Secure password hashing
- User login with invalid login error handling
- Logout functionality
- Dashboard that displays the logged-in username
- Forum categories stored in MongoDB
- Questions organized by category
- Questions displayed in chronological order
- Users can post new questions
- Users can view answers to questions
- Users can post answers
- Question and answer timestamps
- Responsive styling for desktop and mobile

## Technologies Used

### Frontend
- React
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Other Tools
- bcryptjs for password hashing
- dotenv for environment variables
- CORS for frontend and backend communication
- Git and GitHub for version control

## Installation Instructions

### 1. Clone the Repository

Clone this project from GitHub and open the project folder in Visual Studio Code.

### 2. Install Backend Dependencies

From the main project folder, run:

```bash
npm install

## Project Structure

```text
project-4-first-gen-hub/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   └── Register.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
│
├── config/
│   └── db.js
│
├── models/
│   ├── Answer.js
│   ├── Category.js
│   ├── Question.js
│   └── User.js
│
├── routes/
│   ├── answers.js
│   ├── auth.js
│   ├── categories.js
│   └── questions.js
│
├── .gitignore
├── package.json
├── README.md
└── server.js
```
## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Categories

```text
GET /api/categories
```

### Questions

```text
GET /api/questions/category/:categoryId
POST /api/questions
```

### Answers

```text
GET /api/answers/question/:questionId
POST /api/answers
```

## Application Theme

The First-Gen Career & Life Hub organizes community discussions into five categories:

- College & Education
- Career & Workplace
- Money & Adulting
- Confidence & Imposter Syndrome
- Lessons & Life Advice

These categories allow users to ask questions and share experiences related to common challenges faced while navigating education, careers, and adulthood as a first-generation student or professional.

## Future Improvements

Future versions of the First-Gen Career & Life Hub could include:

1. User profiles with optional bios and interests.
2. Search functionality for questions and categories.
3. Upvoting or liking helpful answers.
4. Editing or deleting a user's own questions and answers.
5. Additional categories and community resources.
6. Notifications when someone responds to a question.

## Author

April Sanchez

Software Engineering – CSU San Marcos Program
