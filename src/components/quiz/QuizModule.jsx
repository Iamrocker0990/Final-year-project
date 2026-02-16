import React, { useState, useEffect } from 'react';
import AddQuestion from './AddQuestion';
import Quiz from './Quiz'; // Assuming Quiz component handles the "taking" part, but we might not need it here for teacher? 
// Actually teacher might want to preview it. Leaving it for now.
import { Plus, Save, List, PlayCircle, CheckCircle, HelpCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const QuizModule = ({ userType = 'student', courseId = null, initialView = 'list' }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({ title: '', questions: [], timeLimit: 30, totalMarks: 100 });
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [view, setView] = useState(initialView); // 'list', 'add', 'quiz'

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = courseId
        ? `http://localhost:5000/api/quiz/course/${courseId}`
        : 'http://localhost:5000/api/quiz/all';

      const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
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
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...currentQuiz, courseId }),
      });
      if (response.ok) {
        alert("Quiz saved successfully!");
        setCurrentQuiz({ title: '', questions: [], timeLimit: 30, totalMarks: 100 });
        setView('list');
        fetchQuizzes();
      } else {
        const err = await response.json();
        alert(`Error: ${err.message}`);
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
    <div className="space-y-6">
      {/* Header / Nav */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quiz Management</h1>
          <p className="text-slate-500 text-sm">Create and manage quizzes for your students.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${view === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <div className="flex items-center"><List className="h-4 w-4 mr-2" /> All Quizzes</div>
          </button>
          {userType === 'teacher' && (
            <button
              onClick={() => setView('add')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${view === 'add' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <div className="flex items-center"><Plus className="h-4 w-4 mr-2" /> Create Quiz</div>
            </button>
          )}
        </div>
      </div>

      <main>
        {view === 'list' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {quizzes.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No quizzes yet</h3>
                <p className="text-slate-500 mb-4">Get started by creating your first quiz.</p>
                <Button onClick={() => setView('add')}>Create Quiz</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                  <Card key={quiz._id} className="hover:border-primary transition-colors cursor-pointer group">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{quiz.title}</h3>
                        <Badge variant="neutral">{quiz.questions.length} Qs</Badge>
                      </div>
                      <div className="flex items-center text-sm text-slate-500 mb-6 space-x-4">
                        <span>{quiz.timeLimit} mins</span>
                        <span>•</span>
                        <span>{quiz.totalMarks || 100} Marks</span>
                      </div>
                      <Button className="w-full" variant="outline" onClick={() => startQuiz(quiz)}>
                        <PlayCircle className="h-4 w-4 mr-2" /> Preview Quiz
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'add' && (
          <div className="space-y-8 animate-in slide-in-from-right fade-in duration-300">
            <Card className="p-8 border-t-4 border-t-primary">
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-2">Quiz Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2">
                  <label className="label">Quiz Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Weekly Assessment 1"
                    value={currentQuiz.title}
                    onChange={(e) => setCurrentQuiz({ ...currentQuiz, title: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Time Limit (Minutes)</label>
                  <input
                    type="number"
                    value={currentQuiz.timeLimit}
                    onChange={(e) => setCurrentQuiz({ ...currentQuiz, timeLimit: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Total Marks</label>
                  <input
                    type="number"
                    value={currentQuiz.totalMarks}
                    onChange={(e) => setCurrentQuiz({ ...currentQuiz, totalMarks: parseInt(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AddQuestion onAddQuestion={handleAddQuestion} />
              </div>

              <div className="space-y-6">
                <Card className="p-6 sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900">Summary</h3>
                    <Badge>{currentQuiz.questions.length} Questions</Badge>
                  </div>

                  <div className="space-y-2 mb-6 max-h-60 overflow-y-auto pr-2">
                    {currentQuiz.questions.map((q, idx) => (
                      <div key={idx} className="text-sm p-2 bg-slate-50 rounded border border-slate-100 truncate">
                        <span className="font-bold mr-2">{idx + 1}.</span> {q.question}
                      </div>
                    ))}
                    {currentQuiz.questions.length === 0 && (
                      <p className="text-sm text-slate-400 italic">No questions added yet.</p>
                    )}
                  </div>

                  <Button
                    onClick={handleSaveQuiz}
                    className="w-full"
                    disabled={currentQuiz.questions.length === 0}
                  >
                    <Save className="h-4 w-4 mr-2" /> Save & Publish
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {view === 'quiz' && activeQuiz && (
          <div className="animate-in zoom-in duration-300">
            <Button variant="ghost" onClick={() => setView('list')} className="mb-4">Back to List</Button>
            <Quiz quiz={activeQuiz} onRestart={() => setView('list')} />
          </div>
        )}
      </main>

      <style>{`
            .label { @apply block text-sm font-medium text-slate-700 mb-1.5; }
            .input-field { @apply w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 text-slate-700; }
       `}</style>
    </div>
  );
};

export default QuizModule;
