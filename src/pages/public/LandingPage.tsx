import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Video, BarChart2, MessageCircle, Shield, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                                Learn Smarter with <span className="text-primary">EduSync</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                Interactive courses, quizzes, and live sessions — one platform for teachers and students. Join the future of education today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/signup?role=student">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Get Started as Student
                                    </Button>
                                </Link>
                                <Link to="/signup?role=teacher">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        Get Started as Teacher
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                alt="Students learning"
                                className="relative rounded-2xl shadow-2xl border-4 border-white"
                            />

                            {/* Floating Chat Bubble */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 max-w-xs animate-bounce-slow">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-primary/10 p-2 rounded-full">
                                        <MessageCircle className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Need help?</p>
                                        <p className="text-xs text-slate-500">Our AI tutor is here 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why EduSync?</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Everything you need to manage your education journey, whether you're teaching or learning.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: BookOpen, title: 'Student Dashboard', desc: 'Track enrolled courses, assignments, and quizzes in one place.' },
                            { icon: Users, title: 'Teacher Dashboard', desc: 'Upload courses, create quizzes, and track student performance effortlessly.' },
                            { icon: Video, title: 'Live Classes', desc: 'Schedule and join live interactive sessions with integrated video tools.' },
                            { icon: BarChart2, title: 'Progress Reports', desc: 'Visual graphs and analytics to monitor your learning curve.' },
                            { icon: MessageCircle, title: 'Built-in Chatbot', desc: 'Get instant answers to your doubts with our AI-powered assistant.' },
                            { icon: Shield, title: 'Secure & Organized', desc: 'Role-based access ensures your data is safe and well-structured.' },
                        ].map((feature, index) => (
                            <Card key={index} className="p-8 hover:-translate-y-1 transition-transform">
                                <div className="bg-primary/5 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                                    <feature.icon className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Courses Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Courses</h2>
                            <p className="text-lg text-slate-600">Explore our top-rated courses across various categories.</p>
                        </div>
                        <Link to="/courses" className="hidden md:flex items-center text-primary font-medium hover:text-primary-hover">
                            View All Courses <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Web Development Bootcamp', category: 'Programming', level: 'Beginner', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
                            { title: 'Data Science Fundamentals', category: 'Data Science', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
                            { title: 'UI/UX Design Masterclass', category: 'Design', level: 'All Levels', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80' },
                            { title: 'Digital Marketing Strategy', category: 'Marketing', level: 'Beginner', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
                        ].map((course, index) => (
                            <Card key={index} className="overflow-hidden group cursor-pointer">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-900">
                                        {course.level}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs font-medium text-primary mb-2">{course.category}</div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{course.title}</h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">Master the essentials and advance your career with this comprehensive course.</p>
                                    <Button variant="outline" size="sm" className="w-full">View Course</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/courses">
                            <Button variant="outline">View All Courses</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to start learning or teaching?</h2>
                    <p className="text-xl text-slate-300 mb-10">
                        Join thousands of students and teachers on EduSync. Create your free account today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/signup?role=student">
                            <Button size="lg" className="w-full sm:w-auto bg-accent-orange hover:bg-orange-600 text-white border-none">
                                Join as Student
                            </Button>
                        </Link>
                        <Link to="/signup?role=teacher">
                            <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 border-none">
                                Join as Teacher
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
