"use client";

import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, CheckCircle, Info } from "lucide-react";

const detailedInsights = [
  {
    category: "Metabolic Health",
    severity: "moderate",
    title: "Elevated HbA1c Levels",
    explanation: "Your HbA1c level of 6.2% is above the normal range (< 5.7%), indicating pre-diabetic glucose levels.",
    causes: ["High carbohydrate intake", "Sedentary lifestyle", "Family history of diabetes"],
    actions: ["Reduce refined sugar intake", "30 min daily walking", "Retest in 3 months"],
  },
  {
    category: "Nutritional Health",
    severity: "high",
    title: "Vitamin D Deficiency",
    explanation: "Your Vitamin D level is 14 ng/mL, well below the recommended 30-50 ng/mL range.",
    causes: ["Limited sun exposure", "Dietary insufficiency", "Possible malabsorption"],
    actions: ["20 min daily sunlight", "Vitamin D3 supplement (2000 IU)", "Retest after 8 weeks"],
  },
  {
    category: "Cardiovascular Health",
    severity: "low",
    title: "Cholesterol Within Range",
    explanation: "Your LDL is 118 mg/dL and HDL is 52 mg/dL, both within acceptable limits.",
    causes: [],
    actions: ["Maintain current diet", "Continue regular exercise"],
  },
  {
    category: "Immune Health",
    severity: "moderate",
    title: "Low B12 Levels",
    explanation: "Your Vitamin B12 at 180 pg/mL is below optimal (> 300 pg/mL), which may cause fatigue.",
    causes: ["Vegetarian diet", "Reduced absorption with age"],
    actions: ["B12 supplements", "Include fortified cereals", "Retest in 6 weeks"],
  },
];

const severityStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  high: { bg: "bg-health-red/10 border-health-red/20", text: "text-health-red", icon: <AlertTriangle className="w-5 h-5 text-health-red" /> },
  moderate: { bg: "bg-health-yellow/10 border-health-yellow/20", text: "text-health-yellow", icon: <Info className="w-5 h-5 text-health-yellow" /> },
  low: { bg: "bg-health-green/10 border-health-green/20", text: "text-health-green", icon: <CheckCircle className="w-5 h-5 text-health-green" /> },
};

const PatientInsights = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" /> AI Health Insights
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Personalized insights generated from your biomarker analysis</p>
      </motion.div>

      <div className="space-y-4">
        {detailedInsights.map((insight, i) => {
          const style = severityStyles[insight.severity];
          return (
            <motion.div
              key={insight.title}
              className={`glass-card p-6 border ${style.bg} transition-all`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{style.icon}</div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-foreground">{insight.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider ${style.text} ${style.bg}`}>
                        {insight.severity} risk
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground uppercase font-semibold tracking-wider">
                        {insight.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{insight.explanation}</p>

                  {insight.causes.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Possible Causes</p>
                      <div className="flex flex-wrap gap-2">
                        {insight.causes.map(c => (
                          <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Suggested Actions</p>
                    <div className="space-y-1.5">
                      {insight.actions.map(a => (
                        <div key={a} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="text-foreground">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientInsights;
