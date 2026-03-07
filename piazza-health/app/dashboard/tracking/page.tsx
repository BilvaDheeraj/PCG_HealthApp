"use client";

import { useState } from "react";
import { TrendingDown, TrendingUp, Minus, Brain } from "lucide-react";
import {
    ResponsiveContainer, AreaChart, LineChart, Line, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine
} from "recharts";

type BioKey = "lipids" | "hba1c" | "glucose" | "hemoglobin" | "vitamind";

const tabs: { key: BioKey; label: string; unit: string; color: string; trend: string; latest: string }[] = [
    { key: "lipids",     label: "Lipids",     unit: "mg/dL", color: "#f43f5e", trend: "down",   latest: "145" },
    { key: "hba1c",      label: "HbA1c",      unit: "%",     color: "#f43f5e", trend: "down",   latest: "6.2" },
    { key: "glucose",    label: "Glucose",    unit: "mg/dL", color: "#a855f7", trend: "down",   latest: "106" },
    { key: "hemoglobin", label: "Hemoglobin", unit: "g/dL",  color: "#10b981", trend: "up",     latest: "14.5" },
    { key: "vitamind",   label: "Vitamin D",  unit: "ng/mL", color: "#f97316", trend: "down",   latest: "22" },
];

const chartData: Record<BioKey, { data: Record<string, string | number>[]; keys: string[]; colors: string[]; refs?: { y: number; label: string }[] }> = {
    lipids:     { data: [{ d:"Jan", ldl:165, hdl:40 }, { d:"Apr", ldl:155, hdl:42 }, { d:"Jul", ldl:150, hdl:43 }, { d:"Oct", ldl:145, hdl:45 }], keys:["ldl","hdl"], colors:["#f43f5e","#10b981"], refs:[{ y:100, label:"LDL Target" }] },
    hba1c:      { data: [{ d:"Jan", v:6.8 }, { d:"Apr", v:6.5 }, { d:"Jul", v:6.4 }, { d:"Oct", v:6.2 }], keys:["v"], colors:["#f43f5e"], refs:[{ y:5.7, label:"Pre-diabetes" }, { y:6.5, label:"Diabetes" }] },
    glucose:    { data: [{ d:"Jan", v:118 }, { d:"Apr", v:112 }, { d:"Jul", v:109 }, { d:"Oct", v:106 }], keys:["v"], colors:["#a855f7"], refs:[{ y:99, label:"Normal limit" }, { y:126, label:"Diabetic" }] },
    hemoglobin: { data: [{ d:"Jan", v:13.8 }, { d:"Apr", v:14.1 }, { d:"Jul", v:14.3 }, { d:"Oct", v:14.5 }], keys:["v"], colors:["#10b981"], refs:[{ y:13.8, label:"Min normal" }] },
    vitamind:   { data: [{ d:"Jan", v:28 }, { d:"Apr", v:25 }, { d:"Jul", v:22 }, { d:"Oct", v:22 }], keys:["v"], colors:["#f97316"], refs:[{ y:30, label:"Optimal (30)" }] },
};

const trendSummary: Record<BioKey, string> = {
    lipids:     "LDL has decreased 12% over 9 months. HDL improving. Target: LDL < 130 mg/dL.",
    hba1c:      "HbA1c improved from 6.8% → 6.2% — a 0.6% reduction. Dietary changes are working.",
    glucose:    "Fasting glucose trending down from 118 → 106 mg/dL. Still above normal. Continue low-GI diet.",
    hemoglobin: "Hemoglobin trending up steadily from 13.8 → 14.5 g/dL. No anemia detected.",
    vitamind:   "Vitamin D declined from 28 → 22 ng/mL. Below optimal. Immediate supplementation needed.",
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#060810] border border-white/10 rounded-xl px-3 py-2 shadow-2xl">
            <p className="text-[10px] text-white/40 font-bold mb-1">{label}</p>
            {payload.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    <span className="text-white font-bold">{p.name.toUpperCase()}: {p.value}</span>
                </div>
            ))}
        </div>
    );
};

