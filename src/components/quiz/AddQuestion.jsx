import React, { useState } from 'react';

const AddQuestion = ({ onAddQuestion }) => {
  const [questionData, setQuestionData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    ans: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: name === 'ans' ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionData.question || !questionData.option1 || !questionData.option2 || !questionData.option3 || !questionData.option4) {
      alert("Please fill all fields");
      return;
    }
    onAddQuestion(questionData);
    setQuestionData({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      ans: 1,
    });
  };

  return (
    <div className="add-question-form card">
      <h4>Add Question Details</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="question"
            placeholder="Enter Question"
            value={questionData.question}
            onChange={handleChange}
            required
          />
        </div>
        <div className="options-grid">
          <input
            type="text"
            name="option1"
            placeholder="Option 1"
            value={questionData.option1}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="option2"
            placeholder="Option 2"
            value={questionData.option2}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="option3"
            placeholder="Option 3"
            value={questionData.option3}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="option4"
            placeholder="Option 4"
            value={questionData.option4}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group select-group">
          <label>Correct Answer Index:</label>
          <select name="ans" value={questionData.ans} onChange={handleChange}>
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </select>
        </div>
        <button type="submit" className="btn add-btn">Add Question to Quiz</button>
      </form>
    </div>
  );
};

export default AddQuestion;
