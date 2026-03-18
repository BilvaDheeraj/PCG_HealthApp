import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar, Filter, Search, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const PatientReports = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/patient/reports")
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

  const filteredReports = reports.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.lab.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout role="patient">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">My Reports</h1>
            <p className="text-muted-foreground text-sm mt-1">{reports.length} reports uploaded</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-40"
              />
            </div>
            <button className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReports.map((report, i) => (
            <motion.div
              key={report.id}
              className={`glass-card p-5 cursor-pointer transition-all duration-200 ${selectedReport === report.id ? "border-primary/40 glow-orange" : "hover:border-primary/20"}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg gradient-patient flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{report.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{report.type || "Lab Report"} · {report.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Params</p>
                    <p className="text-sm font-semibold text-foreground">{report.extracted_params || report.biomarkers || 0}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Insights</p>
                    <p className={`text-sm font-semibold ${(report.ai_insights || report.alerts || 0) > 0 ? "text-health-blue" : "text-health-green"}`}>{report.ai_insights || report.alerts || 0}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {report.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-health-green" />
                    <span className="text-xs text-health-green font-medium">Analyzed</span>
                  </div>
                </div>
              </div>

              {selectedReport === report.id && (
                <motion.div
                  className="mt-4 pt-4 border-t border-border/50 flex flex-wrap gap-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                    <Eye className="w-4 h-4" /> View Details
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/70 transition-colors">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        )}

        {filteredReports.length === 0 && !loading && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No reports match your search</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientReports;
