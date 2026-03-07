"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu, ChevronDown, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CenterTopNav({ onMenuClick }: { onMenuClick?: () => void }) {
    const pathname = usePathname();
    const [showAlerts, setShowAlerts] = useState(false);

    const title = pathname === "/center" ? "Center Analytics" :
        pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Dashboard";

    return (
        <header className="h-[70px] bg-[#060A14]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between px-6 md:px-8">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="md:hidden text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/5">
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-bold text-white truncate">{title}</h1>
                    <p className="text-[11px] text-white/35 truncate">Apollo Diagnostics · NABL Accredited</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* System indicators */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400">All Systems Nominal</span>
                </div>

                {/* Alerts */}
                <div className="relative">
                    <button onClick={() => setShowAlerts(!showAlerts)} className="relative text-white/50 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full border border-[#060A14]" />
                    </button>
                    {showAlerts && (
                        <div className="absolute right-0 top-11 w-72 bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                            <div className="px-4 py-3 border-b border-white/5">
                                <h4 className="text-xs font-bold text-white">Lab Alerts</h4>
                            </div>
                            <div className="p-2 space-y-1">
                                {[
                                    { text: "4 reports need manual review (low OCR confidence)", color: "text-amber-400", bg: "bg-amber-500/8", icon: AlertCircle },
                                    { text: "Patient P-4921 report processed successfully", color: "text-emerald-400", bg: "bg-emerald-500/8", icon: CheckCircle2 },
                                ].map((a, i) => (
                                    <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl ${a.bg}`}>
                                        <a.icon className={`w-3.5 h-3.5 ${a.color} shrink-0 mt-0.5`} />
                                        <p className="text-xs text-white/60 leading-relaxed">{a.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* User */}
                <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-black text-white">
                        LD
                    </div>
                    <ChevronDown className="w-3 h-3 text-white/30 group-hover:text-white/60" />
                </button>
            </div>
        </header>
    );
}
