import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Search, Filter, CheckCircle, Clock, Download, ChevronDown, Loader2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const TeacherAssignments = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [assignments, setAssignments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Create form state
    const [formData, setFormData] = useState({
        title: '',
        courseId: '',
        description: '',
        dueDate: '',
        dueTime: '',
        totalPoints: ''
    });
    const [file, setFile] = useState(null);

    // View submissions state
    const [viewingAssignment, setViewingAssignment] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [gradingSubmission, setGradingSubmission] = useState(null);
    const [gradeScore, setGradeScore] = useState('');
    const [gradeFeedback, setGradeFeedback] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userInfoString = localStorage.getItem('userInfo');
            if (!userInfoString) return;
            const { token } = JSON.parse(userInfoString);

            // Fetch courses
            const coursesRes = await axios.get('http://localhost:5000/api/courses/mine', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCourses(coursesRes.data);

            // Fetch assignments
            const assignmentsRes = await axios.get('http://localhost:5000/api/assignments/teacher', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssignments(assignmentsRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleCreateAssignment = async () => {
        try {
            setSubmitting(true);
            const userInfoString = localStorage.getItem('userInfo');
            const { token } = JSON.parse(userInfoString);

            const data = new FormData();
            data.append('title', formData.title);
            data.append('courseId', formData.courseId);
            data.append('description', formData.description);
            // Combine date and time
            data.append('dueDate', `${formData.dueDate}T${formData.dueTime}:00`);
            data.append('totalPoints', formData.totalPoints);

            if (file) {
                data.append('document', file);
            }

            await axios.post('http://localhost:5000/api/assignments', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Reset form and refresh data
            setFormData({
                title: '', courseId: '', description: '', dueDate: '', dueTime: '', totalPoints: ''
            });
            setFile(null);
            await fetchData();
            setActiveTab('all');
            setSubmitting(false);
        } catch (error) {
            console.error('Error creating assignment:', error);
            setSubmitting(false);
            alert('Failed to create assignment');
        }
    };

    const handleViewSubmissions = async (assignment) => {
        try {
            const userInfoString = localStorage.getItem('userInfo');
            const { token } = JSON.parse(userInfoString);

            const res = await axios.get(`http://localhost:5000/api/assignments/${assignment._id}/submissions`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSubmissions(res.data);
            setViewingAssignment(assignment);
            setActiveTab('submissions');
        } catch (error) {
            console.error('Error fetching submissions:', error);
            alert('Failed to load submissions');
        }
    };

    const handleGradeSubmission = async () => {
        try {
            const userInfoString = localStorage.getItem('userInfo');
            const { token } = JSON.parse(userInfoString);

            await axios.put(`http://localhost:5000/api/assignments/submissions/${gradingSubmission._id}/grade`, {
                score: gradeScore,
                feedback: gradeFeedback
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Refresh submissions list
            handleViewSubmissions(viewingAssignment);
            setGradingSubmission(null);
            setGradeScore('');
            setGradeFeedback('');
        } catch (error) {
            console.error('Error grading submission:', error);
            alert('Failed to grade submission');
        }
    };

    if (loading) {
        return (
            <DashboardLayout userType="teacher" title="Assignments">
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userType="teacher" title="Assignments">
            <div className="mb-6 border-b border-slate-200">
                <div className="flex space-x-8">
                    <button
                        onClick={() => { setActiveTab('all'); setViewingAssignment(null); }}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'all' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        All Assignments
                        {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => { setActiveTab('create'); setViewingAssignment(null); }}
                        className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === 'create' ? 'text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Create Assignment
                        {activeTab === 'create' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>}
                    </button>
                    {activeTab === 'submissions' && viewingAssignment && (
                        <button
                            className="pb-4 text-sm font-medium transition-colors relative text-primary"
                        >
                            Submissions: {viewingAssignment.title}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
                        </button>
                    )}
                </div>
            </div>

            {activeTab === 'all' && (
                <div className="space-y-6">
                    {/* Filter Bar */}
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
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>{course.title}</option>
                                ))}
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
                                {assignments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                            No assignments found. Create one to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    assignments.map((assignment) => (
                                        <tr key={assignment._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-slate-900">{assignment.title}</p>
                                                {assignment.documentUrl && (
                                                    <a href={`http://localhost:5000${assignment.documentUrl}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center mt-1">
                                                        <FileText className="h-3 w-3 mr-1" /> View Attachment
                                                    </a>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{assignment.course?.title}</td>
                                            <td className="px-6 py-4 text-slate-600">{new Date(assignment.dueDate).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-slate-600">{assignment.submissionCount || 0}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant={assignment.status === 'active' ? 'primary' : 'neutral'}>
                                                    {assignment.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button size="sm" variant="outline" onClick={() => handleViewSubmissions(assignment)}>
                                                    View Submissions
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}

            {activeTab === 'create' && (
                <div className="max-w-3xl mx-auto">
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Assignment</h2>
                        <div className="space-y-6">
                            <Input
                                label="Assignment Title"
                                placeholder="e.g., Final Project Proposal"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Course</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                    value={formData.courseId}
                                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                >
                                    <option value="">Select Course</option>
                                    {courses.map(course => (
                                        <option key={course._id} value={course._id}>{course.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-32 resize-none"
                                    placeholder="Instructions for students..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Due Date"
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                />
                                <Input
                                    label="Due Time"
                                    type="time"
                                    value={formData.dueTime}
                                    onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                                />
                            </div>

                            <div>
                                <Input
                                    label="Total Points"
                                    type="number"
                                    placeholder="100"
                                    value={formData.totalPoints}
                                    onChange={(e) => setFormData({ ...formData, totalPoints: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Attachment Document (Optional)</label>
                                <input
                                    type="file"
                                    id="assignment-file"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <label
                                    htmlFor="assignment-file"
                                    className="block border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                                >
                                    {file ? (
                                        <div>
                                            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                            <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                            <p className="text-sm text-slate-600">Click to upload Word, PDF, PPT</p>
                                        </div>
                                    )}
                                </label>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-slate-100">
                                <Button onClick={handleCreateAssignment} disabled={submitting}>
                                    {submitting ? 'Creating...' : 'Create Assignment'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === 'submissions' && viewingAssignment && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <Button variant="outline" size="sm" onClick={() => { setActiveTab('all'); setViewingAssignment(null); }}>
                            &larr; Back to Assignments
                        </Button>
                        <h3 className="text-lg font-bold">Total Points: {viewingAssignment.totalPoints}</h3>
                    </div>

                    {gradingSubmission ? (
                        <Card className="p-8 max-w-3xl mx-auto">
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Grade Submission</h2>
                            <p className="text-sm text-slate-500 mb-6">Student: {gradingSubmission.student?.name}</p>

                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
                                <h4 className="font-semibold text-slate-800 mb-2">Student's Work</h4>
                                {gradingSubmission.submissionText && (
                                    <p className="text-slate-600 mb-4 whitespace-pre-wrap">{gradingSubmission.submissionText}</p>
                                )}
                                {gradingSubmission.submissionFile && (
                                    <a
                                        href={`http://localhost:5000${gradingSubmission.submissionFile}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-primary bg-primary/10 px-4 py-2 rounded-lg font-medium"
                                    >
                                        <Download className="h-4 w-4 mr-2" /> Download Submitted Document
                                    </a>
                                )}
                            </div>

                            <div className="space-y-6">
                                <Input
                                    label={`Score (out of ${viewingAssignment.totalPoints})`}
                                    type="number"
                                    value={gradeScore}
                                    onChange={(e) => setGradeScore(e.target.value)}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Feedback Comments</label>
                                    <textarea
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-32 resize-none"
                                        placeholder="Great job on..."
                                        value={gradeFeedback}
                                        onChange={(e) => setGradeFeedback(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6">
                                    <Button variant="outline" onClick={() => setGradingSubmission(null)}>Cancel</Button>
                                    <Button onClick={handleGradeSubmission}>Submit Grade</Button>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <Card className="overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Student Name</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Submitted On</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700">Score</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {submissions.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                                No submissions yet for this assignment.
                                            </td>
                                        </tr>
                                    ) : (
                                        submissions.map((sub) => (
                                            <tr key={sub._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900">{sub.student?.name}</td>
                                                <td className="px-6 py-4 text-slate-600">{new Date(sub.createdAt).toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <Badge variant={sub.status === 'graded' ? 'success' : 'primary'}>
                                                        {sub.status === 'graded' ? 'Graded' : 'Needs Grading'}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 font-medium">{sub.score !== null ? `${sub.score} / ${viewingAssignment.totalPoints}` : '-'}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button
                                                        size="sm"
                                                        variant={sub.status === 'graded' ? 'outline' : 'primary'}
                                                        onClick={() => {
                                                            setGradingSubmission(sub);
                                                            setGradeScore(sub.score || '');
                                                            setGradeFeedback(sub.feedback || '');
                                                        }}
                                                    >
                                                        {sub.status === 'graded' ? 'Edit Grade' : 'Grade Submission'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </Card>
                    )}
                </div>
            )}
        </DashboardLayout>
    );
};

export default TeacherAssignments;
