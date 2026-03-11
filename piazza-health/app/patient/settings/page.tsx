"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Palette, Save } from "lucide-react";
import { useState } from "react";

const PatientSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" /> Settings
        </h1>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <motion.div className="glass-card p-6 space-y-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: "John Doe", type: "text" },
              { label: "Email", value: "john@example.com", type: "email" },
              { label: "Phone", value: "+91 98765 43210", type: "tel" },
              { label: "Date of Birth", value: "1990-06-15", type: "date" },
              { label: "Gender", value: "Male", type: "text" },
              { label: "Blood Group", value: "B+", type: "text" },
            ].map(field => (
              <div key={field.label}>
                <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-patient text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </motion.div>
      )}

      {activeTab === "notifications" && (
        <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notification Preferences</h3>
          {["Health Alerts", "Report Processed", "Retest Reminders", "AI Insights", "Promotional Updates"].map(item => (
            <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <span className="text-sm text-foreground">{item}</span>
              <button className="w-10 h-6 rounded-full bg-primary/20 relative transition-colors">
                <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-primary transition-transform" />
              </button>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "privacy" && (
        <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Privacy & Security</h3>
          {[
            { title: "Two-Factor Authentication", desc: "Add an extra layer of security to your account" },
            { title: "Data Sharing", desc: "Control who can access your health reports" },
            { title: "Download My Data", desc: "Export all your health data and reports" },
            { title: "Delete Account", desc: "Permanently delete your account and all data" },
          ].map(item => (
            <div key={item.title} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-secondary text-xs text-foreground font-medium hover:bg-secondary/70 transition-colors">
                Manage
              </button>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "preferences" && (
        <motion.div className="glass-card p-6 space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">App Preferences</h3>
          {["Language: English", "Units: Metric", "Date Format: DD/MM/YYYY", "Time Zone: IST (UTC+5:30)"].map(item => (
            <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <span className="text-sm text-foreground">{item}</span>
              <button className="text-xs text-primary hover:underline">Change</button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PatientSettings;
