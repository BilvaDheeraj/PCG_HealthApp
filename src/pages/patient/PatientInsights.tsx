import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { motion } from "framer-motion";
import { CheckCircle, Info, AlertTriangle, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const severityStyles: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
  high: { bg: "bg-health-red/10 border-health-red/20", text: "text-health-red", icon: <AlertTriangle className="w-5 h-5 text-health-red" /> },
  moderate: { bg: "bg-health-yellow/10 border-health-yellow/20", text: "text-health-yellow", icon: <Info className="w-5 h-5 text-health-yellow" /> },
  low: { bg: "bg-health-green/10 border-health-green/20", text: "text-health-green", icon: <CheckCircle className="w-5 h-5 text-health-green" /> },
};

const PatientInsights = () => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/patient/insights")
      .then(res => res.json())
      .then(data => {
        setInsights(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="patient">
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="patient">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> AI Health Insights
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Personalized insights generated from your biomarker analysis</p>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mt-8">Active Alerts</h2>
          {insights?.active_alerts?.map((alert: any, i: number) => {
            const style = severityStyles[alert.type || 'moderate'];
            return (
              <motion.div
                key={alert.id}
                className={`glass-card p-6 border ${style.bg} transition-all`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{style.icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-base font-semibold text-foreground">{alert.biomarker}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider ${style.text} ${style.bg}`}>
                          {alert.type} risk
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{alert.message}</p>
                    <div className="flex justify-between items-center bg-secondary/30 p-3 rounded-lg mt-4 text-sm">
                        <div className="text-muted-foreground">Value: <span className="text-foreground font-semibold">{alert.value}</span></div>
                        <div className="text-muted-foreground">Target: <span className="text-foreground font-semibold">{alert.target}</span></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <h2 className="text-xl font-semibold text-foreground mt-8">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights?.recommendations?.map((rec: any, i: number) => (
                   <motion.div
                   key={rec.id}
                   className={`glass-card p-6 border transition-all hover:border-primary/20`}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 + i * 0.1 }}
                 >
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-base font-semibold text-foreground">{rec.title}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-semibold tracking-wider">
                            {rec.category}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                 </motion.div>
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientInsights;
