import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Brain, Shield, TrendingUp } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen pt-16 bg-black text-white relative">
            {/* Subtle Background Pattern - Career/AI Theme */}
            <div 
                className="fixed inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23 11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: '200px 200px'
                }}
            />
            
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
                            <span className="text-gradient animate-shimmer bg-[length:200%_auto]">
                                WayGen AI
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 mt-4 font-light">
                            The Future of Career Intelligence
                        </p>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl text-gray-300 max-w-2xl mx-auto mb-4 font-light"
                    >
                        Not guesses. Just <span className="text-white font-medium">grounded guidance</span>.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg text-gray-500 max-w-2xl mx-auto mb-12"
                    >
                        WayGen AI analyzes market trends, salary data, and automation risks to give you a personalized career roadmap powered by advanced AI agents.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row justify-center gap-6"
                    >
                        <Link
                            to="/chat?guest=true"
                            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all text-white backdrop-blur-sm overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></span>
                            <span className="relative z-10">Start as Guest</span>
                        </Link>
                        <Link
                            to="/login"
                            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            <span className="mr-2">Login / Create Account</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24 bg-black/80 backdrop-blur-sm relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Brain className="w-12 h-12 text-blue-400" />}
                            title="AI-Powered Insights"
                            description="Our advanced agents scan millions of data points to predict industry shifts before they happen."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={<Shield className="w-12 h-12 text-purple-400" />}
                            title="Automation Risk"
                            description="Get a realistic assessment of how AI and automation impact your specific role and region."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={<TrendingUp className="w-12 h-12 text-pink-400" />}
                            title="Salary Growth"
                            description="Visualize potential earnings trajectories vs inflation and market demand."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="glass-card p-10 rounded-3xl flex flex-col items-start hover:animate-float"
        >
            <div className="mb-6 p-4 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-lg">{description}</p>
        </motion.div>
    );
};

export default Home;
