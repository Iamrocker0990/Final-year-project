import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Video, Plus, Upload, Calendar, ArrowRight } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const TeacherDashboard = () => {
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

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="teacher" title="Teacher Dashboard">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Courses', value: '5', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Active Students', value: '245', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
                    { label: 'Assignments to Review', value: '18', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100' },
                    { label: 'Quizzes Pending', value: '7', icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' },
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                        <Button variant="outline" size="sm">View All</Button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { type: 'submission', user: 'Alex Morgan', action: 'submitted assignment', target: 'React Context API', time: '10 mins ago' },
                            { type: 'enrollment', user: 'Emily Davis', action: 'enrolled in', target: 'UI/UX Design Principles', time: '1 hour ago' },
                            { type: 'quiz', user: 'Michael Brown', action: 'completed quiz', target: 'CSS Grid & Flexbox', time: '2 hours ago' },
                            { type: 'submission', user: 'Sarah Wilson', action: 'submitted assignment', target: 'Wireframe Project', time: '3 hours ago' },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-start space-x-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold flex-shrink-0">
                                    {activity.user.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-900">
                                        <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-medium text-primary">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Upcoming Classes */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900">Upcoming Classes</h2>
                        <Button size="sm" variant="outline"><Plus className="h-4 w-4" /></Button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'Advanced React Patterns Q&A', time: 'Today, 14:00', students: 45 },
                            { title: 'UI Design Critique', time: 'Tomorrow, 10:00', students: 32 },
                            { title: 'Python Workshop', time: 'Nov 20, 13:00', students: 28 },
                        ].map((cls, index) => (
                            <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900 text-sm">{cls.title}</h3>
                                    <Badge variant="primary">Live</Badge>
                                </div>
                                <div className="flex items-center text-xs text-slate-500 mb-3">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {cls.time}
                                    <span className="mx-2">•</span>
                                    <Users className="h-3 w-3 mr-1" />
                                    {cls.students} enrolled
                                </div>
                                <Button size="sm" className="w-full">Start Session</Button>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Active Students Chart Placeholder */}
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Active Students per Course</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Advanced React Patterns', count: 85, total: 100, color: 'bg-blue-500' },
                            { name: 'UI/UX Design Principles', count: 65, total: 100, color: 'bg-purple-500' },
                            { name: 'Introduction to Python', count: 92, total: 100, color: 'bg-green-500' },
                        ].map((course, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-slate-700">{course.name}</span>
                                    <span className="text-slate-500">{course.count} Students</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${course.color}`}
                                        style={{ width: `${course.count}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quiz Scores Chart Placeholder */}
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Average Quiz Scores</h3>
                    <div className="h-48 flex items-end justify-between space-x-4 px-2">
                        {[
                            { label: 'React', score: 88 },
                            { label: 'UI/UX', score: 92 },
                            { label: 'Python', score: 85 },
                            { label: 'Data', score: 78 },
                            { label: 'Web', score: 90 },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center w-full group">
                                <div className="relative w-full bg-slate-100 rounded-t-lg h-40 flex items-end">
                                    <div
                                        className="w-full bg-primary rounded-t-lg transition-all duration-500 group-hover:bg-primary-hover"
                                        style={{ height: `${item.score}%` }}
                                    ></div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.score}%
                                    </div>
                                </div>
                                <span className="text-xs text-slate-500 mt-2 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default TeacherDashboard;
