import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export default function GiftPage() {
    return (
        <PageLayout
            badge="🎁 Gift Health"
            title="Give the Gift of Health Intelligence"
            subtitle="The most meaningful gift you can give someone you love — knowledge about their own body."
        >
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 64 }}>
                        {[
                            { price: "₹17,988", period: "1-Year Membership", icon: "🎁", best: true, includes: ["Full annual test panel (100+ biomarkers)", "AI health dashboard & plan", "24/7 concierge access", "Mobile app for 1 year", "Digital gift card delivered instantly"] },
                            { price: "₹35,976", period: "2-Year Membership", icon: "💎", best: false, includes: ["Everything in 1-year", "Bonus: one add-on test panel", "Priority concierge queue", "Best value for long-term health", "10% extra discount applied"] },
                        ].map(plan => (
                            <div key={plan.period} style={{
                                border: `2px solid ${plan.best ? "#FF5500" : "rgba(0,0,0,0.1)"}`,
                                borderRadius: 24, padding: 36, position: "relative",
                            }}>
                                {plan.best && <span style={{ position: "absolute", top: -14, left: 24, background: "#FF5500", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: "100px" }}>Most Popular</span>}
                                <div style={{ fontSize: 40, marginBottom: 16 }}>{plan.icon}</div>
                                <div style={{ fontSize: 36, fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.03em" }}>{plan.price}</div>
                                <div style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>{plan.period}</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                                    {plan.includes.map(item => (
                                        <div key={item} style={{ display: "flex", gap: 10 }}>
                                            <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>
                                            <span style={{ fontSize: 14, color: "#444" }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/auth" className="btn-primary" style={{ display: "flex", justifyContent: "center", background: plan.best ? "#FF5500" : "#0a0a0a" }}>
                                    Gift This Plan →
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div style={{ background: "#f8f8f8", borderRadius: 20, padding: 32, textAlign: "center" }}>
                        <div style={{ fontSize: 32, marginBottom: 12 }}>📧</div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>How Gift Cards Work</h3>
                        <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
                            After purchase, you'll instantly receive a printable digital gift card with a unique redemption code. The recipient enters the code on our app to activate their membership at any time within 12 months.
                        </p>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
