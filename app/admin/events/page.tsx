"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, X, AlertTriangle, Calendar } from "lucide-react";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  image: string;
  category: string;
  status: "upcoming" | "past" | "ongoing";
  registrationLink?: string;
  highlights?: string[];
}

const STATUS_FILTERS = ["all", "upcoming", "ongoing", "past"];

interface EventForm {
  title: string;
  description: string;
  date: string;
  venue: string;
  image: string;
  category: string;
  status: "upcoming" | "past" | "ongoing";
  registrationLink: string;
  highlights: string;
}

const emptyEvent: EventForm = {
  title: "",
  description: "",
  date: "",
  venue: "",
  image: "",
  category: "",
  status: "upcoming",
  registrationLink: "",
  highlights: "",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState<EventForm>(emptyEvent);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/events");
      if (res.ok) setEvents(await res.json());
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const filtered = events.filter((e) => {
    const matchesFilter = filter === "all" || e.status === filter;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyEvent });
    setShowModal(true);
  };

  const openEdit = (event: EventItem) => {
    setEditing(event);
    
    let formattedDate = event.date;
    try {
      if (event.date) {
        formattedDate = new Date(event.date).toISOString().slice(0, 10);
      }
    } catch (e) {
      // ignore invalid dates
    }

    setForm({
      title: event.title,
      description: event.description,
      date: formattedDate,
      venue: event.venue,
      image: event.image,
      category: event.category,
      status: event.status,
      registrationLink: event.registrationLink || "",
      highlights: event.highlights?.join(", ") || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.date || !form.venue || !form.category) {
      setToast({ message: "Please fill all required fields", type: "error" });
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/events/${editing._id}` : "/api/admin/events";
      const method = editing ? "PUT" : "POST";
      const payload = {
        ...form,
        highlights: form.highlights ? form.highlights.split(",").map((s) => s.trim()).filter(Boolean) : [],
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setToast({ message: editing ? "Event updated!" : "Event created!", type: "success" });
        setShowModal(false);
        fetchEvents();
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
      const res = await fetch(`/api/admin/events/${deleteTarget._id}`, { method: "DELETE" });
      if (res.ok) {
        setToast({ message: "Event deleted", type: "success" });
        setDeleteTarget(null);
        fetchEvents();
      } else {
        const errorText = await res.text();
        setToast({ message: errorText || "Failed to delete item", type: "error" });
      }
    } catch {
      setToast({ message: "Network error", type: "error" });
    }
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <>
      <div className="admin-filters">
        {STATUS_FILTERS.map((s) => (
          <button key={s} className={`admin-filter-tab ${filter === s ? "admin-filter-tab--active" : ""}`} onClick={() => setFilter(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="admin-table-wrapper" style={{ marginTop: "1.5rem" }}>
        <div className="admin-table-header">
          <h2 className="admin-table-header__title">Events ({filtered.length})</h2>
          <div className="admin-table-header__actions">
            <div className="admin-search">
              <Search size={14} className="admin-search__icon" />
              <input type="text" className="admin-search__input" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openCreate}>
              <Plus size={16} /> Add Event
            </button>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon"><Calendar size={24} /></div>
            <div className="admin-empty__title">No events found</div>
            <div className="admin-empty__text">Create your first event</div>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openCreate}><Plus size={16} /> Add Event</button>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Date</th>
                <th>Category</th>
                <th>Status</th>
                <th>Venue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e._id}>
                  <td>
                    {e.image ? <img src={e.image} alt={e.title} className="admin-table__thumb" /> : <div className="admin-table__thumb" style={{ background: "rgba(59,130,246,0.12)" }} />}
                  </td>
                  <td style={{ fontWeight: 600, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.title}</td>
                  <td style={{ color: "#a1a1aa", whiteSpace: "nowrap" }}>{formatDate(e.date)}</td>
                  <td style={{ color: "#a1a1aa" }}>{e.category}</td>
                  <td><span className={`admin-badge admin-badge--${e.status}`}>{e.status}</span></td>
                  <td style={{ color: "#71717a", maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.venue}</td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={() => openEdit(e)}><Pencil size={14} /></button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => setDeleteTarget(e)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal admin-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{editing ? "Edit Event" : "Add Event"}</h3>
              <button className="admin-modal__close" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-field">
                <label className="admin-field__label">Title *</label>
                <input className="admin-field__input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
              </div>
              <div className="admin-field">
                <label className="admin-field__label">Description *</label>
                <textarea className="admin-field__textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the event..." />
              </div>
              <div className="admin-modal__row">
                <div className="admin-field">
                  <label className="admin-field__label">Date *</label>
                  <input className="admin-field__input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">Venue *</label>
                  <input className="admin-field__input" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Central Auditorium, NIT Patna" />
                </div>
              </div>
              <div className="admin-modal__row">
                <div className="admin-field">
                  <label className="admin-field__label">Category *</label>
                  <input className="admin-field__input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Cultural, Seminar, Workshop..." />
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">Status</label>
                  <select className="admin-field__select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "upcoming" | "past" | "ongoing" })}>
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>
              <div className="admin-image-preview">
                {form.image ? <img src={form.image} alt="Preview" className="admin-image-preview__img" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} /> : <div className="admin-image-preview__placeholder">No image</div>}
                <div className="admin-image-preview__input admin-field">
                  <label className="admin-field__label">Image URL</label>
                  <input className="admin-field__input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-field__label">Registration Link</label>
                <input className="admin-field__input" value={form.registrationLink} onChange={(e) => setForm({ ...form, registrationLink: e.target.value })} placeholder="https://forms.google.com/..." />
              </div>
              <div className="admin-field">
                <label className="admin-field__label">Highlights (comma-separated)</label>
                <input className="admin-field__input" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} placeholder="Keynote speaker, Free lunch, Certificates..." />
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</button>
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
                <div className="admin-delete-confirm__icon"><AlertTriangle size={24} /></div>
                <h3 className="admin-delete-confirm__title">Delete Event?</h3>
                <p className="admin-delete-confirm__text">Are you sure you want to delete <strong>{deleteTarget.title}</strong>? This action cannot be undone.</p>
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="admin-btn admin-btn--danger" onClick={handleDelete}><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`admin-toast admin-toast--${toast.type}`}>{toast.message}</div>}
    </>
  );
}
