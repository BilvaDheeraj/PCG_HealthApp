import { useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import HowItWorks from "@/components/landing/HowItWorks";
import Reviews from "@/components/landing/Reviews";
import Membership from "@/components/landing/Membership";
import MedicalBoard from "@/components/landing/MedicalBoard";
import Biomarkers from "@/components/landing/Biomarkers";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import ScrollFrames from "@/components/landing/ScrollFrames";

export default function LandingPage() {
  useEffect(() => {
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        const lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch {
        // lenis optional
      }
    };
    initLenis();

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-up, .fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="landing-page hero-gradient" style={{ position: "relative", minHeight: "100vh" }}>
      <ScrollFrames />
      <Navbar />
      <Hero />
      <MedicalBoard />
      <Stats />
      <HowItWorks />
      <Reviews />
      <Membership />
      <Features />
      <Biomarkers />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
