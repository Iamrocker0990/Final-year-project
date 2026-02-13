import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../../services/authService';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const LoginPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        } else if (roleParam === 'student') {
            setRole('student');
        }
    }, [searchParams, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await authService.login(email, password, role);

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
                    Welcome Back
                </h2>
                <p className="mt-3 text-center text-slate-500 font-medium">
                    Sign in to your dashboard to continue
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-10 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <Card className="py-10 px-6 sm:px-12 border-none shadow-2xl shadow-slate-200/50">
                    <div className="flex rounded-xl bg-slate-100 p-1.5 mb-8">
                        {['student', 'teacher'].map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all uppercase tracking-widest ${role === r
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-slate-500 hover:text-slate-900'
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email Address"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="h-12"
                        />

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">Password</label>
                                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
                            </div>
                            <Input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="h-12"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 text-lg shadow-lg shadow-primary/20 group"
                            isLoading={isLoading}
                        >
                            Continue as {role.charAt(0).toUpperCase() + role.slice(1)}
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                            New here?{' '}
                            <Link to={`/signup?role=${role}`} className="text-primary font-bold hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default LoginPage;
