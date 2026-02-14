import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Bell, Search, LogOut, Settings } from 'lucide-react';
<<<<<<< HEAD
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { studentSidebarItems, teacherSidebarItems } from '../../config/sidebarConfig';
=======
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
>>>>>>> origin/otp-updates

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

const DashboardLayout = ({ children, sidebarItems, userType, title }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const user = getUserFromStorage();
    const displayName = user?.name || (userType === 'student' ? 'Student' : 'Teacher');
    const initials = getInitials(user?.name) || (userType === 'student' ? 'ST' : 'TC');

<<<<<<< HEAD
    const defaultSidebarItems = userType === 'student' ? studentSidebarItems : teacherSidebarItems;
    const items = sidebarItems || defaultSidebarItems;

=======
>>>>>>> origin/otp-updates
    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

<<<<<<< HEAD
    /* Close dropdown when clicking outside */
=======
>>>>>>> origin/otp-updates
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50/50">
<<<<<<< HEAD
            <header 
                className="bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 sticky top-0 z-40"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                EduSync
                            </span>
                        </Link>
=======
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/70 backdrop-blur-xl border-b border-slate-200/70 h-16 sticky top-0 z-40 shadow-sm"
            >
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">EduSync</span>
                        </Link>

>>>>>>> origin/otp-updates
                        <div className="hidden md:flex items-center space-x-4 border-l border-slate-200 pl-8 h-6">
                            <h1 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                                {title}
                            </h1>
                        </div>
                    </div>

<<<<<<< HEAD
=======
                    {/* Search Field */}
>>>>>>> origin/otp-updates
                    <div className="flex-1 max-w-md mx-8 hidden md:block">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
<<<<<<< HEAD
                                placeholder={`Search anything...`}
                                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-slate-50/50 focus:bg-white"
=======
                                placeholder="Search anything..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 bg-slate-50/70 focus:bg-white shadow-sm"
>>>>>>> origin/otp-updates
                            />
                        </div>
                    </div>

<<<<<<< HEAD
                    <div className="flex items-center space-x-2">
                        <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
=======
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
>>>>>>> origin/otp-updates
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>

<<<<<<< HEAD
                        {/* Avatar Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                            >
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-primary/20">
=======
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-300 border border-slate-200/60 hover:border-slate-300 shadow-sm"
                            >
                                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-primary/25">
>>>>>>> origin/otp-updates
                                    {initials}
                                </div>
                                <div className="hidden lg:flex flex-col items-start text-left">
                                    <span className="text-sm font-bold text-slate-900 leading-none mb-1">
                                        {displayName.split(' ')[0]}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        {user?.role || userType}
                                    </span>
                                </div>
                            </button>

                            <AnimatePresence>
                                {open && (
<<<<<<< HEAD
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-50 mb-1 bg-slate-50/50">
                                            <p className="text-sm font-bold text-slate-900 truncate">
                                                {displayName}
                                            </p>
                                            <p className="text-xs font-medium text-slate-500 truncate">
                                                {user?.email}
                                            </p>
                                        </div>

                                        <Link
                                            to={`/${userType}/settings`}
                                            className="flex items-center px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors"
                                        >
                                            <Settings className="h-4 w-4 mr-3 opacity-70" />
                                            Account Settings
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                        >
=======
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200/60 py-2 z-50 overflow-hidden backdrop-blur-xl"
                                    >
                                        <div className="px-4 py-3 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-slate-100">
                                            <p className="text-sm font-bold text-slate-900 truncate">{displayName}</p>
                                            <p className="text-xs font-medium text-slate-500 truncate">{user?.email}</p>
                                        </div>
                                        <Link to={`/${userType}/settings`} className="flex items-center px-4 py-3 text-sm font-medium text-slate-600 hover:bg-primary/10 hover:text-primary transition-all">
                                            <Settings className="h-4 w-4 mr-3 opacity-70" />
                                            Account Settings
                                        </Link>
                                        <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
>>>>>>> origin/otp-updates
                                            <LogOut className="h-4 w-4 mr-3 opacity-70" />
                                            Sign Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
<<<<<<< HEAD
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
                <Sidebar items={items} userType={userType} />
                <main className="flex-1 py-8 md:px-8">
                    {children}
=======
            </motion.header>

            {/* Main Content Layout */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-6">
                {/* Sidebar stays fixed width */}
                <aside className="hidden md:block w-72 flex-shrink-0 sticky top-24 pb-8">
                    <Sidebar items={sidebarItems} userType={userType} />
                </aside>

                {/* Content expands to fill remaining space */}
                <main className="flex-1 min-w-0 py-8">
                    <div className="bg-white/60 rounded-3xl shadow-sm border border-slate-200/60 p-6 md:p-10 min-h-[calc(100vh-160px)]">
                        {children}
                    </div>
>>>>>>> origin/otp-updates
                </main>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default DashboardLayout;
=======
export default DashboardLayout;
>>>>>>> origin/otp-updates
