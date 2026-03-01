"use client";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

const reviews = [
    { name: "Arjun Mehta", city: "Mumbai", role: "Software Engineer, 34", rating: 5, quote: "Piazza detected my borderline LDL and high homocysteine — two things my annual check-up missed for years. My cardiologist was genuinely surprised by the depth of the report. This isn't just a blood test, it's a full health audit.", tag: "Heart Health" },
    { name: "Priya Sharma", city: "Pune", role: "Marketing Manager, 29", rating: 5, quote: "Piazza Health gave me what no doctor, supplement, or app ever could — clarity. I finally understand what's happening in my body. My Vitamin D was critically low and my cortisol was through the roof. 3 months in, I feel like a different person.", tag: "Overall Wellness" },
    { name: "Dr. Sunita Pillai", city: "Bengaluru", role: "Physician, 42", rating: 5, quote: "As a doctor, I'm skeptical of consumer health tech. But Piazza's biomarker depth, optimal ranges (not just 'normal'), and the AI-driven insights genuinely impressed me. I now recommend it to my patients.", tag: "Doctor Perspective" },
    { name: "Rohit Gupta", city: "Delhi", role: "Entrepreneur, 37", rating: 5, quote: "₹1,499 a month for this level of insight? I used to spend ₹15,000 on a basic health check that told me nothing. Piazza gives me data-driven answers about my testosterone, thyroid, and metabolic health every year.", tag: "Value for Money" },
    { name: "Ananya Reddy", city: "Hyderabad", role: "Product Designer, 26", rating: 5, quote: "The home collection was so convenient — no fasting clinic trips. My results came with a beautiful dashboard. I found I had early-stage insulin resistance. Caught it before any symptoms. Absolutely worth it.", tag: "Convenience" },
    { name: "Vikram Nair", city: "Chennai", role: "Teacher, 52", rating: 5, quote: "After 50, every year counts. Piazza's age-related insights — biological age, inflammatory markers, kidney health — gave me a clear roadmap. My GP was impressed with how prepared I came to my next appointment.", tag: "Longevity" },
];

export default function ReviewsPage() {
    return (
        <PageLayout
            badge="Community Reviews"
            title="Loved Across India"
            subtitle="Real stories from Piazza Health members who transformed their understanding of their own health."
        >
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container">
                    {/* Stars summary */}
                    <div style={{ textAlign: "center", marginBottom: 64 }}>
                        <div style={{ fontSize: 56, fontWeight: 900, color: "#0a0a0a", lineHeight: 1 }}>4.9</div>
                        <div style={{ display: "flex", gap: 4, justifyContent: "center", margin: "8px 0" }}>
                            {[1, 2, 3, 4, 5].map(n => <span key={n} style={{ fontSize: 24, color: "#FFD700" }}>★</span>)}
                        </div>
                        <p style={{ color: "#888", fontSize: 14 }}>Based on 4,800+ verified member reviews</p>
                    </div>

                    {/* Review grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
                        {reviews.map((r) => (
                            <div key={r.name} style={{
                                background: "#f9f9f9", border: "1px solid rgba(0,0,0,0.07)",
                                borderRadius: 20, padding: 32,
                                transition: "all 0.3s",
                            }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 50px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                            >
                                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "100px", background: "rgba(255,85,0,0.1)", color: "#FF5500", fontSize: 12, fontWeight: 600, marginBottom: 20 }}>{r.tag}</span>
                                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                                    {[1, 2, 3, 4, 5].map(n => <span key={n} style={{ color: "#FFD700", fontSize: 14 }}>★</span>)}
                                </div>
                                <p style={{ fontSize: 15, color: "#333", lineHeight: 1.7, marginBottom: 24 }}>"{r.quote}"</p>
                                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #FF5500, #FF8C00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 14 }}>
                                        {r.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14, color: "#0a0a0a" }}>{r.name}</div>
                                        <div style={{ fontSize: 12, color: "#888" }}>{r.role} · {r.city}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section style={{ background: "#0a0a0a", padding: "80px 0", textAlign: "center" }}>
                <div className="container">
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Join 200,000+ healthy Indians</h2>
                    <Link href="/auth" className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>Start Your Journey →</Link>
                </div>
            </section>
        </PageLayout>
    );
}
