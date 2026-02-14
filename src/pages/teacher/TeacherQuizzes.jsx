import React from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import QuizModule from '../../components/quiz/QuizModule';

const TeacherQuizzes = () => {
    // sidebarItems removed to use default from DashboardLayout

    return (
        <DashboardLayout userType="teacher" title="Quizzes Management">
            <QuizModule userType="teacher" />
        </DashboardLayout>
    );
};

export default TeacherQuizzes;
