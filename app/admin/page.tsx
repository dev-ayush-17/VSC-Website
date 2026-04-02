"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Image as ImageIcon,
  Settings,
  Plus,
  Database,
} from "lucide-react";

interface Stats {
  teams: number;
  events: number;
  gallery: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ teams: 0, events: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [teamsRes, eventsRes, galleryRes] = await Promise.all([
        fetch("/api/admin/teams"),
        fetch("/api/admin/events"),
        fetch("/api/admin/gallery"),
      ]);

      const teams = teamsRes.ok ? await teamsRes.json() : [];
      const events = eventsRes.ok ? await eventsRes.json() : [];
      const gallery = galleryRes.ok ? await galleryRes.json() : [];

      setStats({
        teams: Array.isArray(teams) ? teams.length : 0,
        events: Array.isArray(events) ? events.length : 0,
        gallery: Array.isArray(gallery) ? gallery.length : 0,
      });
    } catch {
      // Ignore errors
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: "Database seeded successfully!", type: "success" });
        fetchStats();
      } else {
        setToast({ message: data.error || "Seed failed", type: "error" });
      }
    } catch {
      setToast({ message: "Network error", type: "error" });
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  return (
    <>
      {/* Stats */}
      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--orange">
            <Users size={22} />
          </div>
          <div className="admin-stat__info">
            <span className="admin-stat__value">
              {loading ? "—" : stats.teams}
            </span>
            <span className="admin-stat__label">Team Members</span>
          </div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--blue">
            <Calendar size={22} />
          </div>
          <div className="admin-stat__info">
            <span className="admin-stat__value">
              {loading ? "—" : stats.events}
            </span>
            <span className="admin-stat__label">Events</span>
          </div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--green">
            <ImageIcon size={22} />
          </div>
          <div className="admin-stat__info">
            <span className="admin-stat__value">
              {loading ? "—" : stats.gallery}
            </span>
            <span className="admin-stat__label">Gallery Items</span>
          </div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat__icon admin-stat__icon--purple">
            <Settings size={22} />
          </div>
          <div className="admin-stat__info">
            <span className="admin-stat__value">1</span>
            <span className="admin-stat__label">Site Config</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontWeight: 600, color: "#a1a1aa", marginBottom: "1rem", textTransform: "uppercase" as const, letterSpacing: "0.05em", fontSize: "0.75rem" }}>
        Quick Actions
      </h2>
      <div className="admin-quick-actions">
        <Link href="/admin/teams" className="admin-quick-action">
          <div className="admin-quick-action__icon">
            <Plus size={20} />
          </div>
          <div>
            <div className="admin-quick-action__text">Manage Team</div>
            <div className="admin-quick-action__sub">Add or edit members</div>
          </div>
        </Link>

        <Link href="/admin/events" className="admin-quick-action">
          <div className="admin-quick-action__icon">
            <Calendar size={20} />
          </div>
          <div>
            <div className="admin-quick-action__text">Manage Events</div>
            <div className="admin-quick-action__sub">Create or update events</div>
          </div>
        </Link>

        <Link href="/admin/gallery" className="admin-quick-action">
          <div className="admin-quick-action__icon">
            <ImageIcon size={20} />
          </div>
          <div>
            <div className="admin-quick-action__text">Manage Gallery</div>
            <div className="admin-quick-action__sub">Upload new photos</div>
          </div>
        </Link>

        <Link href="/admin/settings" className="admin-quick-action">
          <div className="admin-quick-action__icon">
            <Settings size={20} />
          </div>
          <div>
            <div className="admin-quick-action__text">Site Settings</div>
            <div className="admin-quick-action__sub">Edit content & links</div>
          </div>
        </Link>
      </div>

      {/* Seed DB */}
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={handleSeed}
          className="admin-btn admin-btn--secondary"
          disabled={seeding}
        >
          <Database size={16} />
          {seeding ? "Seeding..." : "Seed Database with Demo Data"}
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
