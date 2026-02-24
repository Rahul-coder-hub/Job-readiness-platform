import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Video, BarChart2 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-indigo-50 to-white">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                    Ace Your <span className="text-indigo-600">Placement</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <Link
                    to="/dashboard"
                    className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-indigo-200"
                >
                    Get Started
                </Link>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Code}
                            title="Practice Problems"
                            description="Master coding concepts with our curated list of 500+ placement-specific problems."
                        />
                        <FeatureCard
                            icon={Video}
                            title="Mock Interviews"
                            description="Analyze your performance with peer-to-peer and AI-driven mock interviews."
                        />
                        <FeatureCard
                            icon={BarChart2}
                            title="Track Progress"
                            description="Visualize your growth with detailed analytics and skill gap analysis."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-gray-500">© {new Date().getFullYear()} Placement Prep. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
