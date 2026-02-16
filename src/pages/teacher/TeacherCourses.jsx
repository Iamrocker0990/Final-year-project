import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService'; // Import service
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, MoreVertical, Edit, Trash, Eye } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const TeacherCourses = () => {
    // sidebarItems removed to use default from DashboardLayout
    const navigate = useNavigate();

    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getTeacherCourses();
                // Map backend data to UI format if needed
                const formattedCourses = data.map(course => ({
                    id: course._id,
                    title: course.title,
                    category: course.description?.substring(0, 20) + '...', // Placeholder if category isn't in backend yet
                    students: 0, // Placeholder
                    status: course.status.charAt(0).toUpperCase() + course.status.slice(1), // 'pending' -> 'Pending'
                    lastUpdated: new Date(course.createdAt).toLocaleDateString(),
                    image: course.thumbnail || 'https://via.placeholder.com/150'
                }));
                setCourses(formattedCourses);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <DashboardLayout userType="teacher" title="My Courses">
            <div className="flex justify-between items-center mb-8">
                <div className="flex space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none w-64"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <select className="px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white text-slate-600">
                        <option>All Categories</option>
                        <option>Programming</option>
                        <option>Design</option>
                        <option>Data Science</option>
                    </select>
                </div>
                <Link to="/teacher/create-course">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" /> Create New Course
                    </Button>
                </Link>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Course Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Students</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700">Last Updated</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate(`/teacher/course/${course.id}/content`)}>
                                            <img src={course.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                                            <span className="font-medium text-slate-900">{course.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{course.category}</td>
                                    <td className="px-6 py-4 text-slate-600">{course.students}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={course.status === 'Published' ? 'success' : 'neutral'}>
                                            {course.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">{course.lastUpdated}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                className="p-1 text-slate-400 hover:text-primary transition-colors"
                                                title="Manage Content"
                                                onClick={() => navigate(`/teacher/course/${course.id}/content`)}
                                            >
                                                <BookOpen className="h-4 w-4" />
                                            </button>
                                            <button className="p-1 text-slate-400 hover:text-primary transition-colors" title="Edit">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="p-1 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </div>
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

export default TeacherCourses;
