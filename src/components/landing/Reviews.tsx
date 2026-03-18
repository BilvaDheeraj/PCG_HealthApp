import { Link } from "react-router-dom";

const reviews = [
  { name: "Arjun Mehta", city: "Mumbai", quote: "My heart risk was detected early. This service is literally life-saving!", initials: "AM" },
  { name: "Ananya Reddy", city: "Hyderabad", quote: "My Vitamin D was critically low. I feel so much better now. Amazing service!", initials: "AR" },
  { name: "Rohit Gupta", city: "Delhi", quote: "₹1,499 a month for this level of insight? Best health investment I've ever made.", initials: "RG" },
  { name: "Dr. Sunita Pillai", city: "Bengaluru", quote: "I'm a doctor myself and I'm genuinely impressed by the accuracy and depth.", initials: "SP" },
];

export default function Reviews() {
  return (
    <section id="reviews" style={{ position: "relative", zIndex: 1, background: "#0a0a0a", padding: "100px 0" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <p className="label fade-up" style={{ color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Community reviews</p>
            <h2 className="display-md fade-up" style={{ color: "#fff", transitionDelay: "0.1s" }}>Loved across India</h2>
          </div>
          <Link to="/auth" className="btn-outline fade-up" style={{ transitionDelay: "0.2s" }}>See all reviews →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="fade-up"
              style={{
                transitionDelay: `${0.1 * i}s`,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: 28,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,85,0,0.4)";
                el.style.background = "rgba(255,85,0,0.06)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #FF5500, #FF8C00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#fff", flexShrink: 0 }}>{r.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{r.city}</div>
                </div>
              </div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.6 }}>"{r.quote}"</div>
              <div style={{ display: "flex", gap: 2, marginTop: 16 }}>{[1, 2, 3, 4, 5].map((n) => (
                <span key={n} style={{ color: "#FFD700", fontSize: 14 }}></span>
              ))}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
