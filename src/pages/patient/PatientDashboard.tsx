import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { HealthScoreGauge } from "@/components/dashboard/HealthScoreGauge";
import { RiskBadges } from "@/components/dashboard/RiskBadges";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { ReportUploadWidget } from "@/components/dashboard/ReportUploadWidget";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { RecommendationsWidget } from "@/components/dashboard/RecommendationsWidget";
import { FileText, TrendingUp, AlertTriangle, Calendar, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const iconMap: Record<string, JSX.Element> = {
  "Reports Uploaded": <FileText className="w-5 h-5 text-primary-foreground" />,
  "Biomarkers Tracked": <TrendingUp className="w-5 h-5 text-primary-foreground" />,
  "Active Alerts": <AlertTriangle className="w-5 h-5 text-primary-foreground" />,
  "Next Checkup": <Calendar className="w-5 h-5 text-primary-foreground" />
};

const PatientDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/patient/dashboard")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="patient">
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="patient">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.stats.map((stat: any, i: number) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={iconMap[stat.title]}
              trend={stat.trend}
              subtitle={stat.subtitle}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Health Score + Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <HealthScoreGauge score={data?.health_score || 74} />
          <RiskBadges />
          <ReportUploadWidget />
        </div>


        {/* Insights + Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InsightsPanel />
          <AIChatWidget />
        </div>

        {/* Recommendations */}
        <RecommendationsWidget />
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
