"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminTopNav from "@/components/admin/TopNav";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    useEffect(() => { setSidebarOpen(false); }, [pathname]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-purple-500/30">
            <AdminSidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div 
                className="flex flex-col min-h-screen dynamic-sidebar-padding"
                style={{ "--sidebar-width": collapsed ? "4rem" : "16rem" } as React.CSSProperties}
            >
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)} />
                )}
                <AdminTopNav onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-screen-2xl mx-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
