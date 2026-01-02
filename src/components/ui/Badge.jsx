import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-orange-100 text-orange-700',
        danger: 'bg-red-100 text-red-700',
        neutral: 'bg-slate-100 text-slate-700',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
