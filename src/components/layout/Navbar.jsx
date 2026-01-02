import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    // Hide navbar on dashboard pages
    if (location.pathname.startsWith('/student') || location.pathname.startsWith('/teacher')) {
        return null;
    }

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">EduSync</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-slate-600 hover:text-primary font-medium transition-colors">Home</Link>
                        <Link to="/courses" className="text-slate-600 hover:text-primary font-medium transition-colors">Courses</Link>
                        <Link to="/features" className="text-slate-600 hover:text-primary font-medium transition-colors">Features</Link>
                        <Link to="/contact" className="text-slate-600 hover:text-primary font-medium transition-colors">Contact</Link>

                        <div className="flex items-center space-x-4 ml-4">
                            <Link to="/login">
                                <Button variant="outline" size="sm">Log In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-600 hover:text-primary focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 py-4">
                    <div className="flex flex-col space-y-4 px-4">
                        <Link to="/" className="text-slate-600 hover:text-primary font-medium">Home</Link>
                        <Link to="/courses" className="text-slate-600 hover:text-primary font-medium">Courses</Link>
                        <Link to="/features" className="text-slate-600 hover:text-primary font-medium">Features</Link>
                        <Link to="/contact" className="text-slate-600 hover:text-primary font-medium">Contact</Link>
                        <div className="flex flex-col space-y-2 pt-4 border-t border-slate-100">
                            <Link to="/login">
                                <Button variant="outline" className="w-full">Log In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="w-full">Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
