import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";

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
            <section className="bg-white py-20">
                <div className="container mx-auto px-4 max-w-[800px]">
                    {faqs.map(section => (
                        <div key={section.category} className="mb-14">
                            <h2 className="text-[11px] tracking-widest uppercase text-orange-500 font-black mb-8">{section.category}</h2>
                            {section.items.map((item, i) => {
                                const key = `${section.category}-${i}`;
                                const isOpen = openMap[key];
                                return (
                                    <div key={key} className="border-b border-black/5 group">
                                        <button 
                                            onClick={() => toggle(key)} 
                                            className="flex justify-between items-center w-full py-6 bg-transparent border-none text-left cursor-pointer transition-colors"
                                        >
                                            <span className={`text-base font-bold transition-colors ${isOpen ? 'text-orange-500' : 'text-black group-hover:text-orange-500'}`}>{item.q}</span>
                                            <span className={`w-8 h-8 rounded-full border border-black/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-orange-500 border-orange-500 text-white rotate-45' : 'bg-transparent text-black'}`}>
                                                +
                                            </span>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-gray-500 text-base leading-relaxed prose prose-sm">{item.a}</p>
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
