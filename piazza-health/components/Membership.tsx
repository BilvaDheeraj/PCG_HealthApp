"use client";

const features = [
    { icon: "📊", title: "Data Consolidation", desc: "Upload all your past test reports in one place" },
    { icon: "📁", title: "Past Lab Reports", desc: "Import from Dr. Lal, Metropolis, SRL & more" },
    { icon: "🎯", title: "Personalized Plans", desc: "AI-driven health recommendations tailored to you" },
    { icon: "💬", title: "24/7 Concierge", desc: "Message doctors directly, any time of day" },
    { icon: "🔬", title: "Add-on Testing", desc: "Toxins, cancer screening, hormones & more" },
    { icon: "📱", title: "Mobile App", desc: "Available on iOS and Android" },
];

export default function Membership() {
    return (
        <section id="membership" className="section-light" style={{ position: "relative", zIndex: 1, background: "#fff", padding: "100px 0" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <p className="label fade-up" style={{ color: "rgba(0,0,0,0.4)", marginBottom: 12 }}>Membership benefits</p>
                    <h2 className="display-md fade-up" style={{ color: "#0a0a0a", transitionDelay: "0.1s" }}>
                        More than a blood test
                    </h2>
                    <p className="body-lg fade-up" style={{ color: "#666", marginTop: 16, maxWidth: 560, margin: "16px auto 0", transitionDelay: "0.2s" }}>
                        Piazza manages your entire health ecosystem in one place
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                    {features.map((f, i) => (
                        <div key={f.title} className="card-light fade-up" style={{ transitionDelay: `${0.1 * i}s`, position: "relative", overflow: "hidden" }}>
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                                background: "linear-gradient(90deg, #FF5500, #FF8C00)",
                                transform: "scaleX(0)", transformOrigin: "left",
                                transition: "transform 0.4s ease",
                            }} className="feature-accent" />
                            <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#0a0a0a" }}>{f.title}</h3>
                            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.5 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`.card-light:hover .feature-accent { transform: scaleX(1) !important; }`}</style>
        </section>
    );
}
