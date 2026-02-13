import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../../services/authService';
import { GraduationCap, ArrowRight, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
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
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const { role } = JSON.parse(userInfo);
            navigate(role === 'student' ? '/student' : '/teacher');
        }

        const roleParam = searchParams.get('role');
        if (roleParam === 'teacher') {
            setRole('teacher');
        } else {
            setRole('student');
        }
    }, [searchParams, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setIsLoading(true);

        try {
            const data = await authService.register({
                name,
                email,
                password,
                role
            });

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
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:mx-auto sm:w-full sm:max-w-md"
            >
                <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
                    <div className="bg-primary/10 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                        <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">EduSync</span>
                </Link>
                <h2 className="text-center text-3xl font-extrabold text-slate-900">
                    Create Account
                </h2>
                <p className="mt-3 text-center text-slate-500 font-medium">
                    Start your learning journey today
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-10 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <Card className="py-10 px-6 sm:px-12 border-none shadow-2xl shadow-slate-200/50">
                    <div className="flex gap-4 mb-8">
                        {[
                            { id: 'student', icon: User, label: 'Student' },
                            { id: 'teacher', icon: BookOpen, label: 'Teacher' }
                        ].map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${role === r.id
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                                    }`}
                            >
                                <r.icon className="h-6 w-6 mb-2" />
                                <span className="font-bold text-xs uppercase tracking-widest">{r.label}</span>
                            </button>
                        ))}
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <Input
                            label="Full Name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-12"
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12"
                        />

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Input
                                label="Password"
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12"
                            />

                            <Input
                                label="Confirm"
                                type="password"
                                required
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-12"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 text-lg shadow-lg shadow-primary/20 group mt-4"
                            isLoading={isLoading}
                        >
                            Create {role.charAt(0).toUpperCase() + role.slice(1)} Account
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                            Already have an account?{' '}
                            <Link to={`/login?role=${role}`} className="text-primary font-bold hover:underline">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default SignupPage;
