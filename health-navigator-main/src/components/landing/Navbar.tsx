import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const megaMenu = {
  product: [
    { href: "/how-it-works", icon: "🔬", title: "How It Works", desc: "Get the most from your premium health membership" },
    { href: "/biomarkers", icon: "🧬", title: "What We Test", desc: "100+ biomarkers in your annual test panel" },
  ],
  learn: [
    { href: "/reviews", icon: "⭐", title: "Reviews", desc: "What our members are saying" },
    { href: "/faq", icon: "❓", title: "FAQs", desc: "Common questions answered" },
  ],
  legal: [
    { href: "/legal/privacy", title: "Privacy Policy" },
    { href: "/legal/terms", title: "Terms & Conditions" },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setMenuOpen(false), 150);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "10px 0" : "18px 0",
          transition: "all 0.4s ease",
          backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
          background: scrolled || menuOpen ? "rgba(0,0,0,0.9)" : "transparent",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div className="container-wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "linear-gradient(135deg, #FF5500, #FF8C00)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 15,
                color: "#fff",
              }}
            >
              P
            </div>
            <span style={{ fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: "-0.02em" }}>Piazza Health</span>
          </Link>

          <div
            ref={menuRef}
            style={{ display: "flex", alignItems: "center", gap: 4, position: "relative" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="nav-desktop"
          >
            {[
              { label: "How It Works", href: "/how-it-works" },
              { label: "What We Test", href: "/biomarkers" },
              { label: "Reviews", href: "/reviews" },
              { label: "FAQs", href: "/faq" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 13.5,
                  fontWeight: 500,
                  textDecoration: "none",
                  padding: "8px 12px",
                  borderRadius: 8,
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            <Link to="/auth" className="btn-outline" style={{ fontSize: 13, padding: "8px 18px" }}>
              Login
            </Link>
            <Link to="/auth" className="btn-primary" style={{ fontSize: 13, padding: "8px 18px" }}>
              Try Piazza <span className="arrow">→</span>
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 4 }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mega dropdown */}
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(8,8,8,0.97)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity 0.25s ease, transform 0.25s ease",
            overflow: "hidden",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="container-wide" style={{ padding: "36px 24px", display: "grid", gridTemplateColumns: "1fr 1.4fr 0.7fr", gap: 48 }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(255,85,0,0.12) 0%, rgba(255,140,0,0.06) 100%)",
                border: "1px solid rgba(255,85,0,0.2)",
                borderRadius: 16,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 22, marginBottom: 12 }}>🧬</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Unlock Your Biological Age Today</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>Discover what's happening inside your body with 100+ biomarkers tested annually.</p>
              </div>
              <Link to="/auth" className="btn-primary" style={{ marginTop: 24, fontSize: 13, padding: "10px 20px", alignSelf: "flex-start" }}>
                Get Started <span className="arrow">→</span>
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16, fontWeight: 700 }}>Product</p>
                {megaMenu.product.map((item) => (
                  <Link key={item.href} to={item.href} style={{ textDecoration: "none", display: "flex", gap: 12, padding: "10px 12px", borderRadius: 10, marginBottom: 2, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16, fontWeight: 700 }}>Learn More</p>
                {megaMenu.learn.map((item) => (
                  <Link key={item.href} to={item.href} style={{ textDecoration: "none", display: "flex", gap: 12, padding: "10px 12px", borderRadius: 10, marginBottom: 2, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16, fontWeight: 700 }}>Legal</p>
              {megaMenu.legal.map((item) => (
                <Link key={item.title} to={item.href} style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "7px 0", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.97)", paddingTop: 80, paddingLeft: 24, paddingRight: 24, overflowY: "auto" }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer" }}>✕</button>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "How It Works", href: "/how-it-works" },
              { label: "What We Test", href: "/biomarkers" },
              { label: "Reviews", href: "/reviews" },
              { label: "FAQs", href: "/faq" },
            ].map(({ label, href }) => (
              <Link key={label} to={href} onClick={() => setMobileOpen(false)} style={{ color: "#fff", fontSize: 22, fontWeight: 700, textDecoration: "none", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {label}
              </Link>
            ))}
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              <Link to="/auth" className="btn-outline" style={{ textAlign: "center" }} onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/auth" className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }} onClick={() => setMobileOpen(false)}>Try Piazza →</Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
