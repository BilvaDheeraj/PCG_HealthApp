"use client";

import { useState } from "react";
import {
    Activity, Heart, Apple, Zap, TrendingDown, TrendingUp,
    ChevronDown, ChevronRight, Pill, Dumbbell, ArrowUpRight, MessageSquare
} from "lucide-react";
import Link from "next/link";

type Category = "metabolic" | "cardiovascular" | "nutritional" | "immune";

const categories: { key: Category; label: string; icon: React.ElementType; count: number; color: string; score: number }[] = [
    { key: "metabolic",      label: "Metabolic",      icon: Activity, count: 3, color: "amber",   score: 58 },
    { key: "cardiovascular", label: "Cardiovascular", icon: Heart,    count: 2, color: "rose",    score: 45 },
    { key: "nutritional",    label: "Nutritional",    icon: Apple,    count: 2, color: "emerald", score: 72 },
    { key: "immune",         label: "Immune",         icon: Zap,      count: 1, color: "blue",    score: 85 },
];

const insightData: Record<Category, {
    title: string; value: string; unit: string; severity: "high" | "medium" | "low";
    explanation: string; causes: string[];
    actions: { icon: React.ElementType; text: string; type: string }[];
}[]> = {
    metabolic: [
        {
            title: "Elevated HbA1c — Pre-Diabetes Risk", value: "6.2", unit: "%", severity: "high",
            explanation: "Your HbA1c of 6.2% places you in the pre-diabetic range (5.7–6.4%). However, this has improved from 6.8% in January — showing positive progress with dietary changes.",
            causes: ["Excess refined carbohydrates", "Sedentary lifestyle", "Genetic predisposition"],
            actions: [
                { icon: Apple,    text: "Replace white rice with millets, quinoa, or whole wheat",   type: "Diet" },
                { icon: Dumbbell, text: "30 mins moderate walking daily — reduces HbA1c by ~0.5%",    type: "Exercise" },
                { icon: Pill,     text: "Berberine 500mg with meals (consult doctor)",                type: "Supplement" },
            ],
        },
        {
            title: "Borderline Fasting Glucose", value: "106", unit: "mg/dL", severity: "medium",
            explanation: "Fasting glucose at 106 mg/dL is slightly above normal (70–99). Combined with elevated HbA1c, this confirms metabolic stress.",
            causes: ["High glycemic diet", "Insulin resistance developing", "Poor sleep quality"],
            actions: [
                { icon: Apple,    text: "Avoid sugary drinks, maida, and white bread",   type: "Diet" },
                { icon: Dumbbell, text: "Post-meal walks of 10–15 minutes reduce glucose spikes", type: "Exercise" },
            ],
        },
        {
            title: "High Triglycerides", value: "180", unit: "mg/dL", severity: "high",
            explanation: "Triglycerides at 180 mg/dL exceed the optimal limit of 150 mg/dL, closely linked to elevated glucose and metabolic syndrome risk.",
            causes: ["High carbohydrate intake", "Low physical activity", "Alcohol consumption"],
            actions: [
                { icon: Apple, text: "Increase omega-3 rich foods — walnuts, flaxseeds, fatty fish", type: "Diet" },
                { icon: Pill,  text: "Fish oil 2g/day EPA+DHA may reduce triglycerides by 15–30%", type: "Supplement" },
            ],
        },
    ],
    cardiovascular: [
        {
            title: "Elevated LDL Cholesterol", value: "145", unit: "mg/dL", severity: "high",
            explanation: "Your LDL of 145 mg/dL exceeds the optimal (<100 mg/dL). Positive: LDL has decreased from 165 mg/dL in January — a 12% improvement.",
            causes: ["Saturated fat in diet", "Genetic hyperlipidemia", "Low physical activity"],
            actions: [
                { icon: Apple,    text: "Switch to plant-based fats — olive oil, avocado, nuts",    type: "Diet" },
                { icon: Dumbbell, text: "Aerobic exercise 150 min/week raises HDL and lowers LDL",   type: "Exercise" },
                { icon: Pill,     text: "Red yeast rice extract (consult physician)", type: "Supplement" },
            ],
        },
        {
            title: "Hypertension Risk", value: "124/82", unit: "mmHg", severity: "medium",
            explanation: "Blood pressure is in the pre-hypertension range. Systolic 124 is near the borderline. Monitoring is recommended alongside LDL management.",
            causes: ["High sodium diet", "Stress and cortisol elevation", "Low potassium intake"],
            actions: [
                { icon: Apple,    text: "DASH diet — reduce sodium below 2300mg daily",             type: "Diet" },
                { icon: Dumbbell, text: "Deep breathing / yoga — lowers systolic by 4–5 mmHg",       type: "Lifestyle" },
            ],
        },
    ],
    nutritional: [
        {
            title: "Vitamin D Deficiency", value: "22", unit: "ng/mL", severity: "high",
            explanation: "Vitamin D at 22 ng/mL is in the deficient range (<30 ng/mL). This affects bone density, immunity, and cardiovascular health.",
            causes: ["Low sun exposure", "No supplementation", "Low dietary fat for absorption"],
            actions: [
                { icon: Pill,     text: "Vitamin D3 60,000 IU weekly × 8 weeks",                   type: "Supplement" },
                { icon: Dumbbell, text: "Morning sunlight — 20 mins daily between 7–9 AM",          type: "Lifestyle" },
            ],
        },
        {
            title: "Borderline Magnesium Levels", value: "1.8", unit: "mg/dL", severity: "low",
            explanation: "Magnesium is at the lower end of normal (1.7–2.2 mg/dL). Low magnesium can worsen insulin resistance and trigger muscle cramps.",
            causes: ["Low dietary magnesium", "Excessive sweating", "High carbohydrate diet"],
            actions: [
                { icon: Apple, text: "Add leafy greens, pumpkin seeds, and dark chocolate",  type: "Diet" },
                { icon: Pill,  text: "Magnesium glycinate 300mg at night if symptoms exist", type: "Supplement" },
            ],
        },
    ],
    immune: [
        {
            title: "Optimal CRP Levels", value: "0.7", unit: "mg/L", severity: "low",
            explanation: "CRP at 0.7 mg/L indicates low systemic inflammation — a positive marker. This has improved from 1.2 mg/L in January, showing dietary and lifestyle changes are working.",
            causes: ["Maintained anti-inflammatory diet", "Reduced processed food intake"],
            actions: [
                { icon: Apple,    text: "Continue turmeric, ginger, and omega-3 rich foods",   type: "Diet" },
                { icon: Dumbbell, text: "Moderate exercise — over-training can increase CRP",   type: "Exercise" },
            ],
        },
    ],
};

