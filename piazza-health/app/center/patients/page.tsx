"use client";

import { useState } from "react";
import { Search, X, ChevronRight, FileText, Calendar, TestTube2 } from "lucide-react";

type Patient = {
    id: string; name: string; dob: string; phone: string;
    status: "Active" | "Inactive"; tests: number; lastVisit: string;
    reports: { name: string; date: string; params: number }[];
};

const patients: Patient[] = [
    { id: "P-4921", name: "Rahul Sharma",   dob: "15 Mar 1990", phone: "9876543210", status: "Active",   tests: 4, lastVisit: "Oct 24, 2024",
      reports: [{ name: "CBC Oct 2024", date: "Oct 24", params: 18 }, { name: "Lipid Jul 2024", date: "Jul 15", params: 12 }] },
    { id: "P-4920", name: "Anjali Gupta",   dob: "22 Jun 1985", phone: "9123456789", status: "Active",   tests: 3, lastVisit: "Oct 24, 2024",
      reports: [{ name: "Lipid Profile Oct 2024", date: "Oct 24", params: 10 }] },
    { id: "P-4919", name: "Vikram Singh",   dob: "08 Nov 1978", phone: "9988776655", status: "Active",   tests: 6, lastVisit: "Oct 24, 2024",
      reports: [{ name: "Thyroid Panel Oct 2024", date: "Oct 24", params: 3 }, { name: "CBC Apr 2024", date: "Apr 10", params: 18 }] },
    { id: "P-4918", name: "Priya Patel",    dob: "30 Jan 1995", phone: "9000012345", status: "Active",   tests: 2, lastVisit: "Oct 23, 2024",
      reports: [{ name: "Vitamin D3 Oct 2024", date: "Oct 23", params: 2 }] },
    { id: "P-4917", name: "Amit Kumar",     dob: "10 Sep 1982", phone: "8800099900", status: "Active",   tests: 5, lastVisit: "Oct 22, 2024",
      reports: [{ name: "Metabolic Panel Oct 2024", date: "Oct 22", params: 15 }] },
    { id: "P-4916", name: "Seema Shah",     dob: "25 Apr 1970", phone: "7712309876", status: "Inactive", tests: 1, lastVisit: "Sep 10, 2024",
      reports: [{ name: "CBC Sep 2024", date: "Sep 10", params: 18 }] },
];

export default function PatientsPage() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Patient | null>(null);

    const filtered = patients.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full space-y-5 pb-6">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Patient Records</h2>
                <p className="text-slate-400 text-sm mt-1">View and manage patient history and uploaded reports.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "Total Patients", value: patients.length, color: "text-white" },
                    { label: "Active",          value: patients.filter(p => p.status === "Active").length,   color: "text-emerald-400" },
                    { label: "This Month",      value: "5", color: "text-cyan-400" },
                ].map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                        <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                        <div className="text-[11px] text-slate-500 font-bold mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-xs">
                <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient or ID..."
                    className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-cyan-500/40 placeholder:text-slate-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Patient List */}
                <div className="lg:col-span-2 space-y-2">
                    {filtered.map((p) => (
                        <div key={p.id}
                            onClick={() => setSelected(p)}
                            className={`flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border cursor-pointer transition-all hover:border-slate-700 ${selected?.id === p.id ? "border-cyan-500/40" : "border-slate-800"}`}>
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-black text-slate-300 shrink-0">
                                {p.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white">{p.name}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{p.id} · DOB {p.dob}</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-3 shrink-0">
                                <span className="text-xs text-slate-500">{p.tests} tests</span>
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${p.status === "Active" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-white/25 bg-white/5 border-white/10"}`}>{p.status}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                        </div>
                    ))}
                </div>

                {/* Detail Panel */}
                <div className="lg:col-span-1">
                    {selected ? (
                        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sticky top-[80px]">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-sm font-bold text-white">Patient Detail</h3>
                                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white transition-colors"><X size={15} /></button>
                            </div>

                            <div className="flex flex-col items-center text-center mb-5 pb-5 border-b border-slate-800">
                                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-black text-slate-300 mb-3">
                                    {selected.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <h4 className="text-base font-black text-white">{selected.name}</h4>
                                <p className="text-xs text-slate-400 mt-0.5">{selected.id} · {selected.phone}</p>
                                <span className={`mt-2 text-[10px] font-black px-2.5 py-0.5 rounded-full border ${selected.status === "Active" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-white/25 bg-white/5 border-white/10"}`}>{selected.status}</span>
                            </div>

                            <div className="space-y-2 mb-5">
                                {[
                                    { label: "Date of Birth", value: selected.dob },
                                    { label: "Last Visit",    value: selected.lastVisit },
                                    { label: "Total Tests",   value: selected.tests.toString() },
                                ].map((f, i) => (
                                    <div key={i} className="flex justify-between text-xs">
                                        <span className="text-slate-500">{f.label}</span>
                                        <span className="text-white font-bold">{f.value}</span>
                                    </div>
                                ))}
                            </div>

                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Uploaded Reports</h4>
                            <div className="space-y-2">
                                {selected.reports.map((r, i) => (
                                    <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all">
                                        <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shrink-0">
                                            <FileText className="w-3 h-3 text-cyan-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-white truncate">{r.name}</p>
                                            <p className="text-[10px] text-slate-500">{r.date} · {r.params} params</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-slate-900 border border-dashed border-slate-800 p-10 flex flex-col items-center justify-center text-center">
                            <TestTube2 className="w-8 h-8 text-slate-700 mb-3" />
                            <p className="text-sm font-bold text-slate-600">Select a patient</p>
                            <p className="text-xs text-slate-700 mt-1">Click a row to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
