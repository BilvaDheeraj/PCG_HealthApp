"use client";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export default function PricingPage() {
    const [annual, setAnnual] = useState(true);

    return (
        <PageLayout
            badge="Simple Pricing"
            title="One Plan, Everything Included"
            subtitle="No hidden fees. No add-on surprises. Just complete health intelligence for one straightforward price."
        >
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container" style={{ maxWidth: 640 }}>
                    {/* Toggle */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
                        <div style={{ display: "inline-flex", background: "#f0f0f0", borderRadius: "100px", padding: 4, gap: 4 }}>
                            {["Annual (Save 15%)", "Monthly"].map((label, i) => (
                                <button key={label} onClick={() => setAnnual(i === 0)} style={{
                                    padding: "10px 28px", borderRadius: "100px", border: "none", cursor: "pointer",
                                    background: (i === 0) === annual ? "#0a0a0a" : "transparent",
                                    color: (i === 0) === annual ? "#fff" : "#666",
                                    fontSize: 14, fontWeight: 500, transition: "all 0.3s",
                                }}>{label}</button>
                            ))}
                        </div>
                    </div>

                    {/* Card */}
                    <div style={{ border: "2px solid #FF5500", borderRadius: 28, padding: "48px 52px", textAlign: "center", boxShadow: "0 20px 80px rgba(255,85,0,0.1)" }}>
                        {annual && <span className="badge badge-orange" style={{ marginBottom: 20, display: "inline-flex" }}>🎉 Save ₹2,988 annually</span>}
                        <div style={{ fontSize: 80, fontWeight: 900, letterSpacing: "-0.04em", color: "#0a0a0a", lineHeight: 1 }}>
                            ₹{annual ? "1,499" : "1,799"}
                        </div>
                        <div style={{ color: "#888", fontSize: 16, marginBottom: 4 }}>per month</div>
                        {annual && <div style={{ color: "#aaa", fontSize: 14, marginBottom: 32 }}>₹17,988 billed once per year</div>}

                        <Link href="/auth" className="btn-primary" style={{ display: "flex", justifyContent: "center", fontSize: 18, padding: "18px", marginBottom: 36, marginTop: 28 }}>
                            Start Your Membership →
                        </Link>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, textAlign: "left" }}>
                            {[
                                "100+ biomarker annual test", "AI-powered health plan",
                                "24/7 doctor concierge", "Mobile app (iOS & Android)",
                                "Home sample collection", "Upload past lab reports",
                                "Annual trend tracking", "Referrals when needed",
                                "Ayushman Bharat compatible", "NABL-accredited labs",
                            ].map(item => (
                                <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                                    <span style={{ color: "#22c55e", flexShrink: 0, fontSize: 14 }}>✓</span>
                                    <span style={{ fontSize: 13, color: "#444" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comparison */}
                    <div style={{ marginTop: 48, background: "#f8f8f8", borderRadius: 20, padding: 32 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Compare the value</h3>
                        {[
                            { label: "Traditional executive health check", price: "₹15,000–₹1,25,000/year", cross: true },
                            { label: "Basic annual blood test (standalone)", price: "₹3,000–₹8,000, no insights", cross: true },
                            { label: "Piazza Health (annual)", price: "₹17,988/year — full intelligence", cross: false },
                        ].map(row => (
                            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.07)", gap: 12 }}>
                                <span style={{ fontSize: 14, color: "#444" }}>{row.label}</span>
                                <span style={{ fontSize: 14, fontWeight: 600, color: row.cross ? "#aaa" : "#22c55e", textDecoration: row.cross ? "line-through" : "none", whiteSpace: "nowrap" }}>{row.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
