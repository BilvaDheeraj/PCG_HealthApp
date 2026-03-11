import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Settings, Shield, Users, Bell, Database, Save } from "lucide-react";
import { useState } from "react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("platform");
  const tabs = [
    { id: "platform", label: "Platform", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "roles", label: "Roles & Permissions", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "system", label: "System", icon: Database },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Settings className="w-6 h-6 text-admin" /> Admin Settings
          </h1>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-admin/10 text-admin border border-admin/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        {activeTab === "platform" && (
          <motion.div className="glass-card p-6 space-y-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Platform Configuration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Platform Name", value: "HealthAI" },
                { label: "Admin Email", value: "admin@healthai.com" },
                { label: "Support Email", value: "support@healthai.com" },
                { label: "Max Upload Size (MB)", value: "20" },
              ].map(field => (
                <div key={field.label}>
                  <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                  <input type="text" defaultValue={field.value}
                    className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground outline-none focus:border-admin/50 transition-colors" />
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-admin text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Security Settings</h3>
            {[
              { title: "Enforce 2FA for all users", desc: "Require two-factor authentication" },
              { title: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity" },
              { title: "IP Whitelisting", desc: "Restrict admin access to specific IPs" },
              { title: "Audit Log Retention", desc: "Keep audit logs for 90 days" },
            ].map(item => (
              <div key={item.title} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <button className="w-10 h-6 rounded-full bg-admin/20 relative"><span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-admin" /></button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "roles" && (
          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Roles & Permissions</h3>
            {[
              { role: "Super Admin", perms: "Full access to all features", users: 2 },
              { role: "Doctor / Reviewer", perms: "Review reports, validate insights", users: 15 },
              { role: "Diagnostic Admin", perms: "Manage center, upload reports", users: 134 },
              { role: "Patient", perms: "View reports, chat, insights", users: 5691 },
            ].map(item => (
              <div key={item.role} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.role}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.perms}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{item.users} users</span>
                  <button className="px-3 py-1.5 rounded-lg bg-secondary text-xs text-foreground font-medium hover:bg-secondary/70 transition-colors">Edit</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "notifications" && (
          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">System Notifications</h3>
            {["New Center Registration", "Flagged Reports", "System Errors", "User Complaints", "Revenue Reports"].map(item => (
              <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <span className="text-sm text-foreground">{item}</span>
                <button className="w-10 h-6 rounded-full bg-admin/20 relative"><span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-admin" /></button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "system" && (
          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">System Information</h3>
            {[
              { label: "Database", value: "PostgreSQL 16.1 — Healthy" },
              { label: "Vector DB", value: "PGVector — Active" },
              { label: "Storage Used", value: "48.2 GB / 100 GB" },
              { label: "API Uptime", value: "99.97% (30 days)" },
              { label: "Last Backup", value: "Mar 08, 2026 — 02:00 AM" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm text-foreground font-medium">{item.value}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
