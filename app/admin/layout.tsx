"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import "./admin.css";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/teams", label: "Team Members", icon: Users },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [admin, setAdmin] = useState<{ email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Skip auth check for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const data = await res.json();
          setAdmin(data.admin);
        } else {
          router.replace("/admin/login");
        }
      } catch {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  // Login page — no layout wrapper
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="admin-login">
        <div className="admin-loading">
          <div className="admin-spinner" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  // Get page title from pathname
  const pageTitle = (() => {
    const segment = pathname.split("/").filter(Boolean).pop();
    if (segment === "admin") return "Dashboard";
    return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : "Dashboard";
  })();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <Link href="/admin" className="admin-sidebar__brand">
            <div className="admin-sidebar__logo">VSC</div>
            <div className="admin-sidebar__brand-text">
              <span className="admin-sidebar__brand-name">VSC Admin</span>
              <span className="admin-sidebar__brand-sub">NIT Patna</span>
            </div>
          </Link>
        </div>

        <nav className="admin-sidebar__nav">
          <span className="admin-sidebar__label">Main Menu</span>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`}
              >
                <Icon size={20} className="admin-sidebar__icon" />
                {link.label}
                {isActive && <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.5 }} />}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <Link
            href="/"
            className="admin-sidebar__link"
            target="_blank"
          >
            <ChevronRight size={20} className="admin-sidebar__icon" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="admin-sidebar__link"
            style={{ width: "100%", border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}
          >
            <LogOut size={20} className="admin-sidebar__icon" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-topbar__title">{pageTitle}</h1>
          <div className="admin-topbar__actions">
            <div className="admin-topbar__user">
              <div className="admin-topbar__avatar">
                {admin.email.charAt(0).toUpperCase()}
              </div>
              <span>{admin.email}</span>
            </div>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
