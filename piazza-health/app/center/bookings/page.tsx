"use client";

import { useState } from "react";
import { Search, CheckCircle2, X, RefreshCw, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

type Status = "all" | "pending" | "confirmed" | "completed" | "cancelled";

type Booking = {
    id: string; name: string; test: string; date: string;
    time: string; phone: string; status: "pending" | "confirmed" | "completed" | "cancelled";
};

const initBookings: Booking[] = [
    { id:"B-1041", name:"Rahul Sharma",   test:"Complete Blood Count",   date:"Oct 25", time:"10:30 AM", phone:"98765 43210", status:"pending" },
    { id:"B-1040", name:"Anjali Gupta",   test:"Lipid Profile + HbA1c", date:"Oct 25", time:"11:00 AM", phone:"91234 56789", status:"confirmed" },
    { id:"B-1039", name:"Vikram Singh",   test:"Thyroid Panel",          date:"Oct 25", time:"11:30 AM", phone:"99887 76655", status:"confirmed" },
    { id:"B-1038", name:"Priya Patel",    test:"Vitamin D3 + B12",       date:"Oct 25", time:"12:00 PM", phone:"90000 12345", status:"pending" },
    { id:"B-1037", name:"Amit Kumar",     test:"Comprehensive Metabolic", date:"Oct 24", time:"09:30 AM", phone:"88000 99900", status:"completed" },
    { id:"B-1036", name:"Seema Shah",     test:"Cardiac Risk Panel",     date:"Oct 24", time:"02:00 PM", phone:"77123 09876", status:"cancelled" },
    { id:"B-1035", name:"Deepak Joshi",   test:"Complete Blood Count",   date:"Oct 24", time:"03:30 PM", phone:"99456 12300", status:"completed" },
];

const statusStyle: Record<Booking["status"], string> = {
    pending:   "text-amber-400 bg-amber-500/10 border-amber-500/20",
    confirmed: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    completed: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    cancelled: "text-white/25 bg-white/5 border-white/10",
};

const weekDays = [ { day: "Mon", date: 21, count: 12 }, { day: "Tue", date: 22, count: 18 }, { day: "Wed", date: 23, count: 14 }, { day: "Thu", date: 24, count: 22 }, { day: "Fri", date: 25, count: 18, today: true }, { day: "Sat", date: 26, count: 7 } ];

export default function BookingsPage() {
    const [bookings, setBookings] = useState(initBookings);
    const [filter, setFilter] = useState<Status>("all");
    const [search, setSearch] = useState("");

    const accept    = (id: string) => setBookings(p => p.map(b => b.id === id ? { ...b, status: "confirmed" as const } : b));
    const cancel    = (id: string) => setBookings(p => p.map(b => b.id === id ? { ...b, status: "cancelled" as const } : b));
    const reschedule= (id: string) => alert(`Reschedule flow for ${id} — integrate with calendar API`);

    const filtered = bookings.filter(b =>
        (filter === "all" || b.status === filter) &&
        (b.name.toLowerCase().includes(search.toLowerCase()) || b.test.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="w-full space-y-5 pb-6">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Bookings</h2>
                <p className="text-slate-400 text-sm mt-1">Manage patient appointments and sample collection schedule.</p>
            </div>

            {/* Week Calendar */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white">Week of Oct 21 – 26</h3>
                    <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white/60 hover:text-white transition-all"><ChevronLeft size={14} /></button>
                        <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white/60 hover:text-white transition-all"><ChevronRight size={14} /></button>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-2">
                    {weekDays.map(d => (
                        <div key={d.day} className={`flex flex-col items-center gap-1 py-3 rounded-xl border transition-all cursor-pointer ${d.today ? "bg-cyan-500/10 border-cyan-500/30" : "bg-slate-950 border-slate-800 hover:border-slate-700"}`}>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${d.today ? "text-cyan-400" : "text-white/40"}`}>{d.day}</span>
                            <span className={`text-lg font-black ${d.today ? "text-cyan-400" : "text-white/70"}`}>{d.date}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.today ? "bg-cyan-500/20 text-cyan-300" : "bg-white/5 text-white/30"}`}>{d.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter + Search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
                    {(["all","pending","confirmed","completed","cancelled"] as Status[]).map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all whitespace-nowrap ${filter === f ? "bg-slate-700 text-white" : "text-slate-500 hover:text-white"}`}>{f}</button>
                    ))}
                </div>
                <div className="relative flex-1 sm:max-w-xs">
                    <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search patient or test..."
                        className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-cyan-500/40 placeholder:text-slate-600" />
                </div>
            </div>

            {/* Bookings Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead className="bg-slate-950">
                            <tr className="text-slate-500 text-[10px] uppercase tracking-wider">
                                <th className="text-left px-4 py-3 font-bold">Patient</th>
                                <th className="text-left px-4 py-3 font-bold hidden md:table-cell">Test</th>
                                <th className="text-left px-4 py-3 font-bold hidden sm:table-cell">Date / Time</th>
                                <th className="text-left px-4 py-3 font-bold">Status</th>
                                <th className="text-right px-4 py-3 font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filtered.map((b) => (
                                <tr key={b.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <p className="font-bold text-white">{b.name}</p>
                                        <p className="text-slate-500 text-[10px]">{b.id} · {b.phone}</p>
                                    </td>
                                    <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{b.test}</td>
                                    <td className="px-4 py-3 hidden sm:table-cell">
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <Calendar size={11} className="text-slate-600" />
                                            {b.date} · {b.time}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${statusStyle[b.status]}`}>{b.status}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-1">
                                            {b.status === "pending" && (
                                                <>
                                                    <button onClick={() => accept(b.id)}
                                                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all" title="Accept">
                                                        <CheckCircle2 size={13} />
                                                    </button>
                                                    <button onClick={() => cancel(b.id)}
                                                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all" title="Cancel">
                                                        <X size={13} />
                                                    </button>
                                                </>
                                            )}
                                            {b.status === "confirmed" && (
                                                <button onClick={() => reschedule(b.id)}
                                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all" title="Reschedule">
                                                    <RefreshCw size={13} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <p className="text-center text-slate-600 text-sm py-10">No bookings match your filter.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
