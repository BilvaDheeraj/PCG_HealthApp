import PageLayout from "@/components/PageLayout";
import Link from "next/link";

const steps = [
    {
        num: "01", icon: "📅",
        title: "Book your lab visit",
        desc: "Use our app to find and book a slot at any of 3,000+ partner labs (Dr. Lal PathLabs, Metropolis, SRL Diagnostics) near you — or schedule a home collection.",
        detail: ["No long queues or wait times", "Home collection available", "15-minute in-clinic visit", "Available across 500+ cities in India"],
    },
    {
        num: "02", icon: "🩸",
        title: "A simple blood draw",
        desc: "A trained phlebotomist draws a small blood sample. 100+ biomarkers are measured from a single draw. Safe, certified, and processed by NABL-accredited labs.",
        detail: ["Single blood draw, multiple insights", "NABL-accredited laboratories", "Fasting and non-fasting options", "Results within 7 business days"],
    },
    {
        num: "03", icon: "📊",
        title: "Your results, decoded",
        desc: "Our AI-powered platform translates your raw lab numbers into clear, actionable insights — with context, trends, and comparisons to optimal ranges (not just 'normal' ranges).",
        detail: ["Plain-English explanations", "Trend tracking over time", "Optimal vs. normal range comparison", "Downloadable PDF report"],
    },
    {
        num: "04", icon: "🎯",
        title: "A personalized action plan",
        desc: "Based on your specific results, Piazza creates a targeted plan covering diet, lifestyle, supplements, and follow-up tests. Not generic advice — your biology, your plan.",
        detail: ["Personalized diet recommendations", "Exercise & sleep guidance", "Supplement suggestions with dosage", "Doctor-reviewed protocols"],
    },
    {
        num: "05", icon: "💬",
        title: "Ongoing support & check-ins",
        desc: "Message our medical concierge anytime — ask questions about your results, get referrals, or discuss your progress. Your health journey doesn't stop when your report arrives.",
        detail: ["24/7 concierge messaging", "Doctor referrals when needed", "Annual re-testing reminder", "Track progress year over year"],
    },
];

export default function HowItWorksPage() {
    return (
        <PageLayout
            badge="The Process"
            title="How Piazza Health Works"
            subtitle="From booking to breakthrough — here's exactly what you get as a Piazza Health member."
        >
            {/* Steps */}
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container" style={{ maxWidth: 900 }}>
                    {steps.map((step, i) => (
                        <div key={step.num} style={{
                            display: "grid", gridTemplateColumns: "80px 1fr",
                            gap: 40, paddingBottom: 64,
                            borderLeft: i < steps.length - 1 ? "none" : "none",
                            position: "relative",
                        }}>
                            {/* Number + line */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{
                                    width: 60, height: 60, borderRadius: "50%",
                                    background: "#0a0a0a", color: "#fff",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 16, fontWeight: 800, flexShrink: 0,
                                }}>{step.num}</div>
                                {i < steps.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(0,0,0,0.1)", marginTop: 12 }} />}
                            </div>
                            {/* Content */}
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ fontSize: 32, marginBottom: 12 }}>{step.icon}</div>
                                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0a0a0a", marginBottom: 12 }}>{step.title}</h2>
                                <p style={{ fontSize: 16, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>{step.desc}</p>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                    {step.detail.map(d => (
                                        <div key={d} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                            <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }}>✓</span>
                                            <span style={{ fontSize: 14, color: "#444" }}>{d}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: "#0a0a0a", padding: "80px 0", textAlign: "center" }}>
                <div className="container">
                    <h2 style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Ready to get started?</h2>
                    <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 32, fontSize: 16 }}>Join 200,000+ members who know their body inside out.</p>
                    <Link href="/auth" className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>Join Piazza Health →</Link>
                </div>
            </section>
        </PageLayout>
    );
}
