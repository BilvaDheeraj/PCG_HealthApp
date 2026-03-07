"use client";

import { useState, useRef } from "react";
import {
    UploadCloud, FileText, CheckCircle2, Clock, AlertCircle,
    Camera, Loader2, Scan, Cpu, Sparkles, X, RefreshCw
} from "lucide-react";

type Stage = "idle" | "uploading" | "ocr" | "extracting" | "insights" | "done";

const stageList: { key: Stage; label: string; icon: React.ElementType; color: string }[] = [
    { key: "uploading",  label: "Uploading Report",       icon: UploadCloud, color: "text-blue-400" },
    { key: "ocr",        label: "OCR Processing",         icon: Scan,        color: "text-purple-400" },
    { key: "extracting", label: "Parameter Extraction",   icon: Cpu,         color: "text-amber-400" },
    { key: "insights",   label: "AI Insight Generation",  icon: Sparkles,    color: "text-emerald-400" },
];

const extractedParams = [
    { param: "HbA1c",          value: "6.2",   unit: "%",       range: "4.0 – 5.6",    status: "High Risk" },
    { param: "LDL Cholesterol",value: "145",  unit: "mg/dL",   range: "< 100",         status: "Elevated" },
    { param: "HDL Cholesterol",value: "45",   unit: "mg/dL",   range: "> 40",          status: "Normal" },
    { param: "Triglycerides",  value: "180",  unit: "mg/dL",   range: "< 150",         status: "High Risk" },
    { param: "Fasting Glucose",value: "106",  unit: "mg/dL",   range: "70 – 99",       status: "Borderline" },
    { param: "Vitamin D3",     value: "22",   unit: "ng/mL",   range: "30 – 100",      status: "Deficient" },
    { param: "Hemoglobin",     value: "14.5", unit: "g/dL",    range: "13.8 – 17.2",   status: "Normal" },
    { param: "CRP",            value: "0.7",  unit: "mg/L",    range: "< 1.0",         status: "Normal" },
];

const statusStyle: Record<string, string> = {
    "Normal":     "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "High Risk":  "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "Elevated":   "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "Borderline": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Deficient":  "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const history = [
    { name: "Max_Complete_Oct24.pdf",  date: "Oct 24, 2024", params: 24 },
    { name: "Thyrocare_Sep10.pdf",     date: "Sep 10, 2024", params: 18 },
    { name: "Apollo_Jul15.pdf",        date: "Jul 15, 2024", params: 21 },
];

