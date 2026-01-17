import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Globe, BookOpen, Briefcase, Clock, DollarSign, ArrowRight, Loader2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        country: '',
        city: '',
        education: '',
        fieldOfStudy: '',
        careerInterest: '',
        budget: '',
        timeAvailable: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API

            // Basic validation
            if (!formData.email || !formData.password || !formData.name) {
                throw new Error("Please fill in required fields.");
            }

            login({
                name: formData.name,
                email: formData.email,
                profile: formData
            }, 'mock_token_123');

            navigate('/chat');
        } catch (err) {
            setError(err.message || 'Registration failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-24 px-4 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Create Your Wayzen Profile
                    </h2>
                    <p className="text-gray-400 mt-2">Personalized career intelligence starts here</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup icon={<User />} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <InputGroup icon={<Mail />} name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                        <InputGroup icon={<Phone />} name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                        <InputGroup icon={<Lock />} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup icon={<Globe />} name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
                        <InputGroup icon={<Globe />} name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                    </div>

                    {/* Education & Interest */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <BookOpen className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                            <select name="education" value={formData.education} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 text-gray-300 appearance-none">
                                <option value="">Select Education</option>
                                <option value="High School">High School</option>
                                <option value="Undergraduate">Undergraduate</option>
                                <option value="Graduate">Graduate</option>
                                <option value="PhD">PhD</option>
                            </select>
                        </div>
                        <InputGroup icon={<BookOpen />} name="fieldOfStudy" placeholder="Field of Study" value={formData.fieldOfStudy} onChange={handleChange} />
                    </div>

                    <InputGroup icon={<Briefcase />} name="careerInterest" placeholder="Career Interest (e.g., Data Science)" value={formData.careerInterest} onChange={handleChange} />

                    {/* Constraints */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup icon={<DollarSign />} name="budget" placeholder="Budget for Upskilling (₹)" value={formData.budget} onChange={handleChange} />
                        <InputGroup icon={<Clock />} name="timeAvailable" placeholder="Time Available (hrs/week)" value={formData.timeAvailable} onChange={handleChange} />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-purple-600/20 transition-all transform hover:scale-[1.02] disabled:opacity-50 mt-4"
                    >
                        {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                            <>
                                Build My AI Profile <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

const InputGroup = ({ icon, name, type = "text", placeholder, value, onChange, required }) => (
    <div className="relative">
        <div className="absolute left-3 top-3.5 h-5 w-5 text-gray-500">
            {icon}
        </div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-gray-600"
        />
    </div>
);

export default Register;
