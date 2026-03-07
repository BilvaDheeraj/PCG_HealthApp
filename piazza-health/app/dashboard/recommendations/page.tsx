"use client";

import { useState } from "react";
import { Apple, Dumbbell, Pill, Moon, Droplets, Sun, ChevronRight, Target, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        category: "Diet",
        icon: Apple,
        color: "rose",
        items: [
            { title: "Reduce Refined Carbohydrates", desc: "Cut white rice, bread, and sugar by 50% to lower HbA1c.", priority: "High", days: "All days" },
            { title: "Increase Omega-3 Foods", desc: "Add 2 servings of fatty fish weekly to lower LDL naturally.", priority: "High", days: "3× week" },
            { title: "Mediterranean Pattern", desc: "Olive oil, nuts, legumes, vegetables — proven LDL reduction.", priority: "Medium", days: "Daily" },
            { title: "Reduce Saturated Fats", desc: "Limit red meat to 1× week. Replace with chicken or plant protein.", priority: "High", days: "Daily" },
        ]
    },
    {
        category: "Exercise",
        icon: Dumbbell,
        color: "blue",
        items: [
            { title: "Daily Walks — 7,500 Steps", desc: "30 mins of brisk walking stabilises blood glucose post-meals.", priority: "High", days: "Daily" },
            { title: "Resistance Training", desc: "2× per week weight training increases insulin sensitivity.", priority: "Medium", days: "2× week" },
            { title: "Post-Meal Walks", desc: "10-min walk after main meals blunts glucose spikes by 30%.", priority: "High", days: "Daily" },
        ]
    },
    {
        category: "Supplements",
        icon: Pill,
        color: "amber",
        items: [
            { title: "Vitamin D3 — 60,000 IU Weekly", desc: "Correct deficiency (22 ng/mL → target 50 ng/mL). Take with K2.", priority: "Urgent", days: "Once a week" },
            { title: "Omega-3 Fish Oil — 2g/day", desc: "EPA+DHA to support LDL and reduce triglycerides.", priority: "High", days: "Daily" },
            { title: "Magnesium Glycinate — 400mg", desc: "Supports insulin sensitivity and sleep quality.", priority: "Medium", days: "Nightly" },
        ]
    },
    {
        category: "Lifestyle",
        icon: Moon,
        color: "purple",
        items: [
            { title: "Sleep 7–8 Hours", desc: "Poor sleep increases cortisol, worsening glucose and LDL.", priority: "High", days: "Daily" },
            { title: "Stress Management", desc: "10 mins of breathwork or meditation daily reduces CRP.", priority: "Medium", days: "Daily" },
            { title: "Intermittent Fasting (16:8)", desc: "Eating window 12pm–8pm improves fasting glucose significantly.", priority: "Medium", days: "Weekdays" },
        ]
    },
];

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
    rose:   { text: "text-rose-400",   bg: "bg-rose-500/10",   border: "border-rose-500/20",   glow: "bg-rose-500/5" },
    blue:   { text: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   glow: "bg-blue-500/5" },
    amber:  { text: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",  glow: "bg-amber-500/5" },
    purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", glow: "bg-purple-500/5" },
};

const priorityColor: Record<string, string> = {
    Urgent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    High:   "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Medium: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

export default function RecommendationsPage() {
    const [active, setActive] = useState("Diet");

    const current = plans.find(p => p.category === active)!;
    const c = colorMap[current.color];

    return (
        <div className="w-full space-y-6 pb-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">AI Recommendations</h2>
                    <p className="text-slate-400 text-sm mt-1">Personalised diet, exercise and supplement plan based on your biomarkers.</p>
                </div>
                <Link href="/dashboard/chat"
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 hover:-translate-y-0.5 shrink-0">
                    <Sparkles size={13} /> Ask AI for Details
                </Link>
            </div>

            {/* AI Summary Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/5 border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
                <div className="relative z-10 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/25 shrink-0">
                        <Target className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white mb-1">Your 90-Day Health Target</p>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Based on your biomarkers: bring HbA1c below 5.7%, reduce LDL to under 100 mg/dL, and restore Vitamin D to 50+ ng/mL.
                            Following this plan consistently gives you an <span className="text-emerald-400 font-bold">82% probability</span> of hitting these targets.
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap">
                {plans.map(p => {
                    const cc = colorMap[p.color];
                    const isActive = p.category === active;
                    const Icon = p.icon;
                    return (
                        <button key={p.category} onClick={() => setActive(p.category)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${isActive
                                ? `${cc.bg} ${cc.text} ${cc.border}`
                                : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white"}`}>
                            <Icon size={14} />
                            {p.category}
                        </button>
                    );
                })}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Plan Items */}
                <div className="lg:col-span-2 space-y-3">
                    {current.items.map((item, i) => (
                        <div key={i} className={`p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all relative overflow-hidden`}>
                            <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full ${c.glow} blur-xl`} />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <p className="text-sm font-bold text-white">{item.title}</p>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${priorityColor[item.priority]}`}>{item.priority}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed mb-3">{item.desc}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                        <Clock size={11} className="text-slate-600" />
                                        {item.days}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats + Quick Links */}
                <div className="space-y-4">
                    {/* Category overview */}
                    <div className={`rounded-2xl p-5 ${c.bg} border ${c.border}`}>
                        {(() => { const Icon = current.icon; return (
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-xl bg-white/10 border ${c.border}`}>
                                    <Icon className={`w-5 h-5 ${c.text}`} />
                                </div>
                                <h3 className={`text-sm font-black ${c.text}`}>{current.category} Plan</h3>
                            </div>
                        ); })()}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-white/50">Recommendations</span>
                                <span className="text-white font-bold">{current.items.length}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-white/50">Priority items</span>
                                <span className={`font-bold ${c.text}`}>{current.items.filter(x => x.priority === "High" || x.priority === "Urgent").length}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-white/50">Est. Impact</span>
                                <span className="text-emerald-400 font-bold">High</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick nav to other sections */}
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Quick Navigate</h3>
                        <div className="space-y-2">
                            {[
                                { label: "Upload New Report", href: "/dashboard/upload",  icon: Sparkles },
                                { label: "View AI Insights",  href: "/dashboard/insights", icon: Target },
                                { label: "Health Tracking",   href: "/dashboard/tracking", icon: Droplets },
                                { label: "AI Health Chat",    href: "/dashboard/chat",     icon: Moon },
                            ].map((link, i) => (
                                <Link key={i} href={link.href}
                                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-white transition-all group">
                                    <div className="flex items-center gap-2">
                                        <link.icon size={13} className="text-slate-600 group-hover:text-slate-300" />
                                        {link.label}
                                    </div>
                                    <ChevronRight size={12} className="text-slate-700" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Morning Routine */}
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                        <h3 className="text-xs font-bold text-white flex items-center gap-2 mb-3">
                            <Sun size={14} className="text-amber-400" /> Morning Routine
                        </h3>
                        <div className="space-y-2 text-xs text-slate-400">
                            {["7:00 AM — Vitamin D3 + K2 with breakfast", "7:30 AM — 10 min post-breakfast walk", "8:00 AM — Omega-3 with water", "10:00 PM — Magnesium glycinate before sleep"].map((r, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                    {r}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
