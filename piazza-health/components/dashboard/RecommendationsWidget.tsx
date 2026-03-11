"use client";

import { motion } from "framer-motion";
import { Apple, Dumbbell, Pill, CalendarCheck } from "lucide-react";

const recommendations = [
  {
    icon: Apple,
    title: "Diet Plan",
    desc: "Increase iron-rich foods: lentils, spinach, and fortified cereals. Reduce saturated fats.",
    color: "text-health-green",
    bg: "bg-health-green/10",
  },
  {
    icon: Dumbbell,
    title: "Exercise",
    desc: "30 min moderate cardio 5x/week. Add strength training 2x/week for metabolic health.",
    color: "text-health-blue",
    bg: "bg-health-blue/10",
  },
  {
    icon: Pill,
    title: "Supplements",
    desc: "Vitamin D3 2000 IU daily. Omega-3 1000mg daily for cholesterol management.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: CalendarCheck,
    title: "Retest Schedule",
    desc: "Lipid panel in 8 weeks. Vitamin D recheck in 12 weeks. HbA1c in 3 months.",
    color: "text-admin",
    bg: "bg-admin/10",
  },
];

export const RecommendationsWidget = () => (
  <motion.div
    className="glass-card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
  >
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Personalized Recommendations</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {recommendations.map((rec, i) => (
        <motion.div
          key={rec.title}
          className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/20 transition-all cursor-pointer group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
          whileHover={{ y: -2 }}
        >
          <div className={`w-9 h-9 rounded-lg ${rec.bg} flex items-center justify-center mb-3`}>
            <rec.icon className={`w-4 h-4 ${rec.color}`} />
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">{rec.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{rec.desc}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
