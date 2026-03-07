"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, User, Building2, ShieldCheck, ArrowRight, Sparkles, Check } from "lucide-react";

const roles = [
    {
        key: "user",
        label: "Patient",
        tagline: "Personal Health Portal",
        href: "/auth/user",
        icon: User,
        colorPrimary: "#f97316",
        colorSecondary: "#fbbf24",
        glowColor: "rgba(249,115,22,0.25)",
        borderActive: "rgba(249,115,22,0.5)",
        bgIcon: "linear-gradient(135deg,#f97316,#fbbf24)",
        bgGlow: "radial-gradient(circle at 50% 0%, rgba(249,115,22,0.12) 0%, transparent 65%)",
        badge: "PERSONAL",
        description: "Upload lab reports, get AI-powered insights, personalised diet plans, and track your biomarker trends over time.",
        features: ["AI Report Analysis", "Diet Recommendations", "Biomarker Tracking", "24/7 Health Chat"],
    },
    {
        key: "center",
        label: "Diagnostic Center",
        tagline: "B2B Lab Management",
        href: "/auth/center",
        icon: Building2,
        colorPrimary: "#3b82f6",
        colorSecondary: "#22d3ee",
        glowColor: "rgba(59,130,246,0.25)",
        borderActive: "rgba(59,130,246,0.5)",
        bgIcon: "linear-gradient(135deg,#3b82f6,#22d3ee)",
        bgGlow: "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 65%)",
        badge: "ENTERPRISE",
        description: "Integrate your lab with HealthAI to auto-parse patient reports via API. Access analytics and batch upload tools.",
        features: ["Batch Report Upload", "API Integration", "Center Analytics", "Patient Management"],
    },
    {
        key: "admin",
        label: "Admin",
        tagline: "Platform Control Center",
        href: "/auth/admin",
        icon: ShieldCheck,
        colorPrimary: "#a855f7",
        colorSecondary: "#8b5cf6",
        glowColor: "rgba(168,85,247,0.25)",
        borderActive: "rgba(168,85,247,0.5)",
        bgIcon: "linear-gradient(135deg,#a855f7,#8b5cf6)",
        bgGlow: "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 65%)",
        badge: "RESTRICTED",
        description: "Full platform control — manage centers, users, AI overrides, revenue analytics, and subscription controls.",
        features: ["System Analytics", "AI Overrides", "User Management", "Revenue Control"],
    },
];

