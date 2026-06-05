"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Heart, Mail } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import TeamCard from "@/components/TeamCard";
import EventCard from "@/components/EventCard";
import { fallbackTeam, fallbackEvents, fallbackGallery } from "@/lib/data/fallback";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  branch?: string;
  category: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    whatsapp?: string;
    email?: string;
    github?: string;
  };
}

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

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  category: string;
}

export default function Home() {
  const [team, setTeam] = useState<TeamMember[]>(fallbackTeam);
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [gallery, setGallery] = useState<GalleryItem[]>(fallbackGallery);

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => r.json())
      .then((data) => { if (data?.length) setTeam(data); })
      .catch(() => { });

    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => { if (data?.length) setEvents(data); })
      .catch(() => { });

    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => { if (data?.length) setGallery(data); })
      .catch(() => { });
  }, []);

  const leaders = team.filter((m) => m.category === "core").slice(0, 4);
  const upcomingEvents = events.filter((e) => e.status === "upcoming").slice(0, 2);
  const galleryPreview = gallery.slice(0, 6);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero-section">
        <div className="hero__bg-pattern" />
        <div className="hero__gradient" />
        <div className="hero__container">
          <div className="hero__content">
            <p className="hero__sanskrit">
              उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत
            </p>
            <h1 className="hero__title">
              Empowering
              <span className="hero__title-accent">Today&apos;s Youth</span>
              <span className="hero__title-sub">for Tomorrow.</span>
            </h1>
            <blockquote className="hero__quote">
              &ldquo;Arise, awake, and stop not till the goal is reached.&rdquo;
            </blockquote>
            <p className="hero__description">
              Inspired by the timeless wisdom of Swami Vivekananda, we are a
              dynamic student community at NIT Patna dedicated to building a
              brighter future.
            </p>
            <div className="hero__actions">
              <Link href="/events" className="hero__btn hero__btn--primary">
                Explore Events <ArrowRight size={18} />
              </Link>
              <Link href="/team" className="hero__btn hero__btn--secondary">
                Meet the Team
              </Link>
            </div>
          </div>

          <div className="hero__image-wrapper">
            <div className="hero__image-glow" />
            <Image
              src="https://res.cloudinary.com/dq1fhihvx/image/upload/q_auto/f_auto/v1775134556/26853900-9fd1-4718-9029-8662a4dfa388.png"
              alt="Swami Vivekananda"
              width={600}
              height={700}
              className="hero__image"
              loading="eager"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* ===== ABOUT VSC ===== */}
      <section className="about-section" id="about-section">
        <div className="about-section__container">
          <div className="about-section__grid">
            <div className="about-section__image-side">
              <Image
                src="https://res.cloudinary.com/dq1fhihvx/image/upload/q_auto/f_auto/v1775135102/swami-vivekananda-meditation_bdlplp.jpg"
                alt="Swami Vivekananda"
                width={550}
                height={700}
                className="about-section__image"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <div className="about-section__content">
              <SectionHeader
                label="Who We Are"
                title="Our Inspiration & Story"
                centered={false}
              />
              <blockquote className="about-section__blockquote">
                &ldquo;All the powers in the universe are already ours. It is we
                who have put our hands before our eyes and cry that it is
                dark.&rdquo;
              </blockquote>
              <p className="about-section__text">
                The Vivekanand Study Circle (VSC) is a thriving student-led
                community nestled within the National Institute of Technology,
                Patna. We are engineers, thinkers, and future leaders who believe
                that true education goes beyond textbooks.
              </p>
              <p className="about-section__text">
                Our foundation rests on the powerful philosophy of Swami
                Vivekananda. We echo his belief that the world is &ldquo;the
                great gymnasium where we come to make ourselves strong.&rdquo;
                Through events, workshops, community service, and intellectual
                discussions, we strive to build character, foster leadership, and
                ignite the spirit of service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROFESSOR MESSAGE ===== */}
      <section className="prof-section" id="professor-section">
        <div className="prof-section__bg" />
        <div className="prof-section__container">
          <div className="prof-section__card">
            <div className="prof-section__content">
              <div className="prof-section__header">
                <div className="prof-section__icon">
                  <Mail size={24} />
                </div>
                <span className="prof-section__label">Message from our</span>
              </div>
              <h2 className="prof-section__title">Professor In-Charge</h2>
              <p className="prof-section__club-name">
                Vivekanand Study Circle, NIT Patna
              </p>

              <div className="prof-section__message">
                <p className="prof-section__salutation">
                  Dear Students & Enthusiasts,
                </p>
                <p>
                  It gives me immense pleasure to welcome you to the Vivekanand
                  Study Circle at NIT Patna. Our club stands as a beacon of
                  Swami Vivekananda&apos;s timeless teachings, channeling his vision
                  of empowering youth through knowledge, service, and
                  self-discovery.
                </p>
                <p>
                  In today&apos;s rapidly evolving world, the values of character
                  building, selfless service, and intellectual growth are more
                  relevant than ever. VSC provides a unique platform where
                  students can explore these dimensions beyond the confines of
                  their academic curriculum.
                </p>
                <p>
                  I encourage every student to actively participate in our
                  events, discussions, and community service initiatives. Let us
                  together build a community that embodies the spirit of
                  &ldquo;Arise, awake, and stop not till the goal is
                  reached.&rdquo;
                </p>
              </div>
            </div>

            <div className="prof-section__image-col">
              <div className="prof-section__image-wrapper">
                <Image
                  src="https://res.cloudinary.com/dq1fhihvx/image/upload/q_auto/f_auto/v1775075848/db5c0b86-f41d-4b3d-8f14-d6a1f63abfef.png"
                  alt="Dr. Bhawani Shankar Das"
                  fill
                  sizes="220px"
                  className="prof-section__image"
                />
              </div>
              <div className="prof-section__name-badge">
                <p className="prof-section__prof-name">
                  Dr. Bhawani Shankar Das
                </p>
                <p className="prof-section__prof-title">Professor In-Charge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEADERS ===== */}
      <section className="leaders-section" id="leaders-section">
        <div className="leaders-section__container">
          <SectionHeader
            label="Our Team"
            title="Meet Our Leaders"
            subtitle="The driving force behind VSC — passionate individuals committed to Vivekananda's vision of youth empowerment."
          />
          <div className="leaders-section__grid">
            {leaders.map((leader) => (
              <TeamCard
                key={leader._id}
                name={leader.name}
                role={leader.role}
                image={leader.image}
                branch={leader.branch}
                socials={leader.socials}
              />
            ))}
          </div>
          <div className="leaders-section__cta">
            <Link href="/team" className="leaders-section__link">
              View Full Team <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS PREVIEW ===== */}
      {upcomingEvents.length > 0 && (
        <section style={{ padding: "6rem 0", background: "var(--bg-secondary)" }}>
          <div className="container">
            <SectionHeader
              label="What's Happening"
              title="Upcoming Events"
              subtitle="Stay connected with our latest events, workshops, and celebrations."
            />
            <div className="events-page__list">
              {upcomingEvents.map((event) => (
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
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/events" className="leaders-section__link">
                View All Events <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="gallery-section" id="gallery-section">
        <div className="gallery-section__container">
          <SectionHeader
            label="Memories"
            title="Our Gallery"
            subtitle="Moments captured from our events, celebrations, and community activities."
          />
          <div className="gallery-section__grid">
            {galleryPreview.map((item) => (
              <div key={item._id} className="gallery-section__item">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="gallery-section__img"
                />
                <div className="gallery-section__overlay">
                  <span className="gallery-section__caption">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="gallery-section__cta">
            <Link href="/gallery" className="gallery-section__link">
              View Full Gallery <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY JOIN US CTA ===== */}
      <section className="cta-section" id="cta-section">
        <div className="cta-section__bg-pattern" />
        <div className="cta-section__container">
          <h2 className="cta-section__title">Why Join VSC?</h2>
          <p className="cta-section__subtitle">
            Be part of a community that believes in the transformative power of
            knowledge, service, and character. Together, we rise.
          </p>

          <div className="cta-section__features">
            <div className="cta-section__feature">
              <div className="cta-section__feature-icon">
                <BookOpen size={28} />
              </div>
              <h3 className="cta-section__feature-title">Learn & Grow</h3>
              <p className="cta-section__feature-text">
                Workshops, seminars & book circles
              </p>
            </div>
            <div className="cta-section__feature">
              <div className="cta-section__feature-icon">
                <Users size={28} />
              </div>
              <h3 className="cta-section__feature-title">Lead & Inspire</h3>
              <p className="cta-section__feature-text">
                Leadership roles & public speaking
              </p>
            </div>
            <div className="cta-section__feature">
              <div className="cta-section__feature-icon">
                <Heart size={28} />
              </div>
              <h3 className="cta-section__feature-title">Serve & Impact</h3>
              <p className="cta-section__feature-text">
                Community service & social initiatives
              </p>
            </div>
          </div>

          <Link href="/events" className="cta-section__btn">
            Join Us Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
