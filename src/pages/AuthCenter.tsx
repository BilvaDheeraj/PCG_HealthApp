import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Building2, BarChart3, Upload, Cpu, CheckCircle2, Users, Globe } from "lucide-react";

const benefits = [
  { icon: Upload, text: "Batch upload patient reports via API or portal" },
  { icon: Cpu, text: "AI extracts structured data instantly via OCR + LLM" },
  { icon: BarChart3, text: "Center-level analytics and performance dashboard" },
  { icon: Users, text: "Manage patient records and report history" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: 12,
  padding: "13px 14px 13px 40px",
  color: "white",
  fontSize: 14,
  outline: "none",
};

export default function AuthCenter() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/diagnostic");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#050508", fontFamily: "Inter, sans-serif" }}>
      <div style={{ width: "52%", flexShrink: 0, position: "sticky", top: 0, height: "100vh", background: "linear-gradient(135deg, #050814 0%, #050508 60%)", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3.5rem", overflow: "hidden" }} className="hidden lg:flex">
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link to="/auth" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 28, textDecoration: "none" }}><ArrowLeft size={14} /> Back to portal selection</Link>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #3b82f6, #22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(59,130,246,0.3)" }}><Activity size={22} color="white" /></div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>HealthAI</span>
          </Link>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(59,130,246,0.3)", background: "rgba(59,130,246,0.1)", color: "#60a5fa", marginBottom: 24 }}>Diagnostic Center Portal</div>
          <h2 style={{ fontSize: 52, fontWeight: 900, color: "white", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Supercharge<br /><span style={{ background: "linear-gradient(90deg, #60a5fa, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your lab's</span><br />AI pipeline.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.7, maxWidth: 360, marginBottom: 36 }}>Integrate your diagnostic lab with HealthAI to automatically parse and extract data from all patient reports.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><b.icon size={16} color="#60a5fa" /></div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{b.text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[{ val: "342+", label: "Partner Centers" }, { val: "14k+", label: "Reports Parsed" }, { val: "99.2%", label: "Accuracy Rate" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: 16, borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#93c5fd", marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.2)" }}><Globe size={14} color="rgba(96,165,250,0.5)" />Enterprise SLA · SOC 2 Compliant · Multi-region</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", justifyContent: "center", padding: "48px 32px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }} className="lg:hidden">
            <Link to="/auth" style={{ color: "rgba(255,255,255,0.4)", display: "flex" }}><ArrowLeft size={18} /></Link>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#3b82f6,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center" }}><Activity size={18} color="white" /></div>
            <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>HealthAI</span>
            <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#60a5fa", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", padding: "4px 10px", borderRadius: 100 }}>Center</span>
          </div>

          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 6, marginBottom: 36 }}>
            {(["login", "signup"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "10px 0", borderRadius: 11, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.25s", background: mode === m ? "linear-gradient(135deg, #3b82f6, #22d3ee)" : "transparent", color: mode === m ? "white" : "rgba(255,255,255,0.35)", boxShadow: mode === m ? "0 4px 20px rgba(59,130,246,0.25)" : "none" }}>{m === "login" ? "Sign In" : "Register Center"}</button>
            ))}
          </div>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.5px", marginBottom: 8 }}>{mode === "login" ? "Center Sign In" : "Register your center"}</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{mode === "login" ? "Access your diagnostic center's AI portal." : "Set up your lab and begin AI-powered report parsing."}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {mode === "signup" && (
                <>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Center Name</label>
                    <div style={{ position: "relative" }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><Building2 size={15} /></span><input type="text" required placeholder="Apollo Diagnostics, Chennai" style={inputStyle} /></div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact Person</label>
                    <input type="text" required placeholder="Dr. Priya Sharma" style={{ ...inputStyle, paddingLeft: 14 }} />
                  </div>
                </>
              )}
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Official Email</label>
                <div style={{ position: "relative" }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><Mail size={15} /></span><input type="email" required placeholder="center@yourdomain.com" style={inputStyle} /></div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}><label style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>{mode === "login" && <a href="#" style={{ fontSize: 12, color: "#60a5fa", textDecoration: "none" }}>Forgot password?</a>}</div>
                <div style={{ position: "relative" }}><span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><Lock size={15} /></span><input type={showPw ? "text" : "password"} required placeholder="••••••••••" style={{ ...inputStyle, paddingRight: 40 }} /><button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", display: "flex" }}>{showPw ? <EyeOff size={15} /> : <Eye size={15} />}</button></div>
              </div>
              {mode === "signup" && (
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Center Tier</label>
                  <select style={{ ...inputStyle, paddingLeft: 14, color: "rgba(255,255,255,0.6)" }}><option value="">Select your center size...</option><option>Tier 1 — Enterprise Lab (500+ reports/day)</option><option>Tier 2 — Medium Lab (100–500 reports/day)</option><option>Tier 3 — Small Clinic (&lt;100 reports/day)</option></select>
                </div>
              )}
              <button type="submit" style={{ width: "100%", padding: "14px", borderRadius: 13, border: "none", background: "linear-gradient(135deg, #3b82f6, #22d3ee)", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 30px rgba(59,130,246,0.25)", marginTop: 4 }}>{mode === "login" ? "Sign In to Center Portal" : "Register Your Center"}<ArrowRight size={16} /></button>
            </div>
          </form>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.2)" }}><CheckCircle2 size={13} color="rgba(34,197,94,0.5)" />SOC 2 compliant · Enterprise SLA · Multi-region</div>
        </div>
      </div>
    </div>
  );
}

