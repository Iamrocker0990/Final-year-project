import React, { useState } from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Search, Filter, CheckCircle, Clock, Download, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const TeacherAssignments = () => {
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

    const assignments = [
        {
            id: 1,
            title: 'React Context API Implementation',
            course: 'Advanced React Patterns',
            dueDate: 'Tomorrow, 11:59 PM',
            submissions: '45/85',
            status: 'Active'
        },
        {
            id: 2,
            title: 'Wireframe Project',
            course: 'UI/UX Design Principles',
            dueDate: 'Yesterday',
            submissions: '62/65',
            status: 'Closed'
        },
        {
            id: 3,
            title: 'Python Data Analysis',
            course: 'Introduction to Python',
            dueDate: 'Last Week',
            submissions: '90/92',
            status: 'Graded'
        }
    ];

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="teacher" title="Assignments">
            <div className="mb-6 border-b border-slate-200">
                <div className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'all' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        All Assignments
                        {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'create' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Create Assignment
                        {activeTab === 'create' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
                    </button>
                </div>
            </div>

            {activeTab === 'all' ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search assignments..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <select className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white text-slate-600">
                                <option>All Courses</option>
                                <option>Advanced React Patterns</option>
                                <option>UI/UX Design Principles</option>
                            </select>
                            <select className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white text-slate-600">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Closed</option>
                                <option>Graded</option>
                            </select>
                        </div>
                    </div>

                    <Card className="overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Assignment Title</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Course</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Due Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Submissions</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {assignments.map((assignment) => (
                                    <tr key={assignment.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{assignment.title}</td>
                                        <td className="px-6 py-4 text-slate-600">{assignment.course}</td>
                                        <td className="px-6 py-4 text-slate-600">{assignment.dueDate}</td>
                                        <td className="px-6 py-4 text-slate-600">{assignment.submissions}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={assignment.status === 'Active' ? 'primary' : assignment.status === 'Graded' ? 'success' : 'neutral'}>
                                                {assignment.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button size="sm" variant="outline">View Submissions</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto">
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Assignment</h2>
                        <div className="space-y-6">
                            <Input label="Assignment Title" placeholder="e.g., Final Project Proposal" />

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Course</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                    <option>Select Course</option>
                                    <option>Advanced React Patterns</option>
                                    <option>UI/UX Design Principles</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-32 resize-none"
                                    placeholder="Instructions for students..."
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Due Date" type="date" />
                                <Input label="Due Time" type="time" />
                            </div>

                            <div>
                                <Input label="Total Points" type="number" placeholder="100" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Attachments (Optional)</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600">Upload reference files</p>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-slate-100">
                                <Button>Create Assignment</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </DashboardLayout>
    );
};

export default TeacherAssignments;
