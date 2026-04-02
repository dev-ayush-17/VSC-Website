"use client";

import { useEffect, useState, useCallback } from "react";
import { Save, Plus, X, Trash2 } from "lucide-react";

interface LinkItem {
  label: string;
  href: string;
}

interface SettingsForm {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroQuote: string;
  heroQuoteHindi: string;
  heroDescription: string;
  heroImage: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  aboutImage: string;
  profName: string;
  profTitle: string;
  profImage: string;
  profMessage: string;
  navLinks: LinkItem[];
  footerDescription: string;
  footerQuickLinks: LinkItem[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    facebook: string;
  };
  joinFormLink: string;
}

const defaultSettings: SettingsForm = {
  heroTitle: "",
  heroHighlight: "",
  heroSubtitle: "",
  heroQuote: "",
  heroQuoteHindi: "",
  heroDescription: "",
  heroImage: "",
  aboutTitle: "",
  aboutSubtitle: "",
  aboutDescription: "",
  aboutImage: "",
  profName: "",
  profTitle: "",
  profImage: "",
  profMessage: "",
  navLinks: [],
  footerDescription: "",
  footerQuickLinks: [],
  contactEmail: "",
  contactPhone: "",
  contactAddress: "",
  socialLinks: { instagram: "", linkedin: "", twitter: "", youtube: "", facebook: "" },
  joinFormLink: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setForm({
          heroTitle: data.heroTitle || "",
          heroHighlight: data.heroHighlight || "",
          heroSubtitle: data.heroSubtitle || "",
          heroQuote: data.heroQuote || "",
          heroQuoteHindi: data.heroQuoteHindi || "",
          heroDescription: data.heroDescription || "",
          heroImage: data.heroImage || "",
          aboutTitle: data.aboutTitle || "",
          aboutSubtitle: data.aboutSubtitle || "",
          aboutDescription: data.aboutDescription || "",
          aboutImage: data.aboutImage || "",
          profName: data.profName || "",
          profTitle: data.profTitle || "",
          profImage: data.profImage || "",
          profMessage: data.profMessage || "",
          navLinks: data.navLinks || [],
          footerDescription: data.footerDescription || "",
          footerQuickLinks: data.footerQuickLinks || [],
          contactEmail: data.contactEmail || "",
          contactPhone: data.contactPhone || "",
          contactAddress: data.contactAddress || "",
          socialLinks: {
            instagram: data.socialLinks?.instagram || "",
            linkedin: data.socialLinks?.linkedin || "",
            twitter: data.socialLinks?.twitter || "",
            youtube: data.socialLinks?.youtube || "",
            facebook: data.socialLinks?.facebook || "",
          },
          joinFormLink: data.joinFormLink || "",
        });
      }
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }
  }, [toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setToast({ message: "Settings saved successfully!", type: "success" });
      } else {
        setToast({ message: "Failed to save settings", type: "error" });
      }
    } catch {
      setToast({ message: "Network error", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const addNavLink = () => setForm({ ...form, navLinks: [...form.navLinks, { label: "", href: "" }] });
  const removeNavLink = (i: number) => setForm({ ...form, navLinks: form.navLinks.filter((_, idx) => idx !== i) });
  const updateNavLink = (i: number, field: "label" | "href", value: string) => {
    const links = [...form.navLinks];
    links[i] = { ...links[i], [field]: value };
    setForm({ ...form, navLinks: links });
  };

  const addFooterLink = () => setForm({ ...form, footerQuickLinks: [...form.footerQuickLinks, { label: "", href: "" }] });
  const removeFooterLink = (i: number) => setForm({ ...form, footerQuickLinks: form.footerQuickLinks.filter((_, idx) => idx !== i) });
  const updateFooterLink = (i: number, field: "label" | "href", value: string) => {
    const links = [...form.footerQuickLinks];
    links[i] = { ...links[i], [field]: value };
    setForm({ ...form, footerQuickLinks: links });
  };

  if (loading) {
    return <div className="admin-loading"><div className="admin-spinner" /> Loading settings...</div>;
  }

  return (
    <>
      {/* Save Button - Sticky */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem", position: "sticky", top: "1rem", zIndex: 50 }}>
        <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>

      {/* Hero Section */}
      <div className="admin-settings-section">
        <div className="admin-settings-section__header">
          <h3 className="admin-settings-section__title">Hero Section</h3>
          <p className="admin-settings-section__desc">Configure the main landing hero area</p>
        </div>
        <div className="admin-settings-section__body">
          <div className="admin-modal__row">
            <div className="admin-field">
              <label className="admin-field__label">Title Text</label>
              <input className="admin-field__input" value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} placeholder="Empowering" />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">Highlight Text</label>
              <input className="admin-field__input" value={form.heroHighlight} onChange={(e) => setForm({ ...form, heroHighlight: e.target.value })} placeholder="Today's Youth" />
            </div>
          </div>
          <div className="admin-modal__row">
            <div className="admin-field">
              <label className="admin-field__label">Subtitle</label>
              <input className="admin-field__input" value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} placeholder="for Tomorrow." />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">Hero Image URL</label>
              <input className="admin-field__input" value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Quote</label>
            <input className="admin-field__input" value={form.heroQuote} onChange={(e) => setForm({ ...form, heroQuote: e.target.value })} />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Quote (Hindi)</label>
            <input className="admin-field__input" value={form.heroQuoteHindi} onChange={(e) => setForm({ ...form, heroQuoteHindi: e.target.value })} />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Description</label>
            <textarea className="admin-field__textarea" value={form.heroDescription} onChange={(e) => setForm({ ...form, heroDescription: e.target.value })} />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="admin-settings-section">
        <div className="admin-settings-section__header">
          <h3 className="admin-settings-section__title">About Section</h3>
          <p className="admin-settings-section__desc">Edit the about section content</p>
        </div>
        <div className="admin-settings-section__body">
          <div className="admin-modal__row">
            <div className="admin-field">
              <label className="admin-field__label">Section Title</label>
              <input className="admin-field__input" value={form.aboutTitle} onChange={(e) => setForm({ ...form, aboutTitle: e.target.value })} />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">Section Subtitle</label>
              <input className="admin-field__input" value={form.aboutSubtitle} onChange={(e) => setForm({ ...form, aboutSubtitle: e.target.value })} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field__label">About Image URL</label>
            <input className="admin-field__input" value={form.aboutImage} onChange={(e) => setForm({ ...form, aboutImage: e.target.value })} placeholder="https://..." />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">About Description</label>
            <textarea className="admin-field__textarea" value={form.aboutDescription} onChange={(e) => setForm({ ...form, aboutDescription: e.target.value })} style={{ minHeight: "120px" }} />
          </div>
        </div>
      </div>

      {/* Professor Section */}
      <div className="admin-settings-section">
        <div className="admin-settings-section__header">
          <h3 className="admin-settings-section__title">Professor In-Charge</h3>
          <p className="admin-settings-section__desc">Edit the professor message section</p>
        </div>
        <div className="admin-settings-section__body">
          <div className="admin-modal__row">
            <div className="admin-field">
              <label className="admin-field__label">Name</label>
              <input className="admin-field__input" value={form.profName} onChange={(e) => setForm({ ...form, profName: e.target.value })} />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">Title</label>
              <input className="admin-field__input" value={form.profTitle} onChange={(e) => setForm({ ...form, profTitle: e.target.value })} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Professor Image URL</label>
            <input className="admin-field__input" value={form.profImage} onChange={(e) => setForm({ ...form, profImage: e.target.value })} />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Professor Message</label>
            <textarea className="admin-field__textarea" value={form.profMessage} onChange={(e) => setForm({ ...form, profMessage: e.target.value })} style={{ minHeight: "120px" }} />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="admin-settings-section">
        <div className="admin-settings-section__header">
          <h3 className="admin-settings-section__title">Navigation Links</h3>
          <p className="admin-settings-section__desc">Manage the navbar menu items</p>
        </div>
        <div className="admin-settings-section__body">
          <div className="admin-links-list">
            {form.navLinks.map((link, i) => (
              <div key={i} className="admin-link-item">
                <input className="admin-link-item__input" value={link.label} onChange={(e) => updateNavLink(i, "label", e.target.value)} placeholder="Label" />
                <input className="admin-link-item__input" value={link.href} onChange={(e) => updateNavLink(i, "href", e.target.value)} placeholder="/events" />
                <button className="admin-link-item__remove" onClick={() => removeNavLink(i)}><X size={14} /></button>
              </div>
            ))}
          </div>
          <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={addNavLink} style={{ alignSelf: "flex-start" }}>
            <Plus size={14} /> Add Link
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="admin-settings-section">
        <div className="admin-settings-section__header">
          <h3 className="admin-settings-section__title">Footer</h3>
          <p className="admin-settings-section__desc">Edit footer content and quick links</p>
        </div>
        <div className="admin-settings-section__body">
          <div className="admin-field">
            <label className="admin-field__label">Footer Description</label>
            <textarea className="admin-field__textarea" value={form.footerDescription} onChange={(e) => setForm({ ...form, footerDescription: e.target.value })} style={{ minHeight: "60px" }} />
          </div>
          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#71717a" }}>Quick Links</div>
          <div className="admin-links-list">
            {form.footerQuickLinks.map((link, i) => (
              <div key={i} className="admin-link-item">
                <input className="admin-link-item__input" value={link.label} onChange={(e) => updateFooterLink(i, "label", e.target.value)} placeholder="Label" />
                <input className="admin-link-item__input" value={link.href} onChange={(e) => updateFooterLink(i, "href", e.target.value)} placeholder="/gallery" />
                <button className="admin-link-item__remove" onClick={() => removeFooterLink(i)}><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
          <button className="admin-btn admin-btn--secondary admin-btn--sm" onClick={addFooterLink} style={{ alignSelf: "flex-start" }}>
            <Plus size={14} /> Add Link
          </button>
        </div>
      </div>

      {/* Contact & Social */}
      <div className="admin-settings-section">
        <div className="admin-settings-section__header">
          <h3 className="admin-settings-section__title">Contact & Social</h3>
          <p className="admin-settings-section__desc">Edit contact information and social media links</p>
        </div>
        <div className="admin-settings-section__body">
          <div className="admin-modal__row">
            <div className="admin-field">
              <label className="admin-field__label">Email</label>
              <input className="admin-field__input" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">Phone</label>
              <input className="admin-field__input" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Address</label>
            <input className="admin-field__input" value={form.contactAddress} onChange={(e) => setForm({ ...form, contactAddress: e.target.value })} />
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Join Form Link</label>
            <input className="admin-field__input" value={form.joinFormLink} onChange={(e) => setForm({ ...form, joinFormLink: e.target.value })} placeholder="https://forms.google.com/..." />
          </div>

          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#71717a", marginTop: "0.5rem" }}>Social Media Links</div>
          <div className="admin-modal__row">
            <div className="admin-field">
              <label className="admin-field__label">Instagram</label>
              <input className="admin-field__input" value={form.socialLinks.instagram} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, instagram: e.target.value } })} />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">LinkedIn</label>
              <input className="admin-field__input" value={form.socialLinks.linkedin} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })} />
            </div>
          </div>
          <div className="admin-modal__row">
            <div className="admin-field">
              <label className="admin-field__label">Twitter / X</label>
              <input className="admin-field__input" value={form.socialLinks.twitter} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })} />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">YouTube</label>
              <input className="admin-field__input" value={form.socialLinks.youtube} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, youtube: e.target.value } })} />
            </div>
          </div>
          <div className="admin-field">
            <label className="admin-field__label">Facebook</label>
            <input className="admin-field__input" value={form.socialLinks.facebook} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, facebook: e.target.value } })} />
          </div>
        </div>
      </div>

      {toast && <div className={`admin-toast admin-toast--${toast.type}`}>{toast.message}</div>}
    </>
  );
}
