"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TeamCard from "@/components/TeamCard";
import SectionHeader from "@/components/SectionHeader";
import { fallbackTeam } from "@/lib/data/fallback";
import { Mail } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  branch?: string;
  year?: string;
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

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    fetch("/api/teams")
      .then((r) => r.json())
      .then((data) => {
        if (data?.length) setTeam(data);
      })
      .catch(() => { });
  }, []);

  const professor = team.filter((m) => m.category === "professor");
  const leaders = team.filter((m) => m.category === "leader");
  const coordinators = team.filter((m) => m.category === "coordinator");
  const coreMembers = team.filter((m) => m.category === "core");

  return (
    <>
      <section className="page-hero" id="team-hero">
        <div className="page-hero__bg" />
        <div className="page-hero__container">
          <h1 className="page-hero__title">
            Our <span className="page-hero__title-accent">Team</span>
          </h1>
          <p className="page-hero__subtitle">
            Meet the passionate individuals who drive VSC forward — from our
            guiding professor to every core member.
          </p>
        </div>
      </section>

      <section className="team-page__container" id="team-list">
        {/* Professor In-Charge */}
        {professor.length > 0 && (
          <div className="team-page__category">
            <div className="prof-section__card" style={{ marginBottom: "2rem" }}>
              <div className="prof-section__content">
                <SectionHeader
                  label="Faculty Advisor"
                  title="Professor In-Charge"
                  centered={false}
                />
                <div className="prof-section__message">
                  <p>
                    Dr. Bhawani Shankar Das leads the Vivekanand Study Circle as
                    the Professor In-Charge, guiding students with wisdom and
                    dedication. Under his mentorship, VSC has grown into a vibrant
                    platform for intellectual and personal growth.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                  <a href="#" className="team-card__social-link" aria-label="LinkedIn">
                    <LinkedinIcon />
                  </a>
                  <a href="mailto:bhawani@nitp.ac.in" className="team-card__social-link" aria-label="Email">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
              <div className="prof-section__image-col">
                <div className="prof-section__image-wrapper">
                  <Image
                    src={professor[0].image}
                    alt={professor[0].name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="prof-section__image"
                  />
                </div>
                <div className="prof-section__name-badge">
                  <p className="prof-section__prof-name">{professor[0].name}</p>
                  <p className="prof-section__prof-title">{professor[0].role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Core Members */}
        {coreMembers.length > 0 && (
          <div className="team-page__category">
            <h3 className="team-page__category-title">Core Members</h3>
            <div className="team-page__grid">
              {coreMembers.map((member) => (
                <TeamCard
                  key={member._id}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  branch={member.branch}
                  socials={member.socials}
                />
              ))}
            </div>
          </div>
        )}

        {/* Coordinators */}
        {coordinators.length > 0 && (
          <div className="team-page__category">
            <h3 className="team-page__category-title">Team Leads</h3>
            <div className="team-page__grid">
              {coordinators.map((member) => (
                <TeamCard
                  key={member._id}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  branch={member.branch}
                  socials={member.socials}
                />
              ))}
            </div>
          </div>
        )}

        {/* Leaders / Coordinators */}
        {leaders.length > 0 && (
          <div className="team-page__category">
            <h3 className="team-page__category-title">Student Coordinators</h3>
            <div className="team-page__grid">
              {leaders.map((member) => (
                <TeamCard
                  key={member._id}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  branch={member.branch}
                  socials={member.socials}
                />
              ))}
            </div>
          </div>
        )}

      </section>
    </>
  );
}
