"use client";

import { Key, Copy, RefreshCw, Terminal, Activity, ShieldCheck, Database, Zap } from "lucide-react";
import { useState } from "react";

export default function APIIntegrationPage() {
    const [copied, setCopied] = useState("");

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(""), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E293B] pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">API Integration</h2>
                    <p className="text-slate-400">Manage your B2B API keys and monitor webhook endpoints.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
                        <Activity className="w-4 h-4" />
                        API Status: Operational
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column - Keys & Webhooks */}
                <div className="lg:col-span-2 space-y-6">

                    {/* API Keys */}
                    <div className="bg-[#060A14] border border-[#1E293B] rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                    <Key className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Production Keys</h3>
                            </div>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-lg transition-colors border border-white/10">
                                <RefreshCw className="w-4 h-4" />
                                Roll Key
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Client ID</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value="client_live_8f92j3n1b490d8x"
                                        className="w-full bg-[#0B1120] border border-[#1E293B] rounded-lg py-2 px-4 text-slate-300 font-mono text-sm focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleCopy("client_live_8f92j3n1b490d8x", "client")}
                                        className="p-2.5 bg-[#0B1120] border border-[#1E293B] hover:bg-[#1E293B] rounded-lg text-slate-400 transition-colors"
                                    >
                                        {copied === "client" ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Secret Key</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="password"
                                        readOnly
                                        value="pk_live_***************************"
                                        className="w-full bg-[#0B1120] border border-[#1E293B] rounded-lg py-2 px-4 text-slate-300 font-mono text-sm focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleCopy("pk_live_secret_key_hidden", "secret")}
                                        className="p-2.5 bg-[#0B1120] border border-[#1E293B] hover:bg-[#1E293B] rounded-lg text-slate-400 transition-colors"
                                    >
                                        {copied === "secret" ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Webhooks */}
                    <div className="bg-[#060A14] border border-[#1E293B] rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Webhook Endpoints</h3>
                            </div>
                            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                                Add Endpoint
                            </button>
                        </div>

                        <div className="p-4 bg-[#0B1120] border border-[#1E293B] rounded-xl flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="font-semibold text-white text-sm">https://api.yourlab.com/webhooks/healthai</span>
                                </div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Events: report.processed, report.failed</p>
                            </div>
                            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">Edit</button>
                        </div>
                    </div>

                </div>

                {/* Right Column - Quick Reference */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#0B1120] to-[#060A14] border border-[#1E293B] rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">API Overview</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Database className="w-5 h-5 text-blue-400 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-white">RESTful Endpoints</h4>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">Submit PDFs for extraction and poll for parameterized JSON results.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-amber-400 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-white">Rate Limits</h4>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">Your tier allows up to 100 requests per minute.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-[#1E293B]">
                            <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl transition-colors border border-white/10 text-center">
                                View Full Documentation
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
