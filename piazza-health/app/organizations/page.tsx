"use client";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

const benefits = [
    { icon: "📊", title: "Team Health Dashboard", desc: "See aggregate (anonymised) health trends across your organization" },
    { icon: "💰", title: "15% Group Discount", desc: "Preferential pricing for teams of 5 or more" },
    { icon: "🧾", title: "GST Invoice & TDS", desc: "Clean invoicing for your finance team, GSTIN compliant" },
    { icon: "📍", title: "On-site Camp Option", desc: "We bring the lab to your office with a phlebotomist" },
    { icon: "📋", title: "HR Health Reports", desc: "Quarterly wellness insights for your HR team" },
    { icon: "🔒", title: "100% Data Privacy", desc: "Individual reports are never shared with employers" },
];

export default function OrganizationsPage() {
    return (
        <PageLayout
            badge="For Teams"
            title="Piazza Health for Organizations"
            subtitle="Give your team the health intelligence they deserve. Reduce absenteeism, boost productivity, and demonstrate you care."
        >
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, marginBottom: 80 }}>
                        {benefits.map(b => (
                            <div key={b.title} style={{ padding: 32, border: "1px solid rgba(0,0,0,0.08)", borderRadius: 20, transition: "all 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF5500"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(255,85,0,0.08)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <div style={{ fontSize: 36, marginBottom: 16 }}>{b.icon}</div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{b.title}</h3>
                                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{b.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pricing table */}
                    <div style={{ background: "#0a0a0a", borderRadius: 24, padding: 56, textAlign: "center" }}>
                        <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Team Pricing</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginTop: 40 }}>
                            {[
                                { size: "5–20 members", price: "₹1,274", save: "Save 15%" },
                                { size: "21–100 members", price: "₹1,199", save: "Save 20%" },
                                { size: "100+ members", price: "Custom", save: "Enterprise" },
                            ].map(tier => (
                                <div key={tier.size} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 28 }}>
                                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>{tier.size}</div>
                                    <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{tier.price}</div>
                                    <div style={{ fontSize: 12, color: "#FF5500", marginTop: 4, fontWeight: 600 }}>{tier.save}</div>
                                </div>
                            ))}
                        </div>
                        <Link href="mailto:teams@piazzahealth.in" className="btn-primary" style={{ marginTop: 40, fontSize: 16, padding: "16px 40px", display: "inline-flex" }}>
                            Contact Our Team →
                        </Link>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
