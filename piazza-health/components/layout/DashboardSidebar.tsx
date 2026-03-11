"use client";

import { DashboardRole } from "./DashboardLayout";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, Activity, MessageSquare, Heart,
  Upload, Calendar, Users, Settings, Shield, BarChart3,
  ClipboardCheck, Building2, UserCog, TrendingUp, Bell,
  ChevronLeft, ChevronRight, LogOut, Sparkles
} from "lucide-react";

interface SidebarProps {
  role: DashboardRole;
  collapsed: boolean;
  onToggle: () => void;
}

const patientMenu = [
  { label: "Overview", icon: LayoutDashboard, path: "/patient" },
  { label: "Health Score", icon: Heart, path: "/patient/health-score" },
  { label: "Reports", icon: FileText, path: "/patient/reports" },
  { label: "Upload Report", icon: Upload, path: "/patient/upload" },
  { label: "Insights", icon: Sparkles, path: "/patient/insights" },
  { label: "Trends", icon: TrendingUp, path: "/patient/trends" },
  { label: "AI Chat", icon: MessageSquare, path: "/patient/chat" },
  { label: "Notifications", icon: Bell, path: "/patient/notifications" },
  { label: "Settings", icon: Settings, path: "/patient/settings" },
];

const diagnosticMenu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/diagnostic" },
  { label: "Bookings", icon: Calendar, path: "/diagnostic/bookings" },
  { label: "Reports", icon: FileText, path: "/diagnostic/reports" },
  { label: "Upload Report", icon: Upload, path: "/diagnostic/upload" },
  { label: "Patients", icon: Users, path: "/diagnostic/patients" },
  { label: "Analytics", icon: BarChart3, path: "/diagnostic/analytics" },
  { label: "Settings", icon: Settings, path: "/diagnostic/settings" },
];

const adminMenu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Report Review", icon: ClipboardCheck, path: "/admin/reports" },
  { label: "AI Validation", icon: Shield, path: "/admin/validation" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Users", icon: UserCog, path: "/admin/users" },
  { label: "Centers", icon: Building2, path: "/admin/centers" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

const menuMap: Record<DashboardRole, typeof patientMenu> = {
  patient: patientMenu,
  diagnostic: diagnosticMenu,
  admin: adminMenu,
};

const roleLabels: Record<DashboardRole, string> = {
  patient: "Patient Portal",
  diagnostic: "Diagnostic Center",
  admin: "Admin Panel",
};

export const DashboardSidebar = ({ role, collapsed, onToggle }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const menu = menuMap[role];

  const accentClass = role === "patient" ? "gradient-patient" : role === "diagnostic" ? "gradient-diagnostic" : "gradient-admin";
  const textGradient = role === "patient" ? "text-gradient-patient" : role === "diagnostic" ? "text-gradient-diagnostic" : "text-gradient-admin";

  return (
    <motion.aside
      className="flex flex-col h-full bg-sidebar border-r border-sidebar-border relative z-20"
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className={`w-9 h-9 rounded-lg ${accentClass} flex items-center justify-center flex-shrink-0`}>
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-display font-bold text-foreground text-lg">Health</span>
            <span className={`font-display font-bold text-lg ${textGradient}`}>AI</span>
          </motion.div>
        )}
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <motion.div
          className="px-4 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
            {roleLabels[role]}
          </span>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2 space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
                ${isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId={`sidebar-indicator-${role}`}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full ${accentClass}`}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Switch Portal</span>}
        </button>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
};
