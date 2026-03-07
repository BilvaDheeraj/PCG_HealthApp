"use client";

import { useState } from "react";
import {
    Activity, Heart, Droplet, Flame, Brain, Calendar, ChevronRight,
    AlertTriangle, TrendingUp, TrendingDown, ArrowUpRight, Zap,
    Apple, Dumbbell, Pill, Clock, Shield, Minus, Sparkles, MessageSquare
} from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

/* ─── Sparkline data ─── */
const spGlucose = [{ v: 105 }, { v: 98 }, { v: 112 }, { v: 108 }, { v: 115 }, { v: 110 }, { v: 106 }];
const spHba1c   = [{ v: 6.8 }, { v: 6.5 }, { v: 6.4 }, { v: 6.2 }];
const spLdl     = [{ v: 165 }, { v: 155 }, { v: 150 }, { v: 145 }];
const spHgb     = [{ v: 13.8 }, { v: 14.1 }, { v: 14.5 }, { v: 14.5 }];
const spVitD    = [{ v: 28 }, { v: 25 }, { v: 22 }, { v: 22 }];
const spCrp     = [{ v: 1.2 }, { v: 0.9 }, { v: 0.8 }, { v: 0.7 }];

/* ─── Data ─── */
const biomarkers = [
    { name: "Blood Glucose",   value: "106", unit: "mg/dL", status: "Moderate",  icon: Droplet, color: "amber", trend: "stable", change: "+1 from last",    spark: spGlucose, range: "70–99",      desc: "Slightly elevated fasting glucose" },
    { name: "HbA1c",           value: "6.2",  unit: "%",     status: "High Risk", icon: Activity, color: "rose",  trend: "down",   change: "▼ 0.4% improved", spark: spHba1c,   range: "< 5.7%",     desc: "Pre-diabetic range — improving" },
    { name: "LDL Cholesterol", value: "145", unit: "mg/dL", status: "High",      icon: Heart,   color: "rose",  trend: "down",   change: "▼ 12 mg/dL",      spark: spLdl,     range: "< 100",       desc: "Elevated cardiovascular risk factor" },
    { name: "Hemoglobin",      value: "14.5", unit: "g/dL",  status: "Optimal",  icon: Flame,   color: "emerald",trend:"stable",  change: "Stable",           spark: spHgb,     range: "13.8–17.2",  desc: "Within healthy range" },
    { name: "Vitamin D",       value: "22",  unit: "ng/mL", status: "Deficient", icon: Brain,   color: "amber", trend: "down",   change: "▼ 5 ng/mL",        spark: spVitD,    range: "30–100",     desc: "Below recommended level" },
    { name: "CRP (Inflam.)",   value: "0.7", unit: "mg/L",  status: "Optimal",  icon: Shield,  color: "emerald",trend:"down",   change: "▼ Improving",      spark: spCrp,     range: "< 1.0",       desc: "Low systemic inflammation" },
];

const risks = [
    { label: "Cardiovascular Risk", level: "Moderate", color: "amber" },
    { label: "Diabetes Risk",        level: "High",     color: "rose" },
    { label: "Vitamin Deficiency",   level: "Moderate", color: "amber" },
    { label: "Anemia Risk",          level: "Low",      color: "emerald" },
];

