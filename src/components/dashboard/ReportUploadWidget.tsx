import { motion } from "framer-motion";
import { Upload, Camera, Mail, FileText, Check, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const stages = [
  { label: "Report Uploading", icon: Upload },
  { label: "OCR Processing", icon: FileText },
  { label: "Parameter Extraction", icon: FileText },
  { label: "AI Insight Generation", icon: Check },
];

export const ReportUploadWidget = () => {
  const [uploading, setUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadReport = async (file: File) => {
    setUploading(true);
    setCurrentStage(0);

    // Artificially progress stages for UI UX while waiting
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < 2 ? prev + 1 : prev));
    }, 2000);

    try {
      const formData = new FormData();
      formData.append("file", file);

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
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Upload Report</h3>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      {!uploading ? (
        <div
          onClick={handleAreaClick}
          className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors group"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Drop your report here</p>
          <p className="text-xs text-muted-foreground">PDF, JPG, PNG — Max 20MB</p>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Camera className="w-3.5 h-3.5" /> Camera
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="w-3.5 h-3.5" /> Email
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.label}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                i < currentStage
                  ? "bg-health-green/10 border border-health-green/20"
                  : i === currentStage
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-secondary/30 border border-transparent"
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {i < currentStage ? (
                <Check className="w-4 h-4 text-health-green" />
              ) : i === currentStage ? (
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              ) : (
                <stage.icon className="w-4 h-4 text-muted-foreground" />
              )}
              <span className={`text-sm ${i <= currentStage ? "text-foreground" : "text-muted-foreground"}`}>
                {stage.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
