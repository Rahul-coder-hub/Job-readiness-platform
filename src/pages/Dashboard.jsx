import React, { useEffect, useState } from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Calendar, ChevronRight } from 'lucide-react';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';

const radarData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const CircularProgress = ({ score }) => {
    const [offset, setOffset] = useState(251);
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = circumference - (score / 100) * circumference;
        setOffset(progressOffset);
    }, [score, circumference]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-100"
                    />
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="text-indigo-600 transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{score}</span>
                    <span className="text-sm text-gray-500">of 100</span>
                </div>
            </div>
            <p className="text-gray-600 font-medium mt-2">Readiness Score</p>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Row 1: Readiness and Skills */}
                <Card className="flex flex-col items-center justify-center py-10">
                    <h3 className="text-lg font-semibold mb-8 self-start">Overall Readiness</h3>
                    <CircularProgress score={72} />
                </Card>

                <Card>
                    <h3 className="text-lg font-semibold mb-4">Skill Breakdown</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="#4f46e5"
                                    fill="#4f46e5"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Row 2: Practice and Goals */}
                <div className="space-y-8">
                    <Card>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-lg font-semibold">Continue Practice</h3>
                                <p className="text-sm text-gray-500">Last topic: Dynamic Programming</p>
                            </div>
                            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1">
                                Continue <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">3/10 completed</span>
                                <span className="font-medium">30%</span>
                            </div>
                            <ProgressBar value={3} max={10} />
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold mb-6">Weekly Goals</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Problems Solved: 12/20 this week</span>
                                    <span className="font-medium">60%</span>
                                </div>
                                <ProgressBar value={12} max={20} />
                            </div>
                            <div className="flex justify-between items-center px-1">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${i < 3 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            {day}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Row 3: Upcoming Assessments */}
                <Card>
                    <h3 className="text-lg font-semibold mb-6">Upcoming Assessments</h3>
                    <div className="space-y-4">
                        {[
                            { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", color: "indigo" },
                            { title: "System Design Review", time: "Wed, 2:00 PM", color: "purple" },
                            { title: "HR Interview Prep", time: "Friday, 11:00 AM", color: "blue" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${item.color}-100 text-${item.color}-600`}>
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-500">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
