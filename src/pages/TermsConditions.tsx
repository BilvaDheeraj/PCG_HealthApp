import PageLayout from "@/components/layout/PageLayout";

export default function TermsConditions() {
    return (
        <PageLayout badge="Legal" title="Terms & Conditions" subtitle="Last updated: 01 March 2026">
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 max-w-[760px]">
                    {[
                        { heading: "1. Acceptance of Terms", body: "By creating an account or using any Piazza Health service, you agree to these Terms. If you disagree with any part, you may not access our services." },
                        { heading: "2. Service Description", body: "Piazza Health provides preventive health testing, biomarker analysis, and health intelligence services. We are not a diagnostic or medical treatment provider. Our service is a complement to — not a replacement for — professional medical care." },
                        { heading: "3. Membership & Billing", body: "Memberships are billed annually or monthly as selected. You may cancel at any time; cancellations take effect at the end of the current billing period. Refunds are not provided for partially used periods. We reserve the right to change pricing with 30 days' notice." },
                        { heading: "4. Medical Disclaimer", body: "Results provided by Piazza Health are for informational purposes only and do not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making health decisions based on your results." },
                        { heading: "5. Limitation of Liability", body: "Piazza Health shall not be liable for any indirect, incidental, or consequential damages arising from your use of our service. Our total liability is limited to the amount paid by you in the preceding 12 months." },
                        { heading: "6. Governing Law", body: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra." },
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
