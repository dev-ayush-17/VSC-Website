"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, X, AlertTriangle, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  date?: string;
  description?: string;
}

const emptyItem = {
  title: "",
  image: "",
  category: "",
  date: "",
  description: "",
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState(emptyItem);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) setItems(await res.json());
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyItem });
    setShowModal(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      image: item.image,
      category: item.category,
      date: item.date || "",
      description: item.description || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.image || !form.category) {
      setToast({ message: "Title, image URL, and category are required", type: "error" });
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/gallery/${editing._id}` : "/api/admin/gallery";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setToast({ message: editing ? "Item updated!" : "Item added!", type: "success" });
        setShowModal(false);
        fetchItems();
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
      const res = await fetch(`/api/admin/gallery/${deleteTarget._id}`, { method: "DELETE" });
      if (res.ok) {
        setToast({ message: "Item deleted", type: "success" });
        setDeleteTarget(null);
        fetchItems();
      }
    } catch {
      setToast({ message: "Network error", type: "error" });
    }
  };

  return (
    <>
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2 className="admin-table-header__title">Gallery ({filtered.length})</h2>
          <div className="admin-table-header__actions">
            <div className="admin-search">
              <Search size={14} className="admin-search__icon" />
              <input type="text" className="admin-search__input" placeholder="Search gallery..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openCreate}>
              <Plus size={16} /> Add Image
            </button>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon"><ImageIcon size={24} /></div>
            <div className="admin-empty__title">No gallery items</div>
            <div className="admin-empty__text">Add your first gallery image</div>
            <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={openCreate}><Plus size={16} /> Add Image</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", padding: "1.5rem" }}>
            {filtered.map((item) => (
              <div key={item._id} style={{ position: "relative", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)", aspectRatio: "4/3" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = ""; (e.target as HTMLImageElement).style.background = "rgba(255,255,255,0.04)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(0,0,0,0.8))", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0.75rem" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#f4f4f5" }}>{item.title}</span>
                  <span style={{ fontSize: "0.6875rem", color: "#a1a1aa" }}>{item.category}</span>
                </div>
                <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", display: "flex", gap: "0.25rem" }}>
                  <button className="admin-btn admin-btn--secondary admin-btn--sm" style={{ padding: "0.25rem 0.375rem", backdropFilter: "blur(8px)" }} onClick={() => openEdit(item)}><Pencil size={12} /></button>
                  <button className="admin-btn admin-btn--danger admin-btn--sm" style={{ padding: "0.25rem 0.375rem", backdropFilter: "blur(8px)" }} onClick={() => setDeleteTarget(item)}><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">{editing ? "Edit Gallery Item" : "Add Gallery Item"}</h3>
              <button className="admin-modal__close" onClick={() => setShowModal(false)}><X size={16} /></button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-field">
                <label className="admin-field__label">Title *</label>
                <input className="admin-field__input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Cultural Night 2025" />
              </div>
              <div className="admin-image-preview">
                {form.image ? <img src={form.image} alt="Preview" className="admin-image-preview__img" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} /> : <div className="admin-image-preview__placeholder">No image</div>}
                <div className="admin-image-preview__input admin-field">
                  <label className="admin-field__label">Image URL *</label>
                  <input className="admin-field__input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <div className="admin-modal__row">
                <div className="admin-field">
                  <label className="admin-field__label">Category *</label>
                  <input className="admin-field__input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Cultural, Team, Wellness..." />
                </div>
                <div className="admin-field">
                  <label className="admin-field__label">Date</label>
                  <input className="admin-field__input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-field__label">Description</label>
                <textarea className="admin-field__textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." style={{ minHeight: "60px" }} />
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : editing ? "Update" : "Create"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__body">
              <div className="admin-delete-confirm">
                <div className="admin-delete-confirm__icon"><AlertTriangle size={24} /></div>
                <h3 className="admin-delete-confirm__title">Delete Image?</h3>
                <p className="admin-delete-confirm__text">Are you sure you want to delete <strong>{deleteTarget.title}</strong>?</p>
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
