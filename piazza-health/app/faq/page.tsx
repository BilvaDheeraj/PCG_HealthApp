"use client";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const faqs = [
    {
        category: "Testing",
        items: [
            { q: "How often do I get tested?", a: "Your membership includes one comprehensive annual test panel (100+ biomarkers). You can also add additional tests throughout the year at reduced member pricing." },
            { q: "Where do I get tested?", a: "At any of 3,000+ Dr. Lal PathLabs, Metropolis, or SRL partner centres across India. Home collection is also available in most major cities for no extra charge." },
            { q: "How long until I get results?", a: "Typically 5–7 business days after your sample is collected. You'll receive an email and in-app notification when your results are ready." },
        ],
    },
    {
        category: "Membership",
        items: [
            { q: "What does my membership include?", a: "Annual 100+ biomarker test, AI-powered health dashboard, personalized action plan, 24/7 doctor concierge messaging, mobile app access, historical trend tracking, and lab report uploads." },
            { q: "Can I share my results with my doctor?", a: "Yes — export a full PDF from the app and share it with any doctor. Many members bring their Piazza report to their GP appointments." },
            { q: "Is there a family plan?", a: "Yes! We offer family memberships for up to 4 members with a 20% discount. Contact us at family@piazzahealth.in for details." },
        ],
    },
    {
        category: "Coverage & Billing",
        items: [
            { q: "Is Piazza Health covered by insurance?", a: "We are in the process of integrating with major corporate health plans. Ayushman Bharat compatibility is available. Check with your HR or insurer using our coverage letter template." },
            { q: "Can I pay with HSA/FSA funds?", a: "Yes, Piazza Health qualifies as a preventive health service. Use your corporate health card or HSA funds for payment." },
            { q: "What payment methods are accepted?", a: "UPI, Net Banking, Credit/Debit cards, EMI (0% interest on select cards), and corporate billing. All payments are secured via Razorpay." },
        ],
    },
    {
        category: "Medical",
        items: [
            { q: "Does Piazza replace my doctor?", a: "No — we're a complement to your existing care. Piazza provides data and insights; your doctor provides clinical diagnosis and treatment. Think of us as your health co-pilot." },
            { q: "What if something comes back abnormal?", a: "Our medical concierge team will proactively reach out to discuss your results, recommend next steps, and help you book a specialist if needed." },
            { q: "Are your labs NABL-accredited?", a: "Yes. All our partner labs (Dr. Lal PathLabs, Metropolis) are NABL-accredited and follow strict quality standards. Results meet the highest clinical accuracy requirements." },
        ],
    },
];

export default function FAQPage() {
    const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
    const toggle = (key: string) => setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <PageLayout
            badge="Frequently Asked Questions"
            title="Everything You Need to Know"
            subtitle="Can't find what you're looking for? Message us at support@piazzahealth.in — we reply within 2 hours."
        >
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    {faqs.map(section => (
                        <div key={section.category} style={{ marginBottom: 56 }}>
                            <h2 style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#FF5500", fontWeight: 700, marginBottom: 24 }}>{section.category}</h2>
                            {section.items.map((item, i) => {
                                const key = `${section.category}-${i}`;
                                const isOpen = openMap[key];
                                return (
                                    <div key={key} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                        <button onClick={() => toggle(key)} style={{
                                            display: "flex", justifyContent: "space-between", alignItems: "center",
                                            width: "100%", padding: "22px 0", background: "none", border: "none",
                                            textAlign: "left", cursor: "pointer", fontSize: 16, fontWeight: 600, color: "#0a0a0a",
                                            transition: "color 0.2s",
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.color = "#FF5500"}
                                            onMouseLeave={e => e.currentTarget.style.color = "#0a0a0a"}
                                        >
                                            <span>{item.q}</span>
                                            <span style={{
                                                width: 28, height: 28, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,0.12)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                flexShrink: 0, transition: "all 0.3s",
                                                background: isOpen ? "#FF5500" : "transparent",
                                                color: isOpen ? "#fff" : "#0a0a0a",
                                                transform: isOpen ? "rotate(45deg)" : "none",
                                                fontSize: 20, lineHeight: "1",
                                            }}>+</span>
                                        </button>
                                        <div style={{ overflow: "hidden", maxHeight: isOpen ? 200 : 0, transition: "max-height 0.4s ease" }}>
                                            <p style={{ paddingBottom: 22, color: "#556", fontSize: 15, lineHeight: 1.7 }}>{item.a}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
