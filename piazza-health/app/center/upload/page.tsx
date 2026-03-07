"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileType2, X, AlertCircle, CheckCircle2, Loader2, Sparkles, Server } from "lucide-react";

export default function BatchUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<{ name: string; size: string; status: "uploading" | "processing" | "success" | "error" }[]>([]);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Mock adding files
        setFiles([
            { name: "CBC_R_Sharma_191023.pdf", size: "1.2 MB", status: "processing" },
            { name: "Lipid_A_Gupta_191023.pdf", size: "0.8 MB", status: "uploading" },
            { name: "Thyroid_V_Singh_181023.jpg", size: "2.4 MB", status: "success" },
        ]);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Batch Upload</h2>
                    <p className="text-[#94A3B8] mt-1">Upload multiple patient reports for automated AI extraction.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E293B]/50 border border-[#334155] text-xs font-medium text-[#CBD5E1]">
                    <Server size={14} className="text-cyan-400" />
                    Routing to OCR Cluster 2
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Zone */}
                <div className="lg:col-span-2 space-y-6">
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`relative w-full h-80 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 ${isDragging
                            ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                            : "bg-[#0F172A] border-[#334155] hover:bg-[#1E293B]/40 hover:border-[#475569]"
                            }`}
                    >
                        {isDragging && (
                            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-2xl pointer-events-none" />
                        )}

                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${isDragging ? "bg-cyan-500/20 scale-110" : "bg-[#1E293B]"}`}>
                            <UploadCloud className={`w-10 h-10 ${isDragging ? "text-cyan-400" : "text-[#64748B]"}`} />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Drop reports here</h3>
                        <p className="text-[#94A3B8] text-center max-w-sm mb-8">
                            Support for PDF, JPG, PNG formats. <br /> Maximum 50 files per batch.
                        </p>

                        <button className="px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(34,211,238,0.3)] hover:shadow-[0_8px_25px_rgba(34,211,238,0.5)] transition-all hover:-translate-y-1">
                            Browse Files
                        </button>
                    </div>

                    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="text-cyan-400 w-5 h-5" />
                            <h3 className="text-lg font-bold text-white">AI Processing Rules</h3>
                        </div>
                        <ul className="space-y-3">
                            {["Patient mapping automatic via name/phone.", "Unrecognized parameters flagged for review.", "Data pushes to ERP via webhook automatically."].map((rule, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-[#94A3B8]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Processing Queue */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 flex flex-col h-[500px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Current Batch</h3>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1E293B] text-[#CBD5E1]">
                            {files.length} Files
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                        <AnimatePresence>
                            {files.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <FileType2 className="w-12 h-12 text-[#475569] mb-4" />
                                    <p className="text-[#64748B] text-sm">No files in queue.<br />Upload reports to begin processing.</p>
                                </div>
                            ) : (
                                files.map((file, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-3.5 bg-[#060A14] border border-[#1E293B] rounded-xl relative group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center flex-shrink-0">
                                                <FileType2 size={14} className="text-[#94A3B8]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-white truncate pr-6">{file.name}</p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-[10px] text-[#64748B] font-mono">{file.size}</span>
                                                    {file.status === "uploading" && (
                                                        <span className="text-[10px] text-blue-400 font-bold flex items-center gap-1">
                                                            <Loader2 size={10} className="animate-spin" /> Uploading...
                                                        </span>
                                                    )}
                                                    {file.status === "processing" && (
                                                        <span className="text-[10px] text-orange-400 font-bold flex items-center gap-1">
                                                            <Loader2 size={10} className="animate-spin" /> OCR Extraction
                                                        </span>
                                                    )}
                                                    {file.status === "success" && (
                                                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                                            <CheckCircle2 size={10} /> Complete
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {files.length > 0 && (
                        <div className="pt-4 mt-2 border-t border-[#1E293B]">
                            <button className="w-full py-2.5 bg-[#1E293B] hover:bg-[#334155] text-white text-sm font-semibold rounded-lg transition-colors">
                                Clear Finished
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
