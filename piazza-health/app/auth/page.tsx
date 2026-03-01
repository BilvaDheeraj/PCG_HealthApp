"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLogin && password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="auth-wrapper" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "#050505" }}>
            {/* Animated Background Elements */}
            <div className="bg-orb orb-1 fade-up" style={{ position: "absolute", top: "10%", left: "15%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(255,85,0,0.15) 0%, rgba(255,85,0,0) 70%)", borderRadius: "50%", filter: "blur(60px)", animation: "float 12s ease-in-out infinite" }} />
            <div className="bg-orb orb-2 fade-up" style={{ position: "absolute", bottom: "10%", right: "15%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(255,100,20,0.1) 0%, rgba(200,50,0,0) 70%)", borderRadius: "50%", filter: "blur(80px)", animation: "float 15s ease-in-out infinite reverse", animationDelay: "2s" }} />
            <div className="dot-grid" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.5, pointerEvents: "none" }} />

            {/* Back Button */}
            <Link href="/" className="back-btn fade-up" style={{ position: "absolute", top: 40, left: 40, display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s, transform 0.2s", zIndex: 10 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back to Home
            </Link>

            {/* Main Container */}
            <div className="auth-container fade-up" style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 440, padding: 40 }}>

                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, background: "#FF5500", borderRadius: 12, marginBottom: 24, boxShadow: "0 8px 32px rgba(255,85,0,0.4)" }}>
                        <span style={{ color: "#fff", fontWeight: 800, fontSize: 24, fontFamily: "var(--font-inter)" }}>P</span>
                    </div>
                    <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>
                        {isLogin ? "Welcome back" : "Create an account"}
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
                        {isLogin ? "Enter your details to access your dashboard." : "Join the future of proactive health."}
                    </p>
                </div>

                {/* Form Card */}
                <div className="auth-card" style={{ background: "rgba(20,20,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 32, boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                        <div className={`input-group ${!isLogin ? "slide-down" : "hidden"}`} style={{ display: isLogin ? "none" : "block", position: "relative" }}>
                            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Full Name</label>
                            <div style={{ position: "relative" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)}
                                    style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px 14px 44px", color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.2s" }}
                                    onFocus={(e) => e.target.style.borderColor = "#FF5500"} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>
                        </div>

                        <div className="input-group" style={{ position: "relative" }}>
                            <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Email Address</label>
                            <div style={{ position: "relative" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                                    style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px 14px 44px", color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.2s" }}
                                    onFocus={(e) => e.target.style.borderColor = "#FF5500"} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>
                        </div>

                        <div className="input-group" style={{ position: "relative" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500 }}>Password</label>
                                {isLogin && <a href="#" style={{ color: "#FF5500", fontSize: 12, textDecoration: "none", fontWeight: 500 }} className="hover-underline">Forgot?</a>}
                            </div>
                            <div style={{ position: "relative" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                                    style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px 14px 44px", color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.2s" }}
                                    onFocus={(e) => e.target.style.borderColor = "#FF5500"} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>
                        </div>

                        <div className={`input-group ${!isLogin ? "slide-down" : "hidden"}`} style={{ display: isLogin ? "none" : "block", position: "relative" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                <label style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500 }}>Confirm Password</label>
                            </div>
                            <div style={{ position: "relative" }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                <input type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                    style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px 14px 44px", color: "#fff", fontSize: 15, outline: "none", transition: "border-color 0.2s" }}
                                    onFocus={(e) => e.target.style.borderColor = !isLogin && confirmPassword && password !== confirmPassword ? "#ff4444" : "#FF5500"}
                                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>
                            {!isLogin && confirmPassword && password !== confirmPassword && (
                                <p style={{ color: "#ff4444", fontSize: 12, marginTop: 6 }}>Passwords do not match.</p>
                            )}
                        </div>

                        <button type="submit" className="submit-btn" style={{ width: "100%", background: "#FF5500", color: "#fff", border: "none", borderRadius: 12, padding: "16px", fontSize: 15, fontWeight: 600, marginTop: 8, cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, transition: "transform 0.2s, background 0.2s" }}>
                            {isLogin ? "Sign In" : "Create Account"}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
                        </button>

                    </form>

                    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "24px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>Or continue with</span>
                        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
                    </div>

                    <div style={{ display: "flex", gap: 12 }}>
                        <button className="social-btn" style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", transition: "background 0.2s" }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                        </button>
                        <button className="social-btn" style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", transition: "background 0.2s" }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" /></svg>
                        </button>
                        <button className="social-btn" style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", transition: "background 0.2s" }}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" /></svg>
                        </button>
                    </div>

                </div>

                {/* Toggle Mode */}
                <div style={{ textAlign: "center", marginTop: 24 }}>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "#FF5500", fontWeight: 600, fontSize: 14, cursor: "pointer", padding: 0 }} className="hover-underline">
                            {isLogin ? "Sign up" : "Log in"}
                        </button>
                    </p>
                </div>

            </div>

            <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .fade-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .back-btn:hover {
          color: #fff !important;
          transform: translateX(-4px) !important;
        }
        .submit-btn:hover {
          background: #e64d00 !important;
          transform: scale(1.02) !important;
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.1) !important;
        }
        .hover-underline:hover { text-decoration: underline !important; }
        .hidden { opacity: 0; pointer-events: none; position: absolute; }
        .slide-down { animation: slideDown 0.3s ease forwards; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); height: 0; margin-bottom: 0; }
          to { opacity: 1; transform: none; height: 80px; margin-bottom: 20px; }
        }
      `}</style>
        </div>
    );
}
