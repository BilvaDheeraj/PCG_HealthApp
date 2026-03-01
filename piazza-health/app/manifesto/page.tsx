import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export default function ManifestoPage() {
    return (
        <PageLayout
            badge="Our Why"
            title="The Piazza Manifesto"
            subtitle="We believe the future of healthcare is proactive, not reactive."
        >
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    {[
                        {
                            heading: "Healthcare is broken. And it starts with how we measure health.",
                            body: "Today, most Indians visit a doctor only when something hurts. By then, the disease has had years — sometimes decades — to quietly take root. Our entire healthcare system is optimized for treating illness, not preventing it. That has to change.",
                        },
                        {
                            heading: "Your body speaks in data.",
                            body: "Before you feel sick, your biomarkers shift. Cholesterol climbs. Inflammation rises. Hormones decline. Blood sugar creeps toward resistance. These signals are measurable, interpretable, and — crucially — actionable. But nobody has ever given you access to this data in a clear, affordable, readable way. Until now.",
                        },
                        {
                            heading: "We built Piazza for curious, proactive people.",
                            body: "People who want to understand their biology, not just their symptoms. People who believe that prevention is the most powerful medicine. People who know that their body is the most important asset they will ever own — and who want to treat it that way.",
                        },
                        {
                            heading: "We believe optimal is not the same as normal.",
                            body: "Standard 'normal ranges' are based on population averages — which include sick and sedentary people. At Piazza, we use optimal ranges, validated by longevity research, to give you a true picture of your health — not just a passing grade.",
                        },
                        {
                            heading: "India deserves world-class preventive health.",
                            body: "Executive health programs in five-star hospitals cost ₹1,25,000 a year and are accessible to a tiny fraction of the population. We built Piazza to make the same standard of insight available to every Indian professional — for ₹1,499 a month.",
                        },
                        {
                            heading: "Health is your greatest superpower. It's time to unlock it.",
                            body: "We're not building a diagnostic company. We're building a movement — one that puts data, clarity, and control back in your hands. Join us.",
                        },
                    ].map((section, i) => (
                        <div key={i} style={{ marginBottom: 56 }}>
                            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0a0a0a", marginBottom: 16, lineHeight: 1.3 }}>
                                {i === 0 && <span style={{ color: "#FF5500", display: "block", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>01 — The Problem</span>}
                                {i === 1 && <span style={{ color: "#FF5500", display: "block", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>02 — The Opportunity</span>}
                                {i === 2 && <span style={{ color: "#FF5500", display: "block", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>03 — Who We're For</span>}
                                {i === 3 && <span style={{ color: "#FF5500", display: "block", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>04 — Our Philosophy</span>}
                                {i === 4 && <span style={{ color: "#FF5500", display: "block", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>05 — Our Mission</span>}
                                {i === 5 && <span style={{ color: "#FF5500", display: "block", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>06 — The Call to Action</span>}
                                {section.heading}
                            </h2>
                            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.8 }}>{section.body}</p>
                            {i < 5 && <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginTop: 40 }} />}
                        </div>
                    ))}
                    <div style={{ textAlign: "center", marginTop: 32 }}>
                        <Link href="/auth" className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>Join the Movement →</Link>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
