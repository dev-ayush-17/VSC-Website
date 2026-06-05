export const fallbackTeam = [
  {
    _id: "prof1",
    name: "Dr. Bhawani Shankar Das",
    role: "Professor In-Charge",
    image:
      "https://res.cloudinary.com/dq1fhihvx/image/upload/q_auto/f_auto/v1775075848/db5c0b86-f41d-4b3d-8f14-d6a1f63abfef.png",
    branch: "Department of CSE",
    category: "professor" as const,
    order: 0,
    socials: {
      linkedin: "#",
      email: "bhawani@nitp.ac.in",
    },
  },
  {
    _id: "l1",
    name: "Ansh Lenka",
    role: "Coordinator",
    image: "/images/team_panel/Ansh_lenka.jpeg",
    branch: "ECE",
    year: "2nd Year",
    category: "leader" as const,
    order: 1,
    socials: {
      linkedin: "#",
      instagram: "https://www.instagram.com/lenkaansh?igsh=MTYyMTR1d3JlbXJtaQ==",
    },
  },
  {
    _id: "l2",
    name: "Prapti",
    role: "Coordinator",
    image: "/images/team_panel/prapti.jpeg",
    branch: "AI & DS",
    year: "2nd Year",
    category: "leader" as const,
    order: 2,
    socials: {
      linkedin: "https://www.linkedin.com/in/prapti-premosmita-67099b412?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/_veloraa__?igsh=ZDZuYnc0dGNxYzN0",
    },
  },
  {
    _id: "c1",
    name: "Prakhar Srivastav",
    role: "Design Team Lead",
    image: "/images/team_panel/prakarSrivastav.jpeg",
    branch: "Civil",
    year: "4th Year",
    category: "coordinator" as const,
    order: 5,
    socials: {
      linkedin: "https://www.linkedin.com/in/prakhar-srivastav-5627b8332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/prakhar_4_s?igsh=aXBlYm15bGxyYTN5"
    },
  },
  {
    _id: "c2",
    name: "Udipta Katyayan",
    role: "Content & Social Media Team Lead",
    image: "/images/team_panel/udiptaKatyayan.jpeg",
    branch: "Civil",
    year: "4th Year",
    category: "coordinator" as const,
    order: 6,
    socials: {
      linkedin: "https://www.linkedin.com/in/udipta-katyayan-8a327b34b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/udiptakatyayan?igsh=ZDNlcHR6dTNma2l0"
    },
  },
  {
    _id: "c3",
    name: "Saim Ahmed",
    role: "Tech Team Lead",
    image: "/images/team_panel/SaimAhmed.jpeg",
    branch: "EE",
    year: "4th Year",
    category: "coordinator" as const,
    order: 7,
    socials: {
      linkedin: "https://www.linkedin.com/in/saim-ahmad-806099326/?skipRedirect=true",
      instagram: "https://www.instagram.com/_ahmad_saim_/",
    },
  },
  {
    _id: "m1",
    name: "Mohit Kumar",
    role: "President",
    image: "/images/team_panel/mohitKumar.jpeg",
    branch: "M.Tech",
    year: "2nd Year",
    category: "core" as const,
    order: 9,
    socials: {
      linkedin: "https://www.linkedin.com/in/mohit-kumar-93099b24b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/mohiit.2ix?igsh=MXh6eGljc3VvaWtyYw==",
      twitter: "https://x.com/learner_mohit",
      email: "mohitk.pg25.ce@nitp.ac.in",
    },
  },
  {
    _id: "m2",
    name: "Prakhar Srivastav",
    role: "Vice President",
    image: "/images/team_panel/prakarSrivastav.jpeg",
    branch: "Civil",
    year: "4th Year",
    category: "core" as const,
    order: 10,
    socials: {
      linkedin: "https://www.linkedin.com/in/prakhar-srivastav-5627b8332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/prakhar_4_s?igsh=aXBlYm15bGxyYTN5"
    },
  },
  {
    _id: "m4",
    name: "Saim Ahmed",
    role: "Secretary",
    image: "/images/team_panel/SaimAhmed.jpeg",
    branch: "Material Science",
    year: "4th Year",
    category: "core" as const,
    order: 12,
    socials: {
      linkedin: "https://www.linkedin.com/in/saim-ahmad-806099326/?skipRedirect=true",
      instagram: "https://www.instagram.com/_ahmad_saim_/"
    },
  },
  {
    _id: "m3",
    name: "Udipta Katyayan",
    role: "Joint Secretary",
    image: "/images/team_panel/udiptaKatyayan.jpeg",
    branch: "Civil",
    year: "4th Year",
    category: "core" as const,
    order: 11,
    socials: {
      linkedin: "https://www.linkedin.com/in/udipta-katyayan-8a327b34b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/udiptakatyayan?igsh=ZDNlcHR6dTNma2l0"
    },
  },
];

