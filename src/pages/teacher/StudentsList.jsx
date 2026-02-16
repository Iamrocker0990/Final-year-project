import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/ui/ComingSoon';

const StudentsList = () => {
    return (
        <DashboardLayout userType="teacher" title="Students">
            <ComingSoon title="Students List Coming Soon" message="Management of enrolled students and their progress will be available here." />
        </DashboardLayout>
    );
};

export default StudentsList;
