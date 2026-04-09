"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "manager" | null>(null);

  /**
   * Helper function to get cookie value by name
   */
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  };

  /**
   * Load user info from auth-token cookie on mount
   */
  useEffect(() => {
    const authToken = getCookie("auth-token");

    if (authToken) {
      try {
        const parsed = JSON.parse(authToken);
        if (parsed.email && parsed.role) {
          setUserEmail(parsed.email);
          setUserRole(parsed.role);
        }
      } catch {
        // Invalid token format
        setUserEmail(null);
        setUserRole(null);
      }
    }
  }, []);

  /**
   * Handle logout: remove cookie and redirect to login
   */
  const handleLogout = () => {
    // Remove auth-token cookie
    document.cookie = "auth-token=; path=/; max-age=0";

    // Redirect to login page
    router.push("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "📊", requiresAuth: false },
    { name: "Employees", path: "/employees", icon: "👥", requiresAuth: false },
    {
      name: "Departments",
      path: "/departments",
      icon: "🏢",
      requiresAuth: false,
      adminOnly: true,
    },
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter((item) => {
    // If item requires admin and user is not admin, hide it
    if (item.adminOnly && userRole !== "admin") {
      return false;
    }
    return true;
  });

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">Team Management</h1>
        <p className="text-gray-400 text-sm mt-1">Employee & Dept System</p>
      </div>

      {/* User Info Section - Only show when logged in */}
      {userEmail && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-400 mb-1">Logged in as</p>
              <p
                className="text-sm font-medium text-white truncate"
                title={userEmail}
              >
                {userEmail}
              </p>
            </div>
          </div>

          {/* Role Badge */}
          {userRole && (
            <div className="mt-2">
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                  userRole === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {userRole === "admin" ? "Admin" : "Manager"}
              </span>
            </div>
          )}
        </div>
      )}

      <nav className="flex-1">
        <ul className="space-y-2">
          {visibleMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button - Only show when logged in */}
      {userEmail && (
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      )}
    </aside>
  );
}
