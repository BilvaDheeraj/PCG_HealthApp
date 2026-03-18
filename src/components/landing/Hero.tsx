export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: 100,
        background: "transparent",
      }}
    >
      <div className="dots-decoration" />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)", top: "10%", left: "60%", transform: "translate(-50%,-50%)", pointerEvents: "none", animation: "pulse 6s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(100,149,237,0.1) 0%, transparent 70%)", bottom: "20%", left: "10%", pointerEvents: "none", animation: "pulse 8s ease-in-out infinite 2s" }} />

      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900 }}>
        <div className="fade-up" style={{ transitionDelay: "0.1s" }}>
          <span className="badge badge-green" style={{ marginBottom: 28, display: "inline-flex" }}>
            Ayushman Bharat Eligible / HSA-FSA Approved
          </span>
        </div>

        <h1 className="display-xl fade-up" style={{ transitionDelay: "0.2s", marginBottom: 24 }}>
          Unlock your new{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FF5500 0%, #FF8C00 50%, #FFD700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            health intelligence
          </span>
        </h1>

        <p
          className="body-lg fade-up"
          style={{
            transitionDelay: "0.35s",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 36,
            maxWidth: 680,
            margin: "0 auto 36px",
          }}
        >
          100+ biomarkers · Every year · Detect early signs of 1,000+ conditions · All for just <strong style={{ color: "#fff" }}>₹1,499/month</strong>
        </p>

        <div className="fade-up" style={{ transitionDelay: "0.5s", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#pricing" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
            Join Today <span className="arrow">→</span>
          </a>
          <a href="#biomarkers" className="btn-outline" style={{ fontSize: 16, padding: "15px 36px" }}>
            Explore All Biomarkers
          </a>
        </div>

        <div className="fade-up" style={{ transitionDelay: "0.65s", display: "flex", gap: 48, justifyContent: "center", marginTop: 72, flexWrap: "wrap" }}>
          {[
            { val: "200,000+", label: "Members" },
            { val: "100+", label: "Biomarkers Tested" },
            { val: "3,000+", label: "Lab Locations" },
            { val: "7 Days", label: "Fast Results" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "0.1em" }}>
        <span style={{ textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)", animation: "scrollLine 2s ease-in-out infinite" }} />
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to top, #000 0%, transparent 100%)", pointerEvents: "none", zIndex: 0 }} />

      <style>{`
        @keyframes pulse { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; } 50% { transform: translate(-50%,-50%) scale(1.1); opacity: 1; } }
        @keyframes scrollLine { 0%,100% { transform: scaleY(1); opacity: 1; } 50% { transform: scaleY(0.5); opacity: 0.5; } }
      `}</style>
    </section>
  );
}
