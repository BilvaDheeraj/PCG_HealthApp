"use client";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                let start = 0;
                const duration = 2000;
                const step = 16;
                const increment = target / (duration / step);
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= target) { setCount(target); clearInterval(timer); }
                    else setCount(Math.floor(start));
                }, step);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <div ref={ref} className="stat-number" style={{ color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>{prefix}{count}{suffix}</div>;
}

const stats = [
    { val: 70, suffix: "%", label: "of members find diabetes risk factors early" },
    { val: 85, suffix: "%", label: "detect heart disease risk before symptoms" },
    { val: 92, suffix: "%", label: "successfully slow their speed of ageing" },
];

export default function Stats() {
    return (
        <section id="stats-section" style={{ position: "relative", zIndex: 10, background: "transparent", padding: "160px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: 100 }}>
                    <p className="label fade-up" style={{ color: "rgba(255,255,255,0.4)", marginBottom: 16, fontSize: "14px", letterSpacing: "0.2em" }}>Data-driven results</p>
                    <h2 className="display-md fade-up" style={{ color: "#fff", transitionDelay: "0.1s", fontSize: "24px", fontWeight: 500 }}>
                        The numbers speak for themselves
                    </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0 }}>
                    {stats.map((s, i) => (
                        <div key={i} className="fade-up" style={{
                            padding: "40px 20px", textAlign: "center",
                            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                            transitionDelay: `${0.2 + i * 0.1}s`
                        }}>
                            <CountUp target={s.val} suffix={s.suffix} />
                            <p style={{ 
                                color: "rgba(255,255,255,0.5)", 
                                fontSize: "16px", 
                                marginTop: 24, 
                                maxWidth: "240px", 
                                margin: "24px auto 0",
                                lineHeight: "1.5"
                            }}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
