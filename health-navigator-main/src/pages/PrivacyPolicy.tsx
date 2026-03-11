import PageLayout from "@/components/layout/PageLayout";

export default function PrivacyPolicy() {
    return (
        <PageLayout badge="Legal" title="Privacy Policy" subtitle="Last updated: 01 March 2026">
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 max-w-[760px]">
                    {[
                        { heading: "1. Information We Collect", body: "We collect information you provide during registration (name, email, date of birth, mobile number), health data generated through our biomarker tests (lab results, health scores), usage data from our app, and payment information processed securely via Razorpay. We do not store raw payment card numbers." },
                        { heading: "2. How We Use Your Information", body: "Your health data is used solely to generate your personal health report, provide AI-driven recommendations, and support our medical concierge team in answering your questions. We never sell your personal data to third parties. Aggregated, anonymised insights may be used for internal research." },
                        { heading: "3. Data Sharing", body: "We share your data only with: (a) our NABL-accredited lab partners (Dr. Lal PathLabs, Metropolis) strictly for processing your blood tests; (b) our licensed medical concierge physicians; (c) payment processors (Razorpay). All partners are bound by strict data protection agreements." },
                        { heading: "4. Data Security", body: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are ISO 27001 compliant and undergo annual security audits. Access to health data is restricted to authorised personnel only." },
                        { heading: "5. Your Rights", body: "Under the Digital Personal Data Protection Act, 2023 (India), you have the right to access, correct, and delete your personal data. To exercise these rights, email privacy@piazzahealth.in. We will respond within 15 business days." },
                        { heading: "6. Contact", body: "For privacy concerns, contact our Data Protection Officer at privacy@piazzahealth.in or write to: Piazza Health Pvt. Ltd., Level 7, One BKC, Bandra Kurla Complex, Mumbai – 400051, Maharashtra, India." },
                    ].map(s => (
                        <div key={s.heading} className="mb-12">
                            <h2 className="text-xl font-bold text-black mb-4">{s.heading}</h2>
                            <p className="text-base text-gray-600 leading-relaxed">{s.body}</p>
                            <div className="h-px bg-black/5 mt-10" />
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    );
}
