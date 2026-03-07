"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, FileText, Lightbulb, TrendingUp,
    MessageSquare, Settings, LogOut, Sparkles, Apple, ChevronRight,
    ChevronLeft, PanelLeft,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
    { name: "Health Overview",   href: "/dashboard",              icon: LayoutDashboard },
    { name: "Upload Report",     href: "/dashboard/upload",       icon: FileText },
    { name: "AI Insights",       href: "/dashboard/insights",     icon: Lightbulb,  badge: "3" },
    { name: "Health Tracking",   href: "/dashboard/tracking",     icon: TrendingUp },
    { name: "AI Chat",           href: "/dashboard/chat",         icon: MessageSquare },
    { name: "Recommendations",   href: "/dashboard/recommendations", icon: Apple },
];

interface SidebarProps {
    isOpen?: boolean;
    setIsOpen?: (val: boolean) => void;
    collapsed?: boolean;
    setCollapsed?: (val: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen, collapsed, setCollapsed }: SidebarProps) {
    const pathname = usePathname();
    return (
        <aside 
            className={clsx(
                "h-screen flex flex-col bg-[#060810] border-r border-white/5 fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full",
                collapsed ? "w-16" : "w-64"
            )}
            style={{ width: collapsed ? "4rem" : "16rem" }}
        >
            {/* Logo / Toggle */}
            <div className={clsx("flex items-center border-b border-white/5 shrink-0", collapsed ? "p-3 justify-center" : "p-4 justify-between")}>
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_16px_rgba(52,211,153,0.4)]">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black text-white tracking-tight text-base"><span>PCG</span><span className="text-emerald-400">Health</span></span>
                    </Link>
                )}
                <button
                    onClick={() => { setCollapsed?.(!collapsed); setIsOpen?.(false); }}
                    className="p-1.5 rounded-lg hover:bg-white/8 text-white/40 hover:text-white transition-all"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Health Score Mini (only when expanded) */}
            {!collapsed && (
                <div className="mx-3 mt-3 p-3 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/8 relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full" />
                    <div className="flex items-center justify-between mb-1 relative z-10">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Health Score</span>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">Good</span>
                    </div>
                    <div className="flex items-end gap-1.5 relative z-10">
                        <span className="text-3xl font-black text-white">74</span>
                        <span className="text-xs text-white/30 mb-0.5">/100</span>
                    </div>
                    <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden relative z-10">
                        <div className="h-full w-[74%] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                    </div>
                </div>
            )}

            {/* Collapsed score dot */}
            {collapsed && (
                <div className="flex justify-center pt-3 shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center" title="Health Score: 74">
                        <span className="text-xs font-black text-emerald-400">74</span>
                    </div>
                </div>
            )}

            {/* Nav */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 min-h-0">
                {!collapsed && (
                    <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-2 px-2">Navigation</p>
                )}
                <nav className="space-y-0.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href}
                                title={collapsed ? item.name : undefined}
                                className={clsx(
                                    "flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                                    collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
                                    isActive
                                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/20"
                                        : "text-white/45 hover:text-white hover:bg-white/5 border border-transparent"
                                )}>
                                <Icon size={18} className={isActive ? "text-emerald-400 shrink-0" : "text-white/30 group-hover:text-white/60 shrink-0"} />
                                {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                                {!collapsed && (item as any).badge && (
                                    <span className="text-[10px] font-black bg-emerald-500 text-white min-w-[18px] px-1 h-[18px] rounded-full flex items-center justify-center">
                                        {(item as any).badge}
                                    </span>
                                )}
                                {collapsed && (item as any).badge && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom */}
            <div className={clsx("border-t border-white/5 py-2 px-2 space-y-0.5 shrink-0", collapsed && "flex flex-col items-center")}>
                <Link href="/dashboard/settings" title={collapsed ? "Settings" : undefined}
                    className={clsx("flex items-center gap-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all group",
                        collapsed ? "p-2.5 justify-center w-full" : "px-3 py-2.5")}>
                    <Settings size={16} className="text-white/25 group-hover:text-white/60 shrink-0" />
                    {!collapsed && "Settings"}
                </Link>
                <Link href="/auth" title={collapsed ? "Sign Out" : undefined}
                    className={clsx("flex items-center gap-3 rounded-xl text-sm text-rose-400/60 hover:text-rose-400 hover:bg-rose-400/10 transition-all group",
                        collapsed ? "p-2.5 justify-center w-full" : "px-3 py-2.5")}>
                    <LogOut size={16} className="text-rose-400/30 group-hover:text-rose-400 shrink-0" />
                    {!collapsed && "Sign Out"}
                </Link>
            </div>
        </aside>
    );
}