export const fallbackEvents = [
  {
    _id: "e1",
    title: "Vivekananda Jayanti Celebration",
    description:
      "Join us for a grand celebration of Swami Vivekananda's 163rd birth anniversary. The event features inspirational talks, cultural performances, and a panel discussion on the relevance of Vivekananda's teachings in modern India.",
    date: "2026-01-12",
    venue: "Central Auditorium, NIT Patna",
    image: "/images/event-bg-1.png",
    category: "Cultural",
    status: "upcoming" as const,
    highlights: [
      "Keynote by renowned speaker",
      "Cultural performances",
      "Essay competition",
    ],
  },
  {
    _id: "e2",
    title: "Youth Leadership Summit 2026",
    description:
      "A two-day summit bringing together young leaders from across Bihar. Workshops on public speaking, leadership skills, and community building inspired by Swami Vivekananda's vision for Indian youth.",
    date: "2026-02-15",
    venue: "Seminar Hall, NIT Patna",
    image: "/images/event-bg-2.png",
    category: "Seminar",
    status: "upcoming" as const,
    highlights: [
      "Expert workshops",
      "Networking sessions",
      "Certificate of participation",
    ],
  },
  {
    _id: "e3",
    title: "Meditation & Mindfulness Workshop",
    description:
      "A weekend workshop on meditation techniques and mindfulness practices. Learn ancient Indian meditation methods adapted for the modern student lifestyle. Open to all NIT Patna students and faculty.",
    date: "2025-11-20",
    venue: "Yoga Center, NIT Patna",
    image: "/images/event-bg-1.png",
    category: "Workshop",
    status: "past" as const,
    highlights: [
      "Guided meditation",
      "Stress management techniques",
      "Daily practice guide",
    ],
  },
  {
    _id: "e4",
    title: "National Service Day — Campus Clean Drive",
    description:
      "Inspired by Vivekananda's call to serve humanity, we organize a campus-wide cleanliness and tree plantation drive. Every small act of service counts towards building a better world.",
    date: "2025-09-15",
    venue: "NIT Patna Campus",
    image: "/images/event-bg-2.png",
    category: "Social Service",
    status: "past" as const,
    highlights: [
      "Tree plantation",
      "Campus beautification",
      "Community lunch",
    ],
  },
  {
    _id: "e5",
    title: "Inter-College Debate Competition",
    description:
      "VSC proudly presents the annual inter-college debate competition. This year's theme: 'The Role of Spiritual Values in Modern Education.' Students from 15+ colleges will participate.",
    date: "2026-03-10",
    venue: "Main Auditorium, NIT Patna",
    image: "/images/event-bg-2.png",
    category: "Competition",
    status: "upcoming" as const,
    highlights: [
      "Cash prizes",
      "Trophy for winners",
      "Guest judges from academia",
    ],
  },
  {
    _id: "e6",
    title: "Book Reading: Complete Works of Vivekananda",
    description:
      "A monthly book reading circle where we explore the Complete Works of Swami Vivekananda. This session covers Volume 3 — lectures and discourses on Karma Yoga and Bhakti Yoga.",
    date: "2025-12-05",
    venue: "Central Library, NIT Patna",
    image: "/images/event-bg-1.png",
    category: "Book Club",
    status: "past" as const,
    highlights: [
      "Group discussion",
      "Key takeaways",
      "Reading materials provided",
    ],
  },
];

export const fallbackGallery = [
  {
    _id: "g1",
    title: "Team VSC",
    image: "/images/Gallery/Gallery-1.jpeg",
    category: "Seminar",
    date: "2025-10-15",
  },
  {
    _id: "g2",
    title: "Vivekananda Jayanti Celebration",
    image: "/images/Gallery/Gallery-2.jpeg",
    category: "Cultural",
    date: "2025-09-20",
  },
  {
    _id: "g3",
    title: "Youth Day events",
    image: "/images/Gallery/Gallery-3.jpeg",
    category: "Competition",
    date: "2025-08-15",
  },
  {
    _id: "g4",
    title: "Chess Competition",
    image: "/images/Gallery/Gallery-4.jpeg",
    category: "Competition",
    date: "2025-07-01",
  },
  {
    _id: "g5",
    title: "Seminar",
    image: "/images/Gallery/Gallery-5.jpeg",
    category: "Seminar",
    date: "2025-06-21",
  },
  {
    _id: "g6",
    title: "Team Members",
    image: "/images/Gallery/Gallery-6.jpeg",
    category: "Team",
    date: "2025-11-10",
  },
  {
    _id: "g7",
    title: "Prize Distribution",
    image: "/images/Gallery/Gallery-7.jpeg",
    category: "Competition",
    date: "2025-08-15",
  },
  {
    _id: "g8",
    title: "Waste to Best",
    image: "/images/Gallery/Gallery-8.jpeg",
    category: "Competition",
    date: "2025-12-05",
  }
];
