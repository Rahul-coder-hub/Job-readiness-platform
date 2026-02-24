import React, { useState, useEffect } from 'react';
import { getChecklist, updateChecklist, resetChecklist, getChecklistSummary } from '../lib/testStorage';
import Card from '../components/ui/Card';
import { CheckCircle2, Circle, RotateCcw, Zap, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const TestChecklist = () => {
    const [tests, setTests] = useState([]);
    const [summary, setSummary] = useState({ passed: 0, total: 10 });

    useEffect(() => {
        setTests(getChecklist());
        setSummary(getChecklistSummary());
    }, []);

    const toggleTest = (id) => {
        const newTests = tests.map(t => t.id === id ? { ...t, passed: !t.passed } : t);
        setTests(newTests);
        updateChecklist(newTests);
        setSummary(getChecklistSummary());
    };

    const handleReset = () => {
        const cleared = resetChecklist();
        setTests(cleared);
        setSummary(getChecklistSummary());
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Internal Test Checklist</h1>
                    <p className="text-gray-600 mt-2 font-medium">Verify platform robustness before deployment.</p>
                </div>
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
                >
                    <RotateCcw size={16} /> Reset Checklist
                </button>
            </div>

            {/* Summary Block */}
            <div className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between shadow-sm
                ${summary.passed === summary.total
                    ? 'bg-green-50 border-green-200'
                    : 'bg-amber-50 border-amber-200'}
            `}>
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                        ${summary.passed === summary.total ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}
                    `}>
                        {summary.passed === summary.total ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900">Tests Passed: {summary.passed} / {summary.total}</h2>
                        <p className={`text-sm font-semibold ${summary.passed === summary.total ? 'text-green-600' : 'text-amber-600'}`}>
                            {summary.passed === summary.total
                                ? 'Platform is ready for shipping!'
                                : 'Fix issues before shipping.'}
                        </p>
                    </div>
                </div>
                {summary.passed === summary.total && (
                    <Link to="/prp/08-ship" className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-black transition-all shadow-md">
                        Proceed to Ship
                    </Link>
                )}
            </div>

            <div className="grid gap-4">
                {tests.map((test) => (
                    <button
                        key={test.id}
                        onClick={() => toggleTest(test.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 group
                            ${test.passed
                                ? 'bg-white border-green-100 shadow-sm'
                                : 'bg-white border-gray-100 hover:border-indigo-200'}
                        `}
                    >
                        <div className={`mt-1 transition-colors ${test.passed ? 'text-green-500' : 'text-gray-300 group-hover:text-indigo-400'}`}>
                            {test.passed ? <CheckCircle2 size={24} fill="currentColor" className="text-white" /> : <Circle size={24} />}
                        </div>
                        <div>
                            <h3 className={`font-bold transition-colors ${test.passed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                {test.label}
                            </h3>
                            {test.hint && (
                                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400 font-medium italic">
                                    <Zap size={10} className="text-amber-400" />
                                    {test.hint}
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TestChecklist;
