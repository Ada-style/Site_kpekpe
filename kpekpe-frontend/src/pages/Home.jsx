import React from 'react';
import { Sparkles, BookOpen, GraduationCap, Users, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-kpekpe-green py-20 overflow-hidden">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-kpekpe-yellow opacity-10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-white space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1 rounded-full text-kpekpe-yellow text-sm font-medium">
                                <Sparkles size={16} />
                                <span>Propulsé par l'IA pour l'éducation au Togo</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                Apprenez mieux avec <span className="text-kpekpe-yellow">Kpékpé Learnia</span>
                            </h1>
                            <p className="text-lg text-gray-100 max-w-lg">
                                La plateforme éducative tout-en-un. Cours de qualité, tuteur IA personnalisé,
                                annuaire des universités et répétiteurs certifiés.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/courses" className="btn-secondary text-lg px-8 py-3">Explorer les cours</Link>
                                <Link to="/register" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg border border-white/20 transition-all">S'inscrire gratuitement</Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="relative">
                                <div className="w-full h-[400px] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 shadow-2xl">
                                    <div className="w-full h-full bg-gradient-to-br from-kpekpe-green to-kpekpe-green-light rounded-xl overflow-hidden flex items-center justify-center">
                                        <GraduationCap size={150} className="text-kpekpe-yellow opacity-40 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Une expérience d'apprentissage complète</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Tout ce dont vous avez besoin pour réussir votre parcours scolaire et universitaire est ici.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BookOpen className="text-kpekpe-green" />}
                            title="Cours d'Excellence"
                            description="Accédez à des centaines de ressources pédagogiques conformes au programme national."
                        />
                        <FeatureCard
                            icon={<Zap className="text-kpekpe-green" />}
                            title="Tuteur IA 24/7"
                            description="Notre intelligence artificielle répond à vos questions et vous aide à comprendre les concepts complexes."
                        />
                        <FeatureCard
                            icon={<Users className="text-kpekpe-green" />}
                            title="Répétiteurs Qualifiés"
                            description="Trouvez et réservez des séances avec les meilleurs répétiteurs du Togo."
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-50 py-16 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <StatItem count="500+" label="Cours" />
                        <StatItem count="10k+" label="Élèves" />
                        <StatItem count="50+" label="Universités" />
                        <StatItem count="200+" label="Répétiteurs" />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 bg-gray-50 rounded-2xl border border-transparent hover:border-kpekpe-green/20 hover:bg-white hover:shadow-xl transition-all group">
        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

const StatItem = ({ count, label }) => (
    <div className="space-y-1">
        <div className="text-3xl font-bold text-kpekpe-green">{count}</div>
        <div className="text-gray-500 font-medium uppercase text-sm tracking-wider">{label}</div>
    </div>
);

export default Home;
