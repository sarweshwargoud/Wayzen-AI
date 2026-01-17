import { useState } from 'react';
import { User, Bell, Shield, Save, Globe, BookOpen, Briefcase } from 'lucide-react';

const Settings = () => {
    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400">
                                <User size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
                                <p className="text-sm text-gray-400">Update your WayGen AI Profile</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" defaultValue="Demo User" />
                                <Input label="Email" defaultValue="user@example.com" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Country" defaultValue="India" icon={<Globe size={14} className="mr-2" />} />
                                <Input label="City" defaultValue="Hyderabad" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Education" defaultValue="Bachelor's" icon={<BookOpen size={14} className="mr-2" />} />
                                <Input label="Field of Study" defaultValue="Computer Science" />
                            </div>
                            <Input label="Career Interest" defaultValue="Product Management" icon={<Briefcase size={14} className="mr-2" />} />
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-purple-600/20 rounded-lg text-purple-400">
                                <Bell size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">Notifications</h2>
                                <p className="text-sm text-gray-400">Manage how you receive updates</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Toggle label="Email Alerts for Market Shifts" defaultChecked />
                            <Toggle label="Weekly Career Report" defaultChecked />
                        </div>
                    </div>

                    {/* AI Memory */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-red-600/20 rounded-lg text-red-400">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">AI Memory</h2>
                                <p className="text-sm text-gray-400">Manage your data</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-300">Reset AI Memory & Context</p>
                            <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
                                Reset Memory
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pb-10">
                        <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
                            <Save size={18} className="mr-2" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Input = ({ label, defaultValue, icon }) => (
    <div>
        <label className="flex items-center text-sm font-medium text-gray-400 mb-1">
            {icon}
            {label}
        </label>
        <input
            type="text"
            defaultValue={defaultValue}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
        />
    </div>
);

const Toggle = ({ label, defaultChecked }) => (
    <div className="flex items-center justify-between">
        <span className="text-gray-300">{label}</span>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
    </div>
);

export default Settings;
