const doctors = [
  { name: "Dr. Anant Vinjamoori", role: "Chief Longevity Officer", inst: "AIIMS, New Delhi", initials: "AV" },
  { name: "Dr. Priya Nair", role: "Head of Cardiology", inst: "PGI, Chandigarh", initials: "PN" },
  { name: "Dr. Rahul Bansal", role: "Metabolomics Expert", inst: "CMC, Vellore", initials: "RB" },
];

const logos = ["AIIMS", "PGI", "CMC Vellore", "Tata Memorial", "Apollo", "Fortis", "Manipal"];

export default function MedicalBoard() {
  return (
    <section id="team" style={{ position: "relative", zIndex: 1, background: "transparent", padding: "100px 0" }}>
      <div className="container">
        <div style={{ overflow: "hidden", marginBottom: 80, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right,#000,transparent)", zIndex: 2 }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left,#000,transparent)", zIndex: 2 }} />
          <div className="ticker-track" style={{ display: "flex", gap: 64, alignItems: "center" }}>
            {[...logos, ...logos].map((l, i) => (
              <span key={i} style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="label fade-up" style={{ color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Medical board</p>
          <h2 className="display-md fade-up" style={{ color: "#fff", transitionDelay: "0.1s" }}>Built by India's top experts</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {doctors.map((d, i) => (
            <div key={d.name} className="card-dark fade-up" style={{ transitionDelay: `${0.15 * i}s`, textAlign: "center" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF5500, #FF8C00)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 22,
                  color: "#fff",
                  margin: "0 auto 20px",
                }}
              >
                {d.initials}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{d.name}</h3>
              <p style={{ fontSize: 13, color: "#FF5500", marginBottom: 4, fontWeight: 600 }}>{d.role}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{d.inst}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
