import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: "heart", emoji: "❤️", label: "Heart & Vascular", count: 29, markers: ["Galectin-3 Test", "HDL Cholesterol Test", "LDL Cholesterol Test", "Total Cholesterol", "Apolipoprotein B (ApoB)", "Triglycerides Test", "Lipoprotein (a)", "Atherogenic Index of Plasma", "And 21 more..."] },
  { id: "liver", emoji: "🫀", label: "Liver Health", count: 13, markers: ["ALT", "AST", "GGT", "Bilirubin, Total", "Albumin", "Alkaline Phosphatase (ALP)", "And 7 more..."] },
  { id: "kidney", emoji: "🫘", label: "Kidney Health", count: 9, markers: ["Creatinine", "eGFR", "BUN", "Calcium", "Potassium", "Sodium", "And 4 more..."] },
  { id: "hormones", emoji: "⚗️", label: "Sex Hormones", count: 17, markers: ["Testosterone, Total", "Estradiol", "FSH", "LH", "DHEA-S", "SHBG", "And 11 more..."] },
  { id: "metabolic", emoji: "⚡", label: "Metabolic Health", count: 11, markers: ["Glucose", "HbA1c", "Insulin", "Uric Acid", "TyG Index", "And 6 more..."] },
  { id: "nutrients", emoji: "💊", label: "Nutrients & Vitamins", count: 14, markers: ["Vitamin D", "Vitamin B12", "Hemoglobin", "RBC", "WBC", "And 9 more..."] },
  { id: "inflammation", emoji: "🔥", label: "Inflammation", count: 8, markers: ["hs-CRP", "ESR", "Ferritin/Albumin Ratio", "And 5 more..."] },
  { id: "thyroid", emoji: "🦋", label: "Thyroid Health", count: 7, markers: ["TSH", "Free T4", "Free T3", "TPO Antibody", "And 3 more..."] },
  { id: "aging", emoji: "⏳", label: "Biological Aging", count: 3, markers: ["Biological Age", "Pace of Aging", "Health Score"] },
];

export default function Biomarkers() {
  const [active, setActive] = useState("heart");
  const activeCategory = categories.find((c) => c.id === active)!;

  return (
    <section id="biomarkers" className="section-light" style={{ position: "relative", zIndex: 1, background: "#fff", padding: "100px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="label fade-up" style={{ color: "#FF5500", fontWeight: 700, letterSpacing: "0.12em", marginBottom: 12 }}>What gets tested</p>
          <h2 className="display-md fade-up" style={{ color: "#0a0a0a", transitionDelay: "0.1s" }}>130+ Biomarker Explorer</h2>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40, justifyContent: "center" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              style={{
                padding: "10px 22px",
                borderRadius: "100px",
                border: "1px solid",
                borderColor: active === cat.id ? "#0a0a0a" : "rgba(0,0,0,0.12)",
                background: active === cat.id ? "#0a0a0a" : "transparent",
                color: active === cat.id ? "#fff" : "#555",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.25s ease",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 1000, margin: "0 auto" }}>
          {(activeCategory?.markers || []).map((b, i) => (
            <div
              key={b}
              style={{
                padding: "12px 20px",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 12,
                fontSize: 14,
                color: "#333",
                fontWeight: 500,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#FF5500";
                e.currentTarget.style.color = "#FF5500";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                e.currentTarget.style.color = "#333";
                e.currentTarget.style.transform = "none";
              }}
            >
              {b}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64, textAlign: "center" }}>
          <Link to="/auth" style={{ display: "inline-flex", padding: "16px 32px", fontSize: 15, fontWeight: 600, color: "#fff", background: "#FF5500", borderRadius: 100, textDecoration: "none", transition: "transform 0.2s" }}>
            View all 130+ Biomarkers in detail →
          </Link>
        </div>
      </div>
    </section>
  );
}
