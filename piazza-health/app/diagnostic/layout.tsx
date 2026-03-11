import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="diagnostic">{children}</DashboardLayout>;
}
