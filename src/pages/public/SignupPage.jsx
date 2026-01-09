import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, ArrowRight, User, BookOpen } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const SignupPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'teacher') {
            setRole('teacher');
        } else {
            setRole('student');
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Save user data and token to localStorage
            localStorage.setItem('userInfo', JSON.stringify(data));

            // Redirect based on role
            if (data.role === 'student') {
                navigate('/student');
            } else {
                navigate('/teacher');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
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
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Start your learning journey with EduSync
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border-0">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Step 1: Choose Role</span>
                            <span className="h-px w-12 bg-slate-100"></span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Step 2: Details</span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setRole('student')}
                                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === 'student'
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                    }`}
                            >
                                <User className={`h-6 w-6 mb-2 ${role === 'student' ? 'text-primary' : 'text-slate-400'}`} />
                                <span className="font-semibold text-sm">Student</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('teacher')}
                                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === 'teacher'
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                    }`}
                            >
                                <BookOpen className={`h-6 w-6 mb-2 ${role === 'teacher' ? 'text-primary' : 'text-slate-400'}`} />
                                <span className="font-semibold text-sm">Teacher</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-slate-400 font-medium">Account Details</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            type="text"
                            required
                            placeholder="John Doe"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            required
                            placeholder="name@company.com"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Input
                                label="Password"
                                type="password"
                                required
                                placeholder="••••••••"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                required
                                placeholder="••••••••"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-slate-700 cursor-pointer">
                                    I agree to the <a href="#" className="text-primary hover:text-primary-hover underline decoration-primary/30 underline-offset-4">Terms</a> and <a href="#" className="text-primary hover:text-primary-hover underline decoration-primary/30 underline-offset-4">Privacy Policy</a>
                                </label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex justify-center py-3 text-lg"
                            isLoading={isLoading}
                        >
                            Create {role === 'student' ? 'Student' : 'Teacher'} Account <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-600">
                            Already have an account?{' '}
                            <Link to={`/login?role=${role}`} className="font-semibold text-primary hover:text-primary-hover underline decoration-primary/30 underline-offset-4 transition-all">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SignupPage;