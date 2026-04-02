"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { fallbackEvents } from "@/lib/data/fallback";

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
}

type Filter = "all" | "upcoming" | "past";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        if (data?.length) setEvents(data);
      })
      .catch(() => {});
  }, []);

  const filtered =
    filter === "all" ? events : events.filter((e) => e.status === filter);

  const filters: { label: string; value: Filter }[] = [
    { label: "All Events", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Past Events", value: "past" },
  ];

  return (
    <>
      <section className="page-hero" id="events-hero">
        <div className="page-hero__bg" />
        <div className="page-hero__container">
          <h1 className="page-hero__title">
            Our <span className="page-hero__title-accent">Events</span>
          </h1>
          <p className="page-hero__subtitle">
            From cultural celebrations to leadership workshops — discover what
            VSC has to offer.
          </p>
        </div>
      </section>

      <section className="events-page__container" id="events-list">
        <div className="events-page__filters">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`events-page__filter ${
                filter === f.value ? "events-page__filter--active" : ""
              }`}
              onClick={() => setFilter(f.value)}
              id={`filter-${f.value}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="events-page__list">
          {filtered.length > 0 ? (
            filtered.map((event) => (
              <EventCard
                key={event._id}
                title={event.title}
                description={event.description}
                date={event.date}
                venue={event.venue}
                image={event.image}
                category={event.category}
                status={event.status}
                registrationLink={event.registrationLink}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "3rem" }}>
              No events found for this filter.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
