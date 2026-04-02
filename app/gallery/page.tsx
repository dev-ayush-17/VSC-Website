"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { fallbackGallery } from "@/lib/data/fallback";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  category: string;
  date?: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(fallbackGallery);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data?.length) setGallery(data);
      })
      .catch(() => {});
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(gallery.map((g) => g.category))),
  ];

  const filtered =
    filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <>
      <section className="page-hero" id="gallery-hero">
        <div className="page-hero__bg" />
        <div className="page-hero__container">
          <h1 className="page-hero__title">
            Our <span className="page-hero__title-accent">Gallery</span>
          </h1>
          <p className="page-hero__subtitle">
            A visual journey through our events, celebrations, and cherished
            moments at VSC.
          </p>
        </div>
      </section>

      <section className="gallery-page__container" id="gallery-grid">
        <div className="gallery-page__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`gallery-page__filter ${
                filter === cat ? "gallery-page__filter--active" : ""
              }`}
              onClick={() => setFilter(cat)}
              id={`gallery-filter-${cat.toLowerCase().replace(/\s/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-page__grid">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="gallery-page__item"
              onClick={() => setLightbox(item)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="gallery-page__img"
              />
              <div className="gallery-page__item-overlay">
                <span className="gallery-page__item-title">{item.title}</span>
                <span className="gallery-page__item-category">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button
            className="lightbox__close"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <Image
            src={lightbox.image}
            alt={lightbox.title}
            width={1200}
            height={800}
            className="lightbox__image"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox__info">
            <p className="lightbox__title">{lightbox.title}</p>
            <p className="lightbox__category">{lightbox.category}</p>
          </div>
        </div>
      )}
    </>
  );
}
