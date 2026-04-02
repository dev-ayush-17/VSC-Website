"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, X, AlertTriangle, Users } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  branch?: string;
  year?: string;
  category: string;
  order?: number;
  socials?: Record<string, string>;
}

const CATEGORIES = ["all", "professor", "leader", "coordinator", "core", "member"];

const emptyMember = {
  name: "",
  role: "",
  image: "",
  branch: "",
  year: "",
  category: "core",
  order: 0,
  socials: { linkedin: "", instagram: "", twitter: "", email: "", github: "" },
};

export default function AdminTeamsPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyMember);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/teams");
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const filtered = members.filter((m) => {
    const matchesFilter = filter === "all" || m.category === filter;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyMember, socials: { ...emptyMember.socials } });
    setShowModal(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditing(member);
    setForm({
      name: member.name,
      role: member.role,
      image: member.image,
      branch: member.branch || "",
      year: member.year || "",
      category: member.category,
      order: member.order || 0,
      socials: {
        linkedin: member.socials?.linkedin || "",
        instagram: member.socials?.instagram || "",
        twitter: member.socials?.twitter || "",
        email: member.socials?.email || "",
        github: member.socials?.github || "",
      },
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.role || !form.category) {
      setToast({ message: "Name, role, and category are required", type: "error" });
      return;
    }
    setSaving(true);
    try {
      const url = editing
        ? `/api/admin/teams/${editing._id}`
        : "/api/admin/teams";
      const method = editing ? "PUT" : "POST";

      // Clean up empty social links
      const cleanSocials: Record<string, string> = {};
      Object.entries(form.socials).forEach(([k, v]) => {
        if (v && v.trim()) cleanSocials[k] = v.trim();
      });

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, socials: cleanSocials }),
      });

      if (res.ok) {
        setToast({ message: editing ? "Member updated!" : "Member added!", type: "success" });
        setShowModal(false);
        fetchMembers();
      } else {
        const data = await res.json();
        setToast({ message: data.error || "Failed to save", type: "error" });
      }
    } catch {
      setToast({ message: "Network error", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/teams/${deleteTarget._id}`, { method: "DELETE" });
      if (res.ok) {
        setToast({ message: "Member deleted", type: "success" });
        setDeleteTarget(null);
        fetchMembers();
      } else {
        setToast({ message: "Failed to delete", type: "error" });
      }
    } catch {
      setToast({ message: "Network error", type: "error" });
    }
  };

  return (
    <>
      {/* Filter Tabs */}
      <div className="admin-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`admin-filter-tab ${filter === cat ? "admin-filter-tab--active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="admin-table-wrapper" style={{ marginTop: "1.5rem" }}>
        <div className="admin-table-header">
          <h2 className="admin-table-header__title">
            Team Members ({filtered.length})
          </h2>
          <div className="admin-table-header__actions">
            <div className="admin-search">
              <Search size={14} className="admin-search__icon" />
              <input
                type="text"
                className="admin-search__input"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openCreate}>
              <Plus size={16} /> Add Member
            </button>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon"><Users size={24} /></div>
            <div className="admin-empty__title">No members found</div>
            <div className="admin-empty__text">Add your first team member</div>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openCreate}>
              <Plus size={16} /> Add Member
            </button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Category</th>
                <th>Branch</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m._id}>
                  <td>
                    {m.image ? (
                      <img src={m.image} alt={m.name} className="admin-table__thumb" />
                    ) : (
                      <div className="admin-table__thumb" style={{ background: "rgba(249,115,22,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f97316", fontWeight: 700 }}>
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{m.name}</td>
                  <td>{m.role}</td>
                  <td><span className={`admin-badge admin-badge--${m.category}`}>{m.category}</span></td>
                  <td style={{ color: "#71717a" }}>{m.branch || "—"}</td>
                  <td style={{ color: "#71717a" }}>{m.order ?? 0}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(m)}>
                        <Pencil size={14} />
                      </button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setDeleteTarget(m)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{editing ? "Edit Member" : "Add Member"}</h3>
              <button className="admin-modal__close" onClick={() => setShowModal(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-modal__row">
                <div className="admin-field">
                  <label className="admin-field__label">Name *</label>
                  <input className="admin-field__input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">Role *</label>
                  <input className="admin-field__input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Coordinator" />
                </div>
              </div>

              <div className="admin-image-preview">
                {form.image ? (
                  <img src={form.image} alt="Preview" className="admin-image-preview__img" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="admin-image-preview__placeholder">No image</div>
                )}
                <div className="admin-image-preview__input admin-field">
                  <label className="admin-field__label">Image URL</label>
                  <input className="admin-field__input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://res.cloudinary.com/..." />
                </div>
              </div>

              <div className="admin-modal__row">
                <div className="admin-field">
                  <label className="admin-field__label">Category *</label>
                  <select className="admin-field__select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="professor">Professor</option>
                    <option value="leader">Leader</option>
                    <option value="coordinator">Coordinator</option>
                    <option value="core">Core</option>
                    <option value="member">Member</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">Display Order</label>
                  <input className="admin-field__input" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>

              <div className="admin-modal__row">
                <div className="admin-field">
                  <label className="admin-field__label">Branch</label>
                  <input className="admin-field__input" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} placeholder="Computer Science" />
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">Year</label>
                  <input className="admin-field__input" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="3rd Year" />
                </div>
              </div>

              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#71717a", marginTop: "0.5rem" }}>Social Links</div>
              <div className="admin-modal__row">
                <div className="admin-field">
                  <label className="admin-field__label">LinkedIn</label>
                  <input className="admin-field__input" value={form.socials.linkedin} onChange={(e) => setForm({ ...form, socials: { ...form.socials, linkedin: e.target.value } })} placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">Instagram</label>
                  <input className="admin-field__input" value={form.socials.instagram} onChange={(e) => setForm({ ...form, socials: { ...form.socials, instagram: e.target.value } })} placeholder="https://instagram.com/..." />
                </div>
              </div>
              <div className="admin-modal__row">
                <div className="admin-field">
                  <label className="admin-field__label">Email</label>
                  <input className="admin-field__input" value={form.socials.email} onChange={(e) => setForm({ ...form, socials: { ...form.socials, email: e.target.value } })} placeholder="user@example.com" />
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">GitHub</label>
                  <input className="admin-field__input" value={form.socials.github} onChange={(e) => setForm({ ...form, socials: { ...form.socials, github: e.target.value } })} placeholder="https://github.com/..." />
                </div>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__body">
              <div className="admin-delete-confirm">
                <div className="admin-delete-confirm__icon">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="admin-delete-confirm__title">Delete Member?</h3>
                <p className="admin-delete-confirm__text">
                  Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="admin-btn admin-btn--danger" onClick={handleDelete}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`}>{toast.message}</div>
      )}
    </>
  );
}
