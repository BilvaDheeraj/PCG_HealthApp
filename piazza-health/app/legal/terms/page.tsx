import PageLayout from "@/components/PageLayout";

export default function TermsPage() {
    return (
        <PageLayout badge="Legal" title="Terms & Conditions" subtitle="Last updated: 01 March 2026">
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    {[
                        { heading: "1. Acceptance of Terms", body: "By creating an account or using any Piazza Health service, you agree to these Terms. If you disagree with any part, you may not access our services." },
                        { heading: "2. Service Description", body: "Piazza Health provides preventive health testing, biomarker analysis, and health intelligence services. We are not a diagnostic or medical treatment provider. Our service is a complement to — not a replacement for — professional medical care." },
                        { heading: "3. Membership & Billing", body: "Memberships are billed annually or monthly as selected. You may cancel at any time; cancellations take effect at the end of the current billing period. Refunds are not provided for partially used periods. We reserve the right to change pricing with 30 days' notice." },
                        { heading: "4. Medical Disclaimer", body: "Results provided by Piazza Health are for informational purposes only and do not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making health decisions based on your results." },
                        { heading: "5. Limitation of Liability", body: "Piazza Health shall not be liable for any indirect, incidental, or consequential damages arising from your use of our service. Our total liability is limited to the amount paid by you in the preceding 12 months." },
                        { heading: "6. Governing Law", body: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra." },
                    ].map(s => (
                        <div key={s.heading} style={{ marginBottom: 44 }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0a0a0a", marginBottom: 12 }}>{s.heading}</h2>
                            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8 }}>{s.body}</p>
                            <div style={{ height: 1, background: "rgba(0,0,0,0.07)", marginTop: 40 }} />
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
