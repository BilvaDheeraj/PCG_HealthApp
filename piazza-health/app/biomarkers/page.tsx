"use client";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────
   ALL 13 CATEGORIES WITH 130+ BIOMARKERS (ACCORDION STRUCTURE)
───────────────────────────────────────────────────────────────── */
const categories = [
    {
        id: "heart",
        emoji: "❤️",
        label: "Heart & Vascular",
        description: "Comprehensive cardiovascular risk assessment — well beyond a standard lipid panel.",
        count: 29,
        markers: [
            { name: "Galectin-3 Test", desc: "A protein linked to cardiac fibrosis and heart failure risk.", panels: ["Advanced Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "Non-HDL Cholesterol Test", desc: "Measures all cholesterol that is not 'good' HDL. Essential for tracking total atherogenic (plaque-forming) risk.", panels: ["Advanced Panel"], inputs: [] },
            { name: "HDL Cholesterol Test", desc: "'Good' cholesterol that removes bad cholesterol from arteries.", panels: ["Standard Panel"], inputs: [] },
            { name: "Triglycerides Test", desc: "A type of fat in the blood. Elevated levels are a strong indicator of cardiovascular and metabolic risk.", panels: ["Standard Panel"], inputs: [] },
            { name: "LDL Cholesterol Test", desc: "'Bad' cholesterol. Elevated levels increase risk of plaque buildup and stroke.", panels: ["Standard Panel"], inputs: [] },
            { name: "Cholesterol/HDL Ratio Testing", desc: "Evaluates the balance between total and protective cholesterol.", panels: ["Derived", "Standard Panel"], inputs: ["Total Cholesterol", "HDL Cholesterol"] },
            { name: "LDL/HDL Ratio Testing", desc: "Compares atherogenic to protective cholesterol levels.", panels: ["Derived", "Standard Panel"], inputs: ["LDL C", "HDL C"] },
            { name: "Cholesterol, Total Test", desc: "Total cholesterol circulating in your blood.", panels: ["Standard Panel"], inputs: [] },
            { name: "Apolipoprotein B (ApoB) Testing", desc: "The primary driver of plaque buildup. It counts the number of atherogenic particles rather than just their mass.", panels: ["Advanced Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "Lipoprotein (a) Testing", desc: "Genetically determined cardiovascular risk factor strongly associated with early heart disease and stroke.", panels: ["Advanced Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "LDL P Test", desc: "Total number of LDL particles. High particle count indicates risk even when LDL mass is normal.", panels: ["Advanced Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "Neutrophil-to-HDL Cholesterol Ratio (NHR) Testing", desc: "Correlates immune system activation with lipid metabolism and systemic inflammation.", panels: ["Derived"], inputs: ["Neutrophils", "HDL Cholesterol"] },
            { name: "Triglyceride / HDL Cholesterol (Molar Ratio) Testing", desc: "A robust indicator of insulin resistance and cardiovascular risk.", panels: ["Derived"], inputs: ["Triglycerides", "HDL Cholesterol"] },
            { name: "Atherogenic Index of Plasma (AIP) Testing", desc: "A logarithmic calculation assessing the risk of cardiovascular disease based on lipid profiles.", panels: ["Derived"], inputs: ["Triglycerides", "HDL Cholesterol"] },
            { name: "Small LDL P Test", desc: "Measures small, dense LDL particles which easily penetrate arterial walls.", panels: ["Advanced Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "HDL Size Test", desc: "Evaluates HDL particle size. Larger particles are generally more protective.", panels: ["Advanced Panel"], inputs: [] },
            { name: "Large HDL P Test", desc: "Measures the number of protective, large HDL particles.", panels: ["Advanced Panel"], inputs: [] },
            { name: "LDL Size Test", desc: "Assesses average LDL particle size (large vs. small and dense).", panels: ["Advanced Panel"], inputs: [] },
            { name: "Large VLDL P Test", desc: "Measures large triglyceride-rich particles associated with insulin resistance.", panels: ["Advanced Panel"], inputs: [] },
            { name: "Atherogenic Coefficient Test", desc: "Evaluates the proportion of non-HDL to HDL cholesterol.", panels: ["Derived"], inputs: ["Total Cholesterol", "HDL Cholesterol"] },
            { name: "LDL Cholesterol / Total Cholesterol (Mass Ratio) Testing", desc: "Assesses the proportion of LDL relative to total cholesterol.", panels: ["Derived"], inputs: ["LDL C", "Total Cholesterol"] },
            { name: "HDL P Test", desc: "Total number of HDL particles.", panels: ["Advanced Panel"], inputs: [] },
            { name: "VLDL Size Test", desc: "Average VLDL particle size, indicating liver fat processing efficiency.", panels: ["Advanced Panel"], inputs: [] },
            { name: "LDL-C / ApoB Testing", desc: "Indicates whether LDL particles are cholesterol-rich (large) or cholesterol-depleted (small/dense).", panels: ["Derived"], inputs: ["LDL C", "ApoB"] },
            { name: "Uric Acid / HDL-C Testing", desc: "Connects purine metabolism and systemic inflammation with cardiovascular protection.", panels: ["Derived"], inputs: ["Uric Acid", "HDL C"] },
            { name: "TG / ApoB Testing", desc: "Assesses triglyceride enrichment of atherogenic particles.", panels: ["Derived"], inputs: ["Triglycerides", "ApoB"] },
            { name: "Non-HDL-C / ApoB Testing", desc: "Evaluates cholesterol concentration across all atherogenic particles.", panels: ["Derived"], inputs: ["Non-HDL C", "ApoB"] },
            { name: "Lipoprotein fractionation Test", desc: "Advanced detailing of all lipoprotein subclasses.", panels: ["Advanced Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "ADMA / SDMA Test", desc: "Evaluates endothelial (blood vessel) function and nitric oxide regulation.", panels: ["Advanced Panel", "Cardiovascular Panel"], inputs: [] },
        ],
    },
    {
        id: "liver",
        emoji: "🫀",
        label: "Liver Health",
        description: "Your liver performs over 500 functions. These markers reveal how well it's working.",
        count: 13,
        markers: [
            { name: "Alkaline Phosphatase (ALP)", desc: "Enzyme linked to liver, bile ducts, and bones.", panels: ["Standard Panel"], inputs: [] },
            { name: "Albumin/Globulin Ratio", desc: "Assesses liver function and immune status.", panels: ["Derived", "Standard Panel"], inputs: ["Albumin", "Globulin"] },
            { name: "Albumin Test", desc: "Main protein for fluid balance.", panels: ["Standard Panel"], inputs: [] },
            { name: "Alanine Aminotransferase (ALT)", desc: "Most specific indicator of liver cell damage.", panels: ["Standard Panel"], inputs: [] },
            { name: "Bilirubin, Total", desc: "Total waste product from red blood cell breakdown.", panels: ["Standard Panel"], inputs: [] },
            { name: "Globulin Test", desc: "Proteins involved in immunity and clotting.", panels: ["Standard Panel"], inputs: [] },
            { name: "Aspartate Aminotransferase (AST)", desc: "Enzyme indicating liver or muscle damage.", panels: ["Standard Panel"], inputs: [] },
            { name: "Gamma-Glutamyl Transferase (GGT)", desc: "Sensitive marker for alcohol use and bile duct issues.", panels: ["Standard Panel"], inputs: [] },
            { name: "Bilirubin, Direct", desc: "Processed bilirubin. Elevations suggest bile duct obstruction.", panels: ["Standard Panel"], inputs: [] },
            { name: "Bilirubin, Indirect", desc: "Unprocessed bilirubin.", panels: ["Derived", "Standard Panel"], inputs: ["Total Bilirubin", "Direct Bilirubin"] },
            { name: "GGT-to-HDL Cholesterol Ratio (GGT / HDL-C)", desc: "Tracks liver stress against cardiovascular protection.", panels: ["Derived"], inputs: ["GGT", "HDL C"] },
            { name: "Indirect-to-Direct Bilirubin Ratio", desc: "Evaluates liver conjugation efficiency.", panels: ["Derived"], inputs: ["Indirect Bilirubin", "Direct Bilirubin"] },
            { name: "Bilirubin-to-Albumin Ratio (BAR)", desc: "Stages liver disease severity and synthetic function.", panels: ["Derived"], inputs: ["Total Bilirubin", "Albumin"] },
        ],
    },
    {
        id: "kidney",
        emoji: "🫘",
        label: "Kidney Health",
        description: "Your kidneys filter 200 litres of blood every day. These markers reveal how efficiently.",
        count: 9,
        markers: [
            { name: "BUN/Creatinine Ratio", desc: "Distinguishes between dehydration and intrinsic kidney disease.", panels: ["Derived", "Standard Panel"], inputs: ["BUN", "Creatinine"] },
            { name: "Calcium Test", desc: "Essential electrolyte regulated heavily by the kidneys.", panels: ["Standard Panel"], inputs: [] },
            { name: "Potassium Test", desc: "Crucial for heart rhythm; cleared by kidneys.", panels: ["Standard Panel"], inputs: [] },
            { name: "Carbon Dioxide (CO2) / Bicarbonate", desc: "Evaluates acid-base balance.", panels: ["Standard Panel"], inputs: [] },
            { name: "Creatinine Test", desc: "Primary kidney filtration marker.", panels: ["Standard Panel"], inputs: [] },
            { name: "Chloride Test", desc: "Electrolyte maintaining fluid balance.", panels: ["Standard Panel"], inputs: [] },
            { name: "Sodium Test", desc: "Primary electrolyte controlling fluid balance and blood pressure.", panels: ["Standard Panel"], inputs: [] },
            { name: "Estimated Glomerular Filtration Rate (eGFR)", desc: "The primary measure of kidney function stage.", panels: ["Derived", "Standard Panel"], inputs: ["Creatinine", "Age", "Sex"] },
            { name: "Blood Urea Nitrogen (BUN)", desc: "Measures protein metabolism and kidney clearance.", panels: ["Standard Panel"], inputs: [] },
        ],
    },
    {
        id: "hormones",
        emoji: "⚗️",
        label: "Sex Hormones",
        description: "Sex hormones influence energy, mood, muscle mass, libido, cognition, and longevity.",
        count: 17,
        markers: [
            { name: "Testosterone, Total", desc: "Primary male androgen, vital for both sexes.", panels: ["Standard Panel", "Hormone Panel"], inputs: [] },
            { name: "Sex Hormone Binding Globulin (SHBG)", desc: "Regulates bioavailable hormones.", panels: ["Standard Panel", "Hormone Panel"], inputs: [] },
            { name: "Testosterone, Bioavailable", desc: "The freely active and loosely bound testosterone.", panels: ["Derived", "Hormone Panel"], inputs: ["Total Testosterone", "SHBG", "Albumin"] },
            { name: "DHEA Sulfate (DHEA-S)", desc: "Adrenal hormone precursor; a strong anti-aging marker.", panels: ["Standard Panel", "Hormone Panel"], inputs: [] },
            { name: "Testosterone, Free", desc: "Biologically active fraction of testosterone.", panels: ["Derived", "Hormone Panel"], inputs: ["Total Testosterone", "SHBG"] },
            { name: "Follicle Stimulating Hormone (FSH)", desc: "Regulates reproductive function and ovarian reserve.", panels: ["Hormone Panel", "Female Fertility Panel"], inputs: [] },
            { name: "Prostate Specific Antigen (PSA), Free & Total", desc: "Prostate health markers.", panels: ["Advanced Panel", "Male Health Panel"], inputs: [] },
            { name: "Progesterone Test", desc: "Regulates menstrual cycle and supports pregnancy.", panels: ["Hormone Panel", "Female Fertility Panel"], inputs: [] },
            { name: "Luteinizing Hormone (LH)", desc: "Triggers ovulation and testosterone production.", panels: ["Hormone Panel", "Female Fertility Panel"], inputs: [] },
            { name: "Prolactin Test", desc: "Hormone affecting milk production and reproductive health.", panels: ["Advanced Panel"], inputs: [] },
            { name: "Free Androgen Index (FAI)", desc: "Estimates physiological testosterone activity.", panels: ["Derived"], inputs: ["Total Testosterone", "SHBG"] },
            { name: "Testosterone / Estradiol (T:E2)", desc: "Evaluates the androgen to estrogen balance.", panels: ["Derived"], inputs: ["Testosterone", "Estradiol"] },
            { name: "17-hydroxyprogesterone", desc: "Precursor to cortisol and androgens.", panels: ["Advanced Panel"], inputs: [] },
            { name: "Estradiol", desc: "Dominant estrogen for bone, heart, and brain health.", panels: ["Standard Panel", "Hormone Panel"], inputs: [] },
            { name: "Mercury (Blood)", desc: "Heavy metal toxicity screen.", panels: ["Advanced Panel"], inputs: [] },
            { name: "AMH (anti-Müllerian hormone)", desc: "Reliable marker of ovarian reserve.", panels: ["Advanced Panel", "Female Fertility Panel"], inputs: [] },
            { name: "Ultra-Sensitive Estradiol", desc: "Mass-spectrometry measurement for accurate low-level readings.", panels: ["Advanced Panel", "Male Health Panel"], inputs: [] },
        ],
    },
    {
        id: "metabolic",
        emoji: "⚡",
        label: "Metabolic Health",
        description: "Metabolism drives energy and longevity. These markers reveal how efficiently your body processes fuel.",
        count: 11,
        markers: [
            { name: "Glucose Test", desc: "Fasting blood sugar level.", panels: ["Standard Panel"], inputs: [] },
            { name: "Hemoglobin A1c (HbA1c)", desc: "Average blood sugar over 90 days.", panels: ["Standard Panel"], inputs: [] },
            { name: "Estimated Average Glucose (mg/dL)", desc: "Translates A1c into daily average glucose.", panels: ["Derived", "Standard Panel"], inputs: ["HbA1c"] },
            { name: "Estimated Average Glucose (mmol/L)", desc: "Translates A1c into daily average glucose.", panels: ["Derived", "Standard Panel"], inputs: ["HbA1c"] },
            { name: "Uric Acid Test", desc: "Marker of purine metabolism and metabolic syndrome.", panels: ["Standard Panel"], inputs: [] },
            { name: "Insulin Test", desc: "Fasting insulin detects resistance before glucose rises.", panels: ["Advanced Panel", "Metabolic Panel"], inputs: [] },
            { name: "Corrected Calcium (Albumin-adjusted)", desc: "Accurate calcium level adjusted for protein binding.", panels: ["Derived"], inputs: ["Calcium", "Albumin"] },
            { name: "TyG Index Testing", desc: "Surrogate for insulin resistance using triglycerides and glucose.", panels: ["Derived", "Metabolic Panel"], inputs: ["Triglycerides", "Fasting Glucose"] },
            { name: "Leptin Test", desc: "Satiety hormone measuring fat cell signaling.", panels: ["Advanced Panel", "Weight Management Panel"], inputs: [] },
            { name: "Cardio IQ Insulin Resistance Test", desc: "Advanced algorithmic assessment of insulin resistance.", panels: ["Advanced Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "Adiponectin Test", desc: "Determines insulin sensitivity and fat-burning capacity.", panels: ["Advanced Panel", "Metabolic Panel"], inputs: [] },
            { name: "Fructosamine Test", desc: "Average blood glucose over the past 2-3 weeks.", panels: ["Advanced Panel", "Diabetes Monitoring"], inputs: [] },
        ],
    },
    {
        id: "nutrients",
        emoji: "💊",
        label: "Nutrients & Vitamins",
        description: "Essential micronutrients that power cellular function and protect against disease.",
        count: 14,
        markers: [
            { name: "Hemoglobin, Hematocrit, RBC", desc: "Red blood cell volume, carrying oxygen to tissues.", panels: ["Standard Panel", "CBC"], inputs: [] },
            { name: "MCH, MCV, MCHC", desc: "Red blood cell size and hemoglobin concentration parameters.", panels: ["Standard Panel", "CBC"], inputs: [] },
            { name: "White Blood Cell Count (WBC)", desc: "Total immune cell count.", panels: ["Standard Panel", "CBC"], inputs: [] },
            { name: "Platelet Count & MPV", desc: "Clotting cells and their average volume.", panels: ["Standard Panel", "CBC"], inputs: [] },
            { name: "Protein, Total", desc: "Total circulating protein.", panels: ["Standard Panel"], inputs: [] },
            { name: "Vitamin D, 25-Hydroxy", desc: "Storage form of vitamin D. Critical for bone and immune health.", panels: ["Standard Panel"], inputs: [] },
            { name: "RDW / MCV Ratio", desc: "Evaluates red blood cell variation against size.", panels: ["Derived"], inputs: ["RDW", "MCV"] },
            { name: "Vitamin C", desc: "Antioxidant essential for immunity and collagen.", panels: ["Advanced Panel", "Nutrition Panel"], inputs: [] },
            { name: "Selenium", desc: "Powers the body's master antioxidant enzyme, glutathione peroxidase.", panels: ["Advanced Panel", "Nutrition Panel"], inputs: [] },
            { name: "Magnesium", desc: "Involved in over 300 enzymatic reactions including energy production.", panels: ["Standard Panel"], inputs: [] },
            { name: "Vitamin K", desc: "Essential for blood clotting and bone mineralization.", panels: ["Advanced Panel", "Nutrition Panel"], inputs: [] },
            { name: "Vitamin E", desc: "Fat-soluble antioxidant protecting cell membranes.", panels: ["Advanced Panel", "Nutrition Panel"], inputs: [] },
            { name: "Vitamin B12 (Cobalamin)", desc: "Critical for nerve function and red blood cells.", panels: ["Standard Panel"], inputs: [] },
            { name: "Zinc", desc: "Critical for immune defense and DNA synthesis.", panels: ["Advanced Panel", "Nutrition Panel"], inputs: [] },
        ],
    },
    {
        id: "inflammation",
        emoji: "🔥",
        label: "Inflammation",
        description: "Chronic inflammation silently drives heart disease, cancer, dementia, and aging.",
        count: 8,
        markers: [
            { name: "hs-CRP", desc: "High-sensitivity marker for systemic/cardiac inflammation.", panels: ["Standard Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "ESR (Erythrocyte Sedimentation Rate)", desc: "Measures red blood cell settling rate.", panels: ["Standard Panel", "Inflammation Panel"], inputs: [] },
            { name: "Systemic Immune-Inflammation Index (SII)", desc: "Captures full inflammatory/immune state.", panels: ["Derived"], inputs: ["Platelets", "Neutrophils", "Lymphocytes"] },
            { name: "Ferritin-to-Albumin Ratio (FAR)", desc: "Integrates iron storage inflammation with nutritional status.", panels: ["Derived"], inputs: ["Ferritin", "Albumin"] },
            { name: "Monocyte-to-HDL Ratio (MHR)", desc: "Calculates oxidative stress and vascular inflammation.", panels: ["Derived"], inputs: ["Monocytes", "HDL C"] },
            { name: "CRP / Albumin Ratio (CAR)", desc: "Predicts mortality risk in critical illnesses.", panels: ["Derived"], inputs: ["hs-CRP", "Albumin"] },
            { name: "Platelet-to-Lymphocyte Ratio (PLR)", desc: "Reflects shifting immune status and systemic inflammation.", panels: ["Derived"], inputs: ["Platelets", "Lymphocytes"] },
            { name: "Systemic Inflammation Response Index (SIRI)", desc: "Prognostic marker integrating multiple immune cell lines.", panels: ["Derived"], inputs: ["Neutrophils", "Monocytes", "Lymphocytes"] },
        ],
    },
    {
        id: "thyroid",
        emoji: "🦋",
        label: "Thyroid Health",
        description: "Your thyroid controls metabolism, energy, mood, and temperature regulation.",
        count: 7,
        markers: [
            { name: "TSH", desc: "Pituitary hormone telling thyroid to make hormones.", panels: ["Standard Panel", "Thyroid Panel"], inputs: [] },
            { name: "Free T4 Index (T7)", desc: "Calculated index of thyroid hormone availability.", panels: ["Derived"], inputs: ["Total T4", "T3 Uptake"] },
            { name: "T3 Uptake", desc: "Measures binding proteins for thyroid hormones.", panels: ["Standard Panel", "Thyroid Panel"], inputs: [] },
            { name: "Thyroxine (T4), Total", desc: "Total circulating primary thyroid hormone.", panels: ["Standard Panel", "Thyroid Panel"], inputs: [] },
            { name: "Thyroid Peroxidase (TPO) Antibody", desc: "Detects autoimmune thyroid disease (Hashimoto's).", panels: ["Advanced Panel", "Thyroid Panel"], inputs: [] },
            { name: "Thyroglobulin Antibodies", desc: "Autoantibodies targeting the thyroid matrix.", panels: ["Advanced Panel", "Thyroid Panel"], inputs: [] },
            { name: "Triiodothyronine (T3), Free", desc: "The biologically active form of thyroid hormone.", panels: ["Standard Panel", "Thyroid Panel"], inputs: [] },
        ],
    },
    {
        id: "energy",
        emoji: "⚕️",
        label: "Energy",
        description: "Biomarkers tracking oxygen delivery, iron storage, and stress response.",
        count: 6,
        markers: [
            { name: "Ferritin", desc: "Total iron storage in the body.", panels: ["Standard Panel", "Anemia Panel"], inputs: [] },
            { name: "Cortisol", desc: "Primary stress hormone tracking adrenal activity.", panels: ["Advanced Panel", "Stress Panel"], inputs: [] },
            { name: "Total Iron Binding Capacity (TIBC)", desc: "Capacity of blood to transport iron.", panels: ["Standard Panel", "Anemia Panel"], inputs: [] },
            { name: "Iron Saturation", desc: "Percentage of transferrin saturated with iron.", panels: ["Derived", "Standard Panel"], inputs: ["Total Iron", "TIBC"] },
            { name: "Iron, Total", desc: "Total iron in the blood.", panels: ["Standard Panel", "Anemia Panel"], inputs: [] },
            { name: "BMI Test", desc: "Calculated mass-to-height ratio.", panels: ["Derived"], inputs: ["Height", "Weight"] },
        ],
    },
    {
        id: "immune",
        emoji: "🛡️",
        label: "Immune System & Autoimmunity",
        description: "A deep dive into immune cell composition and autoimmune antibodies.",
        count: 8,
        markers: [
            { name: "Lymphocytes", desc: "White blood cells fighting viral infections.", panels: ["Standard Panel", "CBC"], inputs: [] },
            { name: "Monocytes", desc: "White blood cells breaking down bacteria.", panels: ["Standard Panel", "CBC"], inputs: [] },
            { name: "Neutrophils", desc: "First responders to bacterial infections.", panels: ["Standard Panel", "CBC"], inputs: [] },
            { name: "Eosinophils & Basophils", desc: "Allergy and parasite response cells.", panels: ["Standard Panel", "CBC"], inputs: [] },
            { name: "Lymphocyte-to-Monocyte Ratio (LMR)", desc: "Prognostic marker for immune status.", panels: ["Derived"], inputs: ["Lymphocytes", "Monocytes"] },
            { name: "Neutrophil-to-Lymphocyte Ratio (NLR)", desc: "Systemic inflammation marker.", panels: ["Derived"], inputs: ["Neutrophils", "Lymphocytes"] },
            { name: "dsDNA, Rheumatoid Factor, CCP Antibody, ANA Testing", desc: "Comprehensive autoimmune screening for Lupus and Rheumatoid Arthritis.", panels: ["Advanced Panel", "Autoimmune Panel"], inputs: [] },
            { name: "Celiac Disease Comprehensive Panel", desc: "Screens for gluten autoantibodies.", panels: ["Advanced Panel", "GI Panel"], inputs: [] },
        ],
    },
    {
        id: "body",
        emoji: "💪",
        label: "Body Composition",
        description: "Markers related to growth, muscle mass, and physical composition.",
        count: 1,
        markers: [
            { name: "Insulin-Like Growth Factor 1 (IGF-1)", desc: "Mediates growth hormone effects; anti-aging marker.", panels: ["Advanced Panel", "Longevity Panel"], inputs: [] },
        ],
    },
    {
        id: "dna",
        emoji: "🧬",
        label: "DNA Health & Methylation",
        description: "Nutrients and markers tracking the success of cellular DNA methylation.",
        count: 4,
        markers: [
            { name: "Folate (Serum)", desc: "Essential for DNA synthesis and methylation.", panels: ["Standard Panel"], inputs: [] },
            { name: "Homocysteine", desc: "Amino acid that damages vascular walls; signals poor methylation.", panels: ["Standard Panel", "Cardiovascular Panel"], inputs: [] },
            { name: "Vitamin B6 (Plasma)", desc: "Cofactor in methylation and neurotransmitter synthesis.", panels: ["Advanced Panel"], inputs: [] },
            { name: "Methylmalonic Acid (MMA)", desc: "Sensitive biomarker for early Vitamin B12 deficiency at the cellular level.", panels: ["Advanced Panel"], inputs: [] },
        ],
    },
    {
        id: "aging",
        emoji: "⏳",
        label: "Biological Aging",
        description: "These markers reveal your true internal biological age.",
        count: 3,
        markers: [
            { name: "Biological Age (BioAge)", desc: "Your internal biological age compared to your chronological age — calculated from a composite of biomarker clusters.", panels: ["Derived", "Superpower App Content"], inputs: ["Multiple Biomarkers"] },
            { name: "Pace of Aging", desc: "How rapidly your body is aging relative to the passage of time.", panels: ["Derived", "Superpower App Content"], inputs: ["Multiple Biomarkers"] },
            { name: "Health Score", desc: "A comprehensive real-time health status score combining all biomarker clusters.", panels: ["Derived", "Superpower App Content"], inputs: ["Multiple Biomarkers"] },
        ],
    },
];

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
                        <Link href="#" style={{ fontSize: 13, color: "#FF5500", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }} className="hover-underline">
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
export default function BiomarkersPage() {
    const [active, setActive] = useState("heart");
    const activeCat = categories.find(c => c.id === active)!;
    const totalCount = categories.reduce((sum, c) => sum + c.count, 0);

    return (
        <PageLayout
            badge={`${totalCount}+ Biomarkers Included`}
            title="Your Piazza Health starts with 100+ biomarkers."
            subtitle="Here is everything we test."
        >
            <div style={{ background: "#f8f8f8", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "20px 0" }}>
                <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}>🏥</span><span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>NABL-Accredited Labs</span></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}>✅</span><span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>Dr. Lal PathLabs / Metropolis</span></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}>🔬</span><span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>CLIA-Certified Processing</span></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 18 }}>🇮🇳</span><span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>ICMR Registered</span></div>
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
                                { icon: "🎯", title: "Early Detection", desc: "Identify silent conditions like cardiovascular disease and insulin resistance." },
                                { icon: "📈", title: "Baseline Optimisation", desc: "Track energy, metabolism, hormones, and longevity markers over time." },
                                { icon: "🥗", title: "Lifestyle Monitoring", desc: "Measure the biological impact of diet, exercise, and supplements." },
                                { icon: "🔬", title: "Personalised Decisions", desc: "Move away from population-average advice toward personal biology." }
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
                                {categories.map(cat => (
                                    <button key={cat.id} onClick={() => setActive(cat.id)} style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        padding: "12px 16px", borderRadius: 12, border: "none", cursor: "pointer",
                                        background: active === cat.id ? "#0a0a0a" : "transparent",
                                        color: active === cat.id ? "#fff" : "#444", textAlign: "left", transition: "all 0.2s"
                                    }}
                                        onMouseEnter={e => { if (active !== cat.id) e.currentTarget.style.background = "#f0f0f0"; }}
                                        onMouseLeave={e => { if (active !== cat.id) e.currentTarget.style.background = "transparent"; }}>
                                        <span style={{ fontSize: 14, fontWeight: 500 }}>{cat.emoji} {cat.label}</span>
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
                                    <span style={{ fontSize: 40, background: "#f8f8f8", width: 64, height: 64, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{activeCat.emoji}</span>
                                    <div>
                                        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0a0a0a", marginBottom: 4, letterSpacing: "-0.02em" }}>{activeCat.label}</h2>
                                        <span style={{ fontSize: 13, color: "#FF5500", fontWeight: 700 }}>{activeCat.count} biomarkers in this category</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 16, color: "#555", lineHeight: 1.6 }}>{activeCat.description}</p>
                            </div>

                            {/* Accordion List */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {activeCat.markers.map((m, i) => (
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
