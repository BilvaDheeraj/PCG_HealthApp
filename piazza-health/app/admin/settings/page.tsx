"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Server,
    ShieldAlert,
    BrainCircuit,
    Cpu,
    Save,
    CheckCircle2,
    AlertTriangle
} from "lucide-react";

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("llm");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: "llm", label: "LLM Configuration", icon: BrainCircuit },
        { id: "system", label: "System Resources", icon: Cpu },
        { id: "security", label: "Global Security", icon: ShieldAlert },
        { id: "maintenance", label: "Maintenance", icon: Server },
    ];

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Global Settings</h2>
                <p className="text-slate-400">Core administrative configurations for platform-wide behavior.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2 relative z-10">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="adminSettingsTab"
                                        className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                        {activeTab === "llm" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Language Model Gateway</h3>
                                    <p className="text-sm text-slate-400 mb-8">Configure the intelligence engine powering extractions and insights.</p>

                                    <div className="space-y-6 max-w-2xl">
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium text-slate-300">Active Architecture Pipeline</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-500/10 cursor-pointer relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /></div>
                                                    <h4 className="font-bold text-white mb-1">Gemini 1.5 Pro</h4>
                                                    <p className="text-xs text-slate-400">Primary parsing engine for complex PDF OCR and entity extraction.</p>
                                                </div>
                                                <div className="p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:border-slate-500 transition-all opacity-60">
                                                    <h4 className="font-bold text-white mb-1">GPT-4 Omni</h4>
                                                    <p className="text-xs text-slate-400">Fallback engine for regional language translation tasks.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-medium text-slate-300">Global Temperature</label>
                                                <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded">0.1</span>
                                            </div>
                                            <p className="text-xs text-slate-500">Determines the creativity of AI insights. Keep low (0.0 - 0.2) for strict medical parsing.</p>
                                            <input type="range" min="0" max="1" step="0.1" defaultValue="0.1" className="w-full accent-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "maintenance" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-rose-400 mb-1 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" />
                                        Danger Zone
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-6">Critical system operations. Actions taken here affect all active tenancies.</p>

                                    <div className="space-y-4">
                                        <div className="p-5 border border-rose-500/20 bg-rose-500/5 rounded-xl flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-white mb-1">Maintenance Mode</h4>
                                                <p className="text-xs text-slate-400 max-w-md leading-relaxed">Puts the B2B portal and patient dashboard offline. Active API uploads will return a 503 Service Unavailable code until disabled.</p>
                                            </div>
                                            <button className="px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500 hover:text-white rounded-lg text-sm font-semibold transition-all">
                                                Enable Downtime
                                            </button>
                                        </div>

                                        <div className="p-5 border border-slate-700 bg-slate-800/30 rounded-xl flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-white mb-1">Clear Redis Cache</h4>
                                                <p className="text-xs text-slate-400">Forces immediate re-fetching of all organizational configuration data.</p>
                                            </div>
                                            <button className="px-4 py-2 bg-slate-700 text-white hover:bg-slate-600 rounded-lg text-sm font-medium transition-all">
                                                Purge Cache
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Filler Content For Security & System */}
                        {(activeTab === "security" || activeTab === "system") && (
                            <div className="space-y-8 relative z-10">
                                <div className="p-8 border border-dashed border-slate-700 rounded-xl text-center">
                                    <ShieldAlert className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                                    <h4 className="text-white font-medium mb-1">Configuration Area Initializing</h4>
                                    <p className="text-sm text-slate-500">Security and infrastructure mapping features will be activated in v2.1.</p>
                                </div>
                            </div>
                        )}

                        {/* Save Footer inside the card */}
                        <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-end gap-3 relative z-10">
                            <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                                Revert Changes
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saved}
                                className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:opacity-80 disabled:cursor-not-allowed"
                            >
                                {saved ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Applied
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Apply Globally
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
