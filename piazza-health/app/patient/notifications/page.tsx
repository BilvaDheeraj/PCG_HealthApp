"use client";

import { motion } from "framer-motion";
import { Bell, AlertTriangle, CheckCircle, Calendar, TrendingUp, Info, Trash2 } from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  { id: 1, type: "alert", title: "Vitamin D Critically Low", desc: "Your Vitamin D is at 14 ng/mL. Immediate supplementation recommended.", time: "2 hours ago", read: false },
  { id: 2, type: "insight", title: "New AI Insight Available", desc: "Your latest CBC report has been analyzed with 3 new insights generated.", time: "5 hours ago", read: false },
  { id: 3, type: "reminder", title: "Upcoming Retest: Lipid Panel", desc: "Your scheduled lipid panel retest is on Mar 22, 2026.", time: "1 day ago", read: false },
  { id: 4, type: "trend", title: "HbA1c Trending Up", desc: "Your HbA1c has increased by 5% over the last 3 months. Consider dietary changes.", time: "2 days ago", read: true },
  { id: 5, type: "info", title: "Report Successfully Processed", desc: "Your CBC report from Apollo Diagnostics has been fully analyzed.", time: "3 days ago", read: true },
  { id: 6, type: "reminder", title: "Time to Retest Vitamin B12", desc: "It's been 6 weeks since your last B12 test. Schedule a retest.", time: "5 days ago", read: true },
];

const typeIcons: Record<string, React.ReactNode> = {
  alert: <AlertTriangle className="w-5 h-5 text-health-red" />,
  insight: <CheckCircle className="w-5 h-5 text-primary" />,
  reminder: <Calendar className="w-5 h-5 text-health-blue" />,
  trend: <TrendingUp className="w-5 h-5 text-health-yellow" />,
  info: <Info className="w-5 h-5 text-muted-foreground" />,
};

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" /> Notifications
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all as read</button>
        )}
      </motion.div>

      <div className="space-y-3">
        {notifications.map((notif, i) => (
          <motion.div
            key={notif.id}
            className={`glass-card p-5 flex items-start gap-4 transition-all ${!notif.read ? "border-primary/20" : "opacity-70"}`}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.05 }}
          >
            <div className="flex-shrink-0 mt-0.5">{typeIcons[notif.type]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className={`text-sm font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>{notif.title}</h3>
                <button onClick={() => dismiss(notif.id)} className="p-1 rounded hover:bg-secondary transition-colors flex-shrink-0">
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{notif.desc}</p>
              <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
            </div>
            {!notif.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
          </motion.div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-16">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No notifications</p>
        </div>
      )}
    </div>
  );
};

export default PatientNotifications;
