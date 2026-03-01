"use client";

export default function Dashboard() {
    return (
        <section style={{ position: "relative", zIndex: 1, background: "#0a0a0a", padding: "100px 0", overflow: "hidden" }}>
            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
                    <div>
                        <p className="label fade-up" style={{ color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Your health, decoded</p>
                        <h2 className="display-md fade-up" style={{ color: "#fff", marginBottom: 24, transitionDelay: "0.1s" }}>
                            Clarity no doctor ever gave you
                        </h2>
                        <blockquote className="fade-up" style={{
                            transitionDelay: "0.2s",
                            borderLeft: "3px solid #FF5500",
                            paddingLeft: 24, margin: "32px 0",
                            fontSize: "clamp(18px, 2vw, 24px)", fontStyle: "italic",
                            lineHeight: 1.5, color: "rgba(255,255,255,0.8)"
                        }}>
                            "Piazza Health gave me what no doctor, supplement, or app ever could — <strong style={{ color: "#fff" }}>clarity.</strong>"
                        </blockquote>
                        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 32 }}>— Priya Sharma, Pune · Member since 2024</p>
                        <a href="#reviews" className="btn-ghost-dark" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                            Read reviews →
                        </a>
                    </div>

                    {/* Mock Dashboard UI */}
                    <div className="fade-up" style={{ transitionDelay: "0.3s" }}>
                        <div style={{
                            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 24, padding: 28, backdropFilter: "blur(10px)",
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                                <div>
                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Health Score</div>
                                    <div style={{ fontSize: 42, fontWeight: 800, color: "#fff" }}>87<span style={{ fontSize: 20, color: "rgba(255,255,255,0.4)" }}>/100</span></div>
                                </div>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "conic-gradient(#FF5500 314deg, rgba(255,255,255,0.08) 0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#0a0a0a" }} />
                                </div>
                            </div>
                            {[
                                { label: "Heart Risk", val: "Low", pct: 15, color: "#22c55e" },
                                { label: "Blood Sugar", val: "Normal", pct: 45, color: "#3b82f6" },
                                { label: "Vitamin D", val: "Low", pct: 28, color: "#f59e0b" },
                                { label: "Thyroid", val: "Normal", pct: 60, color: "#22c55e" },
                            ].map(item => (
                                <div key={item.label} style={{ marginBottom: 16 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
                                        <span style={{ fontSize: 12, color: item.color, fontWeight: 600 }}>{item.val}</span>
                                    </div>
                                    <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                                        <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 2, transition: "width 1s ease" }} />
                                    </div>
                                </div>
                            ))}
                            <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(255,85,0,0.1)", border: "1px solid rgba(255,85,0,0.2)", borderRadius: 12 }}>
                                <div style={{ fontSize: 12, color: "#FF5500", fontWeight: 600, marginBottom: 4 }}>💡 Recommendation</div>
                                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Consider Vitamin D supplementation and 20 min daily sunlight</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`@media (max-width: 768px) { section > .container > div { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
        </section>
    );
}
