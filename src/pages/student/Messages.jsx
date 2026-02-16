import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ComingSoon from '../../components/ui/ComingSoon';

const Messages = () => {
    return (
        <DashboardLayout userType="student" title="Messages & Chatbot">
            <ComingSoon title="Messaging Coming Soon" message="Chat with instructors and our AI tutor directly from here. We are finalizing this module." />
        </DashboardLayout>
    );
};

export default Messages;