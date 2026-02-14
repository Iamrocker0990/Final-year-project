import React from 'react';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ProgressReport = () => {
    // sidebarItems removed to use default from DashboardLayout

    return (
        <DashboardLayout userType="student" title="Progress Report">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Overall Average</p>
                        <p className="text-2xl font-bold text-slate-900">87%</p>
                    </div>
                </Card>
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        <Award className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Quizzes Taken</p>
                        <p className="text-2xl font-bold text-slate-900">12</p>
                    </div>
                </Card>
                <Card className="p-6 flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Assignments Submitted</p>
                        <p className="text-2xl font-bold text-slate-900">8</p>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Quiz Performance Chart Placeholder */}
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Quiz Performance</h3>
                    <div className="h-64 flex items-end justify-between space-x-2">
                        {[65, 72, 85, 90, 88, 92, 95].map((height, index) => (
                            <div key={index} className="w-full bg-slate-100 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-500 group-hover:bg-primary-hover"
                                    style={{ height: `${height}%` }}
                                ></div>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {height}%
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400">
                        <span>Week 1</span>
                        <span>Week 2</span>
                        <span>Week 3</span>
                        <span>Week 4</span>
                        <span>Week 5</span>
                        <span>Week 6</span>
                        <span>Week 7</span>
                    </div>
                </Card>

                {/* Course Completion Chart Placeholder */}
                <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Course Completion</h3>
                    <div className="space-y-6">
                        {[
                            { name: 'Advanced React Patterns', progress: 45, color: 'bg-blue-500' },
                            { name: 'UI/UX Design Principles', progress: 72, color: 'bg-purple-500' },
                            { name: 'Introduction to Python', progress: 100, color: 'bg-green-500' },
                            { name: 'Data Science Fundamentals', progress: 10, color: 'bg-orange-500' },
                        ].map((course, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-slate-700">{course.name}</span>
                                    <span className="text-slate-500">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                    <div
                                        className={`h-2.5 rounded-full ${course.color}`}
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Detailed Table */}
            <Card className="overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Detailed Report</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Course Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Completion</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Avg. Quiz Score</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Assignments</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { name: 'Advanced React Patterns', completion: '45%', quizAvg: '88%', assignments: '2/5', status: 'In Progress' },
                                { name: 'UI/UX Design Principles', completion: '72%', quizAvg: '92%', assignments: '4/6', status: 'In Progress' },
                                { name: 'Introduction to Python', completion: '100%', quizAvg: '95%', assignments: '8/8', status: 'Completed' },
                                { name: 'Data Science Fundamentals', completion: '10%', quizAvg: '-', assignments: '0/10', status: 'In Progress' },
                            ].map((row, index) => (
                                <tr key={index} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.completion}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.quizAvg}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.assignments}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </DashboardLayout>
    );
};

export default ProgressReport;
