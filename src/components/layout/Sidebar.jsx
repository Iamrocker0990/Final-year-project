import React from 'react';
import { NavLink } from 'react-router-dom';

// FIXED: Removed 'interface SidebarItem' and 'interface SidebarProps'
// FIXED: Removed ': React.FC<SidebarProps>' type annotation
const Sidebar = ({ items, userType }) => {
    return (
        <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
            <div className="p-6">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {userType === 'student' ? 'JS' : 'JD'}
                    </div>
                    <div>
                        <p className="font-medium text-slate-900">
                            {userType === 'student' ? 'John Student' : 'Jane Doe'}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">{userType}</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    {items.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            // This ensure the "Dashboard" link doesn't stay highlighted 
                            // when you are on other sub-pages
                            end={item.href === `/student` || item.href === `/teacher`}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary/5 text-primary font-medium'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;