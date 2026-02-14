import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlayCircle, CheckCircle, Download, BookOpen, Video, Award, BarChart2, MessageCircle, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CertificateTemplate from '../../components/certificate/CertificateTemplate';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [showCertificate, setShowCertificate] = useState(false);
    const certificateRef = useRef(null);
    const [currentLesson, setCurrentLesson] = useState({ moduleIndex: 0, lessonIndex: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);

<<<<<<< HEAD
    // sidebarItems removed to use default from DashboardLayout
=======
    const sidebarItems = [
        { icon: BookOpen, label: 'Dashboard', href: '/student' },
        { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
        { icon: Video, label: 'Live Classes', href: '/student/live-classes' },
        { icon: Award, label: 'Quizzes', href: '/student/quizzes' },
        { icon: BarChart2, label: 'Progress', href: '/student/progress' },
        { icon: MessageCircle, label: 'Messages', href: '/student/messages' },
    ];
>>>>>>> origin/otp-updates

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfoString = localStorage.getItem('userInfo');
                if (!userInfoString) {
                    navigate('/login');
                    return;
                }
                const { token, role } = JSON.parse(userInfoString);
                if (role !== 'student' && role !== 'admin') {
                    navigate('/teacher');
                    return;
                }

                const courseRes = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(courseRes.data);

                // pick first lesson if exists
                const firstModule = courseRes.data.modules?.[0];
                if (firstModule && firstModule.lessons?.length > 0) {
                    setCurrentLesson({ moduleIndex: 0, lessonIndex: 0 });
                }

                const progressRes = await axios.get(
                    `http://localhost:5000/api/student/courses/${id}/progress`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setProgress(progressRes.data.progress || 0);
                setCompletedLessons(progressRes.data.completedLessons || []);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load course');
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleMarkCompleted = async () => {
        if (!course) return;
        const module = course.modules?.[currentLesson.moduleIndex];
        const lesson = module?.lessons?.[currentLesson.lessonIndex];
        if (!lesson?._id) return;

        try {
            const userInfoString = localStorage.getItem('userInfo');
            if (!userInfoString) {
                navigate('/login');
                return;
            }
            const { token } = JSON.parse(userInfoString);

            const res = await axios.post(
                `http://localhost:5000/api/student/courses/${course._id}/lessons/${lesson._id}/complete`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCompletedLessons(res.data.completedLessons || []);
            setProgress(res.data.progress || 0);
        } catch (err) {
            console.error(err);
        }
    };

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
            pdf.save(`${(course?.title || 'course').replace(/\s+/g, '_')}_Certificate.pdf`);
            setShowCertificate(false);
        } catch (err) {
            console.error('Error generating certificate:', err);
        }
    };

    if (loading) {
        return (
            <DashboardLayout sidebarItems={sidebarItems} userType="student" title="Loading course">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (error || !course) {
        return (
            <DashboardLayout sidebarItems={sidebarItems} userType="student" title="Course">
                <div className="p-6 text-red-600">{error || 'Course not found'}</div>
            </DashboardLayout>
        );
    }

    const module = course.modules?.[currentLesson.moduleIndex];
    const lesson = module?.lessons?.[currentLesson.lessonIndex];
    const isCompleted = lesson?._id && completedLessons.some((id) => id === lesson._id || id?._id === lesson._id);

    return (
<<<<<<< HEAD
        <DashboardLayout userType="student" title={course.title}>
=======
        <DashboardLayout sidebarItems={sidebarItems} userType="student" title={course.title}>
>>>>>>> origin/otp-updates
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Video Player */}
                    <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video mb-6 relative">
                        {lesson?.content ? (
                            <video key={lesson._id} className="w-full h-full" controls src={lesson.content} />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <PlayCircle className="h-16 w-16 opacity-70" />
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <h2 className="text-white text-xl font-bold">{lesson?.title || 'Select a lesson'}</h2>
                            <p className="text-slate-300 text-sm">
                                {module?.title || ''} • {lesson?.duration || ''}
                            </p>
                        </div>
                    </div>

                    {/* Course Info */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h1>
                                <p className="text-slate-500">Instructor: <span className="font-medium text-slate-700">{course.instructor?.name || 'Instructor'}</span></p>
                            </div>
                            {progress === 100 && (
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
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{progress}% Complete</span>
                            {lesson && (
                                <Button size="sm" variant={isCompleted ? 'outline' : 'primary'} onClick={handleMarkCompleted}>
                                    {isCompleted ? <CheckCircle className="h-4 w-4 mr-2" /> : <PlayCircle className="h-4 w-4 mr-2" />}
                                    {isCompleted ? 'Completed' : 'Mark as watched'}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 border-b border-slate-200">
                        <div className="flex space-x-8">
                            {['Overview', 'Discussion'].map((tab) => (
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
                    <div className="min-h-[200px]">
                        {activeTab === 'overview' && (
                            <div className="space-y-4 text-slate-700">
                                <p>{course.description}</p>
                            </div>
                        )}
                        {activeTab === 'discussion' && (
                            <div className="text-sm text-slate-500">Discussion coming soon.</div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:w-80 space-y-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Course Content</h3>
                        <div className="space-y-4">
                            {course.modules?.map((m, mIndex) => (
                                <div key={mIndex} className="border border-slate-200 rounded-xl overflow-hidden">
                                    <div className="bg-slate-50 px-4 py-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{m.title}</p>
                                            <p className="text-xs text-slate-500">{m.lessons.length} Lessons</p>
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            {m.lessons.filter((l) => completedLessons.some((id) => id === l._id || id?._id === l._id)).length}/{m.lessons.length} completed
                                        </span>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {m.lessons.map((l, lIndex) => {
                                            const lessonDone = completedLessons.some((id) => id === l._id || id?._id === l._id);
                                            const isCurrent = currentLesson.moduleIndex === mIndex && currentLesson.lessonIndex === lIndex;
                                            return (
                                                <button
                                                    key={l._id || lIndex}
                                                    className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-primary/5 transition-colors text-left ${isCurrent ? 'bg-primary/5' : ''}`}
                                                    onClick={() => setCurrentLesson({ moduleIndex: mIndex, lessonIndex: lIndex })}
                                                >
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${lessonDone ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                                                        {lessonDone ? <CheckCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-slate-900">{l.title}</p>
                                                        <p className="text-xs text-slate-500">{l.duration || ''}</p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificate && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full relative">
                        <button
                            onClick={() => setShowCertificate(false)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <div ref={certificateRef}>
                            <CertificateTemplate studentName="Student" courseTitle={course.title} />
                        </div>
                        <div className="p-6 flex justify-end">
                            <Button onClick={handleDownloadCertificate}>
                                <Download className="h-4 w-4 mr-2" />
                                Download Certificate
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default CourseDetail;
