import React, { useState } from 'react';
import './quiz.css';

const Quiz = ({ quiz, onRestart }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (optionNumber) => {
    if (isAnswered) return;
    setSelectedOption(optionNumber);
    setIsAnswered(true);
    if (optionNumber === quiz.questions[currentQuestion].ans) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    return (
      <div className="score-section card">
        <h2>Quiz Completed!</h2>
        <p className="score-text">Your Score: <strong>{score} / {quiz.questions.length}</strong></p>
        <button className="btn restart-btn" onClick={onRestart}>Restart & Back to List</button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="quiz-section card">
      <h3>{quiz.title}</h3>
      <div className="question-count">
        <span>Question {currentQuestion + 1}</span> of {quiz.questions.length}
      </div>
      <div className="question-text">{question.question}</div>
      <div className="answer-options">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => handleOptionClick(num)}
            className={`option-btn ${
              isAnswered
                ? num === question.ans
                  ? 'correct'
                  : selectedOption === num
                  ? 'incorrect'
                  : ''
                : selectedOption === num
                ? 'selected'
                : ''
            }`}
          >
            {question[`option${num}`]}
          </button>
        ))}
      </div>
      {isAnswered && (
        <button className="btn next-btn" onClick={handleNextQuestion}>
          {currentQuestion + 1 === quiz.questions.length ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default Quiz;
