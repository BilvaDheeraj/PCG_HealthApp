import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScrollToTop from "@/components/landing/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import AuthGateway from "./pages/AuthGateway";
import AuthUser from "./pages/AuthUser";
import AuthCenter from "./pages/AuthCenter";
import AuthAdmin from "./pages/AuthAdmin";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientHealthScore from "./pages/patient/PatientHealthScore";
import PatientReports from "./pages/patient/PatientReports";
import PatientUpload from "./pages/patient/PatientUpload";
import PatientInsights from "./pages/patient/PatientInsights";
import PatientChat from "./pages/patient/PatientChat";
import PatientNotifications from "./pages/patient/PatientNotifications";
import PatientSettings from "./pages/patient/PatientSettings";
import DiagnosticDashboard from "./pages/diagnostic/DiagnosticDashboard";
import DiagnosticBookings from "./pages/diagnostic/DiagnosticBookings";
import DiagnosticReports from "./pages/diagnostic/DiagnosticReports";
import DiagnosticUpload from "./pages/diagnostic/DiagnosticUpload";
import DiagnosticPatients from "./pages/diagnostic/DiagnosticPatients";
import DiagnosticAnalytics from "./pages/diagnostic/DiagnosticAnalytics";
import DiagnosticSettings from "./pages/diagnostic/DiagnosticSettings";
import DiagnosticNotifications from "./pages/diagnostic/DiagnosticNotifications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminReports from "./pages/admin/AdminReports";
import AdminValidation from "./pages/admin/AdminValidation";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCenters from "./pages/admin/AdminCenters";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNotifications from "./pages/admin/AdminNotifications";
import HowItWorks from "./pages/HowItWorks";
import Biomarkers from "./pages/Biomarkers";
import Reviews from "./pages/Reviews";
import FAQPage from "./pages/FAQPage";
import Manifesto from "./pages/Manifesto";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/biomarkers" element={<Biomarkers />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />
            <Route path="/legal/terms" element={<TermsConditions />} />
            <Route path="/auth" element={<AuthGateway />} />
            <Route path="/auth/user" element={<AuthUser />} />
            <Route path="/auth/center" element={<AuthCenter />} />
            <Route path="/auth/admin" element={<AuthAdmin />} />            {/* Patient */}
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/health-score" element={<PatientHealthScore />} />
            <Route path="/patient/reports" element={<PatientReports />} />
            <Route path="/patient/upload" element={<PatientUpload />} />
            <Route path="/patient/insights" element={<PatientInsights />} />
            <Route path="/patient/chat" element={<PatientChat />} />
            <Route path="/patient/notifications" element={<PatientNotifications />} />
            <Route path="/patient/settings" element={<PatientSettings />} />
            {/* Diagnostic */}
            <Route path="/diagnostic" element={<DiagnosticDashboard />} />
            <Route path="/diagnostic/bookings" element={<DiagnosticBookings />} />
            <Route path="/diagnostic/reports" element={<DiagnosticReports />} />
            <Route path="/diagnostic/upload" element={<DiagnosticUpload />} />
            <Route path="/diagnostic/patients" element={<DiagnosticPatients />} />
            <Route path="/diagnostic/analytics" element={<DiagnosticAnalytics />} />
            <Route path="/diagnostic/settings" element={<DiagnosticSettings />} />
            <Route path="/diagnostic/notifications" element={<DiagnosticNotifications />} />
            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/validation" element={<AdminValidation />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/centers" element={<AdminCenters />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
