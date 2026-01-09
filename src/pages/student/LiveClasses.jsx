import React from 'react';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle, Calendar, Clock, User, PlayCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const LiveClasses = () => {
    const sidebarItems = [
        { icon: BookOpen, label: 'Dashboard', href: '/student' },
        { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
        { icon: Video, label: 'Live Classes', href: '/student/live-classes' },
        { icon: FileText, label: 'Assignments', href: '/student/assignments' },
        { icon: Award, label: 'Quizzes', href: '/student/quizzes' },
        { icon: BarChart2, label: 'Progress', href: '/student/progress' },
        { icon: MessageCircle, label: 'Messages', href: '/student/messages' },
    ];

    const sessions = [
        {
            id: 1,
            title: 'Advanced React Patterns Q&A',
            course: 'Advanced React Patterns',
            instructor: 'Sarah Johnson',
            date: 'Today',
            time: '14:00 - 15:30',
            status: 'Live',
            image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            title: 'UI Design Critique Session',
            course: 'UI/UX Design Principles',
            instructor: 'Michael Chen',
            date: 'Tomorrow',
            time: '10:00 - 11:30',
            status: 'Upcoming',
            image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            title: 'Python Data Visualization Workshop',
            course: 'Introduction to Python',
            instructor: 'David Smith',
            date: 'Nov 20',
            time: '13:00 - 14:30',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="student" title="Live Classes">
            <div className="space-y-8">
                {/* Live Now Section */}
                {sessions.filter(s => s.status === 'Live').map(session => (
                    <div key={session.id} className="relative rounded-2xl overflow-hidden bg-slate-900 text-white">
                        <div className="absolute inset-0">
                            <img src={session.image} alt={session.title} className="w-full h-full object-cover opacity-30" />
                        </div>
                        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    <span className="text-red-400 font-bold uppercase tracking-wider text-sm">Live Now</span>
                                </div>
                                <h2 className="text-3xl font-bold mb-2">{session.title}</h2>
                                <p className="text-slate-300 text-lg mb-6">{session.course} • with {session.instructor}</p>
                                <div className="flex items-center space-x-6 text-sm">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-slate-400" />
                                        {session.time}
                                    </div>
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-2 text-slate-400" />
                                        245 Students watching
                                    </div>
                                </div>
                            </div>
                            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white border-none w-full md:w-auto">
                                Join Session Now
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Upcoming & Completed Grid */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sessions.filter(s => s.status !== 'Live').map(session => (
                            <Card key={session.id} className="flex flex-col">
                                <div className="relative h-48 overflow-hidden rounded-t-xl">
                                    <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4">
                                        <Badge variant={session.status === 'Completed' ? 'neutral' : 'primary'}>
                                            {session.status}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center text-sm text-slate-500 mb-2">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {session.date} • {session.time}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{session.title}</h3>
                                    <p className="text-sm text-slate-600 mb-4">{session.course}</p>
                                    <div className="flex items-center text-sm text-slate-500 mb-6">
                                        <User className="h-4 w-4 mr-2" />
                                        {session.instructor}
                                    </div>

                                    <div className="mt-auto">
                                        <Button
                                            variant={session.status === 'Completed' ? 'outline' : 'primary'}
                                            className="w-full"
                                            disabled={session.status === 'Upcoming'}
                                        >
                                            {session.status === 'Completed' ? (
                                                <>
                                                    <PlayCircle className="h-4 w-4 mr-2" /> Watch Recording
                                                </>
                                            ) : (
                                                'Join at Scheduled Time'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default LiveClasses;
