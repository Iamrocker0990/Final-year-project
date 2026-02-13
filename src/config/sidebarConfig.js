import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle, Settings, LayoutDashboard, PlusCircle, Upload, Users, FileBarChart } from 'lucide-react';

export const studentSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/student' },
    { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
    { icon: Video, label: 'Live Classes', href: '/student/live-classes' },
    { icon: FileText, label: 'Assignments', href: '/student/assignments' },
    { icon: Award, label: 'Quizzes', href: '/student/quizzes' },
    { icon: BarChart2, label: 'Progress', href: '/student/progress' },
    { icon: MessageCircle, label: 'Messages', href: '/student/messages' },
    { icon: Settings, label: 'Settings', href: '/student/settings' },
];

export const teacherSidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/teacher' },
    { icon: BookOpen, label: 'My Courses', href: '/teacher/courses' },
    { icon: PlusCircle, label: 'Create Course', href: '/teacher/create-course' },
    { icon: Upload, label: 'Upload Content', href: '/teacher/upload' },
    { icon: FileText, label: 'Assignments', href: '/teacher/assignments' },
    { icon: Award, label: 'Quizzes', href: '/teacher/quizzes' },
    { icon: Users, label: 'Students', href: '/teacher/students' },
    { icon: FileBarChart, label: 'Reports', href: '/teacher/reports' },
    { icon: MessageCircle, label: 'Messages', href: '/teacher/messages' },
];
