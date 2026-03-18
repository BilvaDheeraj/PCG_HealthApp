import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  accentClass?: string;
  delay?: number;
}

export const StatCard = ({ title, value, subtitle, icon, trend, accentClass = "gradient-patient", delay = 0 }: StatCardProps) => (
  <motion.div
    className="glass-card-hover p-5 relative overflow-hidden group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${accentClass} flex items-center justify-center`}>
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.positive ? "bg-health-green/10 text-health-green" : "bg-health-red/10 text-health-red"}`}>
          {trend.positive ? "↑" : "↓"} {trend.value}
        </span>
      )}
    </div>
    <p className="text-2xl font-display font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground mt-0.5">{title}</p>
    {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
  </motion.div>
);
