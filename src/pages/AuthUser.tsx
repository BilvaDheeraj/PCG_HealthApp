import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, User, Heart, TrendingUp, Brain, CheckCircle2, MessageSquare } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

const benefits = [
  { icon: Brain, text: "AI decodes your blood reports in seconds" },
  { icon: TrendingUp, text: "Track every biomarker trend over time" },
  { icon: Heart, text: "Personalised diet & supplement plans" },
  { icon: MessageSquare, text: "Ask your health AI anything, 24/7" },
];

export default function AuthUser() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (tokenResponse: any) => {
    console.log("Google Login Success:", tokenResponse);
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      const data = await res.json();
      if (data.name) {
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userPicture", data.picture);
      }
      toast.success(`Welcome back, ${data.given_name || "Patient"}`);
      navigate("/patient");
    } catch (error) {
      console.error("Error fetching Google user info:", error);
      toast.success("Successfully authenticated with Google");
      navigate("/patient");
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      toast.error("Google Login Failed");
      console.log("Login Failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    
    if (mode === "signup" && name) {
      localStorage.setItem("userName", name);
    } else if (mode === "login") {
      // Mock login - if no name exists, use a default or keep existing
      if (!localStorage.getItem("userName")) {
        localStorage.setItem("userName", "John Doe");
      }
    }
    if (email) localStorage.setItem("userEmail", email);
    
    navigate("/patient");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#050508", fontFamily: "Inter, sans-serif" }}>
      <div
        style={{
          width: "52%",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          background: "linear-gradient(135deg, #0a0a12 0%, #050508 60%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3.5rem",
          overflow: "hidden",
        }}
        className="hidden lg:flex"
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link to="/auth" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 28, textDecoration: "none" }}>
            <ArrowLeft size={14} /> Back to portal selection
          </Link>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #f97316, #fbbf24)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(249,115,22,0.3)" }}>
              <Activity size={22} color="white" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>HealthAI</span>
          </Link>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(249,115,22,0.3)", background: "rgba(249,115,22,0.1)", color: "#fb923c", marginBottom: 24 }}>
            Patient Portal
          </div>
          <h2 style={{ fontSize: 52, fontWeight: 900, color: "white", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Your health,
            <br />
            <span style={{ background: "linear-gradient(90deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>intelligently</span>
            <br />
            decoded.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, lineHeight: 1.7, maxWidth: 360, marginBottom: 36 }}>Upload any lab report and get instant AI-powered insights, trends, and personalised diet plans.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <b.icon size={16} color="#fb923c" />
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex" }}>
            {["P", "R", "S", "A"].map((l, i) => (
              <div key={l} style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #050508", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "white", fontWeight: 700, marginLeft: i > 0 ? -10 : 0, background: ["#f97316", "#ec4899", "#14b8a6", "#a855f7"][i] }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, color: "white", fontWeight: 600, marginBottom: 2 }}>12,000+ patients trust HealthAI</div>
            <div style={{ fontSize: 12, color: "#fbbf24" }}>4.9 / 5.0</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", justifyContent: "center", padding: "48px 32px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }} className="lg:hidden">
            <Link to="/auth" style={{ color: "rgba(255,255,255,0.4)", display: "flex" }}><ArrowLeft size={18} /></Link>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#f97316,#fbbf24)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Activity size={18} color="white" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: "white" }}>HealthAI</span>
            <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#fb923c", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", padding: "4px 10px", borderRadius: 100 }}>Patient</span>
          </div>

          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 6, marginBottom: 36 }}>
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 11,
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  background: mode === m ? "linear-gradient(135deg, #f97316, #fbbf24)" : "transparent",
                  color: mode === m ? "white" : "rgba(255,255,255,0.35)",
                  boxShadow: mode === m ? "0 4px 20px rgba(249,115,22,0.25)" : "none",
                }}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "white", letterSpacing: "-0.5px", marginBottom: 8 }}>{mode === "login" ? "Welcome back" : "Start your journey"}</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{mode === "login" ? "Sign in to access your personal health AI dashboard." : "Create your free patient account and upload your first report."}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {mode === "signup" && (
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Full Name</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><User size={15} /></span>
                    <input type="text" name="fullName" required placeholder="John Doe" style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "13px 14px 13px 40px", color: "white", fontSize: 14, outline: "none" }} />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Address</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><Mail size={15} /></span>
                  <input type="email" name="email" required placeholder="you@example.com" style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "13px 14px 13px 40px", color: "white", fontSize: 14, outline: "none" }} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Password</label>
                  {mode === "login" && <a href="#" style={{ fontSize: 12, color: "#f97316", textDecoration: "none" }}>Forgot password?</a>}
                </div>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><Lock size={15} /></span>
                  <input type={showPw ? "text" : "password"} required placeholder="••••••••••" style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "13px 40px 13px 40px", color: "white", fontSize: 14, outline: "none" }} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", display: "flex" }}>{showPw ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                </div>
              </div>

              {mode === "signup" && (
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", display: "flex" }}><Lock size={15} /></span>
                    <input type={showConfirm ? "text" : "password"} required placeholder="••••••••••" style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "13px 40px 13px 40px", color: "white", fontSize: 14, outline: "none" }} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", display: "flex" }}>{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                  </div>
                </div>
              )}

              <button type="submit" style={{ width: "100%", padding: "14px", borderRadius: 13, border: "none", background: "linear-gradient(135deg, #f97316, #fbbf24)", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 8px 30px rgba(249,115,22,0.25)", marginTop: 4 }}>
                {mode === "login" ? "Sign In to Patient Portal" : "Create Patient Account"}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            <button
              onClick={() => loginWithGoogle()}
              style={{
                gridColumn: "span 2",
                padding: "12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 10.997 0 009 18z" fill="#34A853" />
                <path d="M3.964 10.711c-.18-.54-.282-1.117-.282-1.711 0-.594.102-1.17.282-1.711V4.957H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.043l3.007-2.332z" fill="#FBBC05" />
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.443 2.043.957 4.958L3.964 7.29C4.672 3.163 8.657 3.58 9 3.58z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            <CheckCircle2 size={13} color="rgba(34,197,94,0.5)" />
            HIPAA compliant · End-to-end encrypted
          </div>
        </div>
      </div>
    </div>
  );
}

