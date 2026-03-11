import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

export default function Manifesto() {
    return (
        <PageLayout
            badge="Our Why"
            title="The Piazza Manifesto"
            subtitle="We believe the future of healthcare is proactive, not reactive."
        >
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 max-w-[760px]">
                    {[
                        {
                            label: "01 — The Problem",
                            heading: "Healthcare is broken. And it starts with how we measure health.",
                            body: "Today, most Indians visit a doctor only when something hurts. By then, the disease has had years — sometimes decades — to quietly take root. Our entire healthcare system is optimized for treating illness, not preventing it. That has to change.",
                        },
                        {
                            label: "02 — The Opportunity",
                            heading: "Your body speaks in data.",
                            body: "Before you feel sick, your biomarkers shift. Cholesterol climbs. Inflammation rises. Hormones decline. Blood sugar creeps toward resistance. These signals are measurable, interpretable, and — crucially — actionable. But nobody has ever given you access to this data in a clear, affordable, readable way. Until now.",
                        },
                        {
                            label: "03 — Who We're For",
                            heading: "We built Piazza for curious, proactive people.",
                            body: "People who want to understand their biology, not just their symptoms. People who believe that prevention is the most powerful medicine. People who know that their body is the most important asset they will ever own — and who want to treat it that way.",
                        },
                        {
                            label: "04 — Our Philosophy",
                            heading: "We believe optimal is not the same as normal.",
                            body: "Standard 'normal ranges' are based on population averages — which include sick and sedentary people. At Piazza, we use optimal ranges, validated by longevity research, to give you a true picture of your health — not just a passing grade.",
                        },
                        {
                            label: "05 — Our Mission",
                            heading: "India deserves world-class preventive health.",
                            body: "Executive health programs in five-star hospitals cost ₹1,25,000 a year and are accessible to a tiny fraction of the population. We built Piazza to make the same standard of insight available to every Indian professional — for ₹1,499 a month.",
                        },
                        {
                            label: "06 — The Call to Action",
                            heading: "Health is your greatest superpower. It's time to unlock it.",
                            body: "We're not building a diagnostic company. We're building a movement — one that puts data, clarity, and control back in your hands. Join us.",
                        },
                    ].map((section, i) => (
                        <div key={i} className="mb-16 last:mb-0">
                            <span className="text-orange-500 block text-[11px] font-black uppercase tracking-widest mb-3">{section.label}</span>
                            <h2 className="text-2xl font-black text-black mb-5 leading-tight tracking-tight">
                                {section.heading}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium opacity-80">{section.body}</p>
                            {i < 5 && <div className="h-px bg-black/5 mt-14" />}
                        </div>
                    ))}
                    <div className="text-center mt-16 pt-10">
                        <Link to="/auth" className="inline-block bg-[#FF5500] hover:bg-[#FF6611] text-white font-bold py-5 px-12 rounded-full transition-all text-lg shadow-xl shadow-orange-500/20">
                            Join the Movement →
                        </Link>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
