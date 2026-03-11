"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, Edit3, MessageSquare } from "lucide-react";
import { useState } from "react";

const insights = [
  { id: "I-001", patient: "Rahul Mehra", insight: "Pre-diabetic risk detected based on HbA1c of 6.4%", aiConfidence: 92, status: "pending" as const, category: "Metabolic" },
  { id: "I-002", patient: "Priya Sharma", insight: "Severe Vitamin D deficiency at 8 ng/mL", aiConfidence: 98, status: "validated" as const, category: "Nutritional" },
  { id: "I-003", patient: "Amit Patel", insight: "Elevated LDL cholesterol indicates cardiovascular risk", aiConfidence: 87, status: "pending" as const, category: "Cardiovascular" },
  { id: "I-004", patient: "Sneha Gupta", insight: "Iron deficiency anemia suggested by low hemoglobin", aiConfidence: 94, status: "overridden" as const, category: "Hematological" },
  { id: "I-005", patient: "Vikram Singh", insight: "Thyroid function borderline — TSH 4.8 mIU/L", aiConfidence: 78, status: "pending" as const, category: "Thyroid" },
  { id: "I-006", patient: "Anita Desai", insight: "Liver enzymes ALT/AST mildly elevated", aiConfidence: 85, status: "validated" as const, category: "Hepatic" },
];

type InsightStatus = "pending" | "validated" | "overridden";
const statusStyles: Record<InsightStatus, string> = {
  pending: "bg-health-yellow/10 text-health-yellow",
  validated: "bg-health-green/10 text-health-green",
  overridden: "bg-admin/10 text-admin",
};

const AdminValidation = () => {
  const [items, setItems] = useState(insights);
  const [commentingId, setCommentingId] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const updateStatus = (id: string, status: InsightStatus) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Shield className="w-6 h-6 text-admin" /> AI Insight Validation
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Review and validate AI-generated health insights</p>
      </motion.div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="glass-card p-6 hover:border-admin/20 transition-all"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-admin">{item.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground uppercase">{item.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{item.patient}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.insight}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center px-3 py-1.5 rounded-lg bg-secondary/30">
                    <p className="text-lg font-bold text-foreground">{item.aiConfidence}%</p>
                    <p className="text-[10px] text-muted-foreground">AI Confidence</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[item.status]}`}>{item.status}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                <button onClick={() => updateStatus(item.id, "validated")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-health-green/10 text-health-green text-xs font-medium hover:bg-health-green/20 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5" /> Validate
                </button>
                <button onClick={() => updateStatus(item.id, "overridden")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-admin/10 text-admin text-xs font-medium hover:bg-admin/20 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" /> Override
                </button>
                <button onClick={() => setCommentingId(commentingId === item.id ? null : item.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-secondary/70 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> Comment
                </button>
              </div>

              {commentingId === item.id && (
                <motion.div className="flex gap-2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add medical comment..."
                    className="flex-1 px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground outline-none focus:border-admin/50 transition-colors" />
                  <button onClick={() => { setComment(""); setCommentingId(null); }}
                    className="px-4 py-2 rounded-lg gradient-admin text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity">Submit</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminValidation;
