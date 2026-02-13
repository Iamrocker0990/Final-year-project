import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    const userInfoString = localStorage.getItem('userInfo');
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    // Hide navbar on dashboard pages
    if (location.pathname.startsWith('/student') || location.pathname.startsWith('/teacher')) {
        return null;
    }

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="bg-primary/10 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                                <GraduationCap className="h-7 w-7 text-primary" />
                            </div>
                            <span className="text-2xl font-bold text-slate-900 tracking-tight">EduSync</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <div className="flex items-center space-x-8">
                            {['Home', 'Courses', 'Features', 'Contact'].map((item) => (
                                <Link 
                                    key={item} 
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                                    className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-4 border-l border-slate-100 pl-10">
                            {userInfo ? (
                                <Link to={userInfo.role === 'student' ? '/student' : '/teacher'}>
                                    <Button size="md" className="shadow-lg shadow-primary/20">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button className="text-sm font-bold text-slate-900 hover:text-primary transition-colors uppercase tracking-widest px-4">Log In</button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button size="md" className="shadow-lg shadow-primary/20">Join Free</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-slate-600 hover:text-primary bg-slate-50 rounded-xl transition-all"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="flex flex-col space-y-4 px-6 py-8">
                            {['Home', 'Courses', 'Features', 'Contact'].map((item) => (
                                <Link 
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                                    className="text-lg font-bold text-slate-900"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="flex flex-col space-y-3 pt-6 border-t border-slate-100">
                                {userInfo ? (
                                    <Link to={userInfo.role === 'student' ? '/student' : '/teacher'} onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full h-14 text-lg">Dashboard</Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="secondary" className="w-full h-14 text-lg border-slate-200">Log In</Button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                            <Button className="w-full h-14 text-lg">Join Free</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
