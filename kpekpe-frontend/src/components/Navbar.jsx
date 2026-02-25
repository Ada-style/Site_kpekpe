import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-kpekpe-green rounded-lg flex items-center justify-center">
                                <span className="text-kpekpe-yellow font-bold text-xl">K</span>
                            </div>
                            <span className="text-2xl font-bold text-kpekpe-green">Kpékpé <span className="text-kpekpe-yellow">Learnia</span></span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/courses" className="text-gray-600 hover:text-kpekpe-green font-medium">Cours</Link>
                        <Link to="/universities" className="text-gray-600 hover:text-kpekpe-green font-medium">Universités</Link>
                        <Link to="/tutors" className="text-gray-600 hover:text-kpekpe-green font-medium">Répétiteurs</Link>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard" className="flex items-center space-x-1 text-kpekpe-green font-semibold">
                                    <User size={18} />
                                    <span>Dashboard</span>
                                </Link>
                                <button onClick={logout} className="text-gray-600 hover:text-red-500">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-600 hover:text-kpekpe-green font-medium">Connexion</Link>
                                <Link to="/register" className="btn-primary">S'inscrire</Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden">
                        <Menu className="text-kpekpe-green" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
