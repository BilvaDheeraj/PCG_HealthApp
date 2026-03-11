import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { Calendar, FileText, Users, DollarSign, Clock, CheckCircle, XCircle, MoreHorizontal, Upload, Loader2, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const bookings = [
  { id: "B001", patient: "Rajesh Kumar", test: "Complete Blood Count", time: "09:30 AM", status: "confirmed" },
  { id: "B002", patient: "Priya Sharma", test: "Lipid Panel", time: "10:00 AM", status: "pending" },
  { id: "B003", patient: "Amit Patel", test: "Thyroid Profile", time: "10:30 AM", status: "confirmed" },
  { id: "B004", patient: "Sneha Gupta", test: "HbA1c", time: "11:00 AM", status: "in-progress" },
  { id: "B005", patient: "Vikram Singh", test: "Vitamin D", time: "11:30 AM", status: "confirmed" },
  { id: "B006", patient: "Anita Desai", test: "Liver Function", time: "12:00 PM", status: "pending" },
];

const revenueData = [
  { day: "Mon", revenue: 12400 },
  { day: "Tue", revenue: 15600 },
  { day: "Wed", revenue: 13200 },
  { day: "Thu", revenue: 18900 },
  { day: "Fri", revenue: 16700 },
  { day: "Sat", revenue: 21300 },
  { day: "Sun", revenue: 8500 },
];

const testDistribution = [
  { name: "CBC", value: 35, color: "hsl(217, 91%, 60%)" },
  { name: "Lipid", value: 25, color: "hsl(25, 95%, 53%)" },
  { name: "Thyroid", value: 20, color: "hsl(142, 71%, 45%)" },
  { name: "HbA1c", value: 12, color: "hsl(270, 70%, 60%)" },
  { name: "Other", value: 8, color: "hsl(215, 15%, 55%)" },
];

const recentReports = [
  { patient: "Rajesh Kumar", test: "CBC", status: "processed", confidence: 98 },
  { patient: "Meera Joshi", test: "Lipid Panel", status: "processing", confidence: null },
  { patient: "Suresh Reddy", test: "Thyroid", status: "processed", confidence: 95 },
  { patient: "Kavita Nair", test: "HbA1c", status: "uploaded", confidence: null },
];

const statusStyles: Record<string, string> = {
  confirmed: "bg-health-green/10 text-health-green",
  pending: "bg-health-yellow/10 text-health-yellow",
  "in-progress": "bg-health-blue/10 text-health-blue",
  processed: "bg-health-green/10 text-health-green",
  processing: "bg-health-blue/10 text-health-blue",
  uploaded: "bg-health-yellow/10 text-health-yellow",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-foreground font-semibold">{label}</p>
        <p className="text-diagnostic">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const DiagnosticDashboard = () => {
  return (
    <DashboardLayout role="diagnostic">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Bookings"
            value="24"
            icon={<Calendar className="w-5 h-5 text-primary-foreground" />}
            trend={{ value: "12%", positive: true }}
            accentClass="gradient-diagnostic"
            delay={0}
          />
          <StatCard
            title="Pending Reports"
            value="8"
            icon={<FileText className="w-5 h-5 text-primary-foreground" />}
            subtitle="3 urgent"
            accentClass="gradient-diagnostic"
            delay={0.1}
          />
          <StatCard
            title="Patients Served"
            value="156"
            icon={<Users className="w-5 h-5 text-primary-foreground" />}
            trend={{ value: "18%", positive: true }}
            accentClass="gradient-diagnostic"
            delay={0.2}
          />
          <StatCard
            title="Today's Revenue"
            value="₹42,500"
            icon={<DollarSign className="w-5 h-5 text-primary-foreground" />}
            trend={{ value: "8%", positive: true }}
            accentClass="gradient-diagnostic"
            delay={0.3}
          />
        </div>

        {/* Bookings + Revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bookings Table */}
          <motion.div
            className="glass-card p-5 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Today's Bookings</h3>
              <span className="text-xs text-diagnostic font-semibold">{bookings.length} bookings</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium">Patient</th>
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium">Test</th>
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium">Time</th>
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium">Status</th>
                    <th className="text-right py-2 text-xs text-muted-foreground font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, i) => (
                    <motion.tr
                      key={booking.id}
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                    >
                      <td className="py-3 text-foreground font-medium">{booking.patient}</td>
                      <td className="py-3 text-muted-foreground">{booking.test}</td>
                      <td className="py-3 text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {booking.time}
                      </td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[booking.status]}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button className="p-1 rounded hover:bg-secondary transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Test Distribution */}
          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Test Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={testDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {testDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {testDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="text-foreground font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Revenue Chart + Recent Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Weekly Revenue</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Recent Reports</h3>
            <div className="space-y-3">
              {recentReports.map((report, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-diagnostic/10 flex items-center justify-center">
                      {report.status === "processing" ? (
                        <Loader2 className="w-4 h-4 text-diagnostic animate-spin" />
                      ) : report.status === "processed" ? (
                        <CheckCircle className="w-4 h-4 text-health-green" />
                      ) : (
                        <Upload className="w-4 h-4 text-health-yellow" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.patient}</p>
                      <p className="text-xs text-muted-foreground">{report.test}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[report.status]}`}>
                      {report.status}
                    </span>
                    {report.confidence && (
                      <span className="text-xs text-muted-foreground">{report.confidence}%</span>
                    )}
                    <button className="p-1 rounded hover:bg-secondary transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticDashboard;
