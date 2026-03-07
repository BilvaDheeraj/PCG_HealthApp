"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Calendar, UploadCloud, Users,
    Settings, LogOut, TestTube2, ChevronLeft, ChevronRight, Globe
} from "lucide-react";
import clsx from "clsx";

const navItems = [
    { name: "Analytics",       href: "/center",          icon: LayoutDashboard, badge: null },
    { name: "Bookings",        href: "/center/bookings", icon: Calendar,        badge: "12" },
    { name: "Upload Reports",  href: "/center/upload",   icon: UploadCloud,     badge: null },
    { name: "Patient Records", href: "/center/patients", icon: Users,           badge: null },
    { name: "API Integration", href: "/center/api",      icon: Globe,           badge: null },
];

interface SidebarProps {
    isOpen?: boolean;
    setIsOpen?: (v: boolean) => void;
    collapsed?: boolean;
    setCollapsed?: (v: boolean) => void;
}

export default function CenterSidebar({ isOpen, setIsOpen, collapsed, setCollapsed }: SidebarProps) {
    const pathname = usePathname();
    return (
        <aside 
            className={clsx(
                "h-screen flex flex-col bg-[#060A14] border-r border-white/5 fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full",
                collapsed ? "w-16" : "w-64"
            )}
            style={{ width: collapsed ? "4rem" : "16rem" }}
        >
            {/* Logo + Toggle */}
            <div className={clsx("flex items-center border-b border-white/5 shrink-0", collapsed ? "p-3 justify-center" : "p-4 justify-between")}>
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_14px_rgba(34,211,238,0.35)] shrink-0">
                            <TestTube2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black text-white text-sm leading-tight truncate">
                            Apollo<span className="text-cyan-400"> Diagnostics</span>
                        </span>
                    </Link>
                )}
                <button
                    onClick={() => { setCollapsed?.(!collapsed); setIsOpen?.(false); }}
                    className="p-1.5 rounded-lg hover:bg-white/8 text-white/40 hover:text-white transition-all shrink-0"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Today stats (expanded only) */}
            {!collapsed && (
                <div className="mx-3 mt-3 p-3 rounded-2xl bg-white/[0.03] border border-white/8 shrink-0">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Today's Overview</p>
                    <div className="grid grid-cols-3 gap-1">
                        {[{ label: "Bookings", val: "18" }, { label: "Pending", val: "5" }, { label: "Done", val: "13" }].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className={`text-base font-black ${i === 1 ? "text-amber-400" : i === 2 ? "text-emerald-400" : "text-white"}`}>{s.val}</div>
                                <div className="text-[8px] text-white/25 uppercase tracking-wider">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Today dot (collapsed) */}
            {collapsed && (
                <div className="flex justify-center pt-3 shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center" title="Today: 18 bookings">
                        <span className="text-xs font-black text-cyan-400">18</span>
                    </div>
                </div>
            )}

            {/* Nav */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 min-h-0">
                {!collapsed && (
                    <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-2 px-2">Menu</p>
                )}
                <nav className="space-y-0.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href === "/center"
                            ? pathname === "/center"
                            : pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href}
                                title={collapsed ? item.name : undefined}
                                className={clsx(
                                    "flex items-center gap-3 rounded-xl text-sm font-medium transition-all group relative",
                                    collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
                                    isActive
                                        ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/20"
                                        : "text-white/45 hover:text-white hover:bg-white/5 border border-transparent"
                                )}>
                                <Icon size={18} className={isActive ? "text-cyan-400 shrink-0" : "text-white/30 group-hover:text-white/60 shrink-0"} />
                                {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                                {!collapsed && item.badge && (
                                    <span className="text-[10px] font-black bg-cyan-500 text-white min-w-[18px] px-1 h-[18px] rounded-full flex items-center justify-center">{item.badge}</span>
                                )}
                                {collapsed && item.badge && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom */}
            <div className={clsx("border-t border-white/5 py-2 px-2 space-y-0.5 shrink-0", collapsed && "flex flex-col items-center")}>
                <Link href="/center/settings" title={collapsed ? "Settings" : undefined}
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
