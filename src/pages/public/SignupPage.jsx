import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const SignupPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // FIXED: Removed <'student' | 'teacher'>
    const [role, setRole] = useState('student');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'teacher') {
            setRole('teacher');
        } else {
            setRole('student');
        }
    }, [searchParams]);

    // FIXED: Removed : React.FormEvent
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (role === 'student') {
                navigate('/student');
            } else {
                navigate('/teacher');
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
                    <div className="bg-primary/10 p-2 rounded-lg">
                        <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">EduSync</span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Join EduSync as a {role} today
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="flex rounded-md bg-slate-100 p-1 mb-6">
                        <button
                            onClick={() => setRole('student')}
                            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${role === 'student'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setRole('teacher')}
                            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${role === 'teacher'
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            Teacher
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            type="text"
                            required
                            placeholder="John Doe"
                        />

                        <Input
                            label="Email address"
                            type="email"
                            required
                            placeholder="you@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            required
                            placeholder="••••••••"
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            required
                            placeholder="••••••••"
                        />

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-slate-900">
                                I agree to the <a href="#" className="text-primary hover:text-primary-hover">Terms</a> and <a href="#" className="text-primary hover:text-primary-hover">Privacy Policy</a>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex justify-center"
                            isLoading={isLoading}
                        >
                            Create Account <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-slate-500">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link to="/login">
                                <Button variant="outline" className="w-full">
                                    Sign in
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SignupPage;