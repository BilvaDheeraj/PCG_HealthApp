"use client";

import { useState, useEffect } from "react";
import { CreditCard, Download, TrendingUp, Building2, Users, ArrowUpRight, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
    { name: 'Aug', b2b: 45000, b2c: 12000 },
    { name: 'Sep', b2b: 52000, b2c: 18000 },
    { name: 'Oct', b2b: 61000, b2c: 24000 },
];

export default function BillingPage() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);
    if (!isMounted) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Monetization & Billing</h2>
                    <p className="text-slate-400">Manage API limits, center subscriptions, and platform revenue.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-semibold rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Tax Report
                    </button>
                </div>
            </div>

            {/* Revenue KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: "Total MRR", value: "$85,000", trend: "+14.2%", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "B2B Centers (API Usage)", value: "$61,000", trend: "+8.4%", icon: Building2, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "B2C Premium Users", value: "$24,000", trend: "+24.5%", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
                ].map((kpi, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${kpi.bg}`}>
                                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md text-emerald-400 bg-emerald-500/10">
                                <ArrowUpRight className="w-3 h-3" />
                                {kpi.trend}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold text-white mb-1">{kpi.value}</h4>
                            <p className="text-sm font-medium text-slate-400">{kpi.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Revenue Growth Chart */}
                <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-semibold text-white">Revenue Growth (Q3)</h3>
                        <div className="flex items-center gap-4 text-xs font-medium">
                            <div className="flex items-center gap-1.5 text-slate-300">
                                <div className="w-3 h-3 rounded bg-blue-500" /> B2B (API)
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300">
                                <div className="w-3 h-3 rounded bg-purple-500" /> B2C (Pro)
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                                <Tooltip
                                    cursor={{ fill: '#0f172a' }}
                                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px' }}
                                />
                                <Bar dataKey="b2b" name="B2B API Revenue" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={40} />
                                <Bar dataKey="b2c" name="B2C Pro Revenue" stackId="a" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Subscription Plans */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-slate-400" />
                        Active Plans
                    </h3>

                    <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-16 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h4 className="font-bold text-white text-lg">Enterprise API</h4>
                                <p className="text-xs text-blue-400">For Diagnostic Centers</p>
                            </div>
                            <span className="text-xl font-bold text-white">$499<span className="text-sm font-normal text-slate-500">/mo</span></span>
                        </div>
                        <ul className="space-y-2 mb-6 relative z-10 text-sm text-slate-300">
                            <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-blue-400" /> 10,000 parsed reports/mo</li>
                            <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-blue-400" /> Custom OCR templates</li>
                        </ul>
                        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors relative z-10">Manage Pricing</button>
                    </div>

                    <div className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-16 bg-purple-500/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h4 className="font-bold text-white text-lg">HealthAI Pro</h4>
                                <p className="text-xs text-purple-400">For Individual Users</p>
                            </div>
                            <span className="text-xl font-bold text-white">$12<span className="text-sm font-normal text-slate-500">/mo</span></span>
                        </div>
                        <ul className="space-y-2 mb-6 relative z-10 text-sm text-slate-300">
                            <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-purple-400" /> Unlimited AI chatting</li>
                            <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-purple-400" /> Advanced diet generation</li>
                        </ul>
                        <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-colors relative z-10">Manage Pricing</button>
                    </div>

                </div>

            </div>
        </div>
    );
}
