import ChatBox from '../components/ChatBox';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Chatbot = () => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();
    const isGuest = new URLSearchParams(location.search).get('guest') === 'true' && !isAuthenticated;

    // Guest Form State
    const [guestProfile, setGuestProfile] = useState({
        country: 'India',
        education: '',
        interest: '',
        time_available: '',
        budget: ''
    });
    const [guestFormSubmitted, setGuestFormSubmitted] = useState(false);

    const handleGuestSubmit = (e) => {
        e.preventDefault();
        setGuestFormSubmitted(true);
    };

    if (isGuest && !guestFormSubmitted) {
        return (
            <div className="min-h-screen pt-24 px-4 flex items-center justify-center bg-black">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-lg w-full p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
                >
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Guest Setup</h2>
                    <p className="text-gray-400 text-center mb-6 text-sm">Help our AI agent give you relevant answers.</p>

                    <form onSubmit={handleGuestSubmit} className="space-y-4">
                        <select 
                            className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-gray-300" 
                            required 
                            value={guestProfile.country}
                            onChange={(e) => setGuestProfile({ ...guestProfile, country: e.target.value })}
                        >
                            <option value="">Select Country</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                        </select>

                        <select 
                            className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-gray-300" 
                            required 
                            value={guestProfile.education}
                            onChange={(e) => setGuestProfile({ ...guestProfile, education: e.target.value })}
                        >
                            <option value="">Select Education Level</option>
                            <option value="High School">High School</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Primary Interest (e.g. Coding)"
                            className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500"
                            required
                            value={guestProfile.interest}
                            onChange={(e) => setGuestProfile({ ...guestProfile, interest: e.target.value })}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <select 
                                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-gray-300" 
                                required
                                value={guestProfile.time_available}
                                onChange={(e) => setGuestProfile({ ...guestProfile, time_available: e.target.value })}
                            >
                                <option value="">Time Available</option>
                                <option value="5h">5 hrs/week</option>
                                <option value="10h">10 hrs/week</option>
                                <option value="20h">20+ hrs/week</option>
                            </select>
                            <select 
                                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-gray-300" 
                                required
                                value={guestProfile.budget}
                                onChange={(e) => setGuestProfile({ ...guestProfile, budget: e.target.value })}
                            >
                                <option value="">Budget</option>
                                <option value="Low">₹0 - ₹10,000</option>
                                <option value="Medium">₹10,000 - ₹1,00,000</option>
                                <option value="High">₹1,00,000+</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors">
                            Continue to Chat
                        </button>
                    </form>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-7xl mx-auto h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-6">

                {/* Sidebar / Context Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:flex w-1/4 flex-col bg-white/5 rounded-2xl border border-white/10 p-5"
                >
                    <div className="mb-6">
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                            WayGen AI
                        </h2>
                        <p className="text-sm text-gray-400">
                            {isAuthenticated ? `Profile: ${user?.name || 'User'}` : 'Guest Mode'}
                        </p>
                        {isAuthenticated && user?.profile && (
                            <div className="mt-2 text-xs text-gray-500">
                                <p>AI will use your saved profile automatically</p>
                            </div>
                        )}
                        {!isAuthenticated && guestProfile.interest && (
                            <div className="mt-2 text-xs text-gray-500">
                                <p>Guest profile loaded</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Suggested Queries</h3>
                        <button className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors">
                            Market analysis for {(isAuthenticated ? user?.profile?.interest : guestProfile.interest) || 'freshers'}?
                        </button>
                        <button className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors">
                            ROI for {(isAuthenticated ? user?.profile?.interest : guestProfile.interest) || 'AI'} courses
                        </button>
                    </div>
                </motion.div>

                {/* Main Chat Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1"
                >
                    <ChatBox context={isGuest ? guestProfile : user?.profile} />
                </motion.div>

            </div>
        </div>
    );
};

export default Chatbot;
