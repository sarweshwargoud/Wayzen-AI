import { FileText, Download, Clock } from 'lucide-react';

const Reports = () => {
    const reports = [
        { id: 1, title: 'Career Trajectory Analysis: Software Engineer', date: 'Oct 24, 2024', type: 'PDF' },
        { id: 2, title: 'Skill Gap Assessment', date: 'Oct 20, 2024', type: 'PDF' },
    ];

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Your Reports</h1>

                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors group">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 rounded-lg bg-blue-600/20 text-blue-400">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium group-hover:text-blue-300 transition-colors">{report.title}</h3>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                        <Clock size={12} className="mr-1" />
                                        {report.date}
                                    </div>
                                </div>
                            </div>

                            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-all">
                                <Download size={16} />
                                <span className="text-sm">Download</span>
                            </button>
                        </div>
                    ))}

                    {reports.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <p>No reports generated yet. Start a chat to generate insights.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
