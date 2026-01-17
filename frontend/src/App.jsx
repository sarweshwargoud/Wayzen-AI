import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chatbot from './pages/Chatbot';
import Insights from './pages/Insights';
import Reports from './pages/Reports';
import Compare from './pages/Compare';
import Settings from './pages/Settings';
import { useAuth } from './context/AuthContext';
import { Loader2 } from 'lucide-react';

// Placeholders for later implementation

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <Loader2 className="animate-spin text-primary w-12 h-12" />
            </div>
        );
    }

    // For dev, allowing access even without user, uncomment below to enforce
    // if (!user) return <Navigate to="/login" />;

    return children;
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/chat" element={
                        <PrivateRoute>
                            <Chatbot />
                        </PrivateRoute>
                    } />
                    <Route path="/chatbot" element={<Navigate to="/chat" />} />

                    <Route path="/insights" element={
                        <PrivateRoute>
                            <Insights />
                        </PrivateRoute>
                    } />
                    <Route path="/reports" element={
                        <PrivateRoute>
                            <Reports />
                        </PrivateRoute>
                    } />
                    <Route path="/compare" element={
                        <PrivateRoute>
                            <Compare />
                        </PrivateRoute>
                    } />
                    <Route path="/settings" element={
                        <PrivateRoute>
                            <Settings />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
