"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    User,
    Bell,
    Shield,
    Smartphone,
    Languages,
    Moon,
    Activity,
    Save,
    CheckCircle2
} from "lucide-react";

export default function DashboardSettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: "profile", label: "Profile Details", icon: User },
        { id: "ai", label: "AI Preferences", icon: Activity },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "integrations", label: "Integrations", icon: Smartphone },
        { id: "security", label: "Security", icon: Shield },
    ];

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Settings</h2>
                <p className="text-white/50">Manage your profile, AI preferences, and account security.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                        ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-inner"
                                        : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-orange-400" : "text-white/40"}`} />
                                {tab.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

                        {activeTab === "profile" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Personal Information</h3>
                                    <p className="text-sm text-white/50 mb-6">Update your personal details below.</p>

                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-orange-300 flex items-center justify-center text-3xl font-bold shadow-lg shadow-orange-500/20">
                                            JD
                                        </div>
                                        <div>
                                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors mb-2">
                                                Change Avatar
                                            </button>
                                            <p className="text-xs text-white/40">JPG, GIF or PNG. 1MB max.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70">First Name</label>
                                            <input type="text" defaultValue="John" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all placeholder:text-white/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/70">Last Name</label>
                                            <input type="text" defaultValue="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all placeholder:text-white/20" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-white/70">Email Address</label>
                                            <input type="email" defaultValue="john.doe@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "ai" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">AI Personalization</h3>
                                    <p className="text-sm text-white/50 mb-6">Customize how the AI analyzes your health data.</p>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                            <div>
                                                <h4 className="font-medium text-white">Aggressive Tracking</h4>
                                                <p className="text-sm text-white/50">Alert me for minor deviations in biomarkers.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                            <div>
                                                <h4 className="font-medium text-white">Focus Area</h4>
                                                <p className="text-sm text-white/50">Prioritize insights related to specific goals.</p>
                                            </div>
                                            <select className="bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50">
                                                <option>General Longevity</option>
                                                <option>Weight Management</option>
                                                <option>Cardiovascular Health</option>
                                                <option>Metabolic Optimization</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Notification Preferences</h3>
                                    <p className="text-sm text-white/50 mb-6">Control how and when we alert you.</p>

                                    <div className="space-y-4">
                                        {['Email Summaries', 'Push Alerts for Anomalies', 'Weekly Health Reports', 'New Feature Announcements'].map((setting, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                                <span className="text-white/80 text-sm">{setting}</span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked={idx < 2} />
                                                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "integrations" && (
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Device Integrations</h3>
                                    <p className="text-sm text-white/50 mb-6">Sync real-time data from your wearables.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between hover:border-orange-500/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shadow-inner">🍎</div>
                                                <div>
                                                    <h4 className="font-medium text-white text-sm">Apple Health</h4>
                                                    <p className="text-xs text-emerald-400">Connected</p>
                                                </div>
                                            </div>
                                            <button className="text-xs font-medium text-white/40 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all">
                                                Manage
                                            </button>
                                        </div>
                                        <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between hover:border-orange-500/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center shadow-inner text-white text-xl">F</div>
                                                <div>
                                                    <h4 className="font-medium text-white text-sm">Fitbit API</h4>
                                                    <p className="text-xs text-white/40">Not connected</p>
                                                </div>
                                            </div>
                                            <button className="text-xs font-medium text-black bg-white hover:bg-white/90 px-3 py-1.5 rounded-lg transition-all">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Footer inside the card */}
                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-end gap-4 relative z-10">
                            <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saved}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium text-black bg-orange-500 hover:bg-orange-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:opacity-80 disabled:cursor-not-allowed"
                            >
                                {saved ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Saved
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
