import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, DollarSign, Activity } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Insights = () => {
    // Mock Data
    const salaryData = {
        labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [
            {
                label: 'Software Engineer',
                data: [95000, 105000, 115000, 122000, 130000, 145000],
                borderColor: 'rgb(59, 130, 246)', // Blue
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Data Scientist',
                data: [100000, 110000, 125000, 135000, 142000, 155000],
                borderColor: 'rgb(168, 85, 247)', // Purple
                backgroundColor: 'rgba(168, 85, 247, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const riskData = {
        labels: ['Safe', 'At Risk', 'High Risk'],
        datasets: [
            {
                data: [65, 25, 10],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)', // Green
                    'rgba(234, 179, 8, 0.8)',  // Yellow
                    'rgba(239, 68, 68, 0.8)',  // Red
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(239, 68, 68, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#9ca3af' }
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#9ca3af' }
            },
            x: {
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                ticks: { color: '#9ca3af' }
            }
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-white">Market Insights</h1>
                    <p className="text-gray-400 mt-2">Real-time analysis of job market trends and automation risks.</p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <MetricCard
                        title="Avg Salary Growth"
                        value="+12.5%"
                        icon={<TrendingUp className="text-green-400" />}
                        trend="up"
                    />
                    <MetricCard
                        title="Automation Risk"
                        value="Low"
                        icon={<AlertTriangle className="text-yellow-400" />}
                        trend="neutral"
                        subtext="For Tech Roles"
                    />
                    <MetricCard
                        title="Top Skill"
                        value="GenAI"
                        icon={<Activity className="text-blue-400" />}
                        subtext="High Demand"
                    />
                    <MetricCard
                        title="Market Cap"
                        value="$4.2T"
                        icon={<DollarSign className="text-purple-400" />}
                        subtext="Tech Sector"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Line Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Salary Trajectory (YoY)</h3>
                        <Line options={options} data={salaryData} />
                    </motion.div>

                    {/* Doughnut Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Automation Impact</h3>
                        <div className="w-full max-w-[250px]">
                            <Doughnut data={riskData} options={{ maintainAspectRatio: true, plugins: { legend: { labels: { color: '#9ca3af' } } } }} />
                        </div>
                        <div className="mt-6 text-center text-sm text-gray-400">
                            <p>65% of roles in your sector are considered "Safe" from full automation in the next 5 years.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, icon, subtext }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10"
    >
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
                {icon}
            </div>
        </div>
        {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </motion.div>
);

export default Insights;