const actions = [
    { icon: Apple,    text: "Reduce refined carbohydrates by 40% for 4 weeks.",             tag: "High Priority", type: "Dietary",    color: "rose" },
    { icon: Pill,     text: "Start Vitamin D3 60,000 IU weekly supplementation.",           tag: "Action Required", type: "Supplement", color: "amber" },
    { icon: Dumbbell, text: "30 mins of moderate walking daily — target 7,500 steps.",       tag: "Routine",       type: "Exercise",   color: "blue" },
    { icon: Clock,    text: "Retest HbA1c & Lipid Profile in 84 days (Jun 2026).",         tag: "Scheduled",     type: "Retest",     color: "emerald" },
];

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
    emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    amber:   { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
    rose:    { text: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20" },
    blue:    { text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
};

/* ─── Circular Health Gauge ─── */
function HealthGauge({ score }: { score: number }) {
    const r = 70;
    const circ = 2 * Math.PI * r;
    const arc = circ * 0.75;
    const offset = arc - (score / 100) * arc;
    const col = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#f43f5e";
    const label = score >= 75 ? "Good" : score >= 50 ? "Moderate" : "At Risk";

    return (
        <div className="relative w-44 h-44 mx-auto">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-[135deg]">
                <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12"
                    strokeDasharray={`${arc} ${circ}`} strokeLinecap="round" />
                <circle cx="80" cy="80" r={r} fill="none" stroke={col} strokeWidth="12"
                    strokeDasharray={`${arc} ${circ}`} strokeDashoffset={offset} strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 10px ${col})`, transition: "stroke-dashoffset 1.5s ease" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white leading-none">{score}</span>
                <span className="text-xs text-white/40 mt-1">/100</span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1" style={{ color: col }}>{label}</span>
            </div>
        </div>
    );
}

/* ─── Sparkline ─── */
function Spark({ data, color }: { data: { v: number }[]; color: string }) {
    return (
        <div className="h-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`g${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2}
                        fill={`url(#g${color})`} dot={false} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

const sparkColors: Record<string, string> = {
    emerald: "#10b981", amber: "#f59e0b", rose: "#f43f5e", blue: "#3b82f6",
};

/* ══════════════════════════════════════════ */
export default function DashboardOverview() {
    return (
        <div className="w-full space-y-5 pb-6">

            {/* ── Row 1: Health Score + Risk Badges ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Health Score Card */}
                <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-[#0a1a12] via-[#060810] to-[#0a1220] border border-emerald-500/20 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/8 blur-[60px] rounded-full pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                AI Health Score
                            </span>
                        </div>
                        <HealthGauge score={74} />
                        <div className="flex justify-between mt-4">
                            {[{ label: "Reports", val: "4" }, { label: "Tracked", val: "6" }, { label: "Active Days", val: "180" }].map((s) => (
                                <div key={s.label} className="text-center">
                                    <div className="text-lg font-black text-white">{s.val}</div>
                                    <div className="text-[10px] text-white/35 uppercase tracking-wider mt-0.5">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column: Risk + AI Summary */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Risk Badges */}
                    <div className="rounded-2xl bg-[#080c14] border border-white/8 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                            <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest">Risk Assessment</h3>
                            <span className="text-[10px] text-white/30 ml-auto">Based on clinical reasoning engine</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {risks.map((r) => {
                                const c = colorMap[r.color];
                                return (
                                    <div key={r.label} className={`flex flex-col gap-1 p-3 rounded-xl ${c.bg} border ${c.border}`}>
                                        <span className="text-xs font-bold text-white/70">{r.label}</span>
                                        <span className={`text-sm font-black ${c.text}`}>{r.level}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* AI Clinical Summary */}
                    <div className="rounded-2xl bg-[#080c14] border border-white/8 p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                                </div>
                                <h3 className="text-xs font-bold text-white">AI Clinical Summary</h3>
                            </div>
                            <p className="text-sm text-white/65 leading-relaxed mb-3 break-words">
                                Your HbA1c has improved from 6.8% to 6.2% over 9 months — excellent progress.
                                However, LDL at 145 mg/dL and Vitamin D at 22 ng/mL require immediate attention.
                                Your inflammation markers (CRP) are trending positively.{" "}
                                <span className="text-white/85 font-bold">
                                    Focus on lipid management and Vitamin D supplementation this quarter.
                                </span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/dashboard/insights"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-bold transition-all hover:-translate-y-0.5">
                                    Full Insights <ArrowUpRight size={11} />
                                </Link>
                                <Link href="/dashboard/chat"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-bold transition-all hover:-translate-y-0.5">
                                    <MessageSquare size={11} /> Ask AI
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Behavioral Nudge Strip ── */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/20 shrink-0">
                    <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-sm text-white/70 leading-relaxed flex-1 min-w-0 truncate">
                    <span className="text-amber-400 font-bold">Nudge: </span>
                    Your LDL trend is increasing. Consider reducing saturated fats like red meat, full-fat dairy, and fried foods.
                </p>
                <Link href="/dashboard/recommendations" className="ml-auto flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-bold whitespace-nowrap transition-colors shrink-0">
                    View Plan <ChevronRight size={13} />
                </Link>
            </div>

            {/* ── Row 2: Biomarker Cards ── */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-bold text-white">Key Biomarkers</h2>
                    <Link href="/dashboard/tracking" className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors">
                        View All Insights <ArrowUpRight size={13} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {biomarkers.map((b) => {
                        const c = colorMap[b.color];
                        const Icon = b.icon;
                        return (
                            <div key={b.name} className="rounded-2xl bg-[#080c14] border border-white/8 p-4 hover:border-white/15 transition-all group">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`p-2 rounded-xl ${c.bg} border ${c.border}`}>
                                            <Icon className={`w-4 h-4 ${c.text}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-white/70 truncate">{b.name}</p>
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${c.bg} ${c.text} inline-block mt-0.5`}>
                                                {b.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span className="text-xl sm:text-2xl font-black text-white">{b.value}</span>
                                        <span className="text-[10px] text-white/35 ml-1">{b.unit}</span>
                                    </div>
                                </div>
                                <Spark data={b.spark} color={sparkColors[b.color]} />
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-1">
                                        {b.trend === "down" ? <TrendingDown size={12} className="text-emerald-400" /> :
                                            b.trend === "up" ? <TrendingUp size={12} className="text-rose-400" /> :
                                                <Minus size={12} className="text-amber-400" />}
                                        <span className="text-[10px] text-white/40">{b.change}</span>
                                    </div>
                                    <span className="text-[10px] text-white/25">Ref: {b.range} {b.unit}</span>
                                </div>
                                <p className="text-[10px] text-white/35 mt-1 truncate" title={b.desc}>{b.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Row 3: Action Plan + Retest ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* AI Action Plan */}
                <div className="lg:col-span-2 rounded-2xl bg-[#080c14] border border-white/8 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white">AI Action Plan</h3>
                        <span className="ml-auto text-[10px] text-white/30">Priority ordered</span>
                    </div>
                    <div className="space-y-2.5">
                        {actions.map((a, i) => {
                            const c = colorMap[a.color];
                            const Icon = a.icon;
                            return (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all">
                                    <div className={`p-2 rounded-xl ${c.bg} border ${c.border} shrink-0`}>
                                        <Icon className={`w-4 h-4 ${c.text}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white/75 leading-relaxed">{a.text}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${c.bg} ${c.text}`}>{a.type}</span>
                                            <span className="text-[10px] text-white/30">{a.tag}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Retest Widget */}
                <div className="rounded-2xl bg-[#080c14] border border-white/8 p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white">Next Retest</h3>
                    </div>

                    <div className="text-center py-4 rounded-xl bg-blue-500/8 border border-blue-500/15">
                        <p className="text-xs text-white/40 mb-1">Recommended Date</p>
                        <p className="text-2xl font-black text-white">Jun 19</p>
                        <p className="text-xs text-blue-400 font-bold mt-1">84 days remaining</p>
                    </div>

                    <div className="space-y-2">
                        {[
                            { label: "HbA1c", priority: "High", color: "rose" },
                            { label: "Lipid Profile", priority: "High", color: "rose" },
                            { label: "Vitamin D3", priority: "Medium", color: "amber" },
                            { label: "CBC", priority: "Routine", color: "emerald" },
                        ].map((t) => {
                            const c = colorMap[t.color];
                            return (
                                <div key={t.label} className="flex items-center justify-between">
                                    <span className="text-xs text-white/60">{t.label}</span>
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${c.bg} ${c.text}`}>{t.priority}</span>
                                </div>
                            );
                        })}
                    </div>

                    <Link href="/dashboard/upload"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20">
                        <Calendar size={13} /> Book Retest
                    </Link>
                </div>
            </div>
        </div>
    );
}
