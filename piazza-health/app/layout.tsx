import type { Metadata } from "next";
import "./globals.css";
import "../components/ScrollToTop"; // Not the right way, I need to import the default export
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  title: "Piazza Health — Unlock Your New Health Intelligence",
  description: "India's first comprehensive health intelligence platform. 100+ biomarker testing, annual blood tests, and personalized health plans. Starting at just ₹1,499/month.",
  keywords: "health checkup india, blood test india, biomarkers, preventive health, piazza health, annual checkup",
  authors: [{ name: "Piazza Health" }],
  openGraph: {
    title: "Piazza Health — Unlock Your New Health Intelligence",
    description: "India's first comprehensive health intelligence platform.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
