import React, { useState } from 'react';
import { BookOpen, Users, FileText, Award, BarChart2, MessageCircle, Plus, Upload, Send, User } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const TeacherMessages = () => {
    // sidebarItems removed to use default from DashboardLayout

    const [activeChat, setActiveChat] = useState(0);
    const [message, setMessage] = useState('');

    const chats = [
        { id: 0, name: 'John Student', course: 'Advanced React', lastMsg: 'I have a question about HOCs.', time: '10:30 AM', unread: 2 },
        { id: 1, name: 'Emily Davis', course: 'UI/UX Design', lastMsg: 'Thanks for the feedback!', time: 'Yesterday', unread: 0 },
        { id: 2, name: 'Michael Brown', course: 'Python Intro', lastMsg: 'When is the next live session?', time: '2 days ago', unread: 0 },
    ];

    const [messages, setMessages] = useState([
        { sender: 'user', text: 'Hi Professor, I have a question about Higher Order Components.', time: '10:25 AM' },
        { sender: 'user', text: 'I\'m struggling to understand how to pass props through them correctly.', time: '10:30 AM' },
    ]);

    // FIXED: Removed ": React.FormEvent"
    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setMessages([...messages, {
            sender: 'me',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setMessage('');
    };

    return (
        <DashboardLayout userType="teacher" title="Messages">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-10rem)]">
                {/* Chat List */}
                <Card className="lg:col-span-1 flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-bold text-slate-900">Conversations</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChat(chat.id)}
                                className={`p-4 flex items-center space-x-3 cursor-pointer transition-colors ${activeChat === chat.id ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-slate-50 border-l-4 border-transparent'
                                    }`}
                            >
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold relative">
                                    {chat.name.split(' ').map(n => n[0]).join('')}
                                    {chat.unread > 0 && (
                                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white"></span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-medium text-slate-900 truncate">{chat.name}</h4>
                                        <span className="text-xs text-slate-400">{chat.time}</span>
                                    </div>
                                    <p className={`text-sm truncate ${chat.unread > 0 ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
                                        {chat.lastMsg}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Chat Area */}
                <Card className="lg:col-span-2 flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                                {chats[activeChat].name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{chats[activeChat].name}</h3>
                                <p className="text-xs text-slate-500">{chats[activeChat].course}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex max-w-[80%] ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'me' ? 'bg-primary text-white ml-3' : 'bg-slate-200 text-slate-600 mr-3'}`}>
                                        {msg.sender === 'me' ? 'JD' : chats[activeChat].name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'me' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-primary-100' : 'text-slate-400'}`}>{msg.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-white">
                        <form onSubmit={handleSend} className="flex space-x-4">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
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

export default TeacherMessages;