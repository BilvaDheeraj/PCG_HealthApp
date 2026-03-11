"use client";

import { motion } from "framer-motion";
import { Users, Search, Eye, FileText, Phone, Mail } from "lucide-react";
import { useState } from "react";

const patients = [
  { id: "P001", name: "Rajesh Kumar", age: 45, gender: "Male", phone: "+91 98765 43210", email: "rajesh@email.com", totalTests: 12, lastVisit: "Mar 08, 2026" },
  { id: "P002", name: "Priya Sharma", age: 32, gender: "Female", phone: "+91 87654 32109", email: "priya@email.com", totalTests: 8, lastVisit: "Mar 07, 2026" },
  { id: "P003", name: "Amit Patel", age: 55, gender: "Male", phone: "+91 76543 21098", email: "amit@email.com", totalTests: 24, lastVisit: "Mar 07, 2026" },
  { id: "P004", name: "Sneha Gupta", age: 28, gender: "Female", phone: "+91 65432 10987", email: "sneha@email.com", totalTests: 5, lastVisit: "Mar 06, 2026" },
  { id: "P005", name: "Vikram Singh", age: 60, gender: "Male", phone: "+91 54321 09876", email: "vikram@email.com", totalTests: 31, lastVisit: "Mar 06, 2026" },
  { id: "P006", name: "Anita Desai", age: 38, gender: "Female", phone: "+91 43210 98765", email: "anita@email.com", totalTests: 9, lastVisit: "Mar 05, 2026" },
];

const DiagnosticPatients = () => {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-diagnostic" /> Patient Records
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{patients.length} registered patients</p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-48" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((patient, i) => (
          <motion.div
            key={patient.id}
            className={`glass-card p-5 cursor-pointer transition-all ${selectedPatient === patient.id ? "border-diagnostic/40 glow-blue" : "hover:border-diagnostic/20"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05 }}
            onClick={() => setSelectedPatient(selectedPatient === patient.id ? null : patient.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-full gradient-diagnostic flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">{patient.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{patient.id}</span>
            </div>
            <h3 className="text-base font-semibold text-foreground">{patient.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{patient.age} yrs · {patient.gender}</p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="text-center p-2 rounded-lg bg-secondary/30">
                <p className="text-lg font-bold text-foreground">{patient.totalTests}</p>
                <p className="text-[10px] text-muted-foreground">Total Tests</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-secondary/30">
                <p className="text-xs font-medium text-foreground">{patient.lastVisit}</p>
                <p className="text-[10px] text-muted-foreground">Last Visit</p>
              </div>
            </div>

            {selectedPatient === patient.id && (
              <motion.div className="mt-4 pt-4 border-t border-border/50 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Phone className="w-3 h-3" />{patient.phone}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Mail className="w-3 h-3" />{patient.email}</div>
                <div className="flex gap-2 mt-3">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-diagnostic/10 text-diagnostic text-xs font-medium hover:bg-diagnostic/20 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> View History
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-secondary/70 transition-colors">
                    <FileText className="w-3.5 h-3.5" /> Reports
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticPatients;
