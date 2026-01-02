import React from 'react';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle, Play, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Quizzes = () => {
    const sidebarItems = [
        { icon: BookOpen, label: 'Dashboard', href: '/student' },
        { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
        { icon: Video, label: 'Live Classes', href: '/student/live-classes' },
        { icon: FileText, label: 'Assignments', href: '/student/assignments' },
        { icon: Award, label: 'Quizzes', href: '/student/quizzes' },
        { icon: BarChart2, label: 'Progress', href: '/student/progress' },
        { icon: MessageCircle, label: 'Messages', href: '/student/messages' },
    ];

    const quizzes = [
        {
            id: 1,
            title: 'Design Systems Quiz',
            course: 'UI/UX Design Principles',
            questions: 15,
            timeLimit: '30 mins',
            status: 'Upcoming',
            score: null,
            dueDate: 'Nov 28, 10:00 AM'
        },
        {
            id: 2,
            title: 'CSS Grid & Flexbox',
            course: 'Web Dev Bootcamp',
            questions: 20,
            timeLimit: '45 mins',
            status: 'Completed',
            score: '85%',
            dueDate: 'Nov 20, 11:59 PM'
        },
        {
            id: 3,
            title: 'React Hooks Fundamentals',
            course: 'Advanced React Patterns',
            questions: 10,
            timeLimit: '20 mins',
            status: 'Completed',
            score: '100%',
            dueDate: 'Nov 15, 11:59 PM'
        }
    ];

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="student" title="Quizzes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {quizzes.map((quiz) => (
                    <Card key={quiz.id} className="flex flex-col h-full">
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <Badge variant={quiz.status === 'Completed' ? 'success' : 'warning'}>
                                    {quiz.status}
                                </Badge>
                                {quiz.score && (
                                    <span className="text-lg font-bold text-green-600">{quiz.score}</span>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{quiz.title}</h3>
                            <p className="text-sm text-slate-500 mb-4">{quiz.course}</p>

                            <div className="flex items-center space-x-4 text-sm text-slate-600 mb-6">
                                <div className="flex items-center">
                                    <AlertTriangle className="h-4 w-4 mr-1.5 text-slate-400" />
                                    {quiz.questions} Qs
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1.5 text-slate-400" />
                                    {quiz.timeLimit}
                                </div>
                            </div>

                            {quiz.status === 'Upcoming' ? (
                                <div className="bg-orange-50 text-orange-700 text-xs p-2 rounded mb-4 text-center">
                                    Opens on {quiz.dueDate}
                                </div>
                            ) : (
                                <div className="bg-slate-50 text-slate-600 text-xs p-2 rounded mb-4 text-center">
                                    Submitted on {quiz.dueDate}
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-slate-100">
                            <Button
                                className="w-full"
                                variant={quiz.status === 'Completed' ? 'outline' : 'primary'}
                                disabled={quiz.status === 'Upcoming'}
                            >
                                {quiz.status === 'Completed' ? 'View Results' : 'Start Quiz'}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Quiz Attempt View (Mockup) */}
            <div className="mt-12">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Quiz Preview</h2>
                <Card className="p-8 max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">React Hooks Assessment</h3>
                            <p className="text-slate-500">Question 3 of 10</p>
                        </div>
                        <div className="flex items-center space-x-2 text-orange-600 font-mono font-bold bg-orange-50 px-3 py-1 rounded-lg">
                            <Clock className="h-5 w-5" />
                            <span>14:20</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg font-medium text-slate-900 mb-6">
                            Which Hook should be used to perform side effects in function components?
                        </h4>
                        <div className="space-y-3">
                            {[
                                'useState',
                                'useEffect',
                                'useContext',
                                'useReducer'
                            ].map((option, index) => (
                                <label key={index} className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 hover:border-primary transition-all group">
                                    <input type="radio" name="quiz-q3" className="h-4 w-4 text-primary focus:ring-primary border-slate-300" />
                                    <span className="ml-3 text-slate-700 group-hover:text-slate-900">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between pt-6 border-t border-slate-100">
                        <Button variant="outline">Previous</Button>
                        <Button>Next Question</Button>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Quizzes;
