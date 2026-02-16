import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/ui/ComingSoon';

const Settings = () => {
    return (
        <DashboardLayout userType="student" title="Settings">
            <ComingSoon title="Settings Coming Soon" message="You will soon be able to customize your profile and account security settings here." />
        </DashboardLayout>
    );
};

export default Settings;
