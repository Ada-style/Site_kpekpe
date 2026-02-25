import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Book, Clock, GraduationCap, MessageSquare, TrendingUp, Award } from 'lucide-react';

const StudentDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        enrolledCourses: 0,
        completedLessons: 0,
        averageGrade: 0,
    });
    const [recentCourses, setRecentCourses] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/dashboard/student/');
                setStats(response.data.stats);
                setRecentCourses(response.data.recent_courses);
            } catch (err) {
                console.error("Erreur dashboard:", err);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Bienvenue, {user?.username} ! 👋</h1>
                <p className="text-gray-600">Continuez votre progression et atteignez vos objectifs.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    icon={<Book className="text-blue-600" />}
                    label="Cours Inscrits"
                    value={stats.enrolledCourses}
                    bgColor="bg-blue-50"
                />
                <StatCard
                    icon={<TrendingUp className="text-green-600" />}
                    label="Leçons Terminées"
                    value={stats.completedLessons}
                    bgColor="bg-green-50"
                />
                <StatCard
                    icon={<Award className="text-purple-600" />}
                    label="Note Moyenne"
                    value={`${stats.averageGrade}/20`}
                    bgColor="bg-purple-50"
                />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content: Recent Courses */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Mes Cours Récents</h2>
                        <button className="text-kpekpe-green font-semibold hover:underline">Voir tout</button>
                    </div>

                    <div className="grid gap-4">
                        {recentCourses.length > 0 ? recentCourses.map((course) => (
                            <div key={course.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-gray-900">{course.title}</h3>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div className="bg-kpekpe-green h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-kpekpe-green">{course.progress}%</span>
                                    <p className="text-xs text-gray-500">Terminé</p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-200">
                                <p className="text-gray-500 italic">Vous n'êtes inscrit à aucun cours pour le moment.</p>
                                <button className="mt-4 btn-primary">Parcourir le catalogue</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar: AI Tutor Quick Access */}
                <div className="space-y-6">
                    <div className="bg-kpekpe-green rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-kpekpe-yellow opacity-20 rounded-full blur-xl"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                <MessageSquare className="text-kpekpe-yellow" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Besoin d'aide ?</h3>
                            <p className="text-sm text-gray-100 mb-4">Posez vos questions à notre tuteur IA disponible 24h/24.</p>
                            <button className="w-full bg-white text-kpekpe-green font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                                Discuter avec l'IA
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                            <Clock size={18} className="text-gray-400" />
                            <span>Dernières Activités</span>
                        </h3>
                        <div className="text-sm text-gray-500 italic">Aucune activité récente.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, bgColor }) => (
    <div className={`p-6 rounded-2xl ${bgColor} flex items-center space-x-4 transition-transform hover:scale-105`}>
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            {icon}
        </div>
        <div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 font-medium">{label}</div>
        </div>
    </div>
);

export default StudentDashboard;
