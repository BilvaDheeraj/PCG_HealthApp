"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, FileCheck2, Brain, BarChart3,
    Users, Settings, LogOut, Shield, ChevronLeft, ChevronRight,
    AlertTriangle, Building2, CreditCard
} from "lucide-react";
import clsx from "clsx";

const navItems = [
    { name: "Command Center",    href: "/admin",               icon: LayoutDashboard, badge: null },
    { name: "Report Review",     href: "/admin/reports",       icon: FileCheck2,      badge: "3" },
    { name: "AI Validation",     href: "/admin/ai-validation", icon: Brain,           badge: "8" },
    { name: "Analytics",         href: "/admin/analytics",     icon: BarChart3,       badge: null },
    { name: "Center Management", href: "/admin/centers",       icon: Building2,       badge: null },
    { name: "User Management",   href: "/admin/users",         icon: Users,           badge: null },
    { name: "Billing",           href: "/admin/billing",       icon: CreditCard,      badge: null },
];

interface SidebarProps {
    isOpen?: boolean;
    setIsOpen?: (v: boolean) => void;
    collapsed?: boolean;
    setCollapsed?: (v: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen, collapsed, setCollapsed }: SidebarProps) {
    const pathname = usePathname();
    return (
        <aside 
            className={clsx(
                "h-screen flex flex-col bg-slate-950 border-r border-slate-800 fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full",
                collapsed ? "w-16" : "w-64"
            )}
            style={{ width: collapsed ? "4rem" : "16rem" }}
        >
            {/* Logo + Toggle */}
            <div className={clsx("flex items-center border-b border-slate-800 shrink-0", collapsed ? "p-3 justify-center" : "p-4 justify-between")}>
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_14px_rgba(168,85,247,0.35)] shrink-0">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black text-white text-base truncate">PCG<span className="text-purple-400"> Admin</span></span>
                    </Link>
                )}
                <button
                    onClick={() => { setCollapsed?.(!collapsed); setIsOpen?.(false); }}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-all shrink-0"
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Alert widget (expanded) */}
            {!collapsed && (
                <div className="mx-3 mt-3 p-3 rounded-xl bg-rose-500/[0.08] border border-rose-500/15 flex items-center gap-2 shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <p className="text-[10px] text-rose-300/80 font-medium">3 suspicious reports flagged</p>
                </div>
            )}

            {/* Alert dot (collapsed) */}
            {collapsed && (
                <div className="flex justify-center pt-3 shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center relative" title="3 suspicious reports flagged">
                        <AlertTriangle size={14} className="text-rose-400" />
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center">3</span>
                    </div>
                </div>
            )}

            {/* Nav */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 min-h-0">
                {!collapsed && (
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-2">Navigation</p>
                )}
                <nav className="space-y-0.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.href === "/admin"
                            ? pathname === "/admin"
                            : pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href}
                                title={collapsed ? item.name : undefined}
                                className={clsx(
                                    "flex items-center gap-3 rounded-xl text-sm font-medium transition-all group relative border",
                                    collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
                                    isActive
                                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/60 border-transparent"
                                )}>
                                <Icon size={17} className={isActive ? "text-purple-400 shrink-0" : "text-slate-500 group-hover:text-slate-300 shrink-0"} />
                                {!collapsed && <span className="truncate flex-1">{item.name}</span>}
                                {!collapsed && item.badge && (
                                    <span className="text-[10px] font-black bg-rose-500 text-white min-w-[18px] px-1 h-[18px] rounded-full flex items-center justify-center">{item.badge}</span>
                                )}
                                {collapsed && item.badge && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom */}
            <div className={clsx("border-t border-slate-800 py-2 px-2 space-y-0.5 shrink-0", collapsed && "flex flex-col items-center")}>
                <Link href="/admin/settings" title={collapsed ? "System Settings" : undefined}
                    className={clsx("flex items-center gap-3 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all group",
                        collapsed ? "p-2.5 justify-center w-full" : "px-3 py-2.5")}>
                    <Settings size={16} className="text-slate-500 group-hover:text-slate-300 shrink-0" />
                    {!collapsed && "System Settings"}
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
