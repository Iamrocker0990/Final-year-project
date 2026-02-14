import React from 'react';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Assignments = () => {
<<<<<<< HEAD
    // sidebarItems removed to use default from DashboardLayout

=======
>>>>>>> otp-updates
    const assignments = [
        {
            id: 1,
            title: 'React Context Theme Switcher',
            course: 'Advanced React',
            dueDate: 'Tomorrow, 11:59 PM',
            status: 'Pending',
            score: null,
            description: 'Implement a theme switcher using React Context API. Include tests for your implementation.'
        },
        {
            id: 2,
            title: 'Wireframe Project',
            course: 'UI/UX Design Principles',
            dueDate: 'Yesterday',
            status: 'Submitted',
            score: null,
            description: 'Create low-fidelity wireframes for the e-commerce mobile app project.'
        },
        {
            id: 3,
            title: 'Python Data Analysis',
            course: 'Introduction to Python',
            dueDate: 'Last Week',
            status: 'Graded',
            score: '95/100',
            description: 'Analyze the provided dataset using Pandas and generate 3 visualizations.'
        },
        {
            id: 4,
            title: 'Final Project Proposal',
            course: 'Web Dev Bootcamp',
            dueDate: 'Dec 01, 11:59 PM',
            status: 'Pending',
            score: null,
            description: 'Submit a PDF document outlining your final project idea, tech stack, and timeline.'
        }
    ];

    // FIXED: Removed ": string" type annotation
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return <Badge variant="warning">Pending</Badge>;
            case 'Submitted': return <Badge variant="primary">Submitted</Badge>;
            case 'Graded': return <Badge variant="success">Graded</Badge>;
            default: return <Badge variant="neutral">{status}</Badge>;
        }
    };

    return (
        <DashboardLayout userType="student" title="Assignments">
            <div className="space-y-6">
                {/* Assignments List */}
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Assignment Title</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700 hidden md:table-cell">Course</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Due Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Score</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-700">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {assignments.map((assignment) => (
                                    <tr key={assignment.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-900">{assignment.title}</p>
                                            <p className="text-xs text-slate-500 md:hidden">{assignment.course}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 hidden md:table-cell">{assignment.course}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <div className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1.5 text-slate-400" />
                                                {assignment.dueDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{getStatusBadge(assignment.status)}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                            {assignment.score || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button size="sm" variant={assignment.status === 'Pending' ? 'primary' : 'outline'}>
                                                {assignment.status === 'Pending' ? 'Submit' : 'View'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Assignments;