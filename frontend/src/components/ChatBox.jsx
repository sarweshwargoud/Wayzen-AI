import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/api';

const ChatBox = ({ context }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your Career AI Agent. I can help you analyze job trends, salary expectations, and automation risks. What would you like to know?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        const userMessage = input;
        setInput('');
        setIsTyping(true);

        try {
            // Prepare request payload with context/profile data
            const payload = {
                content: userMessage,
                session_id: sessionId,
            };

            // Add profile context if available (for guest users)
            if (context) {
                payload.country = context.country;
                payload.education = context.education;
                payload.interest = context.interest;
                payload.budget = context.budget;
                payload.time_available = context.time_available;
            }

            // Call API
            const response = await api.post('/chat', payload);
            
            // Update session ID if new session was created
            if (response.data.session_id && !sessionId) {
                setSessionId(response.data.session_id);
            }

            // Add AI response
            const aiMsg = {
                id: Date.now() + 1,
                text: response.data.response,
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error('Error sending message:', error);
            let errorMessage = "I'm sorry, I encountered an error.";
            
            if (error.response) {
                // Server responded with error
                errorMessage = error.response.data?.detail || error.response.data?.message || `Server error: ${error.response.status}`;
            } else if (error.request) {
                // Request made but no response
                errorMessage = "Unable to connect to the server. Please make sure the backend is running on port 8000.";
            } else {
                // Something else happened
                errorMessage = error.message || "An unexpected error occurred.";
            }
            
            const errorMsg = {
                id: Date.now() + 1,
                text: errorMessage,
                sender: 'ai'
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Bot size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Career Intelligence Agent</h3>
                        <p className="text-xs text-green-400 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>
                <button className="text-muted-foreground hover:text-white transition-colors">
                    <Sparkles size={20} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex items-start max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.sender === 'user'
                                    ? 'bg-blue-600 ml-3'
                                    : 'bg-purple-600 mr-3'
                                }`}>
                                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>

                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-blue-600/20 border border-blue-500/30 text-blue-100 rounded-tr-sm'
                                    : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-sm'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full ml-11">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about salary trends, job security, or skills..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-5 pr-12 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder:text-gray-500"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
