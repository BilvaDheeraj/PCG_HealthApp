"use client";

import { ReactNode, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopNav } from "./DashboardTopNav";
import { motion } from "framer-motion";

export type DashboardRole = "patient" | "diagnostic" | "admin";

interface DashboardLayoutProps {
  children: ReactNode;
  role: DashboardRole;
}

export const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const glowClass = role === "patient" ? "bg-glow-orange" : role === "diagnostic" ? "bg-glow-blue" : "bg-glow-purple";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <DashboardSidebar
        role={role}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopNav role={role} onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 overflow-y-auto scrollbar-thin relative`}>
          <div className={`absolute inset-0 ${glowClass} pointer-events-none`} />
          <motion.div
            className="relative z-10 p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
