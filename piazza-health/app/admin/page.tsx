"use client";

import {
    Users, FileText, Brain, Activity, ArrowUpRight, AlertTriangle,
    Building2, Shield, Server, CheckCircle2
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    AreaChart, Area, ResponsiveContainer
} from "recharts";
import Link from "next/link";

const reportData = [
    { name: "Mon", reports: 120 }, { name: "Tue", reports: 145 },
    { name: "Wed", reports: 190 }, { name: "Thu", reports: 165 },
    { name: "Fri", reports: 210 }, { name: "Sat", reports: 85  }, { name: "Sun", reports: 65 },
];
const anomalyData = [
    { t: "00:00", v: 2 }, { t: "04:00", v: 1 }, { t: "08:00", v: 5 },
    { t: "12:00", v: 12 }, { t: "16:00", v: 8 }, { t: "20:00", v: 4 },
];

const kpis = [
    { label: "Total Users",         value: "8,941",  trend: "+4.2%", icon: Users,      color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
    { label: "Reports Processed",   value: "14,592", trend: "+12.5%",icon: FileText,   color: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/20" },
    { label: "Abnormal Reports",    value: "1,204",  trend: "+3.1%", icon: AlertTriangle,color:"text-amber-400", bg: "bg-amber-500/10",   border: "border-amber-500/20" },
    { label: "Active Centers",      value: "47",     trend: "+8",    icon: Building2,  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

const flagged = [
    { id: "R-9104", name: "Unknown Patient", center: "Lab XYZ",         score: 22, reason: "No NABL header detected; logo appears digitally inserted" },
    { id: "R-9087", name: "Ramesh Kumar",    center: "HealthCare Plus",  score: 35, reason: "OCR confidence 34% — low-quality scan, blurred text" },
    { id: "R-9065", name: "Seema Shah",      center: "QuickPath Labs",   score: 48, reason: "Metadata timestamp mismatch: file created 2 months before report date" },
];

const systems = [
    { name: "Vision Extractor (OCR)",  status: "Operational", ok: true },
    { name: "Clinical LLM Core",        status: "High Load (85%)", ok: false },
    { name: "Embedding Vector DB",      status: "Operational", ok: true },
    { name: "Audit Log Service",        status: "Operational", ok: true },
];

export default function AdminDashboard() {
    return (
        <div className="w-full space-y-6 pb-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        Command Center
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Platform-wide oversight and AI engine governance.</p>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button className="px-4 py-2 bg-slate-900 border border-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 hover:border-slate-700">
                        <Server size={13} className="text-slate-400" /> Infrastructure
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2 hover:-translate-y-0.5">
                        <Activity size={13} /> Engine Logs
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {kpis.map((k, i) => (
                    <div key={i} className={`rounded-2xl bg-slate-900 border ${k.border} p-5 relative overflow-hidden hover:border-opacity-60 transition-all`}>
                        <div className={`absolute -right-6 -top-6 w-20 h-20 rounded-full ${k.bg} blur-xl`} />
                        <div className="relative z-10">
                            <div className={`p-2 rounded-xl ${k.bg} border ${k.border} w-fit mb-3`}>
                                <k.icon className={`w-4 h-4 ${k.color}`} />
                            </div>
                            <p className="text-xs font-medium text-slate-400 mb-1">{k.label}</p>
                            <p className="text-2xl font-black text-white">{k.value}</p>
                            <p className="text-[10px] text-emerald-400 font-bold mt-1">{k.trend}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Processing Volume */}
                <div className="lg:col-span-2 rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-bold text-white">Processing Volume</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Reports through AI pipeline this week</p>
                        </div>
                        <select className="bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 rounded-lg px-2 py-1.5 outline-none">
                            <option>This Week</option><option>This Month</option>
                        </select>
                    </div>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={reportData} margin={{ top: 2, right: 4, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor:"#020617", borderColor:"#1e293b", borderRadius:"10px", fontSize:"11px" }} />
                                <Bar dataKey="reports" fill="url(#barGrad)" radius={[5, 5, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right column */}
                <div className="space-y-4">

                    {/* Anomaly Detection */}
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-purple-500/30 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-purple-500/15 border border-purple-500/25">
                                    <Brain className="w-3.5 h-3.5 text-purple-400" />
                                </div>
                                Anomaly Detection
                            </h3>
                            <span className="text-[10px] font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" /> Active
                            </span>
                        </div>
                        <div className="h-24 w-full mb-3">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={anomalyData} margin={{ top: 2, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="v" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#aGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-purple-500/15 text-xs text-slate-300 flex gap-2 items-start">
                            <AlertTriangle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <p className="leading-relaxed text-[11px]">Spike in OCR failures from Center #42. Failover to secondary LLM active.</p>
                        </div>
                    </div>

                    {/* Core Systems */}
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                            <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/25">
                                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            Core Systems
                        </h3>
                        <div className="space-y-2">
                            {systems.map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all gap-2">
                                    <span className="text-xs font-bold text-slate-200 truncate flex-1 min-w-0 pr-2">{s.name}</span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`text-[10px] font-bold whitespace-nowrap ${s.ok ? "text-emerald-400" : "text-amber-400"}`}>{s.status}</span>
                                        <span className={`w-2 h-2 rounded-full ${s.ok ? "bg-emerald-500" : "bg-amber-500"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Flagged Reports */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-rose-500/15 border border-rose-500/25"><Shield className="w-4 h-4 text-rose-400" /></div>
                        Flagged Reports (Authenticity Issues)
                    </h3>
                    <Link href="/admin/reports" className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 transition-colors">
                        Full Review <ArrowUpRight size={13} />
                    </Link>
                </div>
                <div className="space-y-3">
                    {flagged.map((r) => (
                        <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/20 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{r.name}</p>
                                    <p className="text-xs text-slate-400 truncate">{r.id} · {r.center}</p>
                                </div>
                            </div>
                            <div className="text-left sm:text-right shrink-0">
                                <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded block sm:inline">Auth Score: {r.score}/100</span>
                                <p className="text-[10px] text-slate-500 mt-1 sm:max-w-[220px] line-clamp-2" title={r.reason}>{r.reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
