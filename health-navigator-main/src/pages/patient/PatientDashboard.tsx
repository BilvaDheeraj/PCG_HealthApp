import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { HealthScoreGauge } from "@/components/dashboard/HealthScoreGauge";
import { RiskBadges } from "@/components/dashboard/RiskBadges";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { BiomarkerCharts } from "@/components/dashboard/BiomarkerCharts";
import { ReportUploadWidget } from "@/components/dashboard/ReportUploadWidget";
import { AIChatWidget } from "@/components/dashboard/AIChatWidget";
import { RecommendationsWidget } from "@/components/dashboard/RecommendationsWidget";
import { FileText, TrendingUp, AlertTriangle, Calendar } from "lucide-react";

const PatientDashboard = () => {
  return (
    <DashboardLayout role="patient">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Reports Uploaded"
            value="12"
            icon={<FileText className="w-5 h-5 text-primary-foreground" />}
            trend={{ value: "2 this month", positive: true }}
            delay={0}
          />
          <StatCard
            title="Biomarkers Tracked"
            value="48"
            icon={<TrendingUp className="w-5 h-5 text-primary-foreground" />}
            trend={{ value: "8 new", positive: true }}
            delay={0.1}
          />
          <StatCard
            title="Active Alerts"
            value="3"
            icon={<AlertTriangle className="w-5 h-5 text-primary-foreground" />}
            subtitle="2 moderate, 1 high"
            delay={0.2}
          />
          <StatCard
            title="Next Checkup"
            value="Mar 22"
            icon={<Calendar className="w-5 h-5 text-primary-foreground" />}
            subtitle="Lipid Panel"
            delay={0.3}
          />
        </div>

        {/* Health Score + Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <HealthScoreGauge score={74} />
          <RiskBadges />
          <ReportUploadWidget />
        </div>

        {/* Biomarker Charts */}
        <BiomarkerCharts />

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
