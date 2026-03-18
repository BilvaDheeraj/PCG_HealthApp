import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReportUploadWidget } from "@/components/dashboard/ReportUploadWidget";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const recentUploads = [
  { name: "CBC_Report_Mar2026.pdf", date: "Mar 05, 2026", status: "processed", size: "2.4 MB" },
  { name: "LipidPanel_Feb2026.pdf", date: "Feb 20, 2026", status: "processed", size: "1.8 MB" },
  { name: "ThyroidProfile.jpg", date: "Feb 10, 2026", status: "processed", size: "3.1 MB" },
];

const statusIcons: Record<string, JSX.Element> = {
  processed: <CheckCircle className="w-4 h-4 text-health-green" />,
  processing: <Clock className="w-4 h-4 text-health-blue animate-spin" />,
  failed: <AlertTriangle className="w-4 h-4 text-health-red" />,
};

const PatientUpload = () => {
  return (
    <DashboardLayout role="patient">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground">Upload Report</h1>
          <p className="text-muted-foreground text-sm mt-1">Upload your lab reports for AI-powered analysis</p>
        </motion.div>

        <ReportUploadWidget />

        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Processing Pipeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {["Upload & Validate", "OCR Text Extraction", "Parameter Detection", "AI Insight Generation"].map((step, i) => (
              <motion.div
                key={step}
                className="text-center p-4 rounded-lg bg-secondary/30 border border-border/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="w-8 h-8 rounded-full gradient-patient flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs font-bold text-primary-foreground">{i + 1}</span>
                </div>
                <p className="text-xs font-medium text-foreground">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            {recentUploads.map((file, i) => (
              <motion.div
                key={file.name}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size} · {file.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {statusIcons[file.status]}
                  <span className="text-xs text-health-green font-medium capitalize">{file.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default PatientUpload;
