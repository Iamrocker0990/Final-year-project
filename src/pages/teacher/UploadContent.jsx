import React, { useState } from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Video, File, Link as LinkIcon, Type, Trash } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import { useDropzone } from 'react-dropzone';

const UploadContent = () => {
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

    const [selectedCourse, setSelectedCourse] = useState('');
    const [modules, setModules] = useState([
        { title: 'Module 1: Introduction', lessons: ['Welcome to the Course', 'Setup Environment'] }
    ]);
    
    // FIXED: Removed <File | null>
    const [uploadedFile, setUploadedFile] = useState(null);

    // FIXED: Removed : File[]
    const onDrop = React.useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setUploadedFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'video/*': [] }, maxFiles: 1 });

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="teacher" title="Upload Content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel: Course Structure */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="p-6">
                        <h3 className="font-bold text-slate-900 mb-4">Select Course</h3>
                        <select
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white mb-6"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">Select a course...</option>
                            <option value="1">Advanced React Patterns</option>
                            <option value="2">UI/UX Design Principles</option>
                        </select>

                        {selectedCourse && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-slate-700 text-sm">Course Structure</h4>
                                    <button className="text-primary text-xs font-medium hover:underline">+ Add Module</button>
                                </div>
                                <div className="space-y-4">
                                    {modules.map((module, mIndex) => (
                                        <div key={mIndex} className="border border-slate-200 rounded-lg overflow-hidden">
                                            <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center">
                                                <span className="font-medium text-sm text-slate-900">{module.title}</span>
                                                <button className="text-slate-400 hover:text-red-500"><Trash className="h-3 w-3" /></button>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                {module.lessons.map((lesson, lIndex) => (
                                                    <div key={lIndex} className="p-2 text-sm text-slate-600 hover:bg-slate-50 rounded cursor-pointer flex items-center">
                                                        <Video className="h-3 w-3 mr-2 text-slate-400" />
                                                        {lesson}
                                                    </div>
                                                ))}
                                                <button className="w-full text-left p-2 text-xs text-primary hover:bg-primary/5 rounded font-medium">
                                                    + Add Lesson
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Right Panel: Upload Form */}
                <div className="lg:col-span-2">
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Add New Lesson</h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Module</label>
                                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                        <option>Module 1: Introduction</option>
                                        <option>Create New Module...</option>
                                    </select>
                                </div>
                                <div>
                                    <Input label="Lesson Title" placeholder="e.g., Understanding Hooks" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-3">Content Type</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { icon: Video, label: 'Video' },
                                        { icon: File, label: 'Document' },
                                        { icon: LinkIcon, label: 'Link' },
                                        { icon: Type, label: 'Text' },
                                    ].map((type, index) => (
                                        <button
                                            key={index}
                                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${index === 0
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50 text-slate-600'
                                                }`}
                                        >
                                            <type.icon className="h-6 w-6 mb-2" />
                                            <span className="text-sm font-medium">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${isDragActive ? 'border-primary bg-primary/5' : 'border-slate-300 hover:border-primary hover:bg-primary/5'}`}>
                                <input {...getInputProps()} />
                                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                {isDragActive ? (
                                    <p className="text-lg font-medium text-primary">Drop the files here ...</p>
                                ) : (
                                    <>
                                        <p className="text-lg font-medium text-slate-900">Drag and drop video file</p>
                                        <p className="text-sm text-slate-500 mt-2">MP4, WebM up to 2GB</p>
                                    </>
                                )}
                                <Button variant="outline" className="mt-6" type="button">Browse Files</Button>
                            </div>

                            {uploadedFile && (
                                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Video className="h-5 w-5 text-primary mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{uploadedFile.name}</p>
                                            <p className="text-xs text-slate-500">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setUploadedFile(null)} className="text-slate-400 hover:text-red-500">
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (Optional)</label>
                                <textarea
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none"
                                    placeholder="Add notes or instructions for this lesson..."
                                ></textarea>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-3">Attachments</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                        <div className="flex items-center">
                                            <File className="h-4 w-4 mr-3 text-slate-400" />
                                            <span className="text-sm text-slate-700">Lesson_Slides.pdf</span>
                                        </div>
                                        <button className="text-slate-400 hover:text-red-500"><Trash className="h-4 w-4" /></button>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full border-dashed">
                                        <Plus className="h-4 w-4 mr-2" /> Add Resource
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 border-t border-slate-100">
                                <Button>Add Lesson to Course</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UploadContent;