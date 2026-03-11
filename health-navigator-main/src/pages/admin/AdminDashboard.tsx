import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import {
  Users, FileText, AlertTriangle, Building2, Shield, CheckCircle,
  XCircle, Eye, MoreHorizontal, TrendingUp, Activity
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const userGrowth = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1850 },
  { month: "Mar", users: 2400 },
  { month: "Apr", users: 3100 },
  { month: "May", users: 4200 },
  { month: "Jun", users: 5800 },
];

const deficiencyData = [
  { name: "Vit D", count: 42 },
  { name: "Iron", count: 35 },
  { name: "B12", count: 28 },
  { name: "Calcium", count: 18 },
  { name: "Folate", count: 12 },
];

const healthTrends = [
  { subject: "Diabetes Risk", A: 65 },
  { subject: "Heart Risk", A: 42 },
  { subject: "Vit Deficiency", A: 78 },
  { subject: "Anemia", A: 35 },
  { subject: "Thyroid", A: 28 },
  { subject: "Liver", A: 20 },
];

const flaggedReports = [
  { id: "R-2048", patient: "Rahul Mehra", lab: "LifeCare Labs", issue: "Low confidence OCR", score: 62, status: "review" },
  { id: "R-2051", patient: "Kavita Rao", lab: "Apollo Diagnostics", issue: "Template mismatch", score: 45, status: "flagged" },
  { id: "R-2053", patient: "Deepak Jain", lab: "SRL Labs", issue: "Missing metadata", score: 71, status: "review" },
  { id: "R-2055", patient: "Sneha Pillai", lab: "Thyrocare", issue: "Value anomaly", score: 55, status: "flagged" },
];

const recentUsers = [
  { name: "Dr. Ananya Verma", role: "Doctor", status: "active", joined: "2 days ago" },
  { name: "MedLab Chennai", role: "Diagnostic Center", status: "pending", joined: "5 hours ago" },
  { name: "Arjun Reddy", role: "Patient", status: "active", joined: "1 day ago" },
  { name: "HealthFirst Labs", role: "Diagnostic Center", status: "active", joined: "3 days ago" },
];

const statusStyles: Record<string, string> = {
  review: "bg-health-yellow/10 text-health-yellow",
  flagged: "bg-health-red/10 text-health-red",
  approved: "bg-health-green/10 text-health-green",
  active: "bg-health-green/10 text-health-green",
  pending: "bg-health-yellow/10 text-health-yellow",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-foreground font-semibold">{label}</p>
        <p className="text-admin">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value="5,842"
            icon={<Users className="w-5 h-5 text-primary-foreground" />}
            trend={{ value: "23%", positive: true }}
            accentClass="gradient-admin"
            delay={0}
          />
          <StatCard
            title="Reports Processed"
            value="18,294"
            icon={<FileText className="w-5 h-5 text-primary-foreground" />}
            trend={{ value: "1,200 this week", positive: true }}
            accentClass="gradient-admin"
            delay={0.1}
          />
          <StatCard
            title="Flagged Reports"
            value="47"
            icon={<AlertTriangle className="w-5 h-5 text-primary-foreground" />}
            subtitle="12 need urgent review"
            accentClass="gradient-admin"
            delay={0.2}
          />
          <StatCard
            title="Active Centers"
            value="134"
            icon={<Building2 className="w-5 h-5 text-primary-foreground" />}
            trend={{ value: "8 new", positive: true }}
            accentClass="gradient-admin"
            delay={0.3}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* User Growth */}
          <motion.div
            className="glass-card p-5 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="users" stroke="hsl(270, 70%, 60%)" strokeWidth={2} fill="url(#adminGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Population Health Radar */}
          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Population Risk</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={healthTrends}>
                <PolarGrid stroke="hsl(220, 14%, 18%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 9 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Risk %" dataKey="A" stroke="hsl(270, 70%, 60%)" fill="hsl(270, 70%, 60%)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Flagged Reports + Deficiency Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            className="glass-card p-5 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-admin" />
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Report Authenticity Review</h3>
              </div>
            </div>
            <div className="space-y-3">
              {flaggedReports.map((report, i) => (
                <motion.div
                  key={report.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50 hover:border-admin/20 transition-all"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-admin/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-admin">{report.score}%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.patient}</p>
                      <p className="text-xs text-muted-foreground">{report.lab} · {report.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[report.status]}`}>
                      {report.status}
                    </span>
                    <button className="p-1.5 rounded-lg hover:bg-health-green/10 transition-colors">
                      <CheckCircle className="w-4 h-4 text-health-green" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-health-red/10 transition-colors">
                      <XCircle className="w-4 h-4 text-health-red" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Common Deficiencies */}
          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Top Deficiencies</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={deficiencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
                <Bar dataKey="count" fill="hsl(270, 70%, 60%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* User Management */}
        <motion.div
          className="glass-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Recent Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-xs text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-2 text-xs text-muted-foreground font-medium">Role</th>
                  <th className="text-left py-2 text-xs text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-2 text-xs text-muted-foreground font-medium">Joined</th>
                  <th className="text-right py-2 text-xs text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, i) => (
                  <motion.tr
                    key={i}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.05 }}
                  >
                    <td className="py-3 text-foreground font-medium">{user.name}</td>
                    <td className="py-3 text-muted-foreground">{user.role}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{user.joined}</td>
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
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
