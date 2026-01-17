import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, X, ArrowRight, Search, Zap } from 'lucide-react';

const Compare = () => {
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleCompare = (e) => {
        e.preventDefault();
        if (optionA && optionB) setShowResult(true);
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Role Comparison</h1>
                    <p className="text-gray-400">Decision-focused. AI reasoned.</p>
                </div>

                {/* Search Input Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto mb-16 p-8 rounded-2xl bg-white/5 border border-white/10"
                >
                    <form onSubmit={handleCompare} className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full relative">
                            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Option A</label>
                            <input
                                type="text"
                                placeholder="e.g. Software Engineer"
                                value={optionA}
                                onChange={(e) => setOptionA(e.target.value)}
                                className="w-full bg-black/40 border border-white/20 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-center pt-6">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-500 font-bold">VS</div>
                        </div>

                        <div className="flex-1 w-full relative">
                            <label className="text-xs text-gray-500 mb-1 block uppercase tracking-wider">Option B</label>
                            <input
                                type="text"
                                placeholder="e.g. Product Manager"
                                value={optionB}
                                onChange={(e) => setOptionB(e.target.value)}
                                className="w-full bg-black/40 border border-white/20 rounded-xl py-3 px-4 text-white focus:border-purple-500 outline-none"
                            />
                        </div>

                        <div className="pt-6">
                            <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors flex items-center">
                                <Zap size={18} className="mr-2" />
                                Compare
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Comparison Table/Grid */}
                {showResult && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Label Column */}
                        <div className="hidden md:flex flex-col justify-center space-y-8 text-right text-gray-400 text-sm font-medium py-10">
                            <div className="h-10 flex items-center justify-end">Avg Base Salary</div>
                            <div className="h-10 flex items-center justify-end">Growth Rate</div>
                            <div className="h-10 flex items-center justify-end">Automation Risk</div>
                            <div className="h-10 flex items-center justify-end">Final AI Verdict</div>
                        </div>

                        {/* Role 1 */}
                        <RoleCard
                            title={optionA}
                            salary="₹12,00,000"
                            growth="+22%"
                            risk="Low"
                            verdict="Strong Technical Foundation"
                            color="blue"
                        />

                        {/* Role 2 */}
                        <RoleCard
                            title={optionB}
                            salary="₹14,50,000"
                            growth="+15%"
                            risk="Medium"
                            verdict="High Leadership Potential"
                            color="purple"
                        />

                    </div>
                )}

            </div>
        </div>
    );
};

const RoleCard = ({ title, salary, growth, risk, verdict, color }) => {
    const colorClass = color === 'purple' ? 'from-purple-500/10 to-pink-500/10 border-purple-500/30' : 'from-blue-500/10 to-cyan-500/10 border-blue-500/30';
    const textClass = color === 'purple' ? 'text-purple-400' : 'text-blue-400';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-2xl bg-gradient-to-br ${colorClass} border backdrop-blur-sm`}
        >
            <h3 className={`text-2xl font-bold text-white mb-8 text-center capitalize`}>{title}</h3>

            <div className="space-y-8">
                <MetricRow label="Avg Salary" value={salary} highlighted />
                <MetricRow label="Growth" value={growth} textColor="text-green-400" />
                <MetricRow label="Risk" value={risk} />
                <div className="pt-4 border-t border-white/10 text-center">
                    <p className="text-xs text-gray-500 uppercase mb-2">AI Verdict</p>
                    <p className="text-sm font-medium text-white">{verdict}</p>
                </div>
            </div>

        </motion.div>
    );
};

const MetricRow = ({ label, value, highlighted, textColor = 'text-gray-200', icon }) => (
    <div className="flex flex-col md:items-center text-center">
        <span className="md:hidden text-xs text-gray-500 mb-1">{label}</span>
        <div className={`flex items-center justify-center space-x-2 h-10 ${highlighted ? 'text-3xl font-bold' : 'text-lg font-medium'} ${textColor}`}>
            {icon}
            <span>{value}</span>
        </div>
    </div>
);

export default Compare;
