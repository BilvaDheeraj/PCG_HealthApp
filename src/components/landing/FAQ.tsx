import { useState } from "react";

const faqs = [
  { q: "Is Piazza Health covered by insurance?", a: "We are working with Ayushman Bharat. Many corporate health plans also cover our membership — ask your HR team to check." },
  { q: "Will this replace my regular doctor?", a: "No, Piazza complements your doctor. We provide data and insights, not clinical care. Think of us as your health co-pilot." },
  { q: "How often is the comprehensive test done?", a: "Your membership includes one comprehensive test per year. Add-on tests are available at an additional cost whenever you need them." },
  { q: "How is the sample collected?", a: "At any of 3,000+ Dr. Lal PathLabs or Metropolis centres across India, or via our home sample collection service." },
  { q: "How long until I get my results?", a: "Typically within 5–7 business days after your sample is collected. Digital reports are delivered via the app and email." },
  { q: "Can I share my data with my doctor?", a: "Yes, you can share your full report with any doctor as a PDF directly from the app, any time." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ position: "relative", zIndex: 1, background: "#fff", padding: "100px 0" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="label fade-up" style={{ color: "rgba(0,0,0,0.4)", marginBottom: 12 }}>Frequently asked questions</p>
          <h2 className="display-md fade-up" style={{ color: "#0a0a0a", transitionDelay: "0.1s" }}>Everything you need to know</h2>
        </div>

        <div className="fade-up" style={{ transitionDelay: "0.2s" }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "24px 0",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#0a0a0a",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FF5500")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0a0a0a")}
              >
                <span>{f.q}</span>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s",
                    background: open === i ? "#FF5500" : "transparent",
                    color: open === i ? "#fff" : "#0a0a0a",
                    transform: open === i ? "rotate(45deg)" : "none",
                    fontSize: 18,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>
              <div style={{ overflow: "hidden", maxHeight: open === i ? 200 : 0, transition: "max-height 0.4s ease" }}>
                <p style={{ paddingBottom: 24, color: "#666", fontSize: 15, lineHeight: 1.7 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
