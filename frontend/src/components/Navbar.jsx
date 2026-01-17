import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Brain, BarChart2, FileText, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Chat', path: '/chat', icon: <Brain size={18} /> },
        { name: 'Insights', path: '/insights', icon: <BarChart2 size={18} /> },
        { name: 'Reports', path: '/reports', icon: <FileText size={18} /> },
        { name: 'Settings', path: '/settings', icon: <User size={18} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">N</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                WayGen AI
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive(link.path)
                                        ? 'text-primary bg-primary/10'
                                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">Hi, {user.name}</span>
                                <button
                                    onClick={logout}
                                    className="p-2 rounded-full hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-white hover:bg-white/5 block"
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                            {!isAuthenticated ? (
                                <div className="mt-4 flex flex-col space-y-2 px-3">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-2 text-muted-foreground border border-border rounded-lg">Login</Link>
                                    <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center py-2 bg-primary text-primary-foreground rounded-lg">Sign Up</Link>
                                </div>
                            ) : (
                                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-red-400">Logout</button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