const colorMap: Record<string, { text: string; bg: string; border: string; badgeBg: string }> = {
    emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", badgeBg: "bg-emerald-500/10" },
    amber:   { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   badgeBg: "bg-amber-500/10" },
    rose:    { text: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20",    badgeBg: "bg-rose-500/10" },
    blue:    { text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20",    badgeBg: "bg-blue-500/10" },
};

const severityStyle: Record<string, { bar: string; label: string; text: string }> = {
    high:   { bar: "bg-rose-500",    label: "High",   text: "text-rose-400" },
    medium: { bar: "bg-amber-500",   label: "Medium", text: "text-amber-400" },
    low:    { bar: "bg-emerald-500", label: "Low",    text: "text-emerald-400" },
};

const actionTypeColor: Record<string, string> = {
    Diet: "text-emerald-400 bg-emerald-500/10", Exercise: "text-blue-400 bg-blue-500/10",
    Supplement: "text-amber-400 bg-amber-500/10", Lifestyle: "text-purple-400 bg-purple-500/10",
};

function InsightCard({ insight }: { insight: typeof insightData["metabolic"][0] }) {
    const [open, setOpen] = useState(false);
    const s = severityStyle[insight.severity];
    return (
        <div className={`rounded-2xl bg-[#080c14] border border-white/8 overflow-hidden hover:border-white/15 transition-all`}>
            <div className={`h-1 w-full ${s.bar}`} />
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${s.bar.replace("bg-", "bg-").replace("500", "500/10")} ${s.text} mb-1.5 inline-block`}>
                            {s.label} Priority
                        </span>
                        <h3 className="text-sm font-bold text-white leading-snug break-words">{insight.title}</h3>
                    </div>
                    <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-white">{insight.value}</span>
                        <span className="text-xs text-white/30 ml-1">{insight.unit}</span>
                    </div>
                </div>

                <p className="text-xs text-white/55 leading-relaxed mb-3 break-words">{insight.explanation}</p>

                {/* Actions */}
                <div className="space-y-2 mb-3">
                    {insight.actions.map((a, i) => {
                        const Icon = a.icon;
                        return (
                            <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.025] border border-white/5">
                                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${actionTypeColor[a.type] || "text-white/40 bg-white/5"} shrink-0`}>{a.type}</span>
                                <p className="text-xs text-white/60 leading-relaxed flex-1 min-w-0 truncate" title={a.text}>{a.text}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Causes accordion */}
                <button onClick={() => setOpen(!open)}
                    className="flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/60 transition-colors font-bold">
                    {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    {open ? "Hide" : "Show"} causes ({insight.causes.length})
                </button>
                {open && (
                    <ul className="mt-2 space-y-1">
                        {insight.causes.map((c, i) => (
                            <li key={i} className="flex items-center gap-2 text-[10px] text-white/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" /> {c}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default function InsightsPage() {
    const [active, setActive] = useState<Category>("metabolic");
    const insights = insightData[active];
    const cat = categories.find(c => c.key === active)!;
    const c = colorMap[cat.color];

    return (
        <div className="w-full space-y-5 pb-6">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">AI Insights</h2>
                <p className="text-white/45 text-sm mt-1">Personalized clinical insights generated from your lab reports.</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    const cc = colorMap[cat.color];
                    const isA = active === cat.key;
                    return (
                        <button key={cat.key} onClick={() => setActive(cat.key)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${isA ? `${cc.bg} ${cc.text} ${cc.border}` : "bg-white/[0.03] text-white/50 border-white/8 hover:text-white hover:border-white/15"}`}>
                            <Icon size={15} />
                            {cat.label}
                            <span className={`text-[10px] font-black px-1.5 rounded-full ${isA ? cc.badgeBg : "bg-white/8"}`}>{cat.count}</span>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Insight Cards */}
                <div className="lg:col-span-2 space-y-4">
                    {insights.map((insight, i) => <InsightCard key={i} insight={insight} />)}
                </div>

                {/* Right Panel */}
                <div className="space-y-4">

                    {/* Category Score */}
                    <div className={`rounded-2xl bg-[#080c14] border ${c.border} p-5`}>
                        <h4 className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-4`}>{cat.label} Score</h4>
                        <div className="text-center py-3">
                            <div className="text-4xl font-black text-white">{cat.score}</div>
                            <div className="text-xs text-white/35 mt-1">/100</div>
                        </div>
                        <div className="h-2 bg-white/8 rounded-full overflow-hidden mt-3">
                            <div className={`h-full rounded-full ${cat.score >= 70 ? "bg-emerald-500" : cat.score >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
                                style={{ width: `${cat.score}%` }} />
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {categories.map((ct) => (
                                <div key={ct.key} className={`p-2 rounded-xl text-center border ${colorMap[ct.color].bg} ${colorMap[ct.color].border}`}>
                                    <div className={`text-sm font-black ${colorMap[ct.color].text}`}>{ct.score}</div>
                                    <div className="text-[8px] text-white/30 capitalize mt-0.5">{ct.label.split(" ")[0]}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 9-month progress */}
                    <div className="rounded-2xl bg-[#080c14] border border-white/8 p-5">
                        <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
                            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" /> 9-Month Progress
                        </h4>
                        <div className="space-y-2.5">
                            {[
                                { label: "HbA1c", from: "6.8%",   to: "6.2%",    dir: "down" },
                                { label: "LDL",   from: "165",     to: "145 mg/dL", dir: "down" },
                                { label: "CRP",   from: "1.2 mg/L",to: "0.7 mg/L", dir: "down" },
                                { label: "Vit D", from: "28 ng/mL",to: "22 ng/mL", dir: "down" },
                            ].map((p, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <span className="text-white/50 font-bold">{p.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white/30">{p.from}</span>
                                        <ChevronRight size={10} className="text-white/20" />
                                        <span className="text-emerald-400 font-bold">{p.to}</span>
                                        <TrendingDown size={11} className="text-emerald-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Chat CTA */}
                    <Link href="/dashboard/chat" className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/8 border border-blue-500/20 hover:border-blue-500/40 transition-all group">
                        <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/25">
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Ask AI about this</p>
                            <p className="text-[10px] text-white/40">Get personalized explanations</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-blue-400/50 group-hover:text-blue-400 ml-auto transition-colors" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
