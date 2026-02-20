import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle, Upload, CheckCircle, Clock, AlertCircle, Download, X, Loader2 } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Submission Modal State
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissionFile, setSubmissionFile] = useState(null);
    const [submissionText, setSubmissionText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        try {
            const userInfoString = localStorage.getItem('userInfo');
            if (!userInfoString) return;
            const { token } = JSON.parse(userInfoString);

            const res = await axios.get('http://localhost:5000/api/assignments/student', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAssignments(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching student assignments:', error);
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending': return <Badge variant="warning">Pending</Badge>;
            case 'Submitted': return <Badge variant="primary">Submitted</Badge>;
            case 'Graded': return <Badge variant="success">Graded</Badge>;
            case 'Overdue': return <Badge variant="danger">Overdue</Badge>;
            default: return <Badge variant="neutral">{status}</Badge>;
        }
    };

    const openSubmitModal = (assignment) => {
        setSelectedAssignment(assignment);
        setSubmissionFile(null);
        setSubmissionText('');
        setShowSubmitModal(true);
    };

    const closeSubmitModal = () => {
        setShowSubmitModal(false);
        setSelectedAssignment(null);
        setSubmissionFile(null);
        setSubmissionText('');
    };

    const handleSubmitAssignment = async () => {
        if (!selectedAssignment) return;

        try {
            setSubmitting(true);
            const userInfoString = localStorage.getItem('userInfo');
            const { token } = JSON.parse(userInfoString);

            const formData = new FormData();
            formData.append('submissionText', submissionText);
            if (submissionFile) {
                formData.append('document', submissionFile);
            }

            await axios.post(`http://localhost:5000/api/assignments/${selectedAssignment._id}/submit`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            await fetchAssignments();
            setSubmitting(false);
            closeSubmitModal();
        } catch (error) {
            console.error('Error submitting assignment:', error);
            setSubmitting(false);
            alert(error.response?.data?.message || 'Failed to submit assignment');
        }
    };

    if (loading) {
        return (
            <DashboardLayout userType="student" title="Assignments">
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout userType="student" title="Assignments">
            <div className="space-y-6">
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
                                {assignments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                            No assignments found for your enrolled courses.
                                        </td>
                                    </tr>
                                ) : (
                                    assignments.map((assignment) => (
                                        <tr key={assignment._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-slate-900">{assignment.title}</p>
                                                <p className="text-xs text-slate-500 md:hidden">{assignment.course?.title}</p>
                                                {assignment.documentUrl && (
                                                    <a href={`http://localhost:5000${assignment.documentUrl}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center mt-1">
                                                        <FileText className="h-3 w-3 mr-1" /> View Attachment
                                                    </a>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 hidden md:table-cell">{assignment.course?.title}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                <div className="flex items-center">
                                                    <Clock className="h-3 w-3 mr-1.5 text-slate-400" />
                                                    {new Date(assignment.dueDate).toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(assignment.studentStatus)}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                                {assignment.score !== null ? `${assignment.score} / ${assignment.totalPoints}` : '-'}
                                                {assignment.studentStatus === 'Graded' && assignment.submission?.feedback && (
                                                    <div className="text-xs text-slate-500 font-normal mt-1 border-t border-slate-200 pt-1">
                                                        "<i>{assignment.submission.feedback}</i>"
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {['Pending', 'Overdue'].includes(assignment.studentStatus) ? (
                                                    <Button size="sm" variant="primary" onClick={() => openSubmitModal(assignment)}>
                                                        Submit Work
                                                    </Button>
                                                ) : (
                                                    <span className="text-sm text-slate-500 flex items-center">
                                                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" /> Submitted
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Submission Modal */}
            {showSubmitModal && selectedAssignment && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Submit Assignment</h2>
                            <button onClick={closeSubmitModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h3 className="font-semibold text-slate-800 text-lg">{selectedAssignment.title}</h3>
                                <p className="text-slate-600 mt-2 whitespace-pre-wrap">{selectedAssignment.description}</p>

                                {selectedAssignment.documentUrl && (
                                    <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                                        <div className="flex items-center text-slate-700">
                                            <FileText className="h-5 w-5 mr-2 text-primary" />
                                            <span className="text-sm font-medium">Reference Material</span>
                                        </div>
                                        <a
                                            href={`http://localhost:5000${selectedAssignment.documentUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-primary hover:underline flex items-center"
                                        >
                                            <Download className="h-4 w-4 mr-1" /> Download
                                        </a>
                                    </div>
                                )}
                            </div>

                            <hr className="border-slate-100" />

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Upload Document File</label>
                                <input
                                    type="file"
                                    id="submission-file"
                                    className="hidden"
                                    onChange={(e) => setSubmissionFile(e.target.files[0])}
                                />
                                <label
                                    htmlFor="submission-file"
                                    className="block border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
                                >
                                    {submissionFile ? (
                                        <div>
                                            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                            <p className="text-sm font-medium text-slate-900">{submissionFile.name}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                            <p className="text-sm text-slate-600">Click to upload your work (Word, PDF, PPT, etc.)</p>
                                        </div>
                                    )}
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional Comments (Optional)</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none"
                                    placeholder="Add any notes for the instructor..."
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end space-x-4">
                            <Button variant="outline" onClick={closeSubmitModal}>Cancel</Button>
                            <Button onClick={handleSubmitAssignment} disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Submit Assignment'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Assignments;