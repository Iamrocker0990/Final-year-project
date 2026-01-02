import React from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Download, TrendingUp } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Reports = () => {
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
        <DashboardLayout sidebarItems={sidebarItems} userType="teacher" title="Reports & Analytics">
            <div className="flex justify-end mb-6">
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Export All Data
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Enrollment Trends</h3>
                    <div className="h-64 flex items-end justify-between space-x-2">
                        {[20, 35, 45, 30, 55, 65, 80, 75, 90, 85, 95, 100].map((height, index) => (
                            <div key={index} className="w-full bg-slate-100 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all duration-500 group-hover:bg-blue-600"
                                    style={{ height: `${height}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Course Performance</h3>
                    <div className="space-y-6">
                        {[
                            { name: 'Advanced React Patterns', completion: 78, satisfaction: 4.8 },
                            { name: 'UI/UX Design Principles', completion: 65, satisfaction: 4.9 },
                            { name: 'Introduction to Python', completion: 82, satisfaction: 4.7 },
                        ].map((course, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-slate-900">{course.name}</span>
                                    <div className="flex items-center space-x-4 text-sm">
                                        <span className="text-slate-500">Avg. Completion: {course.completion}%</span>
                                        <span className="text-yellow-500 font-bold">★ {course.satisfaction}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: `${course.completion}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Course Summary</h3>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Course Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Students Enrolled</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Avg. Completion</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Avg. Quiz Score</th>
                            <th className="px-6 py-4 text-sm font-semibold text-slate-700">Assignment Rate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {[
                            { name: 'Advanced React Patterns', enrolled: 85, completion: '78%', quiz: '88%', assignment: '92%' },
                            { name: 'UI/UX Design Principles', enrolled: 65, completion: '65%', quiz: '90%', assignment: '85%' },
                            { name: 'Introduction to Python', enrolled: 92, completion: '82%', quiz: '85%', assignment: '88%' },
                        ].map((row, index) => (
                            <tr key={index} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                                <td className="px-6 py-4 text-slate-600">{row.enrolled}</td>
                                <td className="px-6 py-4 text-slate-600">{row.completion}</td>
                                <td className="px-6 py-4 text-slate-600">{row.quiz}</td>
                                <td className="px-6 py-4 text-slate-600">{row.assignment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </DashboardLayout>
    );
};

export default Reports;