export default function UploadPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [tab, setTab] = useState<"drag" | "browse" | "camera">("drag");
    const [stage, setStage] = useState<Stage>("idle");
    const [fileName, setFileName] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    const simulate = (name: string) => {
        setFileName(name);
        const seq: Stage[] = ["uploading", "ocr", "extracting", "insights", "done"];
        let i = 0;
        const next = () => {
            if (i < seq.length) { setStage(seq[i]); i++; if (seq[i - 1] !== "done") setTimeout(next, 1800); }
        };
        next();
    };

    const currentIdx = stageList.findIndex(s => s.key === stage);

    return (
        <div className="w-full space-y-6 pb-6">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Upload Report</h2>
                <p className="text-white/45 text-sm mt-1">Upload lab reports for instant AI-driven extraction and health analysis.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* ── Left: Upload area ── */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Method tabs */}
                    <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/8 w-fit">
                        {(["drag", "browse", "camera"] as const).map(t => (
                            <button key={t} onClick={() => setTab(t)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}>
                                {t === "drag" ? "Drag & Drop" : t === "browse" ? "Browse Files" : "Camera"}
                            </button>
                        ))}
                    </div>

                    {/* Upload Zone */}
                    {stage === "idle" || stage === "done" ? (
                        <div
                            onDragEnter={() => setIsDragging(true)}
                            onDragLeave={() => setIsDragging(false)}
                            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                            onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) simulate(f.name); }}
                            onClick={() => tab === "browse" && fileRef.current?.click()}
                            className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer p-10 flex flex-col items-center justify-center gap-4 min-h-[200px] ${isDragging ? "border-emerald-500/60 bg-emerald-500/5" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"}`}>
                            <input ref={fileRef} type="file" accept=".pdf,.jpg,.png" className="hidden"
                                onChange={e => { const f = e.target.files?.[0]; if (f) simulate(f.name); }} />
                            {tab === "camera" ? (
                                <>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10"><Camera className="w-8 h-8 text-white/40" /></div>
                                    <p className="text-sm font-bold text-white/50">Camera capture coming soon</p>
                                </>
                            ) : (
                                <>
                                    <div className={`p-4 rounded-2xl border transition-all ${isDragging ? "bg-emerald-500/10 border-emerald-500/20" : "bg-white/5 border-white/10"}`}>
                                        <UploadCloud className={`w-8 h-8 ${isDragging ? "text-emerald-400" : "text-white/40"}`} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-white/70">
                                            {tab === "drag" ? "Drag & drop your lab report here" : "Click to browse files"}
                                        </p>
                                        <p className="text-xs text-white/30 mt-1">Supports PDF, JPG, PNG — max 10MB</p>
                                    </div>
                                    <button onClick={() => simulate("Sample_Lab_Report.pdf")}
                                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5">
                                        {tab === "browse" ? "Browse Files" : "Select File"}
                                    </button>
                                </>
                            )}
                        </div>
                    ) : null}

                    {/* Processing Pipeline */}
                    {stage !== "idle" && (
                        <div className="rounded-2xl bg-[#080c14] border border-white/8 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-bold text-white">{fileName}</p>
                                    <p className="text-xs text-white/35 mt-0.5">{stage === "done" ? "Analysis complete" : "Processing…"}</p>
                                </div>
                                {stage === "done" && (
                                    <button onClick={() => setStage("idle")}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-bold transition-all border border-white/8">
                                        <RefreshCw size={12} /> Upload Another
                                    </button>
                                )}
                            </div>

                            {/* Stage nodes */}
                            <div className="space-y-3">
                                {stageList.map((s, i) => {
                                    const done = i < currentIdx || stage === "done";
                                    const active = s.key === stage;
                                    const waiting = !done && !active;
                                    const Icon = s.icon;
                                    return (
                                        <div key={s.key} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${done ? "bg-emerald-500/8 border-emerald-500/15" : active ? "bg-white/5 border-white/10" : "bg-transparent border-transparent opacity-30"}`}>
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${done ? "bg-emerald-500/15 border-emerald-500/25" : active ? "bg-white/8 border-white/15" : "bg-white/5 border-white/10"}`}>
                                                {done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                                                    active ? <Loader2 className={`w-4 h-4 ${s.color} animate-spin`} /> :
                                                        <Icon className="w-4 h-4 text-white/20" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-bold ${done ? "text-emerald-400" : active ? "text-white" : "text-white/20"}`}>{s.label}</p>
                                                {active && <p className="text-[10px] text-white/30 mt-0.5">Processing…</p>}
                                                {done && <p className="text-[10px] text-emerald-400/60 mt-0.5">Complete</p>}
                                            </div>
                                            {done && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                                            {active && <Loader2 className={`w-4 h-4 ${s.color} animate-spin shrink-0`} />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Extracted Table */}
                    {stage === "done" && (
                        <div className="rounded-2xl bg-[#080c14] border border-white/8 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-white">Extracted Parameters ({extractedParams.length})</h3>
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded">98% Confidence</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="text-white/30 text-[10px] uppercase tracking-wider border-b border-white/8">
                                            <th className="text-left py-2 font-bold">Parameter</th>
                                            <th className="text-right py-2 font-bold">Value</th>
                                            <th className="text-right py-2 font-bold hidden sm:table-cell">Range</th>
                                            <th className="text-right py-2 font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {extractedParams.map((p) => (
                                            <tr key={p.param} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="py-2.5 font-bold text-white/80">{p.param}</td>
                                                <td className="py-2.5 text-right text-white font-black">{p.value} <span className="text-white/30 font-normal">{p.unit}</span></td>
                                                <td className="py-2.5 text-right text-white/30 hidden sm:table-cell">{p.range} {p.unit}</td>
                                                <td className="py-2.5 text-right">
                                                    <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded border ${statusStyle[p.status]}`}>{p.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-[10px] text-white/25 mt-3 flex items-center gap-1.5">
                                <AlertCircle size={11} /> This report has passed authenticity validation. ✓ NABL lab detected.
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Right: Upload History ── */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white/70">Upload History</h3>
                    {history.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-[#080c14] border border-white/8 hover:border-white/15 transition-all">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                                <FileText className="w-4 h-4 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-white truncate">{h.name}</p>
                                <p className="text-[10px] text-white/35 mt-0.5">{h.date}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    <span className="text-[10px] text-emerald-400">{h.params} params extracted</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="p-4 rounded-2xl bg-blue-500/8 border border-blue-500/15 text-center">
                        <Clock className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                        <p className="text-xs font-bold text-blue-400 mb-1">Next Scan Due</p>
                        <p className="text-xs text-white/50">Jun 19, 2025</p>
                        <p className="text-[10px] text-white/30 mt-1">84 days remaining</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
