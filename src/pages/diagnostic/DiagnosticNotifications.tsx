import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, CheckCircle, Calendar, TrendingUp, Info, Trash2, Loader2, Upload } from "lucide-react";
import { useState, useEffect } from "react";

const typeIcons: Record<string, JSX.Element> = {
  alert: <AlertTriangle className="w-5 h-5 text-health-red" />,
  insight: <CheckCircle className="w-5 h-5 text-primary" />,
  reminder: <Calendar className="w-5 h-5 text-health-blue" />,
  trend: <TrendingUp className="w-5 h-5 text-health-yellow" />,
  info: <Info className="w-5 h-5 text-muted-foreground" />,
  report: <Upload className="w-5 h-5 text-health-blue" />,
  system: <Info className="w-5 h-5 text-diagnostic" />,
};

const DiagnosticNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/diagnostic/notifications")
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout role="diagnostic">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Bell className="w-6 h-6 text-diagnostic" /> Notifications
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{unreadCount} unread notifications</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-diagnostic hover:underline">Mark all as read</button>
          )}
        </motion.div>

        {loading ? (
             <div className="flex justify-center py-12">
               <Loader2 className="w-8 h-8 animate-spin text-diagnostic" />
             </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif, i) => (
            <motion.div
              key={notif.id}
              className={`glass-card p-5 flex items-start gap-4 transition-all ${!notif.read ? "border-diagnostic/20 bg-diagnostic/5" : "opacity-70"}`}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.05 }}
            >
              <div className="flex-shrink-0 mt-0.5">{typeIcons[notif.type] || typeIcons.info}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>{notif.title}</h3>
                  <button onClick={() => dismiss(notif.id)} className="p-1 rounded hover:bg-secondary transition-colors flex-shrink-0">
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{notif.message || notif.desc}</p>
                <p className="text-xs text-muted-foreground mt-2">{notif.timestamp || notif.time}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full bg-diagnostic flex-shrink-0 mt-2" />}
            </motion.div>
          ))}
        </div>
        )}

        {notifications.length === 0 && !loading && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticNotifications;
