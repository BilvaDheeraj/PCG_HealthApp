"use client";

import { motion } from "framer-motion";
import { Heart, Droplets, Pill, Shield } from "lucide-react";

const risks = [
  { label: "Cardiovascular", level: "low", icon: Heart, color: "health-green" },
  { label: "Diabetes", level: "moderate", icon: Droplets, color: "health-yellow" },
  { label: "Vitamin Deficiency", level: "high", icon: Pill, color: "health-red" },
  { label: "Anemia", level: "low", icon: Shield, color: "health-green" },
];

const levelColors: Record<string, string> = {
  low: "bg-health-green/10 text-health-green border-health-green/20",
  moderate: "bg-health-yellow/10 text-health-yellow border-health-yellow/20",
  high: "bg-health-red/10 text-health-red border-health-red/20",
};

export const RiskBadges = () => (
  <motion.div
    className="glass-card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.2 }}
  >
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Risk Assessment</h3>
    <div className="grid grid-cols-2 gap-3">
      {risks.map((risk, i) => (
        <motion.div
          key={risk.label}
          className={`flex items-center gap-3 p-3 rounded-lg border ${levelColors[risk.level]}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        >
          <risk.icon className="w-4 h-4 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold">{risk.label}</p>
            <p className="text-[10px] uppercase tracking-wider opacity-70">{risk.level} risk</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
