import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnalysisById, getHistory } from '../lib/analysisEngine';
import Card from '../components/ui/Card';
import {
    CheckCircle2,
    Calendar,
    HelpCircle,
    ArrowLeft,
    ChevronRight,
    TrendingUp,
    Tag
} from 'lucide-react';

const Results = () => {
    const { id } = useParams();

    const data = useMemo(() => {
        if (id) return getAnalysisById(id);
        const history = getHistory();
        return history.length > 0 ? history[0] : null;
    }, [id]);

    if (!data) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900">No analysis found</h2>
                <Link to="/analyze" className="text-indigo-600 hover:underline mt-4 inline-block">
                    Start your first analysis
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link to="/history" className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 mb-2">
                        <ArrowLeft size={16} /> Back to History
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">{data.role}</h1>
                    <p className="text-lg text-indigo-600 font-semibold">{data.company}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Readiness Score</span>
                        <span className="text-3xl font-black text-indigo-600">{data.readinessScore}%</span>
                    </div>
                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                        <TrendingUp size={24} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Skills and Preparation */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Extracted Skills */}
                    <Card>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Tag size={20} className="text-indigo-600" /> Extracted Skills
                        </h3>
                        <div className="space-y-6">
                            {Object.entries(data.extractedSkills).map(([category, skills]) => (
                                <div key={category}>
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">{category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(skill => (
                                            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* 7-Day Plan */}
                    <Card>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Calendar size={20} className="text-indigo-600" /> 7-Day Intensive Plan
                        </h3>
                        <div className="space-y-4">
                            {data.plan.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                            {idx + 1}
                                        </div>
                                        {idx !== data.plan.length - 1 && <div className="w-px h-full bg-gray-200 my-1"></div>}
                                    </div>
                                    <div className="pb-6">
                                        <h4 className="font-bold text-gray-900">{item.day}</h4>
                                        <ul className="mt-2 space-y-1">
                                            {item.topics.map((topic, i) => (
                                                <li key={i} className="text-gray-600 flex items-start gap-2 text-sm leading-relaxed">
                                                    <ChevronRight size={14} className="mt-1 text-indigo-400 shrink-0" /> {topic}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Likely Questions */}
                    <Card>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <HelpCircle size={20} className="text-indigo-600" /> Top Interview Questions
                        </h3>
                        <div className="space-y-4">
                            {data.questions.map((q, i) => (
                                <div key={i} className="p-4 bg-indigo-50/50 rounded-lg border border-indigo-100">
                                    <p className="text-gray-900 font-medium leading-relaxed italic">"{q}"</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Round-wise Checklist */}
                <div className="space-y-8">
                    <Card className="sticky top-24">
                        <h3 className="text-lg font-bold mb-6">Preparation Checklist</h3>
                        <div className="space-y-8">
                            {data.checklist.map((round, idx) => (
                                <div key={idx}>
                                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">{round.round}</h4>
                                    <ul className="space-y-3">
                                        {round.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                <CheckCircle2 size={16} className="text-gray-200" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Results;
