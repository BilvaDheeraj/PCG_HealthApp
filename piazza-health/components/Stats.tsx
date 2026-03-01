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

    return <div ref={ref} className="stat-number gradient-text">{prefix}{count}{suffix}</div>;
}

const stats = [
    { val: 70, suffix: "%", label: "of members find diabetes risk factors early" },
    { val: 85, suffix: "%", label: "detect heart disease risk before symptoms" },
    { val: 92, suffix: "%", label: "successfully slow their speed of ageing" },
];

export default function Stats() {
    return (
        <section style={{ background: "#111", padding: "120px 0" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <p className="label fade-up" style={{ color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Data-driven results</p>
                    <h2 className="display-md fade-up" style={{ color: "#fff", transitionDelay: "0.1s" }}>
                        The numbers speak for themselves
                    </h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            padding: "60px 40px", textAlign: "center",
                            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        }}>
                            <CountUp target={s.val} suffix={s.suffix} />
                            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, marginTop: 16, maxWidth: 200, margin: "16px auto 0" }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
