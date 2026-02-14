import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const getUserFromStorage = () => {
    const userInfoString = localStorage.getItem('userInfo');
    if (!userInfoString) return null;

    try {
        return JSON.parse(userInfoString);
    } catch {
        localStorage.removeItem('userInfo');
        return null;
    }
};

const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Sidebar = ({ items, userType }) => {
    const user = getUserFromStorage();
    const displayName = user?.name || (userType === 'student' ? 'Student' : 'Teacher');
    const initials = getInitials(user?.name) || (userType === 'student' ? 'ST' : 'TC');

    return (
        <aside className="w-64 border-r border-slate-100 hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16 bg-white/50 backdrop-blur-sm">
            <div className="p-6 h-full flex flex-col">
<<<<<<< HEAD
                <div 
=======
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
>>>>>>> origin/otp-updates
                    className="flex items-center space-x-4 mb-10 p-2 bg-slate-50/50 rounded-2xl ring-1 ring-slate-100"
                >
                    <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
                        {initials}
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate text-sm leading-tight">
                            {displayName}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{userType}</p>
                    </div>
<<<<<<< HEAD
                </div>

                <nav className="space-y-1 flex-1">
                    {items.map((item, index) => (
                        <div
                            key={item.href}
=======
                </motion.div>

                <nav className="space-y-1 flex-1">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
>>>>>>> origin/otp-updates
                        >
                            <NavLink
                                to={item.href}
                                end={item.href === `/student` || item.href === `/teacher`}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-primary text-white shadow-lg shadow-primary/25 font-bold'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
                                    }`
                                }
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-sm">{item.label}</span>
                            </NavLink>
<<<<<<< HEAD
                        </div>
=======
                        </motion.div>
>>>>>>> origin/otp-updates
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-150 transition-transform duration-700">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                                <div className="w-20 h-20 border-4 border-white rounded-full border-t-transparent" />
                            </motion.div>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Pro Plan</p>
                        <p className="text-sm font-bold mb-3">Unlimited Access</p>
                        <button className="w-full py-2 bg-white text-slate-900 text-[10px] font-extrabold rounded-lg hover:bg-slate-100 transition-colors uppercase tracking-widest">
                            Upgrade
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
