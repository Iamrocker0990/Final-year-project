import React, { useState, useEffect } from 'react';
import AddQuestion from './AddQuestion';
import Quiz from './Quiz';
import './quiz.css';

const QuizModule = ({ userType = 'student', courseId = null }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({ title: '', questions: [] });
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'add', 'quiz'

  const fetchQuizzes = async () => {
    try {
      const url = courseId 
        ? `http://localhost:5000/api/quiz/all?courseId=${courseId}`
        : 'http://localhost:5000/api/quiz/all';
      const response = await fetch(url);
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [courseId]);

  const handleAddQuestion = (question) => {
    setCurrentQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
  };

  const handleSaveQuiz = async () => {
    if (!currentQuiz.title || currentQuiz.questions.length === 0) {
      alert("Please provide a title and at least one question");
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/quiz/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentQuiz, courseId }),
      });
      if (response.ok) {
        alert("Quiz saved successfully!");
        setCurrentQuiz({ title: '', questions: [] });
        setView('list');
        fetchQuizzes();
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setView('quiz');
  };

  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>Quiz Pro</h1>
        <nav>
          <button className={`nav-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>All Quizzes</button>
          {userType === 'teacher' && (
            <button className={`nav-btn ${view === 'add' ? 'active' : ''}`} onClick={() => setView('add')}>Create Quiz</button>
          )}
        </nav>
      </header>

      <main className="quiz-main">
        {view === 'list' && (
          <div className="quiz-list-view">
            <h2>Available Quizzes</h2>
            {quizzes.length === 0 ? (
              <p>No quizzes available. Create one!</p>
            ) : (
              <div className="quiz-grid">
                {quizzes.map((quiz) => (
                  <div key={quiz._id} className="quiz-card card">
                    <h3>{quiz.title}</h3>
                    <p className="q-count">{quiz.questions.length} Questions</p>
                    <button className="btn start-btn" onClick={() => startQuiz(quiz)}>Attempt Quiz</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'add' && (
          <div className="add-quiz-view">
            <h2>Create New Quiz</h2>
            <div className="card title-card">
              <input
                type="text"
                placeholder="Enter Quiz Title"
                value={currentQuiz.title}
                onChange={(e) => setCurrentQuiz({ ...currentQuiz, title: e.target.value })}
                className="title-input"
              />
            </div>
            <AddQuestion onAddQuestion={handleAddQuestion} />
            <div className="added-questions-summary card">
              <h3>Questions Added: {currentQuiz.questions.length}</h3>
              <button 
                onClick={handleSaveQuiz} 
                className="btn save-btn"
                disabled={currentQuiz.questions.length === 0}
              >
                Save Quiz to System
              </button>
            </div>
          </div>
        )}

        {view === 'quiz' && activeQuiz && (
          <Quiz quiz={activeQuiz} onRestart={() => setView('list')} />
        )}
      </main>
    </div>
  );
};

export default QuizModule;
