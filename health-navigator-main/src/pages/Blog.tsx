import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

const posts = [
    { tag: "Longevity", date: "24 Feb 2026", title: "Why Your 'Normal' Blood Test Results May Be Hiding a Problem", excerpt: "Standard lab ranges are based on population averages — not optimal health. Here's the difference between 'normal' and 'optimal', and why it matters for your longevity.", min: 6 },
    { tag: "Nutrition", date: "18 Feb 2026", title: "The Vitamin D Crisis in Urban India: Are You Deficient?", excerpt: "Over 80% of urban Indians are Vitamin D deficient. We break down why — and the cascading effects on immunity, mood, bone health, and metabolic function.", min: 5 },
    { tag: "Heart Health", date: "10 Feb 2026", title: "LDL Is Not the Whole Story: Understanding ApoB and Small Dense LDL", excerpt: "Your total cholesterol number is nearly useless. Learn how particle count, ApoB, and small dense LDL paint a far more accurate picture of your cardiovascular risk.", min: 8 },
    { tag: "Hormones", date: "02 Feb 2026", title: "Testosterone After 30: What Indian Men Need to Know", excerpt: "Testosterone declines ~1% per year after 30. Stress, poor sleep, and processed food accelerate this. Here's how to detect, slow, and address hormonal decline.", min: 7 },
    { tag: "Metabolic Health", date: "25 Jan 2026", title: "HOMA-IR: The Insulin Resistance Test Your Doctor Never Ordered", excerpt: "Insulin resistance begins silently years before diabetes. HOMA-IR is the most accessible marker to detect it early — and Piazza tests it every year.", min: 5 },
];

export default function Blog() {
    return (
        <PageLayout
            badge="Health Intelligence"
            title="The Piazza Blog"
            subtitle="Evidence-based insights to help you understand and optimize your health."
        >
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    {/* Featured post */}
                    <div className="bg-[#0a0a0a] rounded-[32px] p-8 md:p-14 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-xs text-orange-500 font-black uppercase tracking-widest">Featured · {posts[0].tag}</span>
                            <h2 className="text-3xl font-black text-white my-4 leading-tight tracking-tight">{posts[0].title}</h2>
                            <p className="text-white/50 text-base leading-relaxed mb-8">{posts[0].excerpt}</p>
                            <Link to="#" className="inline-flex gap-2 items-center text-orange-500 font-bold text-sm hover:underline">
                                Read article →
                            </Link>
                        </div>
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl aspect-[16/10] flex items-center justify-center text-7xl shadow-inner">
                            🧬
                        </div>
                    </div>

                    {/* Post grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(1).map((post, i) => (
                            <div key={post.title} className="rounded-[24px] border border-black/5 overflow-hidden transition-all hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-black/5 group cursor-pointer bg-white">
                                <div className="h-44 bg-gray-50 flex items-center justify-center text-5xl transition-all group-hover:bg-orange-500/5">
                                    {["⚡", "❤️", "⚗️", "🍽️"][i % 4]}
                                </div>
                                <div className="p-7">
                                    <div className="flex gap-2 items-center mb-3">
                                        <span className="text-[10px] text-orange-500 font-black uppercase tracking-widest">{post.tag}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{post.min} min read</span>
                                    </div>
                                    <h3 className="text-lg font-black text-black leading-snug mb-3 group-hover:text-orange-500 transition-colors uppercase tracking-tight">{post.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 italic">{post.excerpt.split(".")[0]}.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
