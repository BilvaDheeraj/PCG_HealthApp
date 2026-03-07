"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Menu, ChevronDown, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
    "/dashboard": { title: "Health Overview", subtitle: "Your complete health intelligence dashboard" },
    "/dashboard/upload": { title: "Upload Report", subtitle: "Add new lab reports for AI analysis" },
    "/dashboard/insights": { title: "AI Insights", subtitle: "Personalized health insights from your biomarkers" },
    "/dashboard/tracking": { title: "Health Tracking", subtitle: "Longitudinal biomarker trend analysis" },
    "/dashboard/chat": { title: "AI Health Chat", subtitle: "Ask anything about your health data" },
    "/dashboard/recommendations": { title: "Recommendations", subtitle: "Personalized diet, exercise & supplement plans" },
    "/dashboard/settings": { title: "Settings", subtitle: "Manage your account and preferences" },
};

const nudges = [
    { icon: AlertTriangle, text: "Your cholesterol trend is rising. Consider reducing saturated fats.", color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: TrendingUp, text: "HbA1c improved by 0.3% since last report. Keep going!", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: CheckCircle2, text: "Time to retest your Vitamin D levels — 8 weeks have passed.", color: "text-blue-400", bg: "bg-blue-500/10" },
];

export default function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
    const pathname = usePathname();
    const [showNotifications, setShowNotifications] = useState(false);
    const page = pageTitles[pathname] || { title: "Dashboard", subtitle: "PCG Health Intelligence" };

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    return (
        <header className="h-[70px] bg-[#060810]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between px-6 md:px-8">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="md:hidden text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                    <Menu className="w-5 h-5" />
                </button>
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-bold text-white leading-tight truncate">{page.title}</h1>
                    <p className="text-[11px] text-white/40 hidden sm:block truncate">{greeting}, Arjun Sharma</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search reports or biomarkers..."
                        className="bg-white/5 border border-white/8 rounded-full py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/40 focus:bg-white/8 transition-all w-56 placeholder:text-white/25"
                    />
                </div>

                {/* Health Score Pill */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">Score: 74</span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative text-white/50 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/5"
                    >
                        <Bell className="w-4.5 h-4.5" size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full border border-[#060810]" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-11 w-80 bg-[#0B0F1A] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50">
                            <div className="px-4 py-3 border-b border-white/5">
                                <h4 className="text-sm font-bold text-white">Health Nudges</h4>
                                <p className="text-[11px] text-white/40">3 new recommendations</p>
                            </div>
                            <div className="p-2 space-y-1">
                                {nudges.map((nudge, i) => (
                                    <div key={i} className={clsx("flex items-start gap-3 p-3 rounded-xl", nudge.bg)}>
                                        <nudge.icon className={clsx("w-4 h-4 shrink-0 mt-0.5", nudge.color)} />
                                        <p className="text-xs text-white/70 leading-relaxed">{nudge.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-2 border-t border-white/5">
                                <button className="w-full text-xs text-white/40 hover:text-white/70 py-2 transition-colors">View all alerts</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Avatar */}
                <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-emerald-500/20">
                        AS
                    </div>
                    <ChevronDown className="w-3 h-3 text-white/30 group-hover:text-white/60" />
                </button>
            </div>
        </header>
    );
}
