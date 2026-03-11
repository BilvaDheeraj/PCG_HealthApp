import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const glucoseData = [
  { month: "Jan", value: 118 },
  { month: "Feb", value: 115 },
  { month: "Mar", value: 110 },
  { month: "Apr", value: 108 },
  { month: "May", value: 105 },
  { month: "Jun", value: 102 },
];

const cholesterolData = [
  { month: "Jan", ldl: 170, hdl: 42 },
  { month: "Feb", ldl: 168, hdl: 44 },
  { month: "Mar", ldl: 165, hdl: 45 },
  { month: "Apr", ldl: 162, hdl: 47 },
  { month: "May", ldl: 160, hdl: 48 },
  { month: "Jun", ldl: 158, hdl: 50 },
];

const hemoglobinData = [
  { month: "Jan", value: 13.8 },
  { month: "Feb", value: 13.9 },
  { month: "Mar", value: 14.0 },
  { month: "Apr", value: 14.1 },
  { month: "May", value: 14.0 },
  { month: "Jun", value: 14.2 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-foreground font-semibold mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const BiomarkerCharts = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h4 className="text-sm font-semibold text-muted-foreground mb-4">Fasting Glucose (mg/dL)</h4>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={glucoseData}>
          <defs>
            <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
          <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[95, 125]} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="hsl(25, 95%, 53%)" strokeWidth={2} fill="url(#glucoseGrad)" name="Glucose" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h4 className="text-sm font-semibold text-muted-foreground mb-4">Cholesterol (mg/dL)</h4>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={cholesterolData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
          <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="ldl" stroke="hsl(0, 72%, 51%)" strokeWidth={2} dot={{ r: 3 }} name="LDL" />
          <Line type="monotone" dataKey="hdl" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 3 }} name="HDL" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>

    <motion.div
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h4 className="text-sm font-semibold text-muted-foreground mb-4">Hemoglobin (g/dL)</h4>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={hemoglobinData}>
          <defs>
            <linearGradient id="hbGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
          <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[13, 15]} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="hsl(142, 71%, 45%)" strokeWidth={2} fill="url(#hbGrad)" name="Hemoglobin" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  </div>
);
