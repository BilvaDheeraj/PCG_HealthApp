"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    Webhook,
    Sliders,
    Key,
    Save,
    CheckCircle2,
    Copy,
    RefreshCw
} from "lucide-react";

export default function CenterSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabs = [
        { id: "profile", label: "Lab Profile", icon: Building2 },
        { id: "webhooks", label: "Webhooks", icon: Webhook },
        { id: "rules", label: "Processing Rules", icon: Sliders },
        { id: "api", label: "API Credentials", icon: Key },
    ];

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Center Configuration</h2>
                <p className="text-slate-400">Manage B2B portal settings, API connections, and extraction rules.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2 relative z-10">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="centerActiveTabIndicator"
                                        className="absolute left-0 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#0f1629] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

                        {activeTab === "profile" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Diagnostic Center Profile</h3>
                                    <p className="text-sm text-slate-400 mb-6">Update organizational details and accreditation.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-slate-300">Organization Name</label>
                                            <input type="text" defaultValue="Health Diagnostics Corp" className="w-full bg-[#1e293b]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">NABL License Number</label>
                                            <input type="text" defaultValue="NABL-12345-HQ" className="w-full bg-[#1e293b]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all font-mono text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Support Email</label>
                                            <input type="email" defaultValue="support@healthdiagnostics.com" className="w-full bg-[#1e293b]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "webhooks" && (
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Webhook Configuration</h3>
                                    <p className="text-sm text-slate-400 mb-6">Receive real-time payloads when extractions complete.</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Endpoint URL</label>
                                            <div className="flex gap-3">
                                                <input type="url" defaultValue="https://api.healthdiagnostics.com/v1/webhooks/ai-reports" className="flex-1 bg-black/60 border border-slate-800 rounded-xl px-4 py-3 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-500/50 transition-all" />
                                                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm font-medium transition-colors text-white whitespace-nowrap">
                                                    Test Ping
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-black/40 border border-slate-800 rounded-xl font-mono text-xs text-slate-400">
                                            <p className="text-emerald-400 mb-2">// Example Payload Signature</p>
                                            <div>{`{`}</div>
                                            <div className="pl-4">{`"event": "report.processed",`}</div>
                                            <div className="pl-4">{`"patient_id": "PT-99821",`}</div>
                                            <div className="pl-4">{`"status": "success",`}</div>
                                            <div className="pl-4">{`"data": { ... }`}</div>
                                            <div>{`}`}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "rules" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Strict Parameter Framing</h3>
                                    <p className="text-sm text-slate-400 mb-6">Override default AI parsing rules for specific laboratory standards.</p>

                                    <div className="space-y-4">
                                        {[
                                            { param: 'Hemoglobin (Hb)', range: '13.0 - 17.0 g/dL', unit: 'Male' },
                                            { param: 'HbA1c', range: '4.0% - 5.6%', unit: 'Standard' },
                                            { param: 'TSH', range: '0.4 - 4.0 mIU/L', unit: 'Standard' }
                                        ].map((rule, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/20 border border-slate-800 rounded-xl">
                                                <div>
                                                    <h4 className="font-medium text-white">{rule.param}</h4>
                                                    <p className="text-xs text-slate-500">{rule.unit} Baseline</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <code className="text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded text-sm font-mono">{rule.range}</code>
                                                    <button className="text-xs text-slate-400 hover:text-white transition-colors">Edit</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "api" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">API Credentials</h3>
                                    <p className="text-sm text-slate-400 mb-6">Manage authentication keys for programmatic access.</p>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-400">Production Key ID</label>
                                            <div className="flex gap-2">
                                                <input type="text" readOnly value="pk_live_8f92j3n84m9vnu2" className="flex-1 bg-black/50 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-300 font-mono text-sm focus:outline-none" />
                                                <button onClick={handleCopy} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 transition-colors border border-slate-700">
                                                    {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <RefreshCw className="w-5 h-5 text-rose-400 mt-0.5" />
                                                <div>
                                                    <h4 className="text-sm font-medium text-rose-400 mb-1">Rotate Secret Key</h4>
                                                    <p className="text-xs text-slate-400 leading-relaxed mb-3">Rolling your secret key will immediately invalidate the current one. Active integrations using the old key will fail.</p>
                                                    <button className="text-xs font-semibold px-3 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 rounded-lg transition-colors">
                                                        Generate New Key
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Footer inside the card */}
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-end gap-3 relative z-10">
                            <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saved}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-80 disabled:cursor-not-allowed"
                            >
                                {saved ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Saved
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Update Settings
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
