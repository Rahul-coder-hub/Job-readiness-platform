import React from 'react';
import { isChecklistComplete } from '../lib/testStorage';
import { ShieldAlert, Rocket, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const ShipLock = () => {
    const ready = isChecklistComplete();

    if (!ready) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
                <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Lock size={48} />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-gray-900">Shipment Locked</h1>
                    <p className="text-gray-600 font-medium max-w-md mx-auto">
                        Safety first! Your platform has pending test items. Complete the internal checklist before you can ship.
                    </p>
                </div>
                <Link
                    to="/prp/07-test"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition-all hover:-translate-y-1"
                >
                    Back to Checklist <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 space-y-12">
            <Card className="bg-gray-900 text-white border-none overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                    <Rocket size={200} />
                </div>
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3 text-green-400 font-bold uppercase tracking-widest text-xs">
                        <CheckCircle2 size={16} /> All Tests Passed
                    </div>
                    <h1 className="text-5xl font-black">Ready for Launch.</h1>
                    <p className="text-gray-400 text-lg max-w-xl leading-relaxed font-medium">
                        Your Placement Readiness Platform has passed all 10 quality assurance checks. The production build is stabilized and data hardened.
                    </p>
                    <div className="pt-8">
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all flex items-center gap-3">
                            Initiate Deployment <Rocket size={20} />
                        </button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
                    <h4 className="font-bold text-gray-900">Security & Hardening</h4>
                    <p className="text-gray-500 leading-relaxed font-medium">Data schema is strictly enforced. Corrupted localStorage entries are handled gracefully without breaking the UI flow.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
                    <h4 className="font-bold text-gray-900">User Experience</h4>
                    <p className="text-gray-500 leading-relaxed font-medium">Heuristic extraction engine is fine-tuned for minimal JD input. Score calculations are deterministic and live-updated.</p>
                </div>
            </div>
        </div>
    );
};

export default ShipLock;
