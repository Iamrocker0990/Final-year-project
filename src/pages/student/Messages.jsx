import React, { useState } from 'react';
import { BookOpen, Video, FileText, BarChart2, Award, MessageCircle, Send, User, Bot, Settings } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Messages = () => {
    // sidebarItems removed to use default from DashboardLayout

    // FIXED: Removed <'bot' | 'teacher'>
    const [activeChat, setActiveChat] = useState('bot');
    const [message, setMessage] = useState('');

    const [chatHistory, setChatHistory] = useState([
        { sender: 'bot', text: "Hi John! I'm your EduSync AI assistant. How can I help you with your studies today?", time: '10:00 AM' },
    ]);

    // FIXED: Removed : React.FormEvent
    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = {
            sender: 'user',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
<<<<<<< HEAD

=======
>>>>>>> otp-updates
        setChatHistory([...chatHistory, newMessage]);
        setMessage('');

        // Simulate bot response
        if (activeChat === 'bot') {
            setTimeout(() => {
                setChatHistory(prev => [...prev, {
                    sender: 'bot',
                    text: "That's a great question! Based on your current course \"Advanced React Patterns\", I recommend reviewing the module on Higher Order Components.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
            }, 1000);
        }
    };

    return (
        <DashboardLayout userType="student" title="Messages & Chatbot">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-10rem)]">
                {/* Chat List */}
                <Card className="lg:col-span-1 flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-bold text-slate-900">Conversations</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div
                            onClick={() => setActiveChat('bot')}
                            className={`p-4 flex items-center space-x-3 cursor-pointer transition-colors ${activeChat === 'bot' ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-slate-50 border-l-4 border-transparent'
                                }`}
                        >
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Bot className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-medium text-slate-900 truncate">EduSync AI Tutor</h4>
                                    <span className="text-xs text-slate-400">Now</span>
                                </div>
                                <p className="text-sm text-slate-500 truncate">How can I help you with your studies today?</p>
                            </div>
                        </div>

                        <div className="px-4 py-2 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Instructors
                        </div>

                        {[
                            { name: 'Sarah Johnson', course: 'Advanced React', time: '2h ago', msg: 'Great job on the last assignment!' },
                            { name: 'Michael Chen', course: 'UI/UX Design', time: 'Yesterday', msg: "Don't forget the deadline tomorrow." },
                        ].map((chat, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveChat('teacher')}
                                className={`p-4 flex items-center space-x-3 cursor-pointer transition-colors ${activeChat === 'teacher' ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-slate-50 border-l-4 border-transparent'
                                    }`}
                            >
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                    {chat.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-medium text-slate-900 truncate">{chat.name}</h4>
                                        <span className="text-xs text-slate-400">{chat.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 truncate">{chat.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Chat Area */}
                <Card className="lg:col-span-2 flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeChat === 'bot' ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-600 font-bold'}`}>
                                {activeChat === 'bot' ? <Bot className="h-6 w-6" /> : 'SJ'}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">
                                    {activeChat === 'bot' ? 'EduSync AI Tutor' : 'Sarah Johnson'}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    {activeChat === 'bot' ? 'Always here to help' : 'Instructor • Advanced React Patterns'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                        {activeChat === 'bot' ? (
                            chatHistory.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary text-white ml-3' : 'bg-white border border-slate-200 text-primary mr-3'}`}>
                                            {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                        </div>
                                        <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-primary-100' : 'text-slate-400'}`}>{msg.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <MessageCircle className="h-12 w-12 mb-4 opacity-50" />
                                <p>Select a conversation to start chatting</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-white">
                        <form onSubmit={handleSend} className="flex space-x-4">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={activeChat === 'bot' ? "Ask your doubt..." : "Type a message..."}
                                className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <Button type="submit" disabled={!message.trim()} className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                                <Send className="h-5 w-5 ml-0.5" />
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Messages;