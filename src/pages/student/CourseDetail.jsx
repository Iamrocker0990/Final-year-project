import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PlayCircle, CheckCircle, FileText, Download, Lock, BookOpen, Video, Award, BarChart2, MessageCircle, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import CertificateTemplate from '../../components/certificate/CertificateTemplate';

const CourseDetail = () => {
    const { } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [showCertificate, setShowCertificate] = useState(false);
    const certificateRef = useRef<HTMLDivElement>(null);

    // Mock data
    const course = {
        title: 'Advanced React Patterns',
        instructor: 'Sarah Johnson',
        progress: 100, // Set to 100 for testing certificate
        modules: [
            {
                title: 'Module 1: Introduction to Advanced Patterns',
                lessons: [
                    { title: 'Welcome to the Course', duration: '5:20', completed: true, type: 'video' },
                    { title: 'Why Advanced Patterns?', duration: '10:15', completed: true, type: 'video' },
                    { title: 'Setting Up the Environment', duration: '8:45', completed: true, type: 'video' },
                ]
            },
            {
                title: 'Module 2: Higher Order Components',
                lessons: [
                    { title: 'What are HOCs?', duration: '12:30', completed: true, type: 'video' },
                    { title: 'Building Your First HOC', duration: '15:45', completed: true, type: 'video', current: true },
                    { title: 'HOC Caveats', duration: '10:20', completed: true, type: 'video', locked: false },
                ]
            },
            {
                title: 'Module 3: Render Props',
                lessons: [
                    { title: 'The Render Prop Pattern', duration: '14:10', completed: true, type: 'video', locked: false },
                    { title: 'HOCs vs Render Props', duration: '11:50', completed: true, type: 'video', locked: false },
                ]
            }
        ]
    };

    const sidebarItems = [
        { icon: BookOpen, label: 'Dashboard', href: '/student' },
        { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
        { icon: Video, label: 'Live Classes', href: '/student/live-classes' },
        { icon: FileText, label: 'Assignments', href: '/student/assignments' },
        { icon: Award, label: 'Quizzes', href: '/student/quizzes' },
        { icon: BarChart2, label: 'Progress', href: '/student/progress' },
        { icon: MessageCircle, label: 'Messages', href: '/student/messages' },
    ];

    const handleDownloadCertificate = async () => {
        if (!certificateRef.current) return;

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${course.title.replace(/\s+/g, '_')}_Certificate.pdf`);
            setShowCertificate(false);
        } catch (error) {
            console.error('Error generating certificate:', error);
        }
    };

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="student" title={course.title}>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Video Player Placeholder */}
                    <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video mb-6 relative group">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="h-20 w-20 text-white opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <h2 className="text-white text-xl font-bold">Building Your First HOC</h2>
                            <p className="text-slate-300 text-sm">Module 2 • Lesson 2</p>
                        </div>
                    </div>

                    {/* Course Info & Certificate Button */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h1>
                                <p className="text-slate-500">Instructor: <span className="font-medium text-slate-700">{course.instructor}</span></p>
                            </div>
                            {course.progress === 100 && (
                                <Button onClick={() => setShowCertificate(true)}>
                                    <Award className="h-4 w-4 mr-2" />
                                    Get Certificate
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex-1 bg-slate-100 rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{course.progress}% Complete</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 border-b border-slate-200">
                        <div className="flex space-x-8">
                            {['Overview', 'Resources', 'Discussion'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab.toLowerCase()
                                        ? 'text-primary'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab.toLowerCase() && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[300px]">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">About this lesson</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        In this lesson, we will dive deep into Higher Order Components (HOCs). We'll start by understanding the fundamental concept behind HOCs and how they relate to higher-order functions in JavaScript. Then, we'll walk through a practical example of creating a reusable HOC for handling data fetching.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Learning Objectives</h3>
                                    <ul className="list-disc list-inside text-slate-600 space-y-1">
                                        <li>Understand the definition and purpose of HOCs</li>
                                        <li>Learn how to implement a basic HOC</li>
                                        <li>Recognize common use cases for HOCs in React applications</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        {activeTab === 'resources' && (
                            <div className="space-y-4">
                                {[
                                    { name: 'Lesson Slides.pdf', size: '2.4 MB' },
                                    { name: 'Starter Code.zip', size: '1.1 MB' },
                                    { name: 'Reference Sheet.pdf', size: '500 KB' },
                                ].map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="flex items-center space-x-3">
                                            <FileText className="h-5 w-5 text-slate-400" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                                <p className="text-xs text-slate-500">{file.size}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" /> Download
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === 'discussion' && (
                            <div className="space-y-6">
                                <div className="flex space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                                        JS
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            placeholder="Ask a question or share your thoughts..."
                                            className="w-full p-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none h-24"
                                        ></textarea>
                                        <div className="flex justify-end mt-2">
                                            <Button size="sm">Post Comment</Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { user: 'Alex Morgan', time: '2 hours ago', text: 'Could you explain the difference between HOCs and Render Props again? I\'m a bit confused about when to use which.' },
                                        { user: 'Sarah Johnson', time: '1 hour ago', text: 'Great question Alex! We will cover this in detail in Module 3, but briefly: HOCs are better for static composition, while Render Props offer more dynamic flexibility.', isInstructor: true },
                                    ].map((comment, index) => (
                                        <div key={index} className="flex space-x-4">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${comment.isInstructor ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                {comment.user.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-medium text-slate-900">{comment.user}</span>
                                                    {comment.isInstructor && <Badge variant="primary">Instructor</Badge>}
                                                    <span className="text-xs text-slate-400">• {comment.time}</span>
                                                </div>
                                                <p className="text-slate-600 text-sm">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Course Sidebar */}
                <div className="w-full lg:w-80 space-y-6">
                    <Card className="p-6">
                        <h3 className="font-bold text-slate-900 mb-4">Course Progress</h3>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">100% Completed</span>
                            <span className="text-sm font-medium text-primary">24/24 Lessons</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>

                        <div className="space-y-4">
                            {course.modules.map((module, mIndex) => (
                                <div key={mIndex}>
                                    <h4 className="text-sm font-bold text-slate-900 mb-2">{module.title}</h4>
                                    <div className="space-y-2">
                                        {module.lessons.map((lesson, lIndex) => (
                                            <div
                                                key={lIndex}
                                                className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${lesson.current
                                                    ? 'bg-primary/5 border border-primary/20'
                                                    : 'hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="mr-3">
                                                    {lesson.completed ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                    ) : lesson.locked ? (
                                                        <Lock className="h-4 w-4 text-slate-300" />
                                                    ) : (
                                                        <PlayCircle className={`h-5 w-5 ${lesson.current ? 'text-primary' : 'text-slate-400'}`} />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-medium truncate ${lesson.current ? 'text-primary' : 'text-slate-700'}`}>
                                                        {lesson.title}
                                                    </p>
                                                    <p className="text-xs text-slate-400">{lesson.duration}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold text-slate-900 mb-4">Course Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">Assignments</span>
                                <span className="text-sm font-medium text-slate-900">5/5 Done</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">Quizzes</span>
                                <span className="text-sm font-medium text-slate-900">3/3 Done</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600">Avg. Score</span>
                                <span className="text-sm font-medium text-green-600">98%</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden relative">
                        <button
                            onClick={() => setShowCertificate(false)}
                            className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
                        >
                            <X className="h-5 w-5 text-slate-600" />
                        </button>

                        <div className="p-8 flex flex-col items-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Certificate Preview</h2>

                            <div className="overflow-auto max-h-[60vh] mb-8 border shadow-lg">
                                <CertificateTemplate
                                    ref={certificateRef}
                                    studentName="John Doe" // Replace with actual user name
                                    courseName={course.title}
                                    instructorName={course.instructor}
                                    date={new Date().toLocaleDateString()}
                                />
                            </div>

                            <div className="flex space-x-4">
                                <Button variant="outline" onClick={() => setShowCertificate(false)}>
                                    Close
                                </Button>
                                <Button onClick={handleDownloadCertificate}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default CourseDetail;
