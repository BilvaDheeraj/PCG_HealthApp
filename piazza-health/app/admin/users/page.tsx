"use client";

import { useState } from "react";
import { Users, Search, ChevronRight, X, Shield, TestTube2, Activity } from "lucide-react";

const users = [
    { id: "U-1001", name: "Rahul Sharma", email: "rahul@gmail.com", role: "patient", status: "Active", lastLogin: "Today 11:45 AM", reports: 4 },
    { id: "U-1002", name: "Dr. Anjali Singh", email: "anjali@hospital.com", role: "doctor", status: "Active", lastLogin: "Today 09:00 AM", reports: 0 },
    { id: "U-1003", name: "Apollo Lab Admin", email: "admin@apollo.in", role: "center", status: "Active", lastLogin: "Today 08:30 AM", reports: 0 },
    { id: "U-1004", name: "Vikram Kumar", email: "vikram@email.com", role: "patient", status: "Active", lastLogin: "Yesterday", reports: 6 },
    { id: "U-1005", name: "Seema Shah", email: "seema@example.com", role: "patient", status: "Suspended", lastLogin: "Oct 12, 2024", reports: 2 },
    { id: "U-1006", name: "Dr. Rajan Mehta", email: "rajan@clinic.com", role: "doctor", status: "Active", lastLogin: "Today 10:15 AM", reports: 0 },
    { id: "U-1007", name: "HealthCare Plus", email: "center@hcplus.com", role: "center", status: "Active", lastLogin: "Today 08:00 AM", reports: 0 },
    { id: "U-1008", name: "Priya Patel", email: "priya@email.com", role: "patient", status: "Active", lastLogin: "Oct 20, 2024", reports: 2 },
];

const roleStyle: Record<string, { icon: typeof Users; text: string; bg: string; border: string }> = {
    patient: { icon: Activity, text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    doctor: { icon: Shield, text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    center: { icon: TestTube2, text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
};

export default function UsersPage() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [userList, setUserList] = useState(users);
    const [selected, setSelected] = useState<typeof users[0] | null>(null);

    const filtered = userList.filter(u =>
        (roleFilter === "all" || u.role === roleFilter) &&
        (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    );

    const toggleSuspend = (id: string) => {
        setUserList(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: prev.status === "Active" ? "Suspended" : "Active" } : null);
    };

    const counts = { all: users.length, patient: users.filter(u => u.role === "patient").length, doctor: users.filter(u => u.role === "doctor").length, center: users.filter(u => u.role === "center").length };

    return (
        <div className="w-full space-y-6 pb-6">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">User Management</h2>
                <p className="text-slate-400 text-sm mt-1">Manage access, roles, and permissions across all platform users.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "All Users", value: counts.all, color: "text-white" },
                    { label: "Patients", value: counts.patient, color: "text-blue-400" },
                    { label: "Doctors", value: counts.doctor, color: "text-purple-400" },
                    { label: "Centers", value: counts.center, color: "text-cyan-400" },
                ].map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center hover:border-slate-700 transition-colors cursor-pointer" onClick={() => setRoleFilter(["all", "patient", "doctor", "center"][i])}>
                        <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-slate-500 font-bold mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Role filter + search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
                    {["all", "patient", "doctor", "center"].map(f => (
                        <button key={f} onClick={() => setRoleFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold capitalize tracking-wide transition-all ${roleFilter === f ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}>
                            {f}
                        </button>
                    ))}
                </div>
                <div className="relative flex-1 sm:max-w-xs">
                    <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or email..."
                        className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl py-2.5 pl-9 pr-4 focus:outline-none focus:border-purple-500/40 placeholder:text-slate-600" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* User list */}
                <div className="lg:col-span-2 space-y-2.5">
                    {filtered.map((u, i) => {
                        const rs = roleStyle[u.role];
                        const Icon = rs.icon;
                        return (
                        <div key={u.id}
                                onClick={() => setSelected(u)}
                                className={`flex items-center justify-between p-4 rounded-2xl bg-slate-900 border cursor-pointer transition-all hover:border-slate-700 ${selected?.id === u.id ? 'border-purple-500/40' : 'border-slate-800'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${rs.bg} ${rs.border}`}>
                                        <Icon className={`w-4 h-4 ${rs.text}`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{u.name}</p>
                                        <p className="text-xs text-slate-400">{u.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-black capitalize px-2 py-0.5 rounded-lg border ${rs.bg} ${rs.text} ${rs.border}`}>{u.role}</span>
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${u.status === "Active" ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"}`}>{u.status}</span>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                                </div>
                        </div>
                        );
                    })}
                </div>

                {/* Detail */}
                <div className="lg:col-span-1">
                    {selected ? (
                        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sticky top-[80px]">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="text-sm font-bold text-white">User Details</h3>
                                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white transition-colors"><X size={15} /></button>
                            </div>

                            {(() => {
                                const rs = roleStyle[selected.role];
                                const Icon = rs.icon;
                                return (
                                    <div className="flex flex-col items-center text-center mb-5 pb-5 border-b border-slate-800">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-3 ${rs.bg} ${rs.border}`}>
                                            <Icon className={`w-7 h-7 ${rs.text}`} />
                                        </div>
                                        <h4 className="text-base font-black text-white">{selected.name}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5">{selected.email}</p>
                                        <p className="text-[10px] text-slate-600 mt-0.5">{selected.id}</p>
                                    </div>
                                );
                            })()}

                            <div className="space-y-2.5 mb-5">
                                {[
                                    { label: "Role", value: selected.role },
                                    { label: "Status", value: selected.status },
                                    { label: "Last Login", value: selected.lastLogin },
                                    { label: "Reports", value: selected.reports.toString() },
                                ].map((f, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500">{f.label}</span>
                                        <span className={`font-bold capitalize ${f.label === 'Status' ? (f.value === 'Active' ? 'text-emerald-400' : 'text-rose-400') : 'text-white'}`}>{f.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <button className="w-full py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 text-xs font-bold transition-all">
                                    Reset Password
                                </button>
                                <button onClick={() => toggleSuspend(selected.id)}
                                    className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all ${selected.status === "Active" ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20" : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20"}`}>
                                    {selected.status === "Active" ? "Suspend User" : "Reactivate User"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-slate-900 border border-dashed border-slate-800 p-10 flex flex-col items-center justify-center text-center">
                            <Users className="w-8 h-8 text-slate-700 mb-3" />
                            <p className="text-sm font-bold text-slate-600">Select a user</p>
                            <p className="text-xs text-slate-700 mt-1">Click any row to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
