"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNav from "@/components/dashboard/TopNav";
import { usePathname } from "next/navigation";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    // Close mobile sidebar on route change
    useEffect(() => { setSidebarOpen(false); }, [pathname]);

    return (
        <div className="min-h-screen bg-[#060810] text-white selection:bg-emerald-500/30">
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <div 
                className="flex flex-col min-h-screen dynamic-sidebar-padding"
                style={{ "--sidebar-width": collapsed ? "4rem" : "16rem" } as React.CSSProperties}
            >
                {/* Mobile backdrop */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)} />
                )}

                <TopNav onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-screen-xl mx-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
