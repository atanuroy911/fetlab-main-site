export const PATHWAYS = [
  {
    title: "Research Collaboration",
    body: "Joint research, publications, grants, datasets, and experiments.",
    icon: "Handshake",
  },
  {
    title: "Innovation Collaboration",
    body: "Prototyping, technology development, pilots, and experimental deployments.",
    icon: "Lightbulb",
  },
  {
    title: "Institutional Collaboration",
    body: "Partnerships between universities, companies, government, and NGOs.",
    icon: "Building2",
  },
  {
    title: "Student & Education",
    body: "Research opportunities, mentorship, workshops, and experiential learning.",
    icon: "GraduationCap",
  },
  {
    title: "Community & Field Engagement",
    body: "Working with communities and practitioners on real-world problems.",
    icon: "Users",
  },
  {
    title: "Knowledge Exchange",
    body: "Seminars, talks, publications, open resources, and events.",
    icon: "Mail",
  },
] as const;

export const PATHWAY_TITLES: string[] = PATHWAYS.map((p) => p.title);
