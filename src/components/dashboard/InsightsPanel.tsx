import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const insights = [
  {
    title: "Vitamin D Deficiency Detected",
    desc: "Your Vitamin D level is 14 ng/mL, below the recommended 30 ng/mL. Consider sunlight exposure and supplementation.",
    severity: "high",
    category: "Nutritional",
  },
  {
    title: "Glucose Levels Improving",
    desc: "Your fasting glucose has dropped from 118 to 102 mg/dL over the last 3 months. Keep up the good work!",
    severity: "positive",
    category: "Metabolic",
  },
  {
    title: "LDL Cholesterol Elevated",
    desc: "LDL at 165 mg/dL exceeds the optimal range. Consider dietary changes and consult your physician.",
    severity: "moderate",
    category: "Cardiovascular",
  },
  {
    title: "Hemoglobin Within Range",
    desc: "Your hemoglobin at 14.2 g/dL is within the healthy range. No action needed.",
    severity: "positive",
    category: "Blood Health",
  },
];

const severityStyles: Record<string, string> = {
  high: "border-health-red/30 bg-health-red/5",
  moderate: "border-health-yellow/30 bg-health-yellow/5",
  positive: "border-health-green/30 bg-health-green/5",
};

const severityBadge: Record<string, string> = {
  high: "bg-health-red/10 text-health-red",
  moderate: "bg-health-yellow/10 text-health-yellow",
  positive: "bg-health-green/10 text-health-green",
};

export const InsightsPanel = () => (
  <motion.div
    className="glass-card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
  >
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Health Insights</h3>
      </div>
      <button className="text-xs text-primary hover:underline flex items-center gap-1">
        View All <ArrowRight className="w-3 h-3" />
      </button>
    </div>
    <div className="space-y-3">
      {insights.map((insight, i) => (
        <motion.div
          key={insight.title}
          className={`p-4 rounded-lg border ${severityStyles[insight.severity]} transition-all duration-200 hover:scale-[1.01] cursor-pointer`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
        >
          <div className="flex items-start justify-between mb-1">
            <h4 className="text-sm font-semibold text-foreground">{insight.title}</h4>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${severityBadge[insight.severity]}`}>
              {insight.category}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{insight.desc}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);
