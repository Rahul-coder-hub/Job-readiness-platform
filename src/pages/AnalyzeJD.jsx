import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJD, saveToHistory } from '../lib/analysisEngine';
import Card from '../components/ui/Card';

const AnalyzeJD = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAnalyzing(true);

        // Simulate thinking/analysis time
        setTimeout(() => {
            const result = analyzeJD(formData.company, formData.role, formData.jdText);
            saveToHistory(result);
            setIsAnalyzing(false);
            navigate(`/results/${result.id}`);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Analyze Job Description</h1>
                <p className="text-gray-600 mt-2">Get a customized preparation plan based on the JD.</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Company Name (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g. Google, Amazon"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Target Role (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g. Software Engineer, Frontend Developer"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Job Description (Required)</label>
                        <textarea
                            required
                            placeholder="Paste the job description text here..."
                            className={`w-full h-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all
                                ${formData.jdText.length > 0 && formData.jdText.length < 200 ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'}
                            `}
                            value={formData.jdText}
                            onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
                        />

                        {formData.jdText.length > 0 && formData.jdText.length < 200 && (
                            <div className="flex items-center gap-2 text-amber-600 text-sm font-medium animate-in fade-in slide-in-from-top-1">
                                <Zap size={14} />
                                <span>This JD is too short to analyze deeply. Paste full JD for better output.</span>
                            </div>
                        )}

                        <p className="text-xs text-gray-400">Heuristic tip: Mentioning tech stacks like React, SQL, or Java helps in better extraction.</p>
                    </div>

                    <button
                        disabled={isAnalyzing}
                        type="submit"
                        className={`w-full py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-all
              ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}
            `}
                    >
                        {isAnalyzing ? 'Analyzing Skills...' : 'Start Analysis'}
                    </button>
                </form>
            </Card>
        </div>
    );
};

export default AnalyzeJD;
