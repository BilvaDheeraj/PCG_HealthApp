import { DashboardRole } from "./DashboardLayout";
import { Bell, Search, Menu, User, Sun, Moon, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";

interface TopNavProps {
  role: DashboardRole;
  onMenuToggle: () => void;
}

const greetings: Record<DashboardRole, string> = {
  patient: "Welcome back",
  diagnostic: "Lab Operations",
  admin: "Admin Control Center",
};

export const DashboardTopNav = ({ role, onMenuToggle }: TopNavProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-card/40 backdrop-blur-xl flex items-center justify-between px-6 z-50 relative">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden text-muted-foreground hover:text-foreground transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <motion.h2
          className="text-lg font-display font-semibold text-foreground"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {greetings[role]}
          {role === "patient" && (
            <span className="ml-1">
              , {localStorage.getItem("userName") || "Patient"}
            </span>
          )}
        </motion.h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2 w-64">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
          />
        </div>

        {/* Notifications */}
        <button
          onClick={() => navigate(`/${role}/notifications`)}
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </button>

        {/* User Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:ring-2 hover:ring-primary/50 transition-all"
          >
            <User className="w-4 h-4 text-muted-foreground" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">
                    {localStorage.getItem("userName") || "John Doe"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {localStorage.getItem("userEmail") || "john@example.com"}
                  </p>
                </div>

                <div className="p-1.5">
                  {/* Theme Toggle */}
                  <button
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary/70 transition-colors"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4 text-health-yellow" />
                    ) : (
                      <Moon className="w-4 h-4 text-health-blue" />
                    )}
                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                  </button>

                  {/* Settings */}
                  <button
                    onClick={() => {
                      navigate(`/${role}/settings`);
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary/70 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span>Settings</span>
                  </button>

                  {/* Switch Portal */}
                  <button
                    onClick={() => {
                      navigate("/");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Switch Portal</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
