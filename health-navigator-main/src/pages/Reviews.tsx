import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

const reviews = [
    { name: "Arjun Mehta", city: "Mumbai", role: "Software Engineer, 34", rating: 5, quote: "Piazza detected my borderline LDL and high homocysteine — two things my annual check-up missed for years. My cardiologist was genuinely surprised by the depth of the report. This isn't just a blood test, it's a full health audit.", tag: "Heart Health" },
    { name: "Priya Sharma", city: "Pune", role: "Marketing Manager, 29", rating: 5, quote: "Piazza Health gave me what no doctor, supplement, or app ever could — clarity. I finally understand what's happening in my body. My Vitamin D was critically low and my cortisol was through the roof. 3 months in, I feel like a different person.", tag: "Overall Wellness" },
    { name: "Dr. Sunita Pillai", city: "Bengaluru", role: "Physician, 42", rating: 5, quote: "As a doctor, I'm skeptical of consumer health tech. But Piazza's biomarker depth, optimal ranges (not just 'normal'), and the AI-driven insights genuinely impressed me. I now recommend it to my patients.", tag: "Doctor Perspective" },
    { name: "Rohit Gupta", city: "Delhi", role: "Entrepreneur, 37", rating: 5, quote: "₹1,499 a month for this level of insight? I used to spend ₹15,000 on a basic health check that told me nothing. Piazza gives me data-driven answers about my testosterone, thyroid, and metabolic health every year.", tag: "Value for Money" },
    { name: "Ananya Reddy", city: "Hyderabad", role: "Product Designer, 26", rating: 5, quote: "The home collection was so convenient — no fasting clinic trips. My results came with a beautiful dashboard. I found I had early-stage insulin resistance. Caught it before any symptoms. Absolutely worth it.", tag: "Convenience" },
    { name: "Vikram Nair", city: "Chennai", role: "Teacher, 52", rating: 5, quote: "After 50, every year counts. Piazza's age-related insights — biological age, inflammatory markers, kidney health — gave me a clear roadmap. My GP was impressed with how prepared I came to my next appointment.", tag: "Longevity" },
];

export default function Reviews() {
    return (
        <PageLayout
            badge="Community Reviews"
            title="Loved Across India"
            subtitle="Real stories from Piazza Health members who transformed their understanding of their own health."
        >
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    {/* Stars summary */}
                    <div className="text-center mb-16">
                        <div className="text-6xl font-black text-[#0a0a0a] leading-none mb-2">4.9</div>
                        <div className="flex gap-1 justify-center mb-2">
                            {[1, 2, 3, 4, 5].map(n => <span key={n} className="text-2xl text-yellow-500">★</span>)}
                        </div>
                        <p className="text-gray-400 text-sm">Based on 4,800+ verified member reviews</p>
                    </div>

                    {/* Review grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((r) => (
                            <div key={r.name} className="bg-gray-50 border border-black/5 rounded-[24px] p-8 transition-all hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-black/5">
                                <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase mb-5 tracking-widest">{r.tag}</span>
                                <div className="flex gap-0.5 mb-4">
                                    {[1, 2, 3, 4, 5].map(n => <span key={n} className="text-yellow-500 text-sm">★</span>)}
                                </div>
                                <p className="text-base text-gray-700 leading-relaxed mb-6 italic opacity-90">"{r.quote}"</p>
                                <div className="flex gap-3 items-center">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5500] to-[#FF8C00] flex items-center justify-center font-bold text-white text-sm">
                                        {r.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-[#0a0a0a]">{r.name}</div>
                                        <div className="text-[11px] text-gray-400 font-medium uppercase tracking-tight">{r.role} · {r.city}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="bg-[#0a0a0a] py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Join 200,000+ healthy Indians</h2>
                    <Link to="/auth" className="inline-block bg-[#FF5500] hover:bg-[#FF6611] text-white font-bold py-4 px-10 rounded-full transition-all text-base">
                        Start Your Journey →
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
}
