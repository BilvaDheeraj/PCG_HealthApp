import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────
   ACCORDION ROW COMPONENT
───────────────────────────────────────────────────────────────── */
function BiomarkerAccordion({ marker }: { marker: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const isDerived = marker.panels.includes("Derived");

    return (
        <div style={{
            border: isOpen ? "1px solid #FF5500" : "1px solid rgba(0,0,0,0.08)",
            borderRadius: 14,
            background: isOpen ? "rgba(255,85,0,0.01)" : "#fafafa",
            transition: "all 0.2s",
            overflow: "hidden"
        }}>
            {/* Header (Clickable) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "rgba(0,0,0,0.02)"; }}
                onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
                style={{
                    width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between",
                    alignItems: "center", border: "none", background: "transparent", cursor: "pointer",
                    textAlign: "left", transition: "background 0.2s"
                }}
            >
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0a", margin: 0 }}>{marker.name}</h3>
                    {isDerived && (
                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: "100px", background: "rgba(0,0,0,0.06)", color: "#888", fontWeight: 700 }}>
                            ⊕ DERIVED
                        </span>
                    )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div className="panel-tags" style={{ alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                        {marker.panels.map((panel: string) => panel !== "Derived" && (
                            <span key={panel} style={{
                                fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: "6px", marginLeft: 8,
                                background: panel.includes("Advanced") ? "rgba(59,130,246,0.1)" : "rgba(0,0,0,0.05)",
                                color: panel.includes("Advanced") ? "#3b82f6" : "#444", border: "1px solid rgba(0,0,0,0.05)"
                            }}>
                                {panel.includes("Advanced") ? "● " : ""}{panel}
                            </span>
                        ))}
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                        transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        color: isOpen ? "#FF5500" : "#888"
                    }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>

            {/* Expanded Content */}
            <div style={{
                height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0,
                overflow: "hidden", transition: "all 0.3s ease-in-out"
            }}>
                <div style={{ padding: "0 24px 24px" }}>
                    <div style={{ height: 1, background: "rgba(0,0,0,0.06)", marginBottom: 20 }} />

                    <h4 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 8 }}>What it measures</h4>
                    <p style={{ fontSize: 14, color: "#444", lineHeight: 1.6, marginBottom: 20, maxWidth: 800 }}>{marker.desc}</p>

                    {isDerived && marker.inputs.length > 0 && (
                        <div style={{ background: "#f8f8f8", borderRadius: 8, padding: 16, marginBottom: 20, border: "1px solid rgba(0,0,0,0.04)" }}>
                            <h4 style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 12 }}>Derived Inputs</h4>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {marker.inputs.map((input: string) => (
                                    <span key={input} style={{ background: "#fff", padding: "4px 10px", borderRadius: 6, fontSize: 12, color: "#0a0a0a", border: "1px solid rgba(0,0,0,0.08)", fontWeight: 500 }}>
                                        {input}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", paddingTop: 8 }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: "#666", display: "flex", alignItems: "center", gap: 4 }}>
                                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}></span>
                                CLIA-Certified Labs
                            </span>
                            <span style={{ fontSize: 12, color: "#666", display: "flex", alignItems: "center", gap: 4 }}>
                                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }}></span>
                                CAP-Accredited
                            </span>
                        </div>
                        <Link to="/auth" style={{ fontSize: 13, color: "#FF5500", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }} className="hover-underline">
                            Learn more in Piazza App →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE LAYOUT
───────────────────────────────────────────────────────────────── */
export default function Biomarkers() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/api/biomarkers/")
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const [active, setActive] = useState("heart");

    if (loading) {
        return (
            <PageLayout badge="Loading" title="Loading..." subtitle="Fetching biomarkers">
                <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
            </PageLayout>
        );
    }

    const activeCat = categories?.find?.(c => c.id === active) || (categories?.length ? categories[0] : null);
    const totalCount = categories?.reduce?.((sum, c) => sum + (c.count || 0), 0) || 0;

    if (!activeCat) {
        return (
            <PageLayout badge="Error" title="Biomarkers Not Found" subtitle="Could not load the biomarkers list.">
                <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                    <p style={{ color: "#888", fontSize: "15px" }}>No biomarkers data available. Please ensure the backend is running.</p>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout
            badge={`${totalCount}+ Biomarkers Included`}
            title="Your Piazza Health starts with 100+ biomarkers."
            subtitle="Here is everything we test."
        >
            <div style={{ background: "#f8f8f8", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "20px 0" }}>
                <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}></span><span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>NABL-Accredited Labs</span></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}></span><span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>Dr. Lal PathLabs / Metropolis</span></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}></span><span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>CLIA-Certified Processing</span></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}></span><span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>ICMR Registered</span></div>
                </div>
            </div>

            <section style={{ background: "#fff", padding: "80px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
                        <div>
                            <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF5500", fontWeight: 700, marginBottom: 16 }}>What is biomarker testing?</p>
                            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0a0a0a", lineHeight: 1.25, marginBottom: 20 }}>Objective data about what's happening inside your body — right now.</h2>
                            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16 }}>Biomarker testing provides precise, objective data about biological processes and disease risk by measuring specific molecules in your blood sample. Unlike symptom-based medicine — which waits until something goes wrong — biomarker testing gives you a continuous, quantified picture of your health.</p>
                            <div style={{ padding: "16px 20px", background: "rgba(255,85,0,0.06)", border: "1px solid rgba(255,85,0,0.15)", borderRadius: 12 }}>
                                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}><strong style={{ color: "#FF5500" }}>Note on derived biomarkers:</strong> Piazza Health provides derived biomarkers — calculated values from directly measured labs. These are standard clinical tools used by physicians worldwide.</p>
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            {[
                                { icon: "", title: "Early Detection", desc: "Identify silent conditions like cardiovascular disease and insulin resistance." },
                                { icon: "", title: "Baseline Optimisation", desc: "Track energy, metabolism, hormones, and longevity markers over time." },
                                { icon: "", title: "Lifestyle Monitoring", desc: "Measure the biological impact of diet, exercise, and supplements." },
                                { icon: "", title: "Personalised Decisions", desc: "Move away from population-average advice toward personal biology." }
                            ].map(item => (
                                <div key={item.title} style={{ background: "#f8f8f8", borderRadius: 16, padding: 24 }}>
                                    <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>{item.title}</h3>
                                    <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5 }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ background: "#fff", padding: "60px 0 100px" }}>
                <div className="container-wide">
                    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 48, alignItems: "start" }}>

                        {/* Sidebar */}
                        <div style={{ position: "sticky", top: 100 }}>
                            <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", fontWeight: 700, marginBottom: 16 }}>Test categories</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {categories?.map?.(cat => (
                                    <button key={cat.id} onClick={() => setActive(cat.id)} style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        padding: "12px 16px", borderRadius: 12, border: "none", cursor: "pointer",
                                        background: active === cat.id ? "#0a0a0a" : "transparent",
                                        color: active === cat.id ? "#fff" : "#444", textAlign: "left", transition: "all 0.2s"
                                    }}
                                        onMouseEnter={e => { if (active !== cat.id) e.currentTarget.style.background = "#f0f0f0"; }}
                                        onMouseLeave={e => { if (active !== cat.id) e.currentTarget.style.background = "transparent"; }}>
                                        <span style={{ fontSize: 14, fontWeight: 500 }}>{cat.label}</span>
                                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: "100px", background: active === cat.id ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)", color: active === cat.id ? "#fff" : "#888" }}>
                                            {cat.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <div style={{ marginTop: 24, padding: "20px", background: "#f8f8f8", borderRadius: 12, textAlign: "center", border: "1px solid rgba(0,0,0,0.04)" }}>
                                <div style={{ fontSize: 36, fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.03em", lineHeight: 1 }}>{totalCount}</div>
                                <div style={{ fontSize: 13, color: "#888", marginTop: 4, fontWeight: 500 }}>total biomarkers tested</div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div key={active} style={{ animation: "fadeIn 0.3s ease" }}>
                            <div style={{ marginBottom: 36, paddingBottom: 24, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                                    <span style={{ fontSize: 40, background: "#f8f8f8", width: 64, height: 64, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}></span>
                                    <div>
                                        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0a0a0a", marginBottom: 4, letterSpacing: "-0.02em" }}>{activeCat.label}</h2>
                                        <span style={{ fontSize: 13, color: "#FF5500", fontWeight: 700 }}>{activeCat.count} biomarkers in this category</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 16, color: "#555", lineHeight: 1.6 }}>{activeCat.description}</p>
                            </div>

                            {/* Accordion List */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {activeCat?.markers?.map?.((m: any, i: number) => (
                                    <div key={m.name} style={{ animation: `fadeInUp 0.35s ease ${i * 0.04}s both` }}>
                                        <BiomarkerAccordion marker={m} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
        .panel-tags { display: none; }
        @media (min-width: 600px) { .panel-tags { display: flex; } }
        .hover-underline:hover { text-decoration: underline !important; }
        @media (max-width: 900px) {
          .container-wide > div { grid-template-columns: 1fr !important; }
          [style*="position: sticky"] { position: relative !important; top: auto !important; }
        }
      `}</style>
        </PageLayout>
    );
}
