const steps = [
  { num: "01", title: "Test your whole body", desc: "Visit Dr. Lal PathLabs or Metropolis near you. A 15-minute blood draw. 100+ biomarkers analyzed by top labs.", icon: "", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80" },
  { num: "02", title: "An actionable plan", desc: "AI-powered recommendations — diet, exercise, sleep, and supplements personalized for your unique biology.", icon: "", img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80" },
  { num: "03", title: "A connected ecosystem", desc: "Doctor messaging, supplements, and add-on diagnostics — all in one platform, anytime you need it.", icon: "", img: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-light" style={{ position: "relative", zIndex: 1, background: "#fff", padding: "100px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p className="label fade-up" style={{ color: "rgba(0,0,0,0.4)", marginBottom: 12 }}>How it works</p>
          <h2 className="display-md fade-up" style={{ color: "#0a0a0a", transitionDelay: "0.1s" }}>Three simple steps</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {steps.map((s, i) => (
            <div key={s.num} className="fade-up" style={{ transitionDelay: `${0.15 * i}s` }}>
              <div style={{ borderRadius: 24, overflow: "hidden", marginBottom: 24, aspectRatio: "4/3", position: "relative", background: "#f0f0f0" }}>
                <img
                  src={s.img}
                  alt={s.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", top: 20, left: 20, background: "#fff", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#0a0a0a" }}>
                  {s.num}
                </div>
              </div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: "#0a0a0a" }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: "#666", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
