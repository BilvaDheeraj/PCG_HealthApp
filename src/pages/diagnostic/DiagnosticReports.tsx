import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { FileText, Eye, Download, CheckCircle, Loader2, Upload, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";

const statusStyles: Record<string, string> = {
  processed: "bg-health-green/10 text-health-green",
  processing: "bg-health-blue/10 text-health-blue",
  uploaded: "bg-health-yellow/10 text-health-yellow",
};

const DiagnosticReports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/diagnostic/reports")
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = reports.filter(r => r.patient.toLowerCase().includes(search.toLowerCase()) || r.test.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout role="diagnostic">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage patient test reports</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-40" />
            </div>
          </div>
        </motion.div>

        {loading ? (
             <div className="flex justify-center py-12">
               <div className="w-8 h-8 rounded-full border-2 border-diagnostic border-t-transparent animate-spin" />
             </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((report, i) => (
              <motion.div
                key={report.id}
                className="glass-card p-5 hover:border-diagnostic/20 transition-all"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg gradient-diagnostic flex items-center justify-center flex-shrink-0">
                      {report.status === "processing" ? <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" /> : <FileText className="w-5 h-5 text-primary-foreground" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{report.patient}</h3>
                      <p className="text-xs text-muted-foreground">{report.test} · {report.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    {report.confidence && (
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Confidence</p>
                        <p className="text-sm font-semibold text-health-green">{report.confidence}%</p>
                      </div>
                    )}
                    {report.biomarkers > 0 && (
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Biomarkers</p>
                        <p className="text-sm font-semibold text-foreground">{report.biomarkers}</p>
                      </div>
                    )}
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[report.status]}`}>{report.status}</span>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Download className="w-4 h-4 text-muted-foreground" /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticReports;
