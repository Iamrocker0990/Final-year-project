import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const LoginPage = () => {
    const navigate = useNavigate();
    // Removed <'student' | 'teacher'> type parameter
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Removed the ': React.FormEvent' type annotation
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
                    Welcome back
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Sign in to your account to continue
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="flex rounded-md bg-slate-100 p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${role === 'student'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
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
                            label="Email address"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />

                        <div>
                            <Input
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            <div className="flex items-center justify-end mt-1">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-primary hover:text-primary-hover">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex justify-center"
                            isLoading={isLoading}
                        >
                            Sign in as {role === 'student' ? 'Student' : 'Teacher'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-slate-500">
                                    Don't have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link to={`/signup?role=${role}`}>
                                <Button variant="outline" className="w-full">
                                    Create new account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;