"use client";

import { useState } from "react";
import {
    Shield, AlertTriangle, CheckCircle2, XCircle,
    Search, RotateCcw
} from "lucide-react";

type ReportStatus = "all" | "flagged" | "approved" | "rejected";

const reports = [
    {
        id: "R-9104", patient: "Unknown Patient", center: "Lab XYZ", test: "Complete Blood Count",
        score: 22, reason: "No NABL header detected; lab logo appears digitally inserted",
        date: "Oct 24, 2024", status: "flagged",
    },
    {
        id: "R-9087", patient: "Ramesh Kumar", center: "HealthCare Plus", test: "Lipid Profile",
        score: 35, reason: "OCR confidence 34% — low-quality scanned image, blurred text",
        date: "Oct 22, 2024", status: "flagged",
    },
    {
        id: "R-9065", patient: "Seema Shah", center: "QuickPath Labs", test: "Thyroid Panel",
        score: 48, reason: "Metadata timestamp mismatch: file created 2 months before report date",
        date: "Oct 18, 2024", status: "flagged",
    },
    {
        id: "R-9051", patient: "Arun Mehta", center: "Apollo Diagnostics", test: "HbA1c",
        score: 97, reason: "All authenticity checks passed. NABL certified lab, high OCR confidence.",
        date: "Oct 16, 2024", status: "approved",
    },
    {
        id: "R-9042", patient: "Preeti Joshi", center: "Max Labs", test: "Vitamin D3",
        score: 18, reason: "Report template does not match any registered lab template in system.",
        date: "Oct 14, 2024", status: "rejected",
    },
];

type ReportType = typeof reports[0];

const scoreColor = (score: number) => {
    if (score < 40) return { badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20", bar: "bg-rose-500" };
    if (score < 70) return { badge: "bg-amber-500/10 text-amber-400 border border-amber-500/20", bar: "bg-amber-500" };
    return { badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", bar: "bg-emerald-500" };
};

const statusBadge: Record<string, string> = {
    flagged: "text-rose-400 bg-rose-500/10 border border-rose-500/20",
    approved: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
    rejected: "text-white/30 bg-white/5 border border-white/10",
};

export default function ReportReviewPage() {
    const [filter, setFilter] = useState<ReportStatus>("all");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<ReportType | null>(null);
    const [statuses, setStatuses] = useState<Record<string, string>>(Object.fromEntries(reports.map(r => [r.id, r.status])));

    const filtered = reports.filter(r => {
        const s = statuses[r.id];
        return (filter === "all" || s === filter) && (r.patient.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()));
    });

    const updateStatus = (id: string, newStatus: string) => {
        setStatuses(prev => ({ ...prev, [id]: newStatus }));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
    };

    return (
        <div className="w-full space-y-6 pb-6">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Report Review</h2>
                <p className="text-slate-400 text-sm mt-1">Review flagged reports for authenticity validation before patient access.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Total", count: reports.length, color: "text-white" },
                    { label: "Flagged", count: reports.filter(r => r.status === "flagged").length, color: "text-rose-400" },
                    { label: "Approved", count: reports.filter(r => r.status === "approved").length, color: "text-emerald-400" },
                    { label: "Rejected", count: reports.filter(r => r.status === "rejected").length, color: "text-white/30" },
                ].map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                        <div className={`text-2xl font-black ${s.color}`}>{s.count}</div>
                        <div className="text-[11px] text-slate-500 font-bold mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Filter + Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
                    {(["all", "flagged", "approved", "rejected"] as ReportStatus[]).map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}>
                            {f}
                        </button>
                    ))}
                </div>
                <div className="relative flex-1 sm:max-w-xs">
                    <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient or ID..."
                        className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-purple-500/40 placeholder:text-slate-600" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* List */}
                <div className="lg:col-span-2 space-y-3">
                    {filtered.map((r, i) => {
                        const s = statuses[r.id];
                        const sc = scoreColor(r.score);
                        return (
                            <div key={r.id}
                                onClick={() => setSelected(r)}
                                className={`p-4 rounded-2xl bg-slate-900 border cursor-pointer transition-all hover:border-slate-700 ${selected?.id === r.id ? 'border-purple-500/40' : 'border-slate-800'}`}>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded">{r.id}</span>
                                            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${statusBadge[s]}`}>{s}</span>
                                        </div>
                                        <p className="text-sm font-bold text-white">{r.patient}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{r.test} · {r.center}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className={`text-lg font-black ${r.score < 40 ? 'text-rose-400' : r.score < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>{r.score}%</div>
                                        <div className="text-[10px] text-slate-500">Auth Score</div>
                                    </div>
                                </div>
                                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${sc.bar} rounded-full transition-all`} style={{ width: `${r.score}%` }} />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 line-clamp-1">{r.reason}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Detail */}
                <div className="lg:col-span-1">
                    {selected ? (
                        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sticky top-[80px]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-white">Review Panel</h3>
                                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white transition-colors"><XCircle size={16} /></button>
                            </div>

                            <div className="text-center py-4 border-b border-slate-800 mb-4">
                                <div className={`text-4xl font-black mb-1 ${selected.score < 40 ? 'text-rose-400' : selected.score < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>{selected.score}%</div>
                                <p className="text-xs text-slate-400">Authenticity Score</p>
                                <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${scoreColor(selected.score).bar} rounded-full`} style={{ width: `${selected.score}%` }} />
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                {[
                                    { label: "Report ID", value: selected.id },
                                    { label: "Patient", value: selected.patient },
                                    { label: "Test", value: selected.test },
                                    { label: "Center", value: selected.center },
                                    { label: "Date", value: selected.date },
                                ].map((f, i) => (
                                    <div key={i} className="flex justify-between text-xs">
                                        <span className="text-slate-500">{f.label}</span>
                                        <span className="text-white font-bold">{f.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-5">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Flagged Reason</p>
                                <p className="text-xs text-slate-300 leading-relaxed">{selected.reason}</p>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => updateStatus(selected.id, "approved")}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20 transition-all">
                                    <CheckCircle2 size={13} /> Approve
                                </button>
                                <button onClick={() => updateStatus(selected.id, "rejected")}
                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/20 transition-all">
                                    <XCircle size={13} /> Reject
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-slate-900 border border-dashed border-slate-800 p-10 flex flex-col items-center justify-center text-center">
                            <Shield className="w-8 h-8 text-slate-700 mb-3" />
                            <p className="text-sm font-bold text-slate-600">Select a report</p>
                            <p className="text-xs text-slate-700 mt-1">Click any report to review</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
