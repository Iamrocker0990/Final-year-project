import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/ui/ComingSoon';

const Reports = () => {
    return (
        <DashboardLayout userType="teacher" title="Reports & Analytics">
            <ComingSoon title="Reports Coming Soon" message="Advanced analytics and enrollment trends will be available here soon." />
        </DashboardLayout>
    );
};

export default Reports;
