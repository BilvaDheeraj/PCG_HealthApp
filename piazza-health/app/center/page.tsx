"use client";

import { useState } from "react";
import {
    Calendar, UploadCloud, FileCheck2, AlertCircle, DollarSign,
    ArrowUpRight, CheckCircle2, Clock, X, RefreshCw, TrendingUp
} from "lucide-react";
import Link from "next/link";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, CartesianGrid
} from "recharts";

const volumeData = [
    { time: "08:00", count: 45 },  { time: "10:00", count: 120 },
    { time: "12:00", count: 210 }, { time: "14:00", count: 180 },
    { time: "16:00", count: 250 }, { time: "18:00", count: 140 },
];

const revenueData = [
    { day: "Mon", rev: 18200 }, { day: "Tue", rev: 22400 },
    { day: "Wed", rev: 19800 }, { day: "Thu", rev: 25600 },
    { day: "Fri", rev: 31000 }, { day: "Sat", rev: 28400 },
];

type Booking = { name: string; test: string; time: string; status: string };
const initBookings: Booking[] = [
    { name: "Rahul Sharma",  test: "Complete Blood Count",     time: "10:30 AM", status: "pending" },
    { name: "Anjali Gupta",  test: "Lipid Profile + HbA1c",    time: "11:00 AM", status: "confirmed" },
    { name: "Vikram Singh",  test: "Thyroid Panel",             time: "11:30 AM", status: "confirmed" },
    { name: "Priya Patel",   test: "Vitamin D3 + B12",          time: "12:00 PM", status: "pending" },
];

const extractions = [
    { name: "Rahul Sharma",  id: "P-4921", type: "CBC",           time: "2m ago",  status: "Extracted",    conf: "99.8%" },
    { name: "Anjali Gupta",  id: "P-4920", type: "Lipid Profile", time: "15m ago", status: "Extracted",    conf: "98.5%" },
    { name: "Vikram Singh",  id: "P-4919", type: "Thyroid Panel", time: "42m ago", status: "Extracted",    conf: "99.1%" },
    { name: "Priya Patel",   id: "P-4918", type: "LFT",           time: "1h ago",  status: "Needs Review", conf: "82.4%" },
    { name: "Amit Kumar",    id: "P-4917", type: "Vitamin D3",    time: "2h ago",  status: "Extracted",    conf: "97.2%" },
];

const kpis = [
    { label: "Today's Bookings",  value: "18",  sub: "5 pending acceptance",  icon: Calendar,    color: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20" },
    { label: "Reports Processed", value: "842", sub: "+12% vs yesterday",     icon: FileCheck2,  color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
    { label: "Pending Uploads",   value: "5",   sub: "Requires staff action", icon: AlertCircle, color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
    { label: "Today's Revenue",   value: "₹31K",sub: "+18% from last Friday", icon: DollarSign,  color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

export default function CenterDashboard() {
    const [bookings, setBookings] = useState<Booking[]>(initBookings);

    const accept  = (i: number) => setBookings(prev => prev.map((b, idx) => idx === i ? { ...b, status: "confirmed" } : b));
    const cancel  = (i: number) => setBookings(prev => prev.filter((_, idx) => idx !== i));

    return (
        <div className="w-full space-y-6 pb-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Center Analytics</h2>
                    <p className="text-slate-400 text-sm mt-1">Real-time operational overview for Apollo Diagnostics.</p>
                </div>
                <div className="flex gap-2 shrink-0">
                    <Link href="/center/bookings"
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2">
                        <Calendar size={14} className="text-cyan-400" /> Bookings
                    </Link>
                    <Link href="/center/upload"
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 hover:-translate-y-0.5">
                        <UploadCloud size={14} /> Batch Upload
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {kpis.map((k, i) => (
                    <div key={i} className={`rounded-2xl bg-slate-900 border ${k.border} p-5 relative overflow-hidden group hover:border-opacity-60 transition-all`}>
                        <div className={`absolute -right-6 -top-6 w-20 h-20 rounded-full ${k.bg} blur-xl`} />
                        <div className="relative z-10">
                            <div className={`p-2 rounded-xl ${k.bg} border ${k.border} w-fit mb-3`}>
                                <k.icon className={`w-4 h-4 ${k.color}`} />
                            </div>
                            <p className="text-xs font-medium text-slate-400 mb-1">{k.label}</p>
                            <p className="text-2xl font-black text-white">{k.value}</p>
                            <p className="text-[10px] text-slate-500 mt-1">{k.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Processing Volume */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-bold text-white">Processing Volume</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Today's report volume by hour</p>
                        </div>
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData} margin={{ top: 2, right: 4, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "10px", fontSize: "11px" }} />
                                <Area type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={2.5} fill="url(#volGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-bold text-white">Weekly Revenue</h3>
                            <p className="text-xs text-slate-500 mt-0.5">This week's earnings overview</p>
                        </div>
                        <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">+18%</span>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} margin={{ top: 2, right: 4, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `₹${(Number(v) / 1000).toFixed(0)}K`} />
                                <Tooltip
                                    formatter={(v: number | undefined) => [`₹${(v ?? 0).toLocaleString()}`, "Revenue"]}
                                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "10px", fontSize: "11px" }} />
                                <Bar dataKey="rev" fill="url(#revGrad)" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bookings + Extractions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Pending Bookings */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white">Today's Bookings</h3>
                        <Link href="/center/bookings" className="text-xs text-cyan-400 font-bold flex items-center gap-1 hover:text-cyan-300 transition-colors">
                            View All <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {bookings.map((b, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400 shrink-0">
                                    {b.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-white truncate">{b.name}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{b.test}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <Clock size={10} className="text-slate-500" />
                                    <span className="text-[10px] text-slate-500">{b.time}</span>
                                </div>
                                {b.status === "pending" ? (
                                    <div className="flex gap-1 shrink-0">
                                        <button onClick={() => accept(i)}
                                            className="p-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all" title="Accept">
                                            <CheckCircle2 size={13} />
                                        </button>
                                        <button onClick={() => cancel(i)}
                                            className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all" title="Cancel">
                                            <X size={13} />
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded shrink-0">Confirmed</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest Extractions */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white">Latest Extractions</h3>
                        <Link href="/center/patients" className="text-xs text-cyan-400 font-bold flex items-center gap-1 hover:text-cyan-300 transition-colors">
                            View All <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="space-y-2.5">
                        {extractions.map((e, i) => {
                            const ok = e.status === "Extracted";
                            return (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${ok ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"}`}>
                                        {ok ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-white truncate">{e.name}</p>
                                        <p className="text-[10px] text-slate-500 truncate">{e.type} · {e.id}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className={`text-[10px] font-black ${ok ? "text-emerald-400" : "text-amber-400"}`}>{e.conf}</span>
                                        <p className="text-[9px] text-slate-600 mt-0.5">{e.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
