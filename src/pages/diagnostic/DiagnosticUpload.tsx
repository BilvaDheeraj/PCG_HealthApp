import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Upload, FileText, Check, Loader2, Camera, Mail } from "lucide-react";
import { useState, useRef } from "react";

const stages = [
  { label: "Report Uploading", icon: Upload },
  { label: "OCR Processing", icon: FileText },
  { label: "Parameter Extraction", icon: FileText },
  { label: "AI Insight Generation", icon: Check },
];

const DiagnosticUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [patientId, setPatientId] = useState("");
  const [testType, setTestType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);

  const uploadReport = async (file: File) => {
    setUploading(true);
    setCurrentStage(0);
    
    // Artificially progress stages for UI UX
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < 2 ? prev + 1 : prev));
    }, 2000);

    try {
      const formData = new FormData();
      formData.append("file", file);
      // We can also append patientId and testType if backend model supports it in future
      if (patientId) formData.append("patient_id", patientId);
      if (testType) formData.append("test_type", testType);

      const response = await fetch("http://localhost:8000/api/upload-report", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Upload failed");
      }

      console.log("Upload response:", data);
      setCurrentStage(3); // Complete
      
      setTimeout(() => {
        setUploading(false);
        setCurrentStage(-1);
      }, 2000);
      
    } catch (error: any) {
      clearInterval(interval);
      console.error("Upload error:", error);
      alert("Failed to process report: " + error.message);
      setUploading(false);
      setCurrentStage(-1);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      uploadReport(file);
    }
  };

  return (
    <DashboardLayout role="diagnostic">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground">Upload Report</h1>
          <p className="text-muted-foreground text-sm mt-1">Upload patient test reports for AI processing</p>
        </motion.div>

        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Patient Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Patient ID / Name</label>
              <input type="text" value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="Enter patient ID or name"
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground outline-none focus:border-diagnostic/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Test Type</label>
              <select value={testType} onChange={e => setTestType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground outline-none focus:border-diagnostic/50 transition-colors">
                <option value="">Select test type</option>
                <option value="cbc">Complete Blood Count</option>
                <option value="lipid">Lipid Panel</option>
                <option value="thyroid">Thyroid Profile</option>
                <option value="hba1c">HbA1c</option>
                <option value="lft">Liver Function Test</option>
                <option value="kft">Kidney Function Test</option>
                <option value="vitamin">Vitamin D & B12</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Upload Report File</h3>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
          />

          {!uploading ? (
            <div onClick={handleAreaClick}
              className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-diagnostic/50 transition-colors group">
              <div className="w-16 h-16 rounded-full bg-diagnostic/10 flex items-center justify-center mb-3 group-hover:bg-diagnostic/20 transition-colors">
                <Upload className="w-7 h-7 text-diagnostic" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">Drop report files here</p>
              <p className="text-xs text-muted-foreground">PDF, JPG, PNG — Max 20MB · Batch upload supported</p>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Camera className="w-3.5 h-3.5" /> Scanner</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Mail className="w-3.5 h-3.5" /> Email Import</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    i < currentStage ? "bg-health-green/10 border border-health-green/20"
                    : i === currentStage ? "bg-diagnostic/10 border border-diagnostic/20"
                    : "bg-secondary/30 border border-transparent"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {i < currentStage ? <Check className="w-4 h-4 text-health-green" /> :
                   i === currentStage ? <Loader2 className="w-4 h-4 text-diagnostic animate-spin" /> :
                   <stage.icon className="w-4 h-4 text-muted-foreground" />}
                  <span className={`text-sm ${i <= currentStage ? "text-foreground" : "text-muted-foreground"}`}>{stage.label}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticUpload;
