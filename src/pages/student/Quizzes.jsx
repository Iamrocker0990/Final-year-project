import React from 'react';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import QuizModule from '../../components/quiz/QuizModule';

const Quizzes = () => {
<<<<<<< HEAD
    // sidebarItems removed to use default from DashboardLayout

    return (
        <DashboardLayout userType="student" title="Quizzes">
=======
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
        <DashboardLayout sidebarItems={sidebarItems} userType="student" title="Quizzes">
>>>>>>> origin/otp-updates
            <QuizModule userType="student" />
        </DashboardLayout>
    );
};

export default Quizzes;
