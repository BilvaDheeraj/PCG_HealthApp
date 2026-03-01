"use client";
import { useState } from "react";

export default function Pricing() {
    const [annual, setAnnual] = useState(true);

    return (
        <section id="pricing" style={{ position: "relative", zIndex: 1, background: "#f8f8f8", padding: "100px 0" }}>
            <div className="container" style={{ maxWidth: 900 }}>
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p className="label fade-up" style={{ color: "rgba(0,0,0,0.4)", marginBottom: 12 }}>Membership pricing</p>
                    <h2 className="display-md fade-up" style={{ color: "#0a0a0a", transitionDelay: "0.1s" }}>
                        Health is your greatest superpower
                    </h2>
                    <p className="fade-up" style={{ transitionDelay: "0.2s", color: "#666", marginTop: 12, fontSize: 15 }}>
                        Traditional executive health programs cost:{" "}
                        <strong style={{ textDecoration: "line-through", color: "#999" }}>₹1,25,000/year</strong>
                    </p>

                    {/* Toggle */}
                    <div style={{ display: "inline-flex", background: "#e8e8e8", borderRadius: "100px", padding: 4, marginTop: 28, gap: 4 }}>
                        {["Annual (Save 15%)", "Monthly"].map((label, i) => (
                            <button key={label} onClick={() => setAnnual(i === 0)} style={{
                                padding: "8px 22px", borderRadius: "100px", border: "none", cursor: "pointer",
                                background: (i === 0) === annual ? "#0a0a0a" : "transparent",
                                color: (i === 0) === annual ? "#fff" : "#666",
                                fontSize: 13, fontWeight: 500, transition: "all 0.3s",
                            }}>{label}</button>
                        ))}
                    </div>
                </div>

                {/* Price card */}
                <div className="fade-up" style={{ transitionDelay: "0.3s" }}>
                    <div style={{
                        background: "#fff", borderRadius: 28, padding: "48px 56px",
                        boxShadow: "0 20px 80px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(0,0,0,0.05)",
                        textAlign: "center", maxWidth: 560, margin: "0 auto",
                    }}>
                        {annual && (
                            <span className="badge badge-orange" style={{ marginBottom: 20, display: "inline-flex" }}>
                                Save 15% + Free Home Collection
                            </span>
                        )}
                        <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: "-0.04em", color: "#0a0a0a", lineHeight: 1 }}>
                            ₹{annual ? "1,499" : "1,799"}
                        </div>
                        <div style={{ color: "#888", fontSize: 15, marginBottom: 8 }}>/ month</div>
                        {annual && (
                            <div style={{ color: "#888", fontSize: 14, marginBottom: 32 }}>₹17,988 billed annually</div>
                        )}

                        <a href="/auth" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 17, padding: "18px", marginBottom: 28, display: "flex" }}>
                            Get Started <span className="arrow">→</span>
                        </a>

                        <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
                            {[
                                "100+ biomarker comprehensive annual test",
                                "Personalized AI health plan",
                                "24/7 doctor concierge messaging",
                                "Mobile app access (iOS & Android)",
                                "Home sample collection (Dr. Lal / Metropolis)",
                                "Upload past lab reports",
                                "Ayushman Bharat compatible",
                            ].map(item => (
                                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span style={{ color: "#22c55e", fontSize: 16, flexShrink: 0 }}>✓</span>
                                    <span style={{ fontSize: 14, color: "#444" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
