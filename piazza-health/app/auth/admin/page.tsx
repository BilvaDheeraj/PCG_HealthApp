"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Activity, Mail, Lock, Eye, EyeOff, ArrowLeft,
    ShieldCheck, CheckCircle2, AlertTriangle, Fingerprint, Key
} from "lucide-react";

export default function AdminAuthPage() {
    const [showPw, setShowPw] = useState(false);
    const [mfaStep, setMfaStep] = useState(false);
    const [mfaCode, setMfaCode] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mfaStep) setMfaStep(true);
        else router.push("/admin");
    };


    const inputStyle: React.CSSProperties = {
        width: "100%", boxSizing: "border-box",
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 12, padding: "13px 14px 13px 40px",
        color: "white", fontSize: 14, outline: "none",
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#050508", fontFamily: "Inter, sans-serif" }}>

            {/* ── LEFT BRANDING PANEL ── */}
            <div style={{
                width: "52%", flexShrink: 0, position: "sticky", top: 0, height: "100vh",
                background: "linear-gradient(135deg, #0a0510 0%, #050508 60%)",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                padding: "3.5rem", overflow: "hidden"
            }} className="hidden lg:flex">
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                    <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)", filter: "blur(60px)" }} />
                    <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                    <Link href="/auth" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 28, textDecoration: "none" }}>
                        <ArrowLeft size={14} /> Back to portal selection
                    </Link>
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #a855f7, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(168,85,247,0.3)" }}>
                            <Activity size={22} color="white" />
                        </div>
                        <span style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>HealthAI</span>
                    </Link>
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.1)", color: "#c084fc", marginBottom: 24 }}>
                        Admin Control Center
                    </div>
                    <h2 style={{ fontSize: 52, fontWeight: 900, color: "white", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 16 }}>
                        Platform<br />
                        <span style={{ background: "linear-gradient(90deg, #c084fc, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>command</span><br />
                        &amp; control.
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.7, maxWidth: 360, marginBottom: 36 }}>
                        Full administrative access across all centers, users, AI overrides, and monetization controls.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                        {[
                            { icon: ShieldCheck, title: "User Management", desc: "Manage all user roles and access" },
                            { icon: Key, title: "AI Override", desc: "Override and validate AI insights" },
                            { icon: Fingerprint, title: "Audit Logs", desc: "Full platform event logging" },
                            { icon: AlertTriangle, title: "Anomaly Detection", desc: "Live AI anomaly monitoring" },
                        ].map((f, i) => (
                            <div key={i} style={{ padding: "16px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <f.icon size={18} color="#c084fc" style={{ marginBottom: 12 }} />
                                <div style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 4 }}>{f.title}</div>
                                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{f.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: 16, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}>
                        <AlertTriangle size={16} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#fde68a", marginBottom: 4 }}>Restricted Access</div>
                            <div style={{ fontSize: 12, color: "rgba(251,191,36,0.6)", lineHeight: 1.5 }}>This portal is for authorised administrators only. All attempts are logged.</div>
                        </div>
                    </div>
                </div>

                <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
                    <ShieldCheck size={14} color="rgba(168,85,247,0.5)" />
                    MFA Required · Zero-trust · Full audit trail
                </div>
            </div>

            {/* ── RIGHT FORM PANEL ── */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", justifyContent: "center", padding: "48px 32px" }}>
                <div style={{ width: "100%", maxWidth: 420 }}>

                    {/* Mobile back */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }} className="lg:hidden">
                        <Link href="/auth" style={{ color: "rgba(255,255,255,0.4)", display: "flex" }}><ArrowLeft size={18} /></Link>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#a855f7,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Activity size={18} color="white" />
                        </div>
                        <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>HealthAI</span>
                        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c084fc", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", padding: "4px 10px", borderRadius: 100 }}>Admin</span>
                    </div>

                    {/* Step indicator */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
                        {[{ label: "Credentials" }, { label: "2FA Verify" }].map((step, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, opacity: i === (mfaStep ? 1 : 0) || i === (mfaStep ? 0 : 0) ? 1 : (mfaStep && i === 0 ? 0.3 : (!mfaStep && i === 1 ? 0.3 : 1)) }}>
                                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: (mfaStep ? i === 1 : i === 0) ? "linear-gradient(135deg,#a855f7,#8b5cf6)" : "rgba(255,255,255,0.08)", color: (mfaStep ? i === 1 : i === 0) ? "white" : "rgba(255,255,255,0.3)" }}>
                                    {i + 1}
                                </div>
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{step.label}</span>
                                {i === 0 && <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />}
                            </div>
                        ))}
                    </div>

                    <div style={{ marginBottom: 28 }}>
                        <h1 style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.5px", marginBottom: 8 }}>
                            {mfaStep ? "Two-factor authentication" : "Admin Sign In"}
                        </h1>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                            {mfaStep ? "Enter the 6-digit code from your authenticator app." : "Restricted to authorised administrators only."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {!mfaStep ? (
                                <>
                                    <div>
                                        <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Admin Email</label>
                                        <div style={{ position: "relative" }}>
                                            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><Mail size={15} /></span>
                                            <input type="email" required placeholder="admin@healthai.in" style={inputStyle} />
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                            <label style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>
                                            <Link href="#" style={{ fontSize: 12, color: "#c084fc", textDecoration: "none" }}>Reset via IT</Link>
                                        </div>
                                        <div style={{ position: "relative" }}>
                                            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><Lock size={15} /></span>
                                            <input type={showPw ? "text" : "password"} required placeholder="••••••••••" style={{ ...inputStyle, paddingRight: 40 }} />
                                            <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", display: "flex" }}>
                                                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", borderRadius: 12, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)" }}>
                                        <AlertTriangle size={14} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
                                        <p style={{ fontSize: 12, color: "rgba(251,191,36,0.7)", lineHeight: 1.5 }}>All login attempts are recorded and subject to security audit.</p>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Authenticator Code</label>
                                    <input
                                        type="text"
                                        value={mfaCode}
                                        onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        placeholder="000 000"
                                        maxLength={6}
                                        style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 14, padding: "20px", fontSize: 32, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.5em", textAlign: "center", color: "white", outline: "none" }}
                                    />
                                    <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>Open your authenticator app and enter the code</p>
                                </div>
                            )}

                            <button type="submit" style={{ width: "100%", padding: "14px", borderRadius: 13, border: "none", background: "linear-gradient(135deg, #a855f7, #8b5cf6)", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 30px rgba(168,85,247,0.25)", marginTop: 4 }}>
                                {mfaStep ? <><CheckCircle2 size={16} /> Verify &amp; Enter Admin Panel</> : <>Continue to 2FA →</>}
                            </button>

                            {mfaStep && (
                                <button type="button" onClick={() => setMfaStep(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer", padding: "8px" }}>
                                    ← Back to credentials
                                </button>
                            )}
                        </div>
                    </form>

                    <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                        <ShieldCheck size={13} color="rgba(168,85,247,0.5)" />
                        Zero-trust · MFA enforced · Full audit trail
                    </div>
                </div>
            </div>
        </div>
    );
}
