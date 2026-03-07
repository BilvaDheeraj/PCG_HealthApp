"use client";

import { useState } from "react";
import {
    Brain, CheckCircle2, Zap, Search, AlertTriangle
} from "lucide-react";

const validations = [
    {
        id: "AI-2041", patient: "Rahul Sharma", parameter: "HbA1c", value: "6.2%", aiOutput: "Pre-diabetes. Trending down. Risk: Moderate.",
        confidence: 96, approved: false, reason: null,
        suggestions: ["Recommend low-GI diet", "Schedule retest in 3 months", "Refer to metabolic specialist"],
    },
    {
        id: "AI-2040", patient: "Anjali Gupta", parameter: "LDL Cholesterol", value: "145 mg/dL", aiOutput: "Elevated. Atherosclerosis risk elevated. Consider statins.",
        confidence: 91, approved: false, reason: null,
        suggestions: ["Dietary modification recommended", "Exercise regimen suggested", "Statin discussion with physician"],
    },
    {
        id: "AI-2039", patient: "Vikram Singh", parameter: "TSH (Thyroid)", value: "5.8 mIU/L", aiOutput: "Mildly elevated — subclinical hypothyroidism. Monitor.",
        confidence: 78, approved: false, reason: "TSH 5.8 is borderline; LLM may be over-flagging. Cross-reference FT4.",
        suggestions: ["Retest in 6 weeks", "Check FT3/FT4 before treatment"],
    },
    {
        id: "AI-2038", patient: "Priya Patel", parameter: "Vitamin D", value: "22 ng/mL", aiOutput: "Deficient. Supplementation strongly recommended.",
        confidence: 99, approved: true, reason: null,
        suggestions: ["D3 60,000 IU weekly x 8 weeks", "Morning sunlight 20–30 min/day"],
    },
];

type Validation = typeof validations[0];

export default function AIValidationPage() {
    const [items, setItems] = useState(validations);
    const [selected, setSelected] = useState<Validation | null>(null);
    const [search, setSearch] = useState("");

    const approve = (id: string) => {
        setItems(prev => prev.map(x => x.id === id ? { ...x, approved: true } : x));
        setSelected(prev => prev?.id === id ? { ...prev, approved: true } : prev);
    };

    const filtered = items.filter(v => v.patient.toLowerCase().includes(search.toLowerCase()) || v.parameter.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="w-full space-y-6 pb-6">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">AI Validation Queue</h2>
                <p className="text-slate-400 text-sm mt-1">Doctor review and approval of AI-generated clinical insights before release to patients.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Pending Review", value: items.filter(v => !v.approved).length, color: "text-amber-400" },
                    { label: "Approved", value: items.filter(v => v.approved).length, color: "text-emerald-400" },
                    { label: "Avg. Confidence", value: `${Math.round(items.reduce((a, v) => a + v.confidence, 0) / items.length)}%`, color: "text-blue-400" },
                ].map((s, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                        <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-slate-500 font-bold mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient or parameter..."
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-purple-500/40 placeholder:text-slate-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* List */}
                <div className="lg:col-span-2 space-y-3">
                    {filtered.map((v, i) => (
                        <div key={v.id}
                            onClick={() => setSelected(v)}
                            className={`p-4 rounded-2xl bg-slate-900 border cursor-pointer transition-all hover:border-slate-700 ${selected?.id === v.id ? 'border-purple-500/40' : 'border-slate-800'}`}>
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${v.approved ? 'bg-emerald-500/10 border-emerald-500/20' : v.confidence < 80 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-purple-500/10 border-purple-500/20'}`}>
                                        <Brain className={`w-4 h-4 ${v.approved ? 'text-emerald-400' : v.confidence < 80 ? 'text-amber-400' : 'text-purple-400'}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{v.patient}</p>
                                        <p className="text-xs text-slate-400">{v.parameter} · {v.value}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${v.confidence >= 90 ? 'text-emerald-400 bg-emerald-500/10' : v.confidence >= 75 ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                                        {v.confidence}% conf.
                                    </span>
                                    {v.approved && <p className="text-[10px] text-emerald-400 font-bold mt-1">✓ Approved</p>}
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 italic leading-relaxed line-clamp-1">"{v.aiOutput}"</p>
                            {v.reason && (
                                <div className="mt-2 flex items-start gap-1.5">
                                    <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-amber-400/70">{v.reason}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Detail */}
                <div className="lg:col-span-1">
                    {selected ? (
                        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sticky top-[80px]">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-purple-400" /> AI Output
                            </h3>

                            <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/20 mb-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 blur-[30px]" />
                                <p className="text-xs text-slate-300 leading-relaxed relative z-10 italic">"{selected.aiOutput}"</p>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Confidence</span>
                                    <span className={`text-sm font-black ${selected.confidence >= 90 ? 'text-emerald-400' : selected.confidence >= 75 ? 'text-amber-400' : 'text-rose-400'}`}>{selected.confidence}%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${selected.confidence >= 90 ? 'bg-emerald-500' : selected.confidence >= 75 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${selected.confidence}%` }} />
                                </div>
                            </div>

                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Suggested Actions</h4>
                            <ul className="space-y-2 mb-5">
                                {selected.suggestions.map((s, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                                        <Zap className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" />
                                        {s}
                                    </li>
                                ))}
                            </ul>

                            {selected.reason && (
                                <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 mb-4 flex items-start gap-2">
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-300/80 leading-relaxed">{selected.reason}</p>
                                </div>
                            )}

                            {!selected.approved ? (
                                <button onClick={() => approve(selected.id)}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-purple-500/20">
                                    <CheckCircle2 size={15} /> Approve & Release to Patient
                                </button>
                            ) : (
                                <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                                    <CheckCircle2 size={15} /> Released to Patient
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-slate-900 border border-dashed border-slate-800 p-10 flex flex-col items-center justify-center text-center">
                            <Brain className="w-8 h-8 text-slate-700 mb-3" />
                            <p className="text-sm font-bold text-slate-600">Select an item</p>
                            <p className="text-xs text-slate-700 mt-1">Click any item to review AI output</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