export default function AuthGateway() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div style={{
            minHeight: "100vh", backgroundColor: "#050508",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "48px 24px", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden"
        }}>
            {/* Ambient background glows */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "-15%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
                <div style={{ position: "absolute", bottom: "-10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
                <div style={{ position: "absolute", top: "40%", right: "30%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
                {/* Dot grid */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.8 }} />
            </div>

            {/* Header */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 56 }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 28 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#f97316,#fbbf24)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(249,115,22,0.35)", transform: "rotate(-5deg)" }}>
                        <Activity size={26} color="white" />
                    </div>
                    <span style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-1px" }}>HealthAI</span>
                </Link>

                {/* Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", marginBottom: 20 }}>
                    <Sparkles size={12} color="#fbbf24" />
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>AI-Powered Health Intelligence Platform</span>
                </div>

                {/* Headline */}
                <h1 style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "white", letterSpacing: "-2px", textAlign: "center", lineHeight: 1.05, marginBottom: 16 }}>
                    Choose your portal
                </h1>
                <p style={{ fontSize: 17, color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: 480, lineHeight: 1.65, margin: 0 }}>
                    Select your account type to access the right portal for your needs. Your experience is tailored to your role.
                </p>
            </div>

            {/* Role cards */}
            <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 340px))", gap: 20, width: "100%", maxWidth: 1060, justifyContent: "center" }}>
                {roles.map((role) => {
                    const isHov = hovered === role.key;
                    return (
                        <Link
                            key={role.key}
                            href={role.href}
                            onMouseEnter={() => setHovered(role.key)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                textDecoration: "none",
                                display: "flex", flexDirection: "column",
                                borderRadius: 24,
                                border: `1px solid ${isHov ? role.borderActive : "rgba(255,255,255,0.08)"}`,
                                background: isHov ? `${role.bgGlow}, rgba(255,255,255,0.035)` : "rgba(255,255,255,0.025)",
                                padding: "32px",
                                position: "relative", overflow: "hidden",
                                transform: isHov ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                boxShadow: isHov ? `0 24px 60px ${role.glowColor}, 0 0 0 1px ${role.borderActive}` : "0 4px 20px rgba(0,0,0,0.3)",
                                cursor: "pointer",
                            }}
                        >
                            {/* Inner glow on hover */}
                            {isHov && (
                                <div style={{ position: "absolute", inset: 0, background: role.bgGlow, pointerEvents: "none", borderRadius: 24 }} />
                            )}

                            {/* Top row: icon + badge */}
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, position: "relative", zIndex: 1 }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: 18,
                                    background: role.bgIcon,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: isHov ? `0 8px 32px ${role.glowColor}` : "0 4px 16px rgba(0,0,0,0.4)",
                                    transform: isHov ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
                                    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                                    flexShrink: 0,
                                }}>
                                    <role.icon size={26} color="white" />
                                </div>
                                <span style={{
                                    fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase",
                                    padding: "5px 10px", borderRadius: 100,
                                    border: `1px solid ${isHov ? role.borderActive : "rgba(255,255,255,0.1)"}`,
                                    background: isHov ? `rgba(${role.colorPrimary === "#f97316" ? "249,115,22" : role.colorPrimary === "#3b82f6" ? "59,130,246" : "168,85,247"},0.12)` : "rgba(255,255,255,0.04)",
                                    color: isHov ? role.colorPrimary : "rgba(255,255,255,0.35)",
                                    transition: "all 0.25s",
                                }}>
                                    {role.badge}
                                </span>
                            </div>

                            {/* Label + tagline */}
                            <div style={{ marginBottom: 14, position: "relative", zIndex: 1 }}>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.5px", marginBottom: 4 }}>{role.label}</h2>
                                <p style={{ fontSize: 12, fontWeight: 600, color: isHov ? role.colorPrimary : "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", transition: "color 0.25s" }}>{role.tagline}</p>
                            </div>

                            {/* Description */}
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 22, position: "relative", zIndex: 1, flexGrow: 1 }}>
                                {role.description}
                            </p>

                            {/* Feature list */}
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0", display: "flex", flexDirection: "column", gap: 9, position: "relative", zIndex: 1 }}>
                                {role.features.map((f) => (
                                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <span style={{
                                            width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                                            background: isHov ? `rgba(${role.colorPrimary === "#f97316" ? "249,115,22" : role.colorPrimary === "#3b82f6" ? "59,130,246" : "168,85,247"},0.15)` : "rgba(255,255,255,0.07)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            transition: "background 0.25s",
                                        }}>
                                            <Check size={11} color={isHov ? role.colorPrimary : "rgba(255,255,255,0.3)"} strokeWidth={3} />
                                        </span>
                                        <span style={{ fontSize: 13, color: isHov ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)", transition: "color 0.25s" }}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "14px 18px", borderRadius: 14,
                                background: isHov ? role.bgIcon : "rgba(255,255,255,0.05)",
                                border: `1px solid ${isHov ? "transparent" : "rgba(255,255,255,0.08)"}`,
                                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                                position: "relative", zIndex: 1,
                            }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: isHov ? "white" : "rgba(255,255,255,0.5)", transition: "color 0.25s" }}>
                                    Enter as {role.label.split(" ")[0]}
                                </span>
                                <div style={{
                                    width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                    background: isHov ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)",
                                    transform: isHov ? "translateX(4px)" : "translateX(0)",
                                    transition: "all 0.25s",
                                }}>
                                    <ArrowRight size={14} color={isHov ? "white" : "rgba(255,255,255,0.4)"} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Stats strip */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 40, marginTop: 52, justifyContent: "center", flexWrap: "wrap" }}>
                {[
                    { val: "12,000+", label: "Active Patients" },
                    { val: "342+", label: "Partner Centers" },
                    { val: "99.2%", label: "AI Accuracy" },
                    { val: "HIPAA", label: "Compliant" },
                ].map((s, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>{s.val}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{ position: "relative", zIndex: 1, marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 280, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
                    <Link href="/legal/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link>
                    {" · "}
                    <Link href="/legal/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms of Service</Link>
                    {" · "}
                    End-to-end Encrypted · ISO 27001
                </p>
            </div>
        </div>
    );
}
