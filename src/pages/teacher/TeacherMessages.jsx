import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/ui/ComingSoon';

const TeacherMessages = () => {
    return (
        <DashboardLayout userType="teacher" title="Messages">
            <ComingSoon title="Messages Coming Soon" message="Direct messaging with students will be enabled in a future update." />
        </DashboardLayout>
    );
};

export default TeacherMessages;