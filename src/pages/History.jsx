import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHistory } from '../lib/analysisEngine';
import Card from '../components/ui/Card';
import { Search, Calendar, ChevronRight, Briefcase } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [isCorrupted, setIsCorrupted] = useState(false);

    useEffect(() => {
        const { list, corrupted } = getHistory();
        setHistory(list);
        setIsCorrupted(corrupted);
    }, []);

    const formatDate = (isoStr) => {
        return new Date(isoStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {isCorrupted && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-800 text-sm animate-in fade-in slide-in-from-top-2">
                    <Zap size={18} />
                    <span>One or more saved entries couldn't be loaded due to data mismatch. Create a new analysis to start fresh.</span>
                </div>
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
                    <p className="text-gray-600 mt-2">View and manage your previous prep plans.</p>
                </div>
                <Link
                    to="/analyze"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                    <Briefcase size={18} /> New Analysis
                </Link>
            </div>

            {history.length === 0 ? (
                <Card className="text-center py-20 bg-gray-50/50">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Search size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">No history yet</h2>
                    <p className="text-gray-500 mt-2 mb-8">Analyze your first job description to see it here.</p>
                    <Link to="/analyze" className="text-indigo-600 font-bold hover:underline">
                        Analyze JD Now
                    </Link>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {history.map((entry) => (
                        <Link key={entry.id} to={`/results/${entry.id}`}>
                            <Card className="hover:border-indigo-200 hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <Briefcase size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{entry.role || "Untitled Role"}</h3>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                <span className="font-semibold text-gray-900">{entry.company || "General Intel"}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(entry.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Current Score</p>
                                            <p className="text-xl font-black text-indigo-600">{entry.finalScore || entry.readinessScore}%</p>
                                        </div>
                                        <ChevronRight size={24} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
