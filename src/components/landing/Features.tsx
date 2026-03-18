const features = [
  { icon: "", title: "No Wait Times", desc: "15-minute lab visit", sub: "3,000+ locations across India" },
  { icon: "", title: "Fast Results", desc: "Within 7 days", sub: "Digital report delivered" },
  { icon: "", title: "Simple & Convenient", desc: "Home sample collection", sub: "Dr. Lal PathLabs, Metropolis" },
];

export default function Features() {
  return (
    <section className="section-light" style={{ position: "relative", zIndex: 1, background: "#f8f8f8", padding: "100px 0" }}>
      <div className="container">
        <p className="label fade-up" style={{ color: "rgba(0,0,0,0.4)", marginBottom: 16 }}>It starts with</p>
        <h2 className="display-md fade-up" style={{ color: "#0a0a0a", marginBottom: 16, transitionDelay: "0.1s" }}>100+ labs tested every year</h2>
        <a href="#biomarkers" className="btn-ghost-dark fade-up" style={{ marginBottom: 64, transitionDelay: "0.2s" }}>Explore all biomarkers →</a>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 48 }}>
          {features.map((f, i) => (
            <div key={f.title} className="card-light fade-up" style={{ transitionDelay: `${0.1 * i + 0.3}s` }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#0a0a0a" }}>{f.title}</h3>
              <p style={{ fontSize: 15, color: "#555", marginBottom: 6 }}>{f.desc}</p>
              <p style={{ fontSize: 13, color: "#888" }}>{f.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64 }}>
          <p className="label fade-up" style={{ color: "rgba(0,0,0,0.4)", marginBottom: 20 }}>Test categories</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {["Heart Health", "Liver", "Kidney", "Hormones", "Thyroid", "Vitamins & Minerals", "Blood Sugar", "Cholesterol", "Immunity", "Cancer Screening"].map((cat, i) => (
              <span
                key={cat}
                className="fade-up"
                style={{ padding: "8px 18px", borderRadius: "100px", border: "1px solid rgba(0,0,0,0.1)", fontSize: 13, fontWeight: 500, color: "#444", cursor: "pointer", transition: "all 0.2s", transitionDelay: `${0.05 * i}s` }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#444"; }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
