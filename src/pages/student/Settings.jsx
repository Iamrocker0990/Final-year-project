import React from 'react';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle, Save, User, Mail, Lock, Bell } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Settings = () => {
    const sidebarItems = [
        { icon: BookOpen, label: 'Dashboard', href: '/student' },
        { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
        { icon: Video, label: 'Live Classes', href: '/student/live-classes' },
        { icon: FileText, label: 'Assignments', href: '/student/assignments' },
        { icon: Award, label: 'Quizzes', href: '/student/quizzes' },
        { icon: BarChart2, label: 'Progress', href: '/student/progress' },
        { icon: MessageCircle, label: 'Messages', href: '/student/messages' },
    ];

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="student" title="Settings">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Profile Settings */}
                <Card className="p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        Profile Information
                    </h2>
                    <div className="flex items-start space-x-8 mb-8">
                        <div className="flex-shrink-0">
                            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                                JS
                            </div>
                            <button className="mt-2 text-sm text-primary hover:text-primary-hover font-medium w-full text-center">
                                Change Photo
                            </button>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="First Name" defaultValue="John" />
                                <Input label="Last Name" defaultValue="Student" />
                            </div>
                            <Input label="Bio" placeholder="Tell us a bit about yourself..." />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </Card>

                {/* Account Settings */}
                <Card className="p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <Lock className="h-5 w-5 mr-2 text-primary" />
                        Account Security
                    </h2>
                    <div className="space-y-6">
                        <Input label="Email Address" type="email" defaultValue="john.student@example.com" />
                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Change Password</h3>
                            <div className="space-y-4">
                                <Input label="Current Password" type="password" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="New Password" type="password" />
                                    <Input label="Confirm New Password" type="password" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button variant="outline">Update Password</Button>
                    </div>
                </Card>

                {/* Notifications */}
                <Card className="p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-primary" />
                        Notifications
                    </h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Email notifications for new assignments', checked: true },
                            { label: 'Email notifications for quiz results', checked: true },
                            { label: 'Push notifications for live classes', checked: true },
                            { label: 'Weekly progress report', checked: false },
                            { label: 'Marketing emails and updates', checked: false },
                        ].map((item, index) => (
                            <label key={index} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    defaultChecked={item.checked}
                                    className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                                />
                                <span className="ml-3 text-slate-700">{item.label}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button>Save Preferences</Button>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
