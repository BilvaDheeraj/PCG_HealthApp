import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UserCog, Search, MoreHorizontal, CheckCircle, XCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type UserStatus = "active" | "pending" | "suspended";
const statusStyles: Record<UserStatus, string> = {
  active: "bg-health-green/10 text-health-green",
  pending: "bg-health-yellow/10 text-health-yellow",
  suspended: "bg-health-red/10 text-health-red",
};

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:8000/api/admin/users")
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "suspended" as const : "active" as const } : u));
  };

  return (
    <DashboardLayout role="admin">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <UserCog className="w-6 h-6 text-admin" /> User Management
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{users.length} registered users</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-40" />
            </div>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm text-foreground outline-none">
              <option value="all">All Roles</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Diagnostic Center">Diagnostic Center</option>
            </select>
          </div>
        </motion.div>

        {loading ? (
             <div className="flex justify-center py-12">
               <div className="w-8 h-8 rounded-full border-2 border-admin border-t-transparent animate-spin" />
             </div>
        ) : (
          <motion.div className="glass-card overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">User</th>
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Role</th>
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Status</th>
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Joined</th>
                    <th className="text-left px-5 py-3 text-xs text-muted-foreground font-medium">Reports</th>
                    <th className="text-right px-5 py-3 text-xs text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, i) => (
                    <motion.tr key={user.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.03 }}>
                      <td className="px-5 py-4">
                        <p className="text-foreground font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{user.role}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[user.status as UserStatus]}`}>{user.status}</span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{user.joined}</td>
                      <td className="px-5 py-4 text-foreground font-medium">{user.reports}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => toggleStatus(user.id)} className={`p-1.5 rounded-lg transition-colors ${user.status === "active" ? "hover:bg-health-red/10" : "hover:bg-health-green/10"}`}
                            title={user.status === "active" ? "Suspend" : "Activate"}>
                            {user.status === "active" ? <XCircle className="w-4 h-4 text-health-red" /> : <CheckCircle className="w-4 h-4 text-health-green" />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
