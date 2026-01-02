import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Award, PlayCircle, ArrowRight, Calendar, Video, FileText, BarChart2, MessageCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const StudentDashboard = () => {
    const sidebarItems = [
        { icon: BookOpen, label: 'Dashboard', href: '/student' },
        { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
        { icon: Video, label: 'Live Classes', href: '/student/live-classes' },
        { icon: FileText, label: 'Assignments', href: '/student/assignments' },
        { icon: Award, label: 'Quizzes', href: '/student/quizzes' },
        { icon: BarChart2, label: 'Progress', href: '/student/progress' },
        { icon: MessageCircle, label: 'Messages', href: '/student/messages' },
    ];



    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="student" title="Student Dashboard">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Enrolled Courses', value: '4', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Completed Lessons', value: '12', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
                    { label: 'Pending Assignments', value: '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
                    { label: 'Upcoming Quizzes', value: '2', icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' },
                ].map((stat, index) => (
                    <Card key={index} className="p-6 flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${stat.bg}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Active Courses */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">My Active Courses</h2>
                            <Link to="/student/courses" className="text-primary font-medium hover:text-primary-hover text-sm">
                                View All
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'Advanced React Patterns', progress: 45, nextLesson: 'Higher Order Components', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80' },
                                { title: 'UI/UX Design Principles', progress: 72, nextLesson: 'Color Theory', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80' },
                            ].map((course, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <div className="h-32 overflow-hidden relative">
                                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <div className="w-full bg-white/30 rounded-full h-1.5 backdrop-blur-sm">
                                                <div
                                                    className="bg-white h-1.5 rounded-full"
                                                    style={{ width: `${course.progress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-white text-xs mt-1 font-medium text-right">{course.progress}% completed</p>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-slate-900 mb-2">{course.title}</h3>
                                        <div className="flex items-center text-sm text-slate-500 mb-4">
                                            <PlayCircle className="h-4 w-4 mr-2 text-primary" />
                                            <span>Next: {course.nextLesson}</span>
                                        </div>
                                        <Button size="sm" className="w-full">Continue Learning</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
                        <Card className="divide-y divide-slate-100">
                            {[
                                { action: 'Completed Lesson', detail: 'Introduction to Hooks', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
                                { action: 'Submitted Assignment', detail: 'Wireframe Project', time: 'Yesterday', icon: FileText, color: 'text-blue-500' },
                                { action: 'Quiz Result', detail: 'Scored 85% in CSS Grid', time: '2 days ago', icon: Award, color: 'text-orange-500' },
                            ].map((activity, index) => (
                                <div key={index} className="p-4 flex items-center space-x-4">
                                    <div className={`bg-slate-50 p-2 rounded-full`}>
                                        <activity.icon className={`h-5 w-5 ${activity.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                                        <p className="text-xs text-slate-500">{activity.detail}</p>
                                    </div>
                                    <span className="text-xs text-slate-400">{activity.time}</span>
                                </div>
                            ))}
                        </Card>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    {/* Upcoming Deadlines */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Upcoming Deadlines</h2>
                        <Card className="p-4 space-y-4">
                            {[
                                { title: 'React Context API', course: 'Advanced React', due: 'Tomorrow, 11:59 PM', type: 'Assignment' },
                                { title: 'Design Systems Quiz', course: 'UI/UX Design', due: 'Nov 28, 10:00 AM', type: 'Quiz' },
                                { title: 'Final Project Proposal', course: 'Web Dev Bootcamp', due: 'Dec 01, 11:59 PM', type: 'Assignment' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                    <div className="bg-red-50 p-2 rounded-lg text-center min-w-[3.5rem]">
                                        <p className="text-xs text-red-600 font-bold uppercase">{item.due.split(',')[0]}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                                        <p className="text-xs text-slate-500 mb-1">{item.course}</p>
                                        <Badge variant={item.type === 'Quiz' ? 'warning' : 'primary'}>{item.type}</Badge>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </div>

                    {/* Quick Access */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Access</h2>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" /> View All Assignments
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Award className="h-4 w-4 mr-2" /> View All Quizzes
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <MessageCircle className="h-4 w-4 mr-2" /> Open Chatbot
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
