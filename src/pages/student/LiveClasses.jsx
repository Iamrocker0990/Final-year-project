import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/ui/ComingSoon';

const LiveClasses = () => {
    return (
        <DashboardLayout userType="student" title="Live Classes">
            <ComingSoon title="Live Classes Coming Soon" message="Join interactive live sessions with your instructors. This feature is currently under development." />
        </DashboardLayout>
    );
};

export default LiveClasses;
