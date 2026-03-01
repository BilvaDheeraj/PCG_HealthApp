"use client";
import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────
   ALL 13 CATEGORIES WITH 130+ BIOMARKERS (SHARED FROM PAGE)
───────────────────────────────────────────────────────────────── */
export const categories = [
    {
        id: "heart",
        emoji: "❤️",
        label: "Heart & Vascular",
        count: 29,
        markers: [
            "Galectin-3 Test", "Non-HDL Cholesterol Test", "HDL Cholesterol Test", "Triglycerides Test",
            "LDL Cholesterol Test", "Cholesterol/HDL Ratio", "LDL/HDL Ratio", "Total Cholesterol",
            "Apolipoprotein B (ApoB)", "Lipoprotein (a)", "LDL P", "Neutrophil-to-HDL Ratio",
            "Triglyceride/HDL Ratio", "Atherogenic Index of Plasma", "Small LDL P", "HDL Size",
            "Large HDL P", "LDL Size", "Large VLDL P", "Atherogenic Coefficient", "LDL/Total Ratio",
            "HDL P", "VLDL Size", "LDL-C/ApoB", "Uric Acid/HDL-C", "TG/ApoB", "Non-HDL-C/ApoB",
            "Lipoprotein fractionation", "ADMA / SDMA Test"
        ],
    },
    {
        id: "liver",
        emoji: "🫀",
        label: "Liver Health",
        count: 13,
        markers: [
            "Alkaline Phosphatase (ALP)", "Albumin/Globulin Ratio", "Albumin", "ALT", "Bilirubin, Total",
            "Globulin", "AST", "GGT", "Bilirubin, Direct", "Bilirubin, Indirect", "GGT/HDL-C Ratio",
            "Indirect/Direct Bilirubin Ratio", "Bilirubin-to-Albumin Ratio"
        ],
    },
    {
        id: "kidney",
        emoji: "🫘",
        label: "Kidney Health",
        count: 9,
        markers: [
            "BUN/Creatinine Ratio", "Calcium", "Potassium", "Carbon Dioxide (CO2)", "Creatinine",
            "Chloride", "Sodium", "eGFR", "BUN"
        ],
    },
    {
        id: "hormones",
        emoji: "⚗️",
        label: "Sex Hormones",
        count: 17,
        markers: [
            "Testosterone, Total", "SHBG", "Testosterone, Bioavailable", "DHEA-S", "Testosterone, Free",
            "FSH", "PSA, Free & Total", "Progesterone", "LH", "Prolactin", "Free Androgen Index",
            "Testosterone/Estradiol", "17-hydroxyprogesterone", "Estradiol", "Mercury", "AMH",
            "Ultra-Sensitive Estradiol"
        ],
    },
    {
        id: "metabolic",
        emoji: "⚡",
        label: "Metabolic Health",
        count: 11,
        markers: [
            "Glucose", "HbA1c", "eAG (mg/dL)", "eAG (mmol/L)", "Uric Acid", "Insulin", "Corrected Calcium",
            "TyG Index", "Leptin", "Cardio IQ Insulin Resistance", "Adiponectin", "Fructosamine"
        ],
    },
    {
        id: "nutrients",
        emoji: "💊",
        label: "Nutrients & Vitamins",
        count: 14,
        markers: [
            "Hemoglobin, Hematocrit, RBC", "MCH, MCV, MCHC", "WBC", "Platelets & MPV", "Total Protein",
            "Vitamin D", "RDW/MCV Ratio", "Vitamin C", "Selenium", "Magnesium", "Vitamin K", "Vitamin E",
            "Vitamin B12", "Zinc"
        ],
    },
    {
        id: "inflammation",
        emoji: "🔥",
        label: "Inflammation",
        count: 8,
        markers: [
            "hs-CRP", "ESR", "Systemic Immune-Inflammation Index", "Ferritin/Albumin Ratio",
            "Monocyte/HDL Ratio", "CRP/Albumin Ratio", "Platelet/Lymphocyte Ratio", "SIRI"
        ],
    },
    {
        id: "thyroid",
        emoji: "🦋",
        label: "Thyroid Health",
        count: 7,
        markers: [
            "TSH", "Free T4 Index", "T3 Uptake", "Thyroxine (T4)", "TPO Antibody", "Thyroglobulin Antibodies", "Free T3"
        ],
    },
    {
        id: "energy",
        emoji: "⚕️",
        label: "Energy",
        count: 6,
        markers: [
            "Ferritin", "Cortisol", "TIBC", "Iron Saturation", "Total Iron", "BMI"
        ],
    },
    {
        id: "immune",
        emoji: "🛡️",
        label: "Immune System",
        count: 8,
        markers: [
            "Lymphocytes", "Monocytes", "Neutrophils", "Eosinophils & Basophils", "Lymphocyte/Monocyte Ratio",
            "Neutrophil/Lymphocyte Ratio", "Autoimmune Screening (ANA, etc)", "Celiac Panel"
        ],
    },
    {
        id: "body",
        emoji: "💪",
        label: "Body Composition",
        count: 1,
        markers: ["IGF-1"],
    },
    {
        id: "dna",
        emoji: "🧬",
        label: "DNA Health",
        count: 4,
        markers: ["Folate", "Homocysteine", "Vitamin B6", "Methylmalonic Acid"],
    },
    {
        id: "aging",
        emoji: "⏳",
        label: "Biological Aging",
        count: 3,
        markers: ["Biological Age", "Pace of Aging", "Health Score"],
    },
];

