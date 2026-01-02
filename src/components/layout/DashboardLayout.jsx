import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Bell, Search, LogOut, Settings, User } from 'lucide-react';
import Sidebar from './Sidebar';

// FIXED: Removed 'interface SidebarItem' and 'interface DashboardLayoutProps'
// FIXED: Removed ': React.FC<DashboardLayoutProps>' type annotation
const DashboardLayout = ({ children, sidebarItems, userType, title }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Header */}
            <header className="bg-white border-b border-slate-100 h-16 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-primary/10 p-1.5 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">EduSync</span>
                        </Link>
                        <h1 className="text-lg font-medium text-slate-700 hidden md:block border-l border-slate-200 pl-8">
                            {title}
                        </h1>
                    </div>

                    <div className="flex-1 max-w-xl mx-8 hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder={`Search ${userType === 'student' ? 'courses, lessons...' : 'courses, students...'}`}
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="relative group">
                            <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-50 transition-colors">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    {userType === 'student' ? 'JS' : 'JD'}
                                </div>
                            </button>

                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 hidden group-hover:block">
                                <Link to={`/${userType}/settings`} className="flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary">
                                    <Settings className="h-4 w-4 mr-2" />
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
                <Sidebar items={sidebarItems} userType={userType} />
                <main className="flex-1 py-8 md:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;