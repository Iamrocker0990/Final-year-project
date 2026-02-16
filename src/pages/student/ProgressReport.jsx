import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/ui/ComingSoon';

const ProgressReport = () => {
    return (
        <DashboardLayout userType="student" title="Progress Report">
            <ComingSoon title="Analytics Coming Soon" message="Detailed tracking of your learning progress, grades, and quiz performance will be available here." />
        </DashboardLayout>
    );
};

export default ProgressReport;
