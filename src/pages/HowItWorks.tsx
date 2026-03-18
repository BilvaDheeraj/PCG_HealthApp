import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

const steps = [
    {
        num: "01", icon: "",
        title: "Book your lab visit",
        desc: "Use our app to find and book a slot at any of 3,000+ partner labs (Dr. Lal PathLabs, Metropolis, SRL Diagnostics) near you — or schedule a home collection.",
        detail: ["No long queues or wait times", "Home collection available", "15-minute in-clinic visit", "Available across 500+ cities in India"],
    },
    {
        num: "02", icon: "",
        title: "A simple blood draw",
        desc: "A trained phlebotomist draws a small blood sample. 100+ biomarkers are measured from a single draw. Safe, certified, and processed by NABL-accredited labs.",
        detail: ["Single blood draw, multiple insights", "NABL-accredited laboratories", "Fasting and non-fasting options", "Results within 7 business days"],
    },
    {
        num: "03", icon: "",
        title: "Your results, decoded",
        desc: "Our AI-powered platform translates your raw lab numbers into clear, actionable insights — with context, trends, and comparisons to optimal ranges (not just 'normal' ranges).",
        detail: ["Plain-English explanations", "Trend tracking over time", "Optimal vs. normal range comparison", "Downloadable PDF report"],
    },
    {
        num: "04", icon: "",
        title: "A personalized action plan",
        desc: "Based on your specific results, Piazza creates a targeted plan covering diet, lifestyle, supplements, and follow-up tests. Not generic advice — your biology, your plan.",
        detail: ["Personalized diet recommendations", "Exercise & sleep guidance", "Supplement suggestions with dosage", "Doctor-reviewed protocols"],
    },
    {
        num: "05", icon: "",
        title: "Ongoing support & check-ins",
        desc: "Message our medical concierge anytime — ask questions about your results, get referrals, or discuss your progress. Your health journey doesn't stop when your report arrives.",
        detail: ["24/7 concierge messaging", "Doctor referrals when needed", "Annual re-testing reminder", "Track progress year over year"],
    },
];

export default function HowItWorks() {
    return (
        <PageLayout
            badge="The Process"
            title="How Piazza Health Works"
            subtitle="From booking to breakthrough — here's exactly what you get as a Piazza Health member."
        >
            {/* Steps */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 max-w-[900px]">
                    {steps.map((step, i) => (
                        <div key={step.num} className="grid grid-cols-[80px_1fr] gap-10 pb-16 relative">
                            {/* Number + line */}
                            <div className="flex flex-col items-center">
                                <div className="w-[60px] h-[60px] rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-base font-black flex-shrink-0">
                                    {step.num}
                                </div>
                                {i < steps.length - 1 && <div className="w-px flex-1 bg-black/10 mt-3" />}
                            </div>
                            {/* Content */}
                            <div className="pb-5">
                                <div className="text-3xl mb-3">{step.icon}</div>
                                <h2 className="text-3xl font-extrabold text-[#0a0a0a] mb-3">{step.title}</h2>
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">{step.desc}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {step.detail.map(d => (
                                        <div key={d} className="flex gap-2 items-start">
                                            <span className="text-green-500 flex-shrink-0 mt-1"></span>
                                            <span className="text-sm text-gray-700">{d}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#0a0a0a] py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Ready to get started?</h2>
                    <p className="text-white/55 mb-8 text-lg">Join 200,000+ members who know their body inside out.</p>
                    <Link to="/auth" className="inline-block bg-[#FF5500] hover:bg-[#FF6611] text-white font-bold py-4 px-10 rounded-full transition-all">
                        Join Piazza Health →
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
}
