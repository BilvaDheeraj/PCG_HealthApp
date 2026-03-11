"use client";

import { HealthScoreGauge } from "@/components/dashboard/HealthScoreGauge";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";

const categories = [
  { name: "Cardiovascular", score: 82, trend: "up", detail: "Cholesterol within range, BP normal" },
  { name: "Metabolic", score: 65, trend: "down", detail: "HbA1c slightly elevated at 6.2%" },
  { name: "Nutritional", score: 58, trend: "down", detail: "Vitamin D and B12 below optimal" },
  { name: "Hematological", score: 88, trend: "stable", detail: "Hemoglobin and RBC count normal" },
  { name: "Hepatic", score: 91, trend: "up", detail: "Liver enzymes within normal range" },
  { name: "Thyroid", score: 76, trend: "stable", detail: "TSH slightly above optimal" },
];

const history = [
  { date: "Mar 2026", score: 74 },
  { date: "Jan 2026", score: 71 },
  { date: "Nov 2025", score: 68 },
  { date: "Sep 2025", score: 72 },
  { date: "Jul 2025", score: 65 },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-health-green";
  if (score >= 60) return "text-health-yellow";
  return "text-health-red";
};

const getTrendIcon = (trend: string) => {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-health-green" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-health-red" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const PatientHealthScore = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-foreground">Health Score</h1>
        <p className="text-muted-foreground text-sm mt-1">Your comprehensive AI-generated health assessment</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <HealthScoreGauge score={74} />

        <motion.div className="glass-card p-6 lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Category Breakdown</h3>
          <div className="space-y-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/20 transition-all"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(cat.trend)}
                      <span className={`text-lg font-bold ${getScoreColor(cat.score)}`}>{cat.score}</span>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${cat.score >= 80 ? "bg-health-green" : cat.score >= 60 ? "bg-health-yellow" : "bg-health-red"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.score}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.06 }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{cat.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Score History</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {history.map((entry, i) => (
            <motion.div
              key={entry.date}
              className="text-center p-4 rounded-lg bg-secondary/30 border border-border/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <p className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>{entry.score}</p>
              <p className="text-xs text-muted-foreground mt-1">{entry.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">How is this calculated?</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your Health Score is computed by our clinical AI engine analyzing over 40 biomarkers from your uploaded reports.
          Each category is weighted based on clinical significance and normalized against age and gender-specific reference ranges.
          Trends account for longitudinal changes across your report history.
        </p>
      </motion.div>
    </div>
  );
};

export default PatientHealthScore;
