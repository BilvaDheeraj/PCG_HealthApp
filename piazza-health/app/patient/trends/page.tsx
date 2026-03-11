"use client";

import { BiomarkerCharts } from "@/components/dashboard/BiomarkerCharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const trendSummary = [
  { name: "Fasting Glucose", current: "98 mg/dL", change: "+3%", trend: "up", status: "normal" },
  { name: "HbA1c", current: "6.2%", change: "+5%", trend: "up", status: "elevated" },
  { name: "Total Cholesterol", current: "195 mg/dL", change: "-2%", trend: "down", status: "normal" },
  { name: "LDL", current: "118 mg/dL", change: "-4%", trend: "down", status: "normal" },
  { name: "HDL", current: "52 mg/dL", change: "+3%", trend: "up", status: "normal" },
  { name: "Hemoglobin", current: "14.2 g/dL", change: "0%", trend: "stable", status: "normal" },
  { name: "Vitamin D", current: "14 ng/mL", change: "-12%", trend: "down", status: "low" },
  { name: "Vitamin B12", current: "180 pg/mL", change: "-8%", trend: "down", status: "low" },
];

const statusColor: Record<string, string> = {
  normal: "text-health-green",
  elevated: "text-health-yellow",
  low: "text-health-red",
};

const PatientTrends = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-foreground">Biomarker Trends</h1>
        <p className="text-muted-foreground text-sm mt-1">Track how your key health indicators change over time</p>
      </motion.div>

      <BiomarkerCharts />

      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Trend Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Biomarker</th>
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Current Value</th>
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Change</th>
                <th className="text-left py-2 text-xs text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {trendSummary.map((item, i) => (
                <motion.tr
                  key={item.name}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                >
                  <td className="py-3 text-foreground font-medium">{item.name}</td>
                  <td className="py-3 text-foreground">{item.current}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      {item.trend === "up" ? <TrendingUp className="w-3.5 h-3.5 text-health-yellow" /> :
                       item.trend === "down" ? <TrendingDown className="w-3.5 h-3.5 text-health-blue" /> :
                       <Minus className="w-3.5 h-3.5 text-muted-foreground" />}
                      <span className="text-muted-foreground">{item.change}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`text-xs font-semibold capitalize ${statusColor[item.status]}`}>{item.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientTrends;
