"use client";

import { motion } from "framer-motion";

interface HealthScoreGaugeProps {
  score: number;
  maxScore?: number;
}

export const HealthScoreGauge = ({ score, maxScore = 100 }: HealthScoreGaugeProps) => {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 75) return "hsl(142, 71%, 45%)";
    if (percentage >= 50) return "hsl(45, 93%, 47%)";
    return "hsl(0, 72%, 51%)";
  };

  const getLabel = () => {
    if (percentage >= 75) return "Excellent";
    if (percentage >= 50) return "Moderate";
    return "Needs Attention";
  };

  return (
    <motion.div
      className="glass-card p-8 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">AI Health Score</h3>
      <div className="relative w-48 h-48">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="80" fill="none" stroke="hsl(220, 14%, 14%)" strokeWidth="8" />
          <motion.circle
            cx="90" cy="90" r="80" fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-5xl font-display font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground mt-1">/ {maxScore}</span>
        </div>
      </div>
      <motion.div
        className="mt-4 px-4 py-1.5 rounded-full text-xs font-semibold"
        style={{
          backgroundColor: `${getColor()}20`,
          color: getColor(),
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {getLabel()}
      </motion.div>
    </motion.div>
  );
};
