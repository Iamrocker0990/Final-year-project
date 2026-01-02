import React, { useState } from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Image as ImageIcon, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CreateCourse = () => {
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

    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="teacher" title="Create New Course">
            <div className="max-w-4xl mx-auto">
                <Link to="/teacher/courses" className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-6">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Courses
                </Link>

                <Card className="p-8">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-1">Course Details</h2>
                            <p className="text-sm text-slate-500">Basic information about your course.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <Input label="Course Title" placeholder="e.g., Advanced React Patterns" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                    <option>Select Category</option>
                                    <option>Programming</option>
                                    <option>Design</option>
                                    <option>Data Science</option>
                                    <option>Marketing</option>
                                    <option>Business</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Level</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                    <option>Select Level</option>
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                    <option>All Levels</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <Input label="Short Description" placeholder="Brief summary of what students will learn..." />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Detailed Description</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-32 resize-none"
                                    placeholder="Comprehensive details about the course content, prerequisites, and outcomes..."
                                ></textarea>
                            </div>

                            <div>
                                <Input label="Estimated Duration" placeholder="e.g., 10 weeks or 25 hours" />
                            </div>

                            <div>
                                <Input label="Price (Optional)" placeholder="Leave empty for free courses" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Course Thumbnail</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                                    <ImageIcon className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                                    <p className="text-sm font-medium text-slate-900">Click to upload image</p>
                                    <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB (16:9 ratio recommended)</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-100">
                            <Button variant="outline">Save as Draft</Button>
                            <Button onClick={handleSave} isLoading={isLoading}>
                                <Save className="h-4 w-4 mr-2" /> Publish Course
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateCourse;
