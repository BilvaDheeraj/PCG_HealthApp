"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";


import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import Membership from "@/components/Membership";
import MedicalBoard from "@/components/MedicalBoard";
import Biomarkers from "@/components/Biomarkers";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

import ScrollFrames from "@/components/ScrollFrames";

export default function Home() {
  useEffect(() => {
    // Force scroll to top on refresh
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    };
    initLenis();

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".fade-up, .fade-in").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ position: "relative", background: "transparent" }}>
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
