import React from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Search, Mail, MoreHorizontal } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const StudentsList = () => {
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

    const students = [
        {
            id: 1,
            name: 'John Student',
            email: 'john.student@example.com',
            enrolled: 'Advanced React Patterns',
            progress: 45,
            lastActive: '2 hours ago',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Emily Davis',
            email: 'emily.d@example.com',
            enrolled: 'UI/UX Design Principles',
            progress: 72,
            lastActive: 'Yesterday',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'm.brown@example.com',
            enrolled: 'Introduction to Python',
            progress: 12,
            lastActive: '3 days ago',
            status: 'Inactive'
        },
        {
            id: 4,
            name: 'Sarah Wilson',
            email: 'sarah.w@example.com',
            enrolled: 'Advanced React Patterns',
            progress: 88,
            lastActive: '5 mins ago',
            status: 'Active'
        }
    ];

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="teacher" title="Students">
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline">Export CSV</Button>
                    <Button>Invite Student</Button>
                </div>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Student Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Course Enrolled</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Progress</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Last Active</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                            {student.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{student.name}</p>
                                            <p className="text-xs text-slate-500">{student.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{student.enrolled}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-20 bg-slate-100 rounded-full h-1.5">
                                            <div
                                                className="bg-primary h-1.5 rounded-full"
                                                style={{ width: `${student.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-slate-500">{student.progress}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{student.lastActive}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={student.status === 'Active' ? 'success' : 'neutral'}>
                                        {student.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button className="p-1 text-slate-400 hover:text-primary transition-colors" title="Message">
                                            <Mail className="h-4 w-4" />
                                        </button>
                                        <button className="p-1 text-slate-400 hover:text-primary transition-colors" title="More">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </DashboardLayout>
    );
};

export default StudentsList;
