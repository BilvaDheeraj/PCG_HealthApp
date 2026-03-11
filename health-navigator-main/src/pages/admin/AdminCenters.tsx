import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Building2, Search, CheckCircle, XCircle, Eye, MapPin, Phone } from "lucide-react";
import { useState } from "react";

type CenterStatus = "active" | "pending" | "suspended";

interface DiagCenter {
  id: string;
  name: string;
  city: string;
  phone: string;
  tests: number;
  patients: number;
  status: CenterStatus;
  rating: number;
}

const initialCenters: DiagCenter[] = [
  { id: "C001", name: "LifeCare Diagnostics", city: "Mumbai", phone: "+91 22 1234 5678", tests: 456, patients: 320, status: "active", rating: 4.5 },
  { id: "C002", name: "Apollo Diagnostics", city: "Delhi", phone: "+91 11 2345 6789", tests: 1234, patients: 890, status: "active", rating: 4.8 },
  { id: "C003", name: "SRL Labs", city: "Bangalore", phone: "+91 80 3456 7890", tests: 678, patients: 450, status: "active", rating: 4.3 },
  { id: "C004", name: "Thyrocare", city: "Mumbai", phone: "+91 22 4567 8901", tests: 890, patients: 620, status: "active", rating: 4.6 },
  { id: "C005", name: "MedLab Chennai", city: "Chennai", phone: "+91 44 5678 9012", tests: 0, patients: 0, status: "pending", rating: 0 },
  { id: "C006", name: "HealthFirst Labs", city: "Hyderabad", phone: "+91 40 6789 0123", tests: 234, patients: 180, status: "active", rating: 4.1 },
];

const statusStyles: Record<CenterStatus, string> = {
  active: "bg-health-green/10 text-health-green",
  pending: "bg-health-yellow/10 text-health-yellow",
  suspended: "bg-health-red/10 text-health-red",
};

const AdminCenters = () => {
  const [centers, setCenters] = useState(initialCenters);
  const [search, setSearch] = useState("");

  const filtered = centers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = (id: string, status: CenterStatus) => {
    setCenters(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Building2 className="w-6 h-6 text-admin" /> Diagnostic Centers
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{centers.length} registered centers</p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search centers..." value={search} onChange={e => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-48" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((center, i) => (
            <motion.div
              key={center.id}
              className="glass-card p-5 hover:border-admin/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.06 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg gradient-admin flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[center.status]}`}>{center.status}</span>
              </div>

              <h3 className="text-base font-semibold text-foreground">{center.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="w-3 h-3" />{center.city}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5"><Phone className="w-3 h-3" />{center.phone}</div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 rounded-lg bg-secondary/30">
                  <p className="text-sm font-bold text-foreground">{center.tests}</p>
                  <p className="text-[10px] text-muted-foreground">Tests</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-secondary/30">
                  <p className="text-sm font-bold text-foreground">{center.patients}</p>
                  <p className="text-[10px] text-muted-foreground">Patients</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-secondary/30">
                  <p className="text-sm font-bold text-foreground">{center.rating > 0 ? `${center.rating}★` : "N/A"}</p>
                  <p className="text-[10px] text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-3 border-t border-border/50">
                {center.status === "pending" ? (
                  <>
                    <button onClick={() => updateStatus(center.id, "active")} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-health-green/10 text-health-green text-xs font-medium hover:bg-health-green/20 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => updateStatus(center.id, "suspended")} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-health-red/10 text-health-red text-xs font-medium hover:bg-health-red/20 transition-colors">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-admin/10 text-admin text-xs font-medium hover:bg-admin/20 transition-colors">
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </button>
                    {center.status === "active" && (
                      <button onClick={() => updateStatus(center.id, "suspended")} className="px-3 py-2 rounded-lg bg-health-red/10 text-health-red text-xs font-medium hover:bg-health-red/20 transition-colors">
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminCenters;
