import React from 'react';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import QuizModule from '../../components/quiz/QuizModule';

const Quizzes = () => {
    // sidebarItems removed to use default from DashboardLayout

    return (
        <DashboardLayout userType="student" title="Quizzes">
            <QuizModule userType="student" />
        </DashboardLayout>
    );
};

export default Quizzes;
