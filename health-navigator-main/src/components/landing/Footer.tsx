import { Link } from "react-router-dom";

const links: Record<string, string[]> = {
  Product: ["Membership", "Biomarkers", "Mobile App", "Add-on Testing"],
  Company: ["About Us", "Team", "Careers", "Press"],
  Resources: ["Blog", "Health Guides", "Reviews", "FAQ"],
  Legal: ["Privacy Policy", "Terms of Use", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1, background: "#000", color: "#fff", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ padding: "100px 0", textAlign: "center", background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,85,0,0.12) 0%, transparent 70%)" }}>
        <div className="container">
          <h2 className="display-lg fade-up" style={{ color: "#fff", marginBottom: 24, maxWidth: 700, margin: "0 auto 24px" }}>
            Health is your greatest{" "}
            <span style={{ background: "linear-gradient(135deg, #FF5500, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>superpower.</span> <br />
            It's time to unlock it.
          </h2>
          <p className="body-lg fade-up" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 40, transitionDelay: "0.1s" }}>Join Piazza Health today — starting at ₹1,499/month</p>
          <Link to="/auth" className="btn-primary fade-up" style={{ fontSize: 17, padding: "18px 44px", transitionDelay: "0.2s" }}>
            Join Today <span className="arrow">→</span>
          </Link>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "64px 0 40px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 60 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #FF5500, #FF8C00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff" }}>P</div>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Piazza Health</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 220 }}>India's first comprehensive health intelligence platform. Registered with the Indian Council of Medical Research (ICMR).</p>
              <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
                {["𝕏", "📷", "in"].map((s) => (
                  <a key={s} href="#" style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <p style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 20, fontWeight: 600 }}>{heading}</p>
                {items.map((item) => (
                  <div key={item} style={{ marginBottom: 12 }}>
                    <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2025 Piazza Health Pvt. Ltd. | Mumbai, Maharashtra, India</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>ICMR Registered | ISO 15189:2022 Certified</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
