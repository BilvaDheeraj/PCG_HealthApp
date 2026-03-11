import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Settings, Building2, Users, Bell, Shield, Save } from "lucide-react";
import { useState } from "react";

const DiagnosticSettings = () => {
  const [activeTab, setActiveTab] = useState("center");
  const tabs = [
    { id: "center", label: "Center Profile", icon: Building2 },
    { id: "staff", label: "Staff", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API & Integration", icon: Shield },
  ];

  return (
    <DashboardLayout role="diagnostic">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Settings className="w-6 h-6 text-diagnostic" /> Settings
          </h1>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-diagnostic/10 text-diagnostic border border-diagnostic/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        {activeTab === "center" && (
          <motion.div className="glass-card p-6 space-y-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Center Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Center Name", value: "LifeCare Diagnostics" },
                { label: "License Number", value: "DL-2024-MH-1234" },
                { label: "Address", value: "123 Health Street, Mumbai" },
                { label: "Contact Phone", value: "+91 22 1234 5678" },
                { label: "Email", value: "admin@lifecare.com" },
                { label: "Operating Hours", value: "7:00 AM - 9:00 PM" },
              ].map(field => (
                <div key={field.label}>
                  <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                  <input type="text" defaultValue={field.value}
                    className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground outline-none focus:border-diagnostic/50 transition-colors" />
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-diagnostic text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </motion.div>
        )}

        {activeTab === "staff" && (
          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Staff Members</h3>
            {["Dr. Meera Joshi (Pathologist)", "Rahul Verma (Lab Technician)", "Sneha Pillai (Receptionist)", "Amit Kumar (Lab Technician)"].map(staff => (
              <div key={staff} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                <span className="text-sm text-foreground">{staff}</span>
                <button className="px-3 py-1.5 rounded-lg bg-secondary text-xs text-foreground font-medium hover:bg-secondary/70 transition-colors">Edit</button>
              </div>
            ))}
            <button className="text-sm text-diagnostic hover:underline">+ Add Staff Member</button>
          </motion.div>
        )}

        {activeTab === "notifications" && (
          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notification Preferences</h3>
            {["New Booking Alerts", "Report Processing Complete", "Payment Received", "System Updates"].map(item => (
              <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <span className="text-sm text-foreground">{item}</span>
                <button className="w-10 h-6 rounded-full bg-diagnostic/20 relative"><span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-diagnostic" /></button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "api" && (
          <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">API Configuration</h3>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">API Key</p>
              <div className="flex items-center gap-2">
                <code className="text-sm text-foreground bg-secondary px-3 py-1.5 rounded flex-1 font-mono">hk_live_••••••••••••••••</code>
                <button className="px-3 py-1.5 rounded-lg bg-secondary text-xs text-foreground font-medium hover:bg-secondary/70 transition-colors">Reveal</button>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Webhook URL</p>
              <input type="text" defaultValue="https://your-api.com/webhook"
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground outline-none focus:border-diagnostic/50 transition-colors font-mono" />
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticSettings;
