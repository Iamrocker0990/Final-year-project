import React, { useState } from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Search, Trash, CheckSquare, List, Type } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const TeacherQuizzes = () => {
    const sidebarItems = [
        { icon: BookOpen, label: 'Dashboard', href: '/teacher' },
        { icon: BookOpen, label: 'My Courses', href: '/teacher/courses' },
        { icon: Plus, label: 'Create Course', href: '/teacher/create-course' },
        { icon: Upload, label: 'Upload Content', href: '/teacher/upload' },
        { icon: FileText, label: 'Assignments', href: '/teacher/assignments' },
        { icon: Award, label: 'Quizzes', href: '/teacher/quizzes' },
        { icon: Users, label: 'Students', href: '/teacher/students' },
        { icon: BarChart2, label: 'Reports', href: '/teacher/reports' },
        { icon: MessageCircle, label: 'Messages', href: '/teacher/messages' },
    ];

    const [activeTab, setActiveTab] = useState<'all' | 'create'>('all');
    const [questions, setQuestions] = useState([
        { id: 1, type: 'mcq', text: '', options: ['', '', '', ''], correct: 0 }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { id: questions.length + 1, type: 'mcq', text: '', options: ['', '', '', ''], correct: 0 }]);
    };

    const quizzes = [
        {
            id: 1,
            title: 'Design Systems Quiz',
            course: 'UI/UX Design Principles',
            questions: 15,
            avgScore: '82%',
            status: 'Active'
        },
        {
            id: 2,
            title: 'CSS Grid & Flexbox',
            course: 'Web Dev Bootcamp',
            questions: 20,
            avgScore: '75%',
            status: 'Closed'
        }
    ];

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="teacher" title="Quizzes">
            <div className="mb-6 border-b border-slate-200">
                <div className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'all' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        All Quizzes
                        {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'create' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Create Quiz
                        {activeTab === 'create' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
                    </button>
                </div>
            </div>

            {activeTab === 'all' ? (
                <div className="space-y-6">
                    <Card className="overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Quiz Title</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Course</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Questions</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Avg. Score</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {quizzes.map((quiz) => (
                                    <tr key={quiz.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{quiz.title}</td>
                                        <td className="px-6 py-4 text-slate-600">{quiz.course}</td>
                                        <td className="px-6 py-4 text-slate-600">{quiz.questions}</td>
                                        <td className="px-6 py-4 text-slate-600">{quiz.avgScore}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={quiz.status === 'Active' ? 'success' : 'neutral'}>
                                                {quiz.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button size="sm" variant="outline">View Results</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-8">
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Quiz Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <Input label="Quiz Title" placeholder="e.g., React Hooks Assessment" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Course</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                    <option>Select Course</option>
                                    <option>Advanced React Patterns</option>
                                </select>
                            </div>
                            <div>
                                <Input label="Time Limit (minutes)" type="number" placeholder="30" />
                            </div>
                        </div>
                    </Card>

                    <div className="space-y-6">
                        {questions.map((q, index) => (
                            <Card key={q.id} className="p-6 relative">
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button className="text-slate-400 hover:text-red-500"><Trash className="h-4 w-4" /></button>
                                </div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded">Q{index + 1}</span>
                                    <select className="px-3 py-1.5 rounded border border-slate-200 text-sm bg-white">
                                        <option value="mcq">Multiple Choice</option>
                                        <option value="tf">True/False</option>
                                        <option value="text">Short Answer</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <Input placeholder="Enter question text..." />

                                    <div className="space-y-3 pl-4 border-l-2 border-slate-100">
                                        {q.options.map((opt, optIndex) => (
                                            <div key={optIndex} className="flex items-center space-x-3">
                                                <input type="radio" name={`q${q.id}`} className="h-4 w-4 text-primary focus:ring-primary border-slate-300" />
                                                <input
                                                    type="text"
                                                    placeholder={`Option ${optIndex + 1}`}
                                                    className="flex-1 px-3 py-2 rounded border border-slate-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Button variant="outline" onClick={addQuestion} className="border-dashed">
                            <Plus className="h-4 w-4 mr-2" /> Add Question
                        </Button>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100">
                        <Button>Publish Quiz</Button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default TeacherQuizzes;
