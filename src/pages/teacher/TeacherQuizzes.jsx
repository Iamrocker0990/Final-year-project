import React from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import QuizModule from '../../components/quiz/QuizModule';

const TeacherQuizzes = () => {
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

    return (
        <DashboardLayout sidebarItems={sidebarItems} userType="teacher" title="Quizzes Management">
            <QuizModule userType="teacher" />
        </DashboardLayout>
    );
};

export default TeacherQuizzes;
