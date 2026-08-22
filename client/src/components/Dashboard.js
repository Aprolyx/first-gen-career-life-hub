import { useEffect, useState } from 'react';

function Dashboard({ username, userId, handleLogout }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');

  const [answerText, setAnswerText] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(function() {
    async function loadCategories() {
      try {
        const response = await fetch(
         'https://first-gen-career-life-hub.onrender.com/api/categories'
        );

        const data = await response.json();

        setCategories(data);

      } catch (error) {
        console.log('Unable to load categories.');
      }
    }

    loadCategories();
  }, []);

  async function selectCategory(category) {
    setSelectedCategory(category);
    setSelectedQuestion(null);
    setAnswers([]);

   try {
  const response = await fetch(
    `https://first-gen-career-life-hub.onrender.com/api/questions/category/${category._id}`
  );

      const data = await response.json();

      setQuestions(data);

    } catch (error) {
      console.log('Unable to load questions.');
    }
  }

  async function handleQuestionSubmit(event) {
    event.preventDefault();

    if (!questionTitle.trim() || !questionBody.trim()) {
      return;
    }

    try {
const response = await fetch(
  'https://first-gen-career-life-hub.onrender.com/api/questions',
  {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
          body: JSON.stringify({
            title: questionTitle,
            body: questionBody,
            category: selectedCategory._id,
            author: userId
          })
        }
      );

      const newQuestion = await response.json();

      if (response.ok) {
        setQuestions([
          ...questions,
          newQuestion
        ]);

        setQuestionTitle('');
        setQuestionBody('');
      }

    } catch (error) {
      console.log('Unable to post question.');
    }
  }

 async function openQuestion(question) {
  setSelectedQuestion(question);
  setAnswerText('');

  try {
    const response = await fetch(
      `https://first-gen-career-life-hub.onrender.com/api/answers/question/${question._id}`
    );

    const data = await response.json();

      setAnswers(data);

    } catch (error) {
      console.log('Unable to load answers.');
    }
  }

  async function handleAnswerSubmit(event) {
    event.preventDefault();

    if (!answerText.trim()) {
      return;
    }

    try {
  const response = await fetch(
  'https://first-gen-career-life-hub.onrender.com/api/answers',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
          body: JSON.stringify({
            body: answerText,
            question: selectedQuestion._id,
            author: userId
          })
        }
      );

      const newAnswer = await response.json();

      if (response.ok) {
        setAnswers([
          ...answers,
          newAnswer
        ]);

        setAnswerText('');
      }

    } catch (error) {
      console.log('Unable to post answer.');
    }
  }

  return (
    <div className="dashboard">

      <h2>Welcome, {username}</h2>

      <button
  type="button"
  className="logout-button"
  onClick={handleLogout}
>
  Logout
</button>

      <p>
        Choose a category to explore questions from the First-Gen community.
      </p>

      <h3>Categories</h3>

      <div className="category-list">

        {categories.map(function(category) {
          return (
            <button
              key={category._id}
              className={
                selectedCategory?._id === category._id
                  ? 'active-category'
                  : ''
              }
              onClick={() => selectCategory(category)}
            >
              {category.name}
            </button>
          );
        })}

      </div>

      {selectedCategory && (
        <div className="category-section">

          <h3>{selectedCategory.name}</h3>

          <form onSubmit={handleQuestionSubmit}>

            <h4>Ask a Question</h4>

            <label htmlFor="questionTitle">
              Question Title
            </label>

            <input
              type="text"
              id="questionTitle"
              value={questionTitle}
              onChange={(event) =>
                setQuestionTitle(event.target.value)
              }
            />

            <label htmlFor="questionBody">
              Question
            </label>

            <textarea
              id="questionBody"
              value={questionBody}
              onChange={(event) =>
                setQuestionBody(event.target.value)
              }
            />

            <button type="submit">
              Post Question
            </button>

          </form>

          {questions.length === 0 ? (
            <p>No questions yet in this category.</p>
          ) : (
            questions.map(function(question) {
              return (
                <div
                  key={question._id}
                  className="question-card"
                >

                  <h4>{question.title}</h4>

                  <p>{question.body}</p>

                  {question.author && (
                    <p>
                      Posted by: {question.author.username}
                    </p>
                  )}
                  {question.createdAt && (
  <p>
    Posted: {new Date(question.createdAt).toLocaleString()}
  </p>
)}

                  <button
                    type="button"
                    onClick={() => openQuestion(question)}
                  >
                    View Answers
                  </button>

                </div>
              );
            })
          )}

          {selectedQuestion && (
            <div>

              <h3>
                Answers for: {selectedQuestion.title}
              </h3>

              <form onSubmit={handleAnswerSubmit}>

                <label htmlFor="answerText">
                  Your Answer
                </label>

                <textarea
                  id="answerText"
                  value={answerText}
                  onChange={(event) =>
                    setAnswerText(event.target.value)
                  }
                />

                <button type="submit">
                  Post Answer
                </button>

              </form>

              {answers.length === 0 ? (
                <p>No answers yet.</p>
              ) : (
                answers.map(function(answer) {
                  return (
                    <div
                      key={answer._id}
                      className="answer-card"
                    >

                      <p>{answer.body}</p>

                      {answer.author && (
                        <p>
                          Answered by: {answer.author.username}
                        </p>
                      )}
                      {answer.createdAt && (
  <p>
    Answered: {new Date(answer.createdAt).toLocaleString()}
  </p>
)}

                    </div>
                  );
                })
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Dashboard;