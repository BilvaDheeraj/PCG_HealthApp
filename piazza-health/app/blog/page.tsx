"use client";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

const posts = [
    { tag: "Longevity", date: "24 Feb 2026", title: "Why Your 'Normal' Blood Test Results May Be Hiding a Problem", excerpt: "Standard lab ranges are based on population averages — not optimal health. Here's the difference between 'normal' and 'optimal', and why it matters for your longevity.", min: 6 },
    { tag: "Nutrition", date: "18 Feb 2026", title: "The Vitamin D Crisis in Urban India: Are You Deficient?", excerpt: "Over 80% of urban Indians are Vitamin D deficient. We break down why — and the cascading effects on immunity, mood, bone health, and metabolic function.", min: 5 },
    { tag: "Heart Health", date: "10 Feb 2026", title: "LDL Is Not the Whole Story: Understanding ApoB and Small Dense LDL", excerpt: "Your total cholesterol number is nearly useless. Learn how particle count, ApoB, and small dense LDL paint a far more accurate picture of your cardiovascular risk.", min: 8 },
    { tag: "Hormones", date: "02 Feb 2026", title: "Testosterone After 30: What Indian Men Need to Know", excerpt: "Testosterone declines ~1% per year after 30. Stress, poor sleep, and processed food accelerate this. Here's how to detect, slow, and address hormonal decline.", min: 7 },
    { tag: "Metabolic Health", date: "25 Jan 2026", title: "HOMA-IR: The Insulin Resistance Test Your Doctor Never Ordered", excerpt: "Insulin resistance begins silently years before diabetes. HOMA-IR is the most accessible marker to detect it early — and Piazza tests it every year.", min: 5 },
    { tag: "Sleep", date: "15 Jan 2026", title: "How Poor Sleep Destroys Your Biomarkers: A Complete Guide", excerpt: "From cortisol spikes to immune suppression — a single week of disrupted sleep can significantly skew your lab results. The research is clear. Are you sleeping enough?", min: 6 },
];

export default function BlogPage() {
    return (
        <PageLayout
            badge="Health Intelligence"
            title="The Piazza Blog"
            subtitle="Evidence-based insights to help you understand and optimize your health."
        >
            <section style={{ background: "#fff", padding: "80px 0" }}>
                <div className="container">
                    {/* Featured post */}
                    <div style={{ background: "#0a0a0a", borderRadius: 24, padding: 48, marginBottom: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
                        <div>
                            <span style={{ fontSize: 12, color: "#FF5500", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Featured · {posts[0].tag}</span>
                            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "12px 0 16px", lineHeight: 1.3 }}>{posts[0].title}</h2>
                            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{posts[0].excerpt}</p>
                            <a href="#" style={{ display: "inline-flex", gap: 6, color: "#FF5500", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Read article →</a>
                        </div>
                        <div style={{ background: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.15)", borderRadius: 16, aspectRatio: "16/10", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🧬</div>
                    </div>

                    {/* Post grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
                        {posts.slice(1).map(post => (
                            <div key={post.title} style={{ borderRadius: 20, border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", transition: "all 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 50px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                            >
                                <div style={{ height: 160, background: "linear-gradient(135deg, #f8f8f8, #f0f0f0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                                    {["⚡", "❤️", "⚗️", "🍽️", "😴"][posts.slice(1).indexOf(post) % 5]}
                                </div>
                                <div style={{ padding: 24 }}>
                                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                                        <span style={{ fontSize: 11, color: "#FF5500", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{post.tag}</span>
                                        <span style={{ fontSize: 11, color: "#aaa" }}>· {post.min} min read · {post.date}</span>
                                    </div>
                                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0a0a0a", lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h3>
                                    <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{post.excerpt.split(".")[0]}.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
