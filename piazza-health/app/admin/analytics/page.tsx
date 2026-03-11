"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import { BarChart3, Users, FileText, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell
} from "recharts";

const userGrowth = [
  { month: "Jul", users: 800 }, { month: "Aug", users: 1200 }, { month: "Sep", users: 1850 },
  { month: "Oct", users: 2400 }, { month: "Nov", users: 3100 }, { month: "Dec", users: 3800 },
  { month: "Jan", users: 4200 }, { month: "Feb", users: 5100 }, { month: "Mar", users: 5842 },
];

const reportVolume = [
  { month: "Oct", reports: 1200 }, { month: "Nov", reports: 1800 }, { month: "Dec", reports: 2100 },
  { month: "Jan", reports: 2800 }, { month: "Feb", reports: 3200 }, { month: "Mar", reports: 3600 },
];

const healthTrends = [
  { subject: "Diabetes", A: 65 }, { subject: "Heart", A: 42 }, { subject: "Vit Def", A: 78 },
  { subject: "Anemia", A: 35 }, { subject: "Thyroid", A: 28 }, { subject: "Liver", A: 20 },
];

const regionData = [
  { name: "Mumbai", value: 35, color: "hsl(270, 70%, 60%)" },
  { name: "Delhi", value: 25, color: "hsl(217, 91%, 60%)" },
  { name: "Bangalore", value: 20, color: "hsl(142, 71%, 45%)" },
  { name: "Chennai", value: 12, color: "hsl(25, 95%, 53%)" },
  { name: "Others", value: 8, color: "hsl(215, 15%, 55%)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return <div className="glass-card p-3 text-xs"><p className="text-foreground font-semibold">{label}</p><p className="text-admin">{payload[0].value.toLocaleString()}</p></div>;
  }
  return null;
};

const AdminAnalytics = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-admin" /> System Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Platform-wide performance and health metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="5,842" icon={<Users className="w-5 h-5 text-primary-foreground" />} trend={{ value: "23%", positive: true }} accentClass="gradient-admin" delay={0} />
        <StatCard title="Reports/Month" value="3,600" icon={<FileText className="w-5 h-5 text-primary-foreground" />} trend={{ value: "12%", positive: true }} accentClass="gradient-admin" delay={0.1} />
        <StatCard title="Avg Health Score" value="68" icon={<TrendingUp className="w-5 h-5 text-primary-foreground" />} trend={{ value: "3pts", positive: true }} accentClass="gradient-admin" delay={0.2} />
        <StatCard title="Active Centers" value="134" icon={<BarChart3 className="w-5 h-5 text-primary-foreground" />} trend={{ value: "8 new", positive: true }} accentClass="gradient-admin" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">User Growth</h3>
          <div style={{ height: 250, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowth}>
                <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="users" stroke="hsl(270, 70%, 60%)" strokeWidth={2} fill="url(#ag)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Report Volume</h3>
          <div style={{ height: 250, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="reports" fill="hsl(270, 70%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Population Risk Distribution</h3>
          <div style={{ height: 250, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={healthTrends}>
                <PolarGrid stroke="hsl(220, 14%, 18%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar dataKey="A" stroke="hsl(270, 70%, 60%)" fill="hsl(270, 70%, 60%)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="glass-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">User Distribution by Region</h3>
          <div className="flex items-center gap-6">
            <div style={{ height: 180, width: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={regionData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                  {regionData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie></PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {regionData.map(r => (
                <div key={r.name} className="flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="text-muted-foreground">{r.name}</span>
                  <span className="text-foreground font-medium ml-auto">{r.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
