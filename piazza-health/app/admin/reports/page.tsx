"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, Eye, AlertTriangle, Search } from "lucide-react";
import { useState } from "react";

type ReportStatus = "review" | "flagged" | "approved" | "rejected";

interface FlaggedReport {
  id: string;
  patient: string;
  lab: string;
  issue: string;
  score: number;
  status: ReportStatus;
}

const initialReports: FlaggedReport[] = [
  { id: "R-2048", patient: "Rahul Mehra", lab: "LifeCare Labs", issue: "Low confidence OCR", score: 62, status: "review" },
  { id: "R-2051", patient: "Kavita Rao", lab: "Apollo Diagnostics", issue: "Template mismatch", score: 45, status: "flagged" },
  { id: "R-2053", patient: "Deepak Jain", lab: "SRL Labs", issue: "Missing metadata", score: 71, status: "review" },
  { id: "R-2055", patient: "Sneha Pillai", lab: "Thyrocare", issue: "Value anomaly", score: 55, status: "flagged" },
  { id: "R-2058", patient: "Arjun Reddy", lab: "LifeCare Labs", issue: "Duplicate submission", score: 38, status: "flagged" },
  { id: "R-2060", patient: "Meera Nair", lab: "Apollo Diagnostics", issue: "Low resolution scan", score: 67, status: "review" },
  { id: "R-2062", patient: "Sanjay Gupta", lab: "SRL Labs", issue: "Missing lab stamp", score: 58, status: "flagged" },
];

const statusStyles: Record<ReportStatus, string> = {
  review: "bg-health-yellow/10 text-health-yellow",
  flagged: "bg-health-red/10 text-health-red",
  approved: "bg-health-green/10 text-health-green",
  rejected: "bg-health-red/10 text-health-red",
};

const AdminReports = () => {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");

  const updateStatus = (id: string, status: ReportStatus) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const filtered = reports.filter(r => r.patient.toLowerCase().includes(search.toLowerCase()) || r.lab.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-admin" /> Report Review
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Review flagged reports for authenticity</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-48" />
        </div>
      </motion.div>

      <div className="space-y-3">
        {filtered.map((report, i) => (
          <motion.div
            key={report.id}
            className="glass-card p-5 hover:border-admin/20 transition-all"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.05 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${report.score >= 60 ? "bg-health-yellow/10" : "bg-health-red/10"}`}>
                  <span className={`text-sm font-bold ${report.score >= 60 ? "text-health-yellow" : "text-health-red"}`}>{report.score}%</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{report.patient}</h3>
                  <p className="text-xs text-muted-foreground">{report.lab} · {report.id}</p>
                  <p className="text-xs text-health-yellow mt-0.5 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{report.issue}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[report.status]}`}>{report.status}</span>
                {(report.status === "review" || report.status === "flagged") && (
                  <>
                    <button onClick={() => updateStatus(report.id, "approved")} className="p-2 rounded-lg hover:bg-health-green/10 transition-colors" title="Approve">
                      <CheckCircle className="w-5 h-5 text-health-green" />
                    </button>
                    <button onClick={() => updateStatus(report.id, "rejected")} className="p-2 rounded-lg hover:bg-health-red/10 transition-colors" title="Reject">
                      <XCircle className="w-5 h-5 text-health-red" />
                    </button>
                  </>
                )}
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="View Details">
                  <Eye className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
