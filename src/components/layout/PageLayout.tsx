import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function PageLayout({ children, title, subtitle, badge }: PageLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        {/* Page Hero */}
        <section
          style={{
            paddingTop: 140,
            paddingBottom: 80,
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,85,0,0.1) 0%, transparent 70%), #000",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            {badge && (
              <span className="inline-flex px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-bold uppercase tracking-wider mb-5 border border-orange-500/20">
                {badge}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </section>
        
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Shared Mini Footer */}
      <footer className="bg-black border-t border-white/5 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5500] to-[#FF8C00] flex items-center justify-center font-black text-sm">
              P
            </div>
            <span className="font-bold text-lg">Piazza Health</span>
          </Link>
          <Link
            to="/auth"
            className="px-6 py-2 bg-[#FF5500] hover:bg-[#FF6611] text-white rounded-full font-bold text-sm transition-all"
          >
            Try Piazza →
          </Link>
        </div>
      </footer>
    </div>
  );
}
