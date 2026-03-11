import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
                display: ["Space Grotesk", "Inter", "sans-serif"],
            },
            screens: {
                "2xl": "1400px",
            },
            colors: {
                health: {
                    green: "hsl(var(--health-green))",
                    yellow: "hsl(var(--health-yellow))",
                    red: "hsl(var(--health-red))",
                    blue: "hsl(var(--health-blue))",
                },
                patient: {
                    DEFAULT: "hsl(var(--patient-accent))",
                    glow: "hsl(var(--patient-glow))",
                },
                diagnostic: {
                    DEFAULT: "hsl(var(--diagnostic-accent))",
                    glow: "hsl(var(--diagnostic-glow))",
                },
                admin: {
                    DEFAULT: "hsl(var(--admin-accent))",
                    glow: "hsl(var(--admin-glow))",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                "slide-in-left": {
                    "0%": { transform: "translateX(-20px)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                "slide-in-right": {
                    "0%": { transform: "translateX(20px)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.5s ease-out",
                "scale-in": "scale-in 0.3s ease-out",
                "slide-in-left": "slide-in-left 0.4s ease-out",
                "slide-in-right": "slide-in-right 0.4s ease-out",
                "slide-up": "slide-up 0.5s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
