import React, { useState } from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Image as ImageIcon, Save, ArrowLeft, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import courseService from '../../services/courseService'; // Import service
import axios from 'axios'; // Import axios for Cloudinary

const CreateCourse = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // --- CLOUDINARY CONFIGURATION (REPLACE THESE!) ---
    const CLOUD_NAME = "dwyj1vvjx"; // e.g., "dxyz123"
    const UPLOAD_PRESET = "edusync_preset"; // e.g., "edusync_preset"
    // -----------------------------------------------

    // 1. STATE MANAGEMENT
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        level: '',
        shortDescription: '',
        description: '',
        duration: '',
        price: ''
    });
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // 2. HANDLE TEXT INPUTS
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. HANDLE FILE SELECTION
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setThumbnailFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Show preview immediately
        }
    };

    // 4. HANDLE FORM SUBMISSION
    const handleSave = async () => {
        setIsLoading(true);

        try {
            // A. Check for Token (Authentication)
            // Token check is now handled by api.js interceptor, but user check is good for role validation
            const userInfoString = localStorage.getItem('userInfo');
            if (!userInfoString) {
                alert("You are not logged in!");
                navigate('/login');
                return;
            }
            // Optional: User role check
            const user = JSON.parse(userInfoString);
            if (user.role !== 'teacher' && user.role !== 'admin') {
                alert("Only teachers can create courses.");
                return;
            }


            // B. Upload Image to Cloudinary (If an image was selected)
            // Ideally this should also be moved to a service or backend route
            // For now, keeping it here to minimize storage complexity on backend
            let thumbnailUrl = '';
            if (thumbnailFile) {
                try {
                    const imageFormData = new FormData();
                    imageFormData.append("file", thumbnailFile);
                    imageFormData.append("upload_preset", UPLOAD_PRESET);
                    imageFormData.append("cloud_name", CLOUD_NAME);

                    // Send directly to Cloudinary API (keep axios here as it's external)
                    const res = await axios.post(
                        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                        imageFormData
                    );

                    thumbnailUrl = res.data.secure_url;
                    console.log("Image uploaded to Cloudinary:", thumbnailUrl);
                } catch (imgError) {
                    console.error("Cloudinary upload failed:", imgError);
                    alert("Image upload failed. Course will be created without a thumbnail.");
                }
            }

            // C. Prepare Data for Service
            const courseData = {
                title: formData.title,
                description: formData.description || formData.shortDescription,
                price: formData.price,
                thumbnail: thumbnailUrl,
                category: formData.category,
                level: formData.level,
                duration: formData.duration
            };

            // D. Use Service
            await courseService.createCourse(courseData);

            alert('Course Submitted for Review!');
            navigate('/teacher/courses');

        } catch (error) {
            console.error("Error creating course:", error);
            const errorMsg = error.response?.data?.message || 'Failed to create course.';
            alert(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    // sidebarItems removed to use default from DashboardLayout

    return (
        <DashboardLayout userType="teacher" title="Create New Course">
            <div className="max-w-4xl mx-auto">
                <Link to="/teacher/courses" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Courses
                </Link>

                <Card className="p-8">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 mb-1">Course Details</h2>
                            <p className="text-sm text-slate-500">Basic information about your course.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-1">
                                <label className="text-sm font-medium text-slate-700">Course Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                                    placeholder="e.g., Advanced React Patterns"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Design">Design</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Level</label>
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white"
                                >
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="All Levels">All Levels</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-1">
                                <label className="text-sm font-medium text-slate-700">Short Description</label>
                                <input
                                    name="shortDescription"
                                    value={formData.shortDescription}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
                                    placeholder="Brief summary of what students will learn..."
                                />
                            </div>

                            <div className="md:col-span-2 space-y-1">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Detailed Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 h-32 resize-none"
                                    placeholder="Comprehensive details about the course content..."
                                ></textarea>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Estimated Duration</label>
                                <input
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
                                    placeholder="e.g., 10 weeks"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Price (Optional)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200"
                                    placeholder="Leave empty for free courses"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Course Thumbnail</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="thumbnail-upload"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="thumbnail-upload"
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer block ${previewUrl ? 'border-blue-600 bg-blue-50' : 'border-slate-300 hover:border-blue-600 hover:bg-blue-600/5'}`}
                                >
                                    {previewUrl ? (
                                        <div className="relative">
                                            <img src={previewUrl} alt="Preview" className="h-48 mx-auto object-cover rounded shadow-md" />
                                            <p className="mt-2 text-sm text-blue-600 font-bold">Click to change image</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <ImageIcon className="h-10 w-10 text-slate-400 mx-auto mb-4" />
                                            <p className="text-sm font-medium text-slate-900">Click to upload image</p>
                                            <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB (16:9 ratio recommended)</p>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-100">
                            <Button variant="outline">Save as Draft</Button>
                            <Button onClick={handleSave} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader className="h-4 w-4 mr-2 animate-spin" /> Publishing...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" /> Publish Course
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default CreateCourse;