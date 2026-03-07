"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminTopNav from "@/components/admin/TopNav";
import { usePathname } from "next/navigation";

export default function AdminLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar on navigation route change (mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className="md:ml-64 flex flex-col min-h-screen relative">
                {/* Mobile overlay backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <AdminTopNav onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full relative z-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
