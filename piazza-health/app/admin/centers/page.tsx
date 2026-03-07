"use client";

import { Building2, Plus, Search, MoreVertical, ShieldCheck, MapPin } from "lucide-react";

const centers = [
    { id: "C-1049", name: "Apollo Diagnostics Main", location: "Bangalore", type: "Tier 1 Center", status: "Active", reports: 4250, lastSync: "2 mins ago" },
    { id: "C-1050", name: "LalPath Labs Satellite", location: "Mumbai", type: "Tier 2 Center", status: "Active", reports: 1840, lastSync: "15 mins ago" },
    { id: "C-1051", name: "Metropolis Hub", location: "Delhi", type: "Tier 1 Center", status: "Maintenance", reports: 8900, lastSync: "2 hours ago" },
    { id: "C-1052", name: "Thyrocare Local", location: "Chennai", type: "Tier 3 Center", status: "Active", reports: 620, lastSync: "5 mins ago" },
];

export default function CentersPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Diagnostic Centers</h2>
                    <p className="text-slate-400">Manage integrated labs, parsing rules, and API connections.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-semibold rounded-lg transition-colors">
                        Export CSV
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                        <Plus className="w-4 h-4" />
                        Add Center
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by ID, Name or Location..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
                    />
                </div>

                <div className="flex gap-2">
                    <select className="bg-slate-900 border border-slate-800 text-sm text-white rounded-lg px-3 py-2 outline-none">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Maintenance</option>
                    </select>
                    <select className="bg-slate-900 border border-slate-800 text-sm text-white rounded-lg px-3 py-2 outline-none">
                        <option>All Tiers</option>
                        <option>Tier 1</option>
                        <option>Tier 2</option>
                        <option>Tier 3</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-950/50 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="py-4 px-6">Center Details</th>
                                <th className="py-4 px-6">Location</th>
                                <th className="py-4 px-6">Total Reports</th>
                                <th className="py-4 px-6">Status / Last Sync</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-sm">
                            {centers.map((center) => (
                                <tr key={center.id} className="hover:bg-slate-800/20 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                                                <Building2 className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white mb-0.5">{center.name}</div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-slate-500 font-mono">{center.id}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                                                    <span className="text-xs text-blue-400 font-medium">{center.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-1.5 text-slate-300">
                                            <MapPin className="w-4 h-4 text-slate-500" />
                                            {center.location}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-medium text-slate-200">
                                        {center.reports.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1">
                                            <span className={`inline-flex items-center w-fit px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${center.status === 'Active'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                {center.status}
                                            </span>
                                            <span className="text-xs text-slate-500">{center.lastSync}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination mock */}
                <div className="p-4 border-t border-slate-800 flex items-center justify-between text-sm text-slate-500">
                    <div>Showing 1 to 4 of 42 centers</div>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 rounded bg-slate-800/50 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors cursor-not-allowed opacity-50">Prev</button>
                        <button className="px-3 py-1 rounded bg-slate-800/50 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors">Next</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
