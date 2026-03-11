import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity, User, Building2, Shield, Check, ArrowRight } from "lucide-react";

const portals = [
  {
    role: "patient",
    title: "Patient",
    subtitle: "PERSONAL HEALTH PORTAL",
    badge: "PERSONAL",
    badgeColor: "bg-primary/20 text-primary",
    desc: "Upload lab reports, get AI-powered insights, personalised diet plans, and track your biomarker trends over time.",
    features: ["AI Report Analysis", "Diet Recommendations", "Biomarker Tracking", "24/7 Health Chat"],
    icon: User,
    iconBg: "gradient-patient",
    buttonClass: "gradient-patient",
    checkColor: "text-primary",
    borderHover: "hover:border-primary/40",
    glowClass: "glow-orange",
    path: "/patient",
  },
  {
    role: "diagnostic",
    title: "Diagnostic Center",
    subtitle: "B2B LAB MANAGEMENT",
    badge: "ENTERPRISE",
    badgeColor: "bg-diagnostic/20 text-diagnostic",
    desc: "Integrate your lab with HealthAI to auto-parse patient reports via API. Access analytics and batch upload tools.",
    features: ["Batch Report Upload", "API Integration", "Center Analytics", "Patient Management"],
    icon: Building2,
    iconBg: "gradient-diagnostic",
    buttonClass: "gradient-diagnostic",
    checkColor: "text-diagnostic",
    borderHover: "hover:border-diagnostic/40",
    glowClass: "glow-blue",
    path: "/diagnostic",
  },
  {
    role: "admin",
    title: "Admin",
    subtitle: "PLATFORM CONTROL CENTER",
    badge: "RESTRICTED",
    badgeColor: "bg-admin/20 text-admin",
    desc: "Full platform control — manage centers, users, AI overrides, revenue analytics, and subscription controls.",
    features: ["System Analytics", "AI Overrides", "User Management", "Revenue Control"],
    icon: Shield,
    iconBg: "gradient-admin",
    buttonClass: "gradient-admin",
    checkColor: "text-admin",
    borderHover: "hover:border-admin/40",
    glowClass: "glow-purple",
    path: "/admin",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-glow-orange opacity-50 pointer-events-none" />

      {/* Logo */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-11 h-11 rounded-xl gradient-patient flex items-center justify-center">
          <Activity className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="font-display text-2xl font-bold text-foreground">
          Health<span className="text-gradient-patient">AI</span>
        </span>
      </motion.div>

      {/* Badge */}
      <motion.div
        className="px-4 py-1.5 rounded-full bg-secondary border border-border text-xs text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ✨ AI-POWERED HEALTH INTELLIGENCE PLATFORM
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Choose your portal
      </motion.h1>
      <motion.p
        className="text-muted-foreground text-center max-w-md mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Select your account type to access the right portal for your needs. Your experience is tailored to your role.
      </motion.p>

      {/* Portal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full">
        {portals.map((portal, i) => (
          <motion.div
            key={portal.role}
            className={`glass-card p-6 cursor-pointer group ${portal.borderHover} transition-all duration-300 relative`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            onClick={() => navigate(portal.path)}
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`w-12 h-12 rounded-xl ${portal.iconBg} flex items-center justify-center`}>
                <portal.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${portal.badgeColor}`}>
                {portal.badge}
              </span>
            </div>

            <h3 className="text-xl font-display font-bold text-foreground mb-1">{portal.title}</h3>
            <p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-3">{portal.subtitle}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{portal.desc}</p>

            <div className="space-y-2 mb-6">
              {portal.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm">
                  <Check className={`w-4 h-4 ${portal.checkColor}`} />
                  <span className="text-muted-foreground">{feat}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-3 rounded-lg ${portal.buttonClass} text-primary-foreground text-sm font-semibold flex items-center justify-between px-4 group-hover:opacity-90 transition-opacity`}>
              Enter as {portal.title}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Index;
