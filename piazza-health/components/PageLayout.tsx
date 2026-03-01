"use client";
import Link from "next/link";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function PageLayout({ children, title, subtitle, badge }: {
    children: ReactNode;
    title: string;
    subtitle?: string;
    badge?: string;
}) {
    return (
        <>
            <Navbar />
            <main>
                {/* Page Hero */}
                <section style={{
                    paddingTop: 140, paddingBottom: 80,
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,85,0,0.1) 0%, transparent 70%), #000",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                    <div className="container" style={{ textAlign: "center" }}>
                        {badge && (
                            <span className="badge badge-orange" style={{ marginBottom: 20, display: "inline-flex" }}>
                                {badge}
                            </span>
                        )}
                        <h1 className="display-lg" style={{ color: "#fff", marginBottom: 16 }}>{title}</h1>
                        {subtitle && <p className="body-lg" style={{ color: "rgba(255,255,255,0.55)", maxWidth: 600, margin: "0 auto" }}>{subtitle}</p>}
                    </div>
                </section>
                {children}
            </main>
            {/* Shared Mini Footer */}
            <div style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 0" }}>
                <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                        <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg,#FF5500,#FF8C00)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "#fff" }}>P</div>
                        <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Piazza Health</span>
                    </Link>
                    <Link href="/auth" className="btn-primary" style={{ fontSize: 13, padding: "9px 20px" }}>Try Piazza →</Link>
                </div>
            </div>
        </>
    );
}
