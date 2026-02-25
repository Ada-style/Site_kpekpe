import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Lock, Phone, UserCircle, AlertCircle } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        role: 'apprenant',
        phone_number: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            return setError('Les mots de passe ne correspondent pas.');
        }

        setIsLoading(true);
        setError('');
        try {
            await api.post('/auth/register/', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Une erreur est survenue lors de l\'inscription.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-kpekpe-green py-6 text-center">
                    <h2 className="text-2xl font-bold text-white">Créer un compte</h2>
                    <p className="text-kpekpe-yellow/80 mt-1">Rejoignez la communauté Kpékpé</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center space-x-2 text-sm">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Nom d'utilisateur</label>
                            <div className="relative">
                                <input name="username" type="text" required onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-kpekpe-green focus:border-kpekpe-green" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Rôle</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-kpekpe-green focus:border-kpekpe-green">
                                <option value="apprenant">Apprenant</option>
                                <option value="formateur">Formateur</option>
                                <option value="repetiteur">Répétiteur</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Email</label>
                        <input name="email" type="email" required onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-kpekpe-green focus:border-kpekpe-green" />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Téléphone</label>
                        <input name="phone_number" type="text" onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-kpekpe-green focus:border-kpekpe-green" placeholder="+228..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Mot de passe</label>
                            <input name="password" type="password" required onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-kpekpe-green focus:border-kpekpe-green" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase mb-1">Confirmer</label>
                            <input name="confirm_password" type="password" required onChange={handleChange} className="w-full border rounded-lg p-2 text-sm focus:ring-kpekpe-green focus:border-kpekpe-green" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary py-3 mt-4 flex justify-center items-center"
                    >
                        {isLoading ? "Inscription..." : "S'inscrire"}
                    </button>

                    <div className="text-center text-sm text-gray-500 mt-4">
                        Déjà un compte ?{' '}
                        <Link to="/login" className="text-kpekpe-green font-semibold hover:underline">
                            Se connecter
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
