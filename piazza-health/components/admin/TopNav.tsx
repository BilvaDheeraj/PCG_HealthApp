"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Menu, DatabaseZap } from "lucide-react";

export default function AdminTopNav({ onMenuClick }: { onMenuClick?: () => void }) {
    const pathname = usePathname();

    // Format the title
    const title = pathname === "/admin"
        ? "System Overview"
        : pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Dashboard";

    return (
        <header className="h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 flex items-center justify-between px-6 md:px-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden text-slate-400 hover:text-white transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-bold text-white mb-0.5 flex items-center gap-2 truncate">
                        {title}
                        <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-blue-500/20 hidden sm:inline-block shrink-0">LIVE</span>
                    </h1>
                    <p className="text-xs text-slate-400 hidden sm:flex items-center gap-1 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                        All systems operational
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative hidden lg:block">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search users, reports..."
                        className="bg-slate-950/50 border border-slate-800 rounded-md py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all w-64 placeholder:text-slate-600 shadow-inner"
                    />
                </div>

                <button className="relative text-slate-400 hover:text-white transition-colors p-2 rounded-md hover:bg-slate-800">
                    <DatabaseZap className="w-5 h-5" />
                </button>

                <button className="relative text-slate-400 hover:text-white transition-colors p-2 rounded-md hover:bg-slate-800">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900" />
                </button>

                <div className="h-9 w-9 rounded-md border border-slate-700 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-colors bg-gradient-to-br from-slate-800 to-slate-900 shadow-sm flex items-center justify-center">
                    <span className="font-bold text-xs text-white">SA</span>
                </div>
            </div>
        </header>
    );
}