export default function TrackingPage() {
    const [active, setActive] = useState<BioKey>("lipids");
    const tab = tabs.find(t => t.key === active)!;
    const cd = chartData[active];
    const isMultiple = cd.keys.length > 1;

    return (
        <div className="w-full space-y-5 pb-6">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Health Tracking</h2>
                <p className="text-white/45 text-sm mt-1">Longitudinal biomarker trends from your lab history.</p>
            </div>

            {/* Biomarker Selector Tabs */}
            <div className="flex flex-wrap gap-2">
                {tabs.map((t) => {
                    const isA = active === t.key;
                    return (
                        <button key={t.key} onClick={() => setActive(t.key)}
                            className={`flex flex-col items-start px-4 py-3 rounded-xl border transition-all ${isA ? "bg-white/8 border-white/15" : "bg-[#080c14] border-white/6 hover:border-white/12 hover:bg-white/5"}`}>
                            <div className="flex items-center justify-between w-full gap-4 mb-1">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${isA ? "text-white/60" : "text-white/35"}`}>{t.label}</span>
                                {t.trend === "down" ? <TrendingDown size={12} className="text-emerald-400" /> :
                                    t.trend === "up" ? <TrendingUp size={12} className="text-emerald-400" /> :
                                        <Minus size={12} className="text-amber-400" />}
                            </div>
                            <span className="text-xl font-black text-white">{t.latest}</span>
                            <span className="text-[9px] text-white/25">{t.unit}</span>
                        </button>
                    );
                })}
            </div>

            {/* Main Chart */}
            <div className="rounded-2xl bg-[#080c14] border border-white/8 p-5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-bold text-white">{tab.label} — 9 Month Trend</h3>
                        <p className="text-xs text-white/35 mt-0.5">Jan 2024 – Oct 2024</p>
                    </div>
                    {isMultiple && (
                        <div className="flex items-center gap-3">
                            {cd.keys.map((k, i) => (
                                <div key={k} className="flex items-center gap-1.5">
                                    <span className="w-3 h-0.5 rounded" style={{ background: cd.colors[i] }} />
                                    <span className="text-[10px] text-white/40 uppercase font-bold">{k}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {isMultiple ? (
                            <LineChart data={cd.data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="d" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                {cd.refs?.map((ref) => (
                                    <ReferenceLine key={ref.y} y={ref.y} stroke="#475569" strokeDasharray="4 4"
                                        label={{ value: ref.label, position: "right", fill: "#64748b", fontSize: 9 }} />
                                ))}
                                {cd.keys.map((k, i) => (
                                    <Line key={k} type="monotone" dataKey={k} stroke={cd.colors[i]} strokeWidth={2.5}
                                        dot={{ r: 4, fill: cd.colors[i], strokeWidth: 0 }} activeDot={{ r: 6 }} />
                                ))}
                            </LineChart>
                        ) : (
                            <AreaChart data={cd.data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={tab.color} stopOpacity={0.35} />
                                        <stop offset="95%" stopColor={tab.color} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="d" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                {cd.refs?.map((ref) => (
                                    <ReferenceLine key={ref.y} y={ref.y} stroke="#475569" strokeDasharray="4 4"
                                        label={{ value: ref.label, position: "right", fill: "#64748b", fontSize: 9 }} />
                                ))}
                                <Area type="monotone" dataKey={cd.keys[0]} stroke={tab.color} strokeWidth={2.5}
                                    fill="url(#areaGrad)" dot={{ r: 4, fill: tab.color, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* AI Trend Analysis */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/8 to-transparent border border-blue-500/15">
                <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/25 shrink-0">
                    <Brain className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                    <p className="text-xs font-bold text-blue-400 mb-1">AI Trend Analysis</p>
                    <p className="text-sm text-white/65 leading-relaxed">{trendSummary[active]}</p>
                </div>
            </div>

            {/* Report Timeline */}
            <div className="rounded-2xl bg-[#080c14] border border-white/8 p-5">
                <h3 className="text-sm font-bold text-white mb-4">Report Timeline</h3>
                <div className="flex items-start gap-0 relative">
                    <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/8" />
                    <div className="space-y-5 w-full">
                        {["Oct 24, 2024", "Jul 15, 2024", "Apr 10, 2024", "Jan 08, 2024"].map((date, i) => (
                            <div key={date} className="flex items-start gap-4 relative">
                                <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 z-10 ${i === 0 ? "bg-emerald-500/20 border-emerald-500/40" : "bg-white/5 border-white/10"}`}>
                                    <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-emerald-400" : "bg-white/20"}`} />
                                </div>
                                <div className={`flex-1 p-3 rounded-xl border transition-all ${i === 0 ? "bg-emerald-500/8 border-emerald-500/15" : "bg-white/[0.02] border-white/5"}`}>
                                    <div className="flex items-center justify-between">
                                        <p className={`text-xs font-bold ${i === 0 ? "text-emerald-400" : "text-white/60"}`}>{date}</p>
                                        {i === 0 && <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Latest</span>}
                                    </div>
                                    <p className="text-[10px] text-white/35 mt-1">24 parameters extracted · Apollo Diagnostics</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
