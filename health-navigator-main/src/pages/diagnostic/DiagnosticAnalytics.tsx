import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const monthlyRevenue = [
  { month: "Oct", revenue: 185000 }, { month: "Nov", revenue: 210000 }, { month: "Dec", revenue: 195000 },
  { month: "Jan", revenue: 240000 }, { month: "Feb", revenue: 268000 }, { month: "Mar", revenue: 142500 },
];

const dailyTests = [
  { day: "Mon", tests: 42 }, { day: "Tue", tests: 56 }, { day: "Wed", tests: 48 },
  { day: "Thu", tests: 63 }, { day: "Fri", tests: 51 }, { day: "Sat", tests: 71 }, { day: "Sun", tests: 28 },
];

const testTypes = [
  { name: "CBC", value: 35, color: "hsl(217, 91%, 60%)" },
  { name: "Lipid", value: 20, color: "hsl(25, 95%, 53%)" },
  { name: "Thyroid", value: 15, color: "hsl(142, 71%, 45%)" },
  { name: "Diabetes", value: 18, color: "hsl(270, 70%, 60%)" },
  { name: "Others", value: 12, color: "hsl(215, 15%, 55%)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-foreground font-semibold">{label}</p>
        <p className="text-diagnostic">{typeof payload[0].value === "number" && payload[0].value > 1000 ? `₹${(payload[0].value / 1000).toFixed(0)}K` : payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const DiagnosticAnalytics = () => {
  return (
    <DashboardLayout role="diagnostic">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-diagnostic" /> Center Analytics
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Performance metrics and insights</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Monthly Revenue" value="₹2.68L" icon={<DollarSign className="w-5 h-5 text-primary-foreground" />} trend={{ value: "12%", positive: true }} accentClass="gradient-diagnostic" delay={0} />
          <StatCard title="Tests This Month" value="359" icon={<BarChart3 className="w-5 h-5 text-primary-foreground" />} trend={{ value: "18%", positive: true }} accentClass="gradient-diagnostic" delay={0.1} />
          <StatCard title="Unique Patients" value="156" icon={<Users className="w-5 h-5 text-primary-foreground" />} trend={{ value: "8%", positive: true }} accentClass="gradient-diagnostic" delay={0.2} />
          <StatCard title="Avg. Turnaround" value="4.2 hrs" icon={<Calendar className="w-5 h-5 text-primary-foreground" />} trend={{ value: "15%", positive: true }} accentClass="gradient-diagnostic" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Daily Test Volume</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyTests}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="tests" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={{ fill: "hsl(217, 91%, 60%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Test Type Distribution</h3>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie data={testTypes} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none">
                  {testTypes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {testTypes.map(t => (
                <div key={t.name} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticAnalytics;
