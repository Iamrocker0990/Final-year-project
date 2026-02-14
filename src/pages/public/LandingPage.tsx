import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import courseService from '../../services/courseService';
import { BookOpen, Users, Video, BarChart2, MessageCircle, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        },
    },
};

const LandingPage = () => {
    const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getAllApprovedCourses();
                // Take top 4 or random 4
                setFeaturedCourses(data.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch featured courses", error);
            }
        };
        fetchCourses();
    }, []);
    return (
        <div className="min-h-screen bg-white selection:bg-primary/10">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium mb-6"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span>The Future of Learning is Here</span>
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                                Learn Smarter <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
                                    Together
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                                Join EduSync, where interactive courses and live mentoring meet to create the ultimate learning experience.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/signup?role=student" className="group">
                                    <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 group-hover:-translate-y-0.5">
                                        Join as Student <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/signup?role=teacher">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto ">
                                        Become Instructor
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="relative lg:ml-10"
                        >
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
                            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-100/20 rounded-full blur-[100px]"></div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl group-hover:opacity-0 transition-opacity duration-500"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                                    alt="Students learning"
                                    className="rounded-3xl shadow-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                />

                                {/* Floating stats card */}

                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="text-center mb-20"
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            Tools Designed for <span className="text-primary">You</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            A simpler way to manage your entire education ecosystem.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            { icon: BookOpen, title: 'Smart Dashboard', desc: 'A unified view of your courses, assignments, and learning milestones.' },
                            { icon: Users, title: 'Instructor Hub', desc: 'Powerful tools to create content, manage students, and track results.' },
                            { icon: Video, title: 'Live Mentoring', desc: 'Face-to-face interactive sessions with industry experts.' },
                            { icon: BarChart2, title: 'Visual Progress', desc: 'Real-time analytics to help you understand your learning journey.' },
                            { icon: MessageCircle, title: 'AI Study Buddy', desc: '24/7 AI tutor to help you solve complex problems instantly.' },
                            { icon: Shield, title: 'Built for Trust', desc: 'Enterprise-grade security ensuring your data remains private.' },
                        ].map((feature, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="p-10 hover:shadow-xl hover:shadow-primary/5 transition-all group border-none ring-1 ring-slate-200/60 h-full">
                                    <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Popular Courses Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 italic">Featured Courses</h2>
                            <p className="text-xl text-slate-600">Pick from our library of curated high-quality content.</p>
                        </div>
                        <Link to="/courses" className="flex items-center text-primary font-bold hover:text-primary-hover group bg-primary/5 px-6 py-3 rounded-full transition-all">
                            Explore Catalog <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredCourses.length > 0 ? (
                            featuredCourses.map((course, index) => (
                                <motion.div
                                    key={course._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden group cursor-pointer border-none ring-1 ring-slate-200/60 hover:ring-primary/20 transition-all shadow-none hover:shadow-2xl hover:shadow-primary/5">
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={course.thumbnail || 'https://via.placeholder.com/800x600'}
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm uppercase tracking-wider">
                                                {course.level || 'All Levels'}
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{course.category || 'General'}</div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight h-14 overflow-hidden">{course.title}</h3>
                                            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-all border-slate-200 group-hover:border-primary">
                                                Learn More
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-center col-span-4 text-slate-500">No courses available at the moment. Check back soon!</p>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-slate-900 relative overflow-hidden mx-4 sm:mx-8 mb-8 rounded-[3rem] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-indigo-900/40"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-[1.1]">Join the next generation <br /> of learners.</h2>
                        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Thousands of students and instructors already use EduSync. <br /> It's time you joined them.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link to="/signup?role=student">
                                <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg bg-primary hover:bg-primary-hover border-none shadow-2xl shadow-primary/20">
                                    Get Started as Student
                                </Button>
                            </Link>
                            <Link to="/signup?role=teacher">
                                <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg  text-slate-900 hover:bg-primary-hover border-none shadow-2xl shadow-white/5">
                                    Become Instructor
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;
