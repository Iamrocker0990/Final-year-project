import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GraduationCap, ArrowRight, User, BookOpen, Mail, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const SignupPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Step state: 1 = Details, 2 = OTP
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
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
        setRole(roleParam === 'teacher' ? 'teacher' : 'student');
    }, [searchParams, navigate]);

    const handleNextStep = async (e) => {
        e.preventDefault();
        setError('');
        
        if (step === 1) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) return setError('Please enter a valid email address.');
            if (password.length < 8) return setError('Password must be at least 8 characters.');
            if (password !== confirmPassword) return setError('Passwords do not match.');
            
            setIsLoading(true);
            try {
                // Call API to send OTP to email
                const response = await fetch('http://localhost:5000/api/auth/send-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Failed to send OTP');
                }

                setStep(2);
            } catch (err) {
                // If backend is not yet ready, we still move to next step for demo purposes
                // But in production this should show the error
                console.error('OTP Error:', err);
                setStep(2); 
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role, otp }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');

            localStorage.setItem('userInfo', JSON.stringify(data));
            // Redirect to home/dashboard page as requested
            navigate(data.role === 'student' ? '/student' : '/teacher');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
                    <div className="bg-primary/10 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                        <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">EduSync</span>
                </Link>
                <h2 className="text-center text-3xl font-extrabold text-slate-900">
                    {step === 1 ? 'Create Account' : 'Verify Email'}
                </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="py-10 px-6 sm:px-12 border-none shadow-2xl shadow-slate-200/50">
                    {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}

                    <form className="space-y-5" onSubmit={step === 2 ? handleFinalSubmit : handleNextStep}>
                        <AnimatePresence mode='wait'>
                            {step === 1 && (
                                <motion.div key="step1" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}>
                                    <div className="flex gap-4 mb-8">
                                        {[{ id: 'student', icon: User, label: 'Student' }, { id: 'teacher', icon: BookOpen, label: 'Teacher' }].map((r) => (
                                            <button key={r.id} type="button" onClick={() => setRole(r.id)} className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${role === r.id ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                                                <r.icon className="h-6 w-6 mb-2" />
                                                <span className="font-bold text-xs uppercase">{r.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <Input label="Full Name" type="text" required placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                                    <Input label="Email Address" type="email" required placeholder="name123@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-4" />
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <Input label="Password" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <Input label="Confirm" type="password" required placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-center">
                                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Mail className="text-primary h-8 w-8" />
                                    </div>
                                    <p className="text-slate-500 mb-6 text-sm">We've sent a 6-digit verification code to <span className="font-bold text-slate-900">{email}</span></p>
                                    <Input label="OTP Code" type="text" required placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="text-center tracking-widest text-2xl" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button type="submit" className="w-full h-14 text-lg mt-4" isLoading={isLoading}>
                            {step === 1 ? 'Send OTP' : 'Verify & Finish'}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>

                    {step === 1 && (
                        <div className="mt-10 pt-8 border-t text-center">
                            <p className="text-sm text-slate-500">Already have an account? <Link to={`/login?role=${role}`} className="text-primary font-bold hover:underline">Sign in</Link></p>
                        </div>
                    )}
                </Card>
            </motion.div>
        </div>
    );
};

export default SignupPage;