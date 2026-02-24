import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnalysisById, getHistory, updateHistoryEntry } from '../lib/analysisEngine';
import Card from '../components/ui/Card';
import {
    CheckCircle2,
    Calendar,
    HelpCircle,
    ArrowLeft,
    ChevronRight,
    TrendingUp,
    Tag,
    Copy,
    Download,
    Check,
    Zap
} from 'lucide-react';

const Results = () => {
    const { id } = useParams();
    const [entryData, setEntryData] = useState(null);
    const [copyStatus, setCopyStatus] = useState('');

    useEffect(() => {
        const data = id ? getAnalysisById(id) : getHistory()[0];
        setEntryData(data);
    }, [id]);

    const handleToggleSkill = (skill) => {
        if (!entryData) return;

        const currentConfidence = entryData.skillConfidenceMap?.[skill] || 'practice';
        const newConfidence = currentConfidence === 'know' ? 'practice' : 'know';

        const newMap = { ...entryData.skillConfidenceMap, [skill]: newConfidence };

        // Calculate new current score
        let scoreAdjustment = 0;
        Object.values(newMap).forEach(status => {
            scoreAdjustment += status === 'know' ? 2 : -2;
        });

        const newScore = Math.min(100, Math.max(0, (entryData.baseReadinessScore || entryData.readinessScore) + scoreAdjustment));

        const updated = updateHistoryEntry(entryData.id, {
            skillConfidenceMap: newMap,
            readinessScore: newScore
        });

        setEntryData(updated);
    };

    const weakSkills = useMemo(() => {
        if (!entryData) return [];
        return Object.values(entryData.extractedSkills)
            .flat()
            .filter(skill => entryData.skillConfidenceMap?.[skill] === 'practice')
            .slice(0, 3);
    }, [entryData]);

    const handleExport = (type) => {
        if (!entryData) return;
        let text = "";

        switch (type) {
            case 'plan':
                text = `7-DAY INTENSIVE PLAN\n\n${entryData.plan.map(p => `${p.day}: ${p.topics.join(', ')}`).join('\n')}`;
                break;
            case 'checklist':
                text = `PREPARATION CHECKLIST\n\n${entryData.checklist.map(c => `${c.round}\n${c.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}`;
                break;
            case 'questions':
                text = `TOP 10 INTERVIEW QUESTIONS\n\n${entryData.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
                break;
            case 'full':
                text = `PLACEMENT READINESS ANALYSIS - ${entryData.role} @ ${entryData.company}\n` +
                    `Score: ${entryData.readinessScore}%\n\n` +
                    `EXTRACTED SKILLS:\n${Object.entries(entryData.extractedSkills).map(([c, s]) => `${c}: ${s.join(', ')}`).join('\n')}\n\n` +
                    `ROUND CHECKLIST:\n${entryData.checklist.map(c => `${c.round}\n${c.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}\n\n` +
                    `7-DAY PLAN:\n${entryData.plan.map(p => `${p.day}: ${p.topics.join(', ')}`).join('\n')}\n\n` +
                    `INTERVIEW QUESTIONS:\n${entryData.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
                break;
        }

        if (type === 'full') {
            const element = document.createElement("a");
            const file = new Blob([text], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `Placement_Prep_${entryData.company}_${entryData.role}.txt`;
            document.body.appendChild(element);
            element.click();
        } else {
            navigator.clipboard.writeText(text);
            setCopyStatus(type);
            setTimeout(() => setCopyStatus(''), 2000);
        }
    };

    if (!entryData) {
        return <div className="text-center py-20 font-bold">Loading analysis...</div>;
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-32 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link to="/history" className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 mb-2">
                        <ArrowLeft size={16} /> Back to History
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">{entryData.role}</h1>
                    <p className="text-lg text-indigo-600 font-semibold">{entryData.company}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Readiness Score</span>
                            <span className="text-3xl font-black text-indigo-600">{entryData.readinessScore}%</span>
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${entryData.readinessScore > 70 ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Export Toolbar */}
            <div className="flex flex-wrap gap-3 p-1">
                <button onClick={() => handleExport('plan')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                    {copyStatus === 'plan' ? <Check size={16} /> : <Copy size={16} />} Copy 7-day Plan
                </button>
                <button onClick={() => handleExport('checklist')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                    {copyStatus === 'checklist' ? <Check size={16} /> : <Copy size={16} />} Copy Checklist
                </button>
                <button onClick={() => handleExport('questions')} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                    {copyStatus === 'questions' ? <Check size={16} /> : <Copy size={16} />} Copy Questions
                </button>
                <button onClick={() => handleExport('full')} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md">
                    <Download size={16} /> Download as TXT
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Interactive Skills */}
                    <Card>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Tag size={20} className="text-indigo-600" /> Key Skills Extracted
                            </h3>
                            <span className="text-xs text-gray-400 font-medium">Click to toggle confidence</span>
                        </div>
                        <div className="space-y-6">
                            {Object.entries(entryData.extractedSkills).map(([category, skills]) => (
                                <div key={category}>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(skill => {
                                            const isKnow = entryData.skillConfidenceMap?.[skill] === 'know';
                                            return (
                                                <button
                                                    key={skill}
                                                    onClick={() => handleToggleSkill(skill)}
                                                    className={`px-3 py-1.5 rounded-md text-sm font-bold border transition-all flex items-center gap-2
                            ${isKnow
                                                            ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
                                                            : 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:border-indigo-300'}
                          `}
                                                >
                                                    {isKnow ? <CheckCircle2 size={14} /> : <TrendingUp size={14} className="opacity-40" />}
                                                    {skill}
                                                </button>
                                            );
                                        })}
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
                            {entryData.plan.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                            {idx + 1}
                                        </div>
                                        {idx !== entryData.plan.length - 1 && <div className="w-px h-full bg-gray-200 my-1"></div>}
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
                            <HelpCircle size={20} className="text-indigo-600" /> Interview Question Bank
                        </h3>
                        <div className="space-y-4">
                            {entryData.questions.map((q, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
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
                            {entryData.checklist.map((round, idx) => (
                                <div key={idx}>
                                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">{round.round}</h4>
                                    <ul className="space-y-3">
                                        {round.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                <div className="w-5 h-5 rounded border border-gray-200 flex items-center justify-center shrink-0">
                                                    {/* Visual only checklist */}
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Action Next Box */}
            {weakSkills.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
                    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl flex items-center justify-between gap-6 border border-gray-800">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-600 rounded-xl">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Action Next</h4>
                                <p className="text-gray-400 text-sm">Focus on: <span className="text-indigo-400 font-semibold">{weakSkills.join(', ')}</span></p>
                            </div>
                        </div>
                        <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
                            Start Day 1 Plan
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Results;
