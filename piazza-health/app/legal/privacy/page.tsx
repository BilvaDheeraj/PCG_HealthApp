import PageLayout from "@/components/PageLayout";

export default function PrivacyPage() {
    return (
        <PageLayout badge="Legal" title="Privacy Policy" subtitle="Last updated: 01 March 2026">
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container" style={{ maxWidth: 760 }}>
                    {[
                        { heading: "1. Information We Collect", body: "We collect information you provide during registration (name, email, date of birth, mobile number), health data generated through our biomarker tests (lab results, health scores), usage data from our app, and payment information processed securely via Razorpay. We do not store raw payment card numbers." },
                        { heading: "2. How We Use Your Information", body: "Your health data is used solely to generate your personal health report, provide AI-driven recommendations, and support our medical concierge team in answering your questions. We never sell your personal data to third parties. Aggregated, anonymised insights may be used for internal research." },
                        { heading: "3. Data Sharing", body: "We share your data only with: (a) our NABL-accredited lab partners (Dr. Lal PathLabs, Metropolis) strictly for processing your blood tests; (b) our licensed medical concierge physicians; (c) payment processors (Razorpay). All partners are bound by strict data protection agreements." },
                        { heading: "4. Data Security", body: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are ISO 27001 compliant and undergo annual security audits. Access to health data is restricted to authorised personnel only." },
                        { heading: "5. Your Rights", body: "Under the Digital Personal Data Protection Act, 2023 (India), you have the right to access, correct, and delete your personal data. To exercise these rights, email privacy@piazzahealth.in. We will respond within 15 business days." },
                        { heading: "6. Contact", body: "For privacy concerns, contact our Data Protection Officer at privacy@piazzahealth.in or write to: Piazza Health Pvt. Ltd., Level 7, One BKC, Bandra Kurla Complex, Mumbai – 400051, Maharashtra, India." },
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