export default function Biomarkers() {
    const [active, setActive] = useState("heart");
    const activeCategory = categories.find(c => c.id === active)!;

    return (
        <section id="biomarkers" className="section-light" style={{ padding: "100px 0" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <p className="label fade-up" style={{ color: "#FF5500", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 12 }}>What gets tested</p>
                    <h2 className="display-md fade-up" style={{ color: "#0a0a0a", transitionDelay: "0.1s" }}>
                        130+ Biomarker Explorer
                    </h2>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40, justifyContent: "center" }}>
                    {categories.map(cat => (
                        <button key={cat.id} onClick={() => setActive(cat.id)} style={{
                            padding: "10px 22px", borderRadius: "100px", border: "1px solid",
                            borderColor: active === cat.id ? "#0a0a0a" : "rgba(0,0,0,0.12)",
                            background: active === cat.id ? "#0a0a0a" : "transparent",
                            color: active === cat.id ? "#fff" : "#555",
                            fontSize: 14, fontWeight: 500, cursor: "pointer",
                            transition: "all 0.25s ease",
                            display: "flex", gap: 8, alignItems: "center"
                        }}>
                            <span>{cat.emoji}</span> {cat.label}
                        </button>
                    ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 1000, margin: "0 auto" }}>
                    {(activeCategory.markers || []).map((b, i) => (
                        <div key={b} style={{
                            padding: "12px 20px",
                            background: "#fff",
                            border: "1px solid rgba(0,0,0,0.08)",
                            borderRadius: 12, fontSize: 14, color: "#333", fontWeight: 500,
                            transition: "all 0.2s",
                            animation: `fadeInUp 0.3s ease ${i * 0.03}s both`,
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF5500"; e.currentTarget.style.color = "#FF5500"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.color = "#333"; e.currentTarget.style.transform = "none"; }}
                        >{b}</div>
                    ))}
                </div>

                <div style={{ marginTop: 64, textAlign: "center" }}>
                    <Link href="/biomarkers" style={{ display: "inline-flex", padding: "16px 32px", fontSize: 15, fontWeight: 600, color: "#fff", background: "#FF5500", borderRadius: 100, textDecoration: "none", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                        View all 130+ Biomarkers in detail →
                    </Link>
                </div>
            </div>
            <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }`}</style>
        </section>
    );
}
