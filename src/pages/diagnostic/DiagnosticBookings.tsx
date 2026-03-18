import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle, MoreHorizontal, Search, Filter, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const statusStyles: Record<string, string> = {
  confirmed: "bg-health-green/10 text-health-green",
  pending: "bg-health-yellow/10 text-health-yellow",
  "in-progress": "bg-health-blue/10 text-health-blue",
  cancelled: "bg-health-red/10 text-health-red",
};

const DiagnosticBookings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/diagnostic/bookings")
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = bookings.filter(b =>
    b.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.test.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStatus = (id: string, status: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <DashboardLayout role="diagnostic">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Bookings</h1>
            <p className="text-muted-foreground text-sm mt-1">{bookings.length} total bookings</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-40" />
            </div>
            <button className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {loading ? (
             <div className="flex justify-center py-12">
               <div className="w-8 h-8 rounded-full border-2 border-diagnostic border-t-transparent animate-spin" />
             </div>
        ) : (
          <motion.div className="glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Patient</th>
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Test</th>
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Date & Time</th>
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Status</th>
                    <th className="text-right px-5 py-3 text-xs text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => (
                    <motion.tr
                      key={b.id}
                      className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.03 }}
                    >
                      <td className="px-5 py-4">
                        <p className="text-foreground font-medium">{b.patient}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" />{b.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{b.test}</td>
                      <td className="px-5 py-4 text-muted-foreground">
                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</div>
                        <div className="flex items-center gap-1 text-xs mt-0.5"><Clock className="w-3 h-3" />{b.time}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[b.status]}`}>{b.status}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {b.status === "pending" && (
                            <button onClick={() => updateStatus(b.id, "confirmed")} className="p-1.5 rounded-lg hover:bg-health-green/10 transition-colors">
                              <CheckCircle className="w-4 h-4 text-health-green" />
                            </button>
                          )}
                          <button onClick={() => updateStatus(b.id, "cancelled")} className="p-1.5 rounded-lg hover:bg-health-red/10 transition-colors">
                            <XCircle className="w-4 h-4 text-health-red" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticBookings;
