import type {
  NoticeSummary,
  PersonSummary,
  ResearchGroupSummary,
  SiteSettings,
} from "./types";

export const fallbackSiteSettings: SiteSettings = {
  title: "FETLAB",
  heroHeadline: "Exploring emerging technologies. Addressing complex challenges.",
  heroSubtext:
    "An open multidisciplinary research, innovation, and collaboration platform connecting people, ideas, technologies, and institutions.",
  whatIsFetlab:
    "FETLAB (Future & Emerging Technology Laboratory) is an open, multidisciplinary research, innovation, and collaboration platform. It brings together people, expertise, institutions, and technologies to explore emerging technologies and address complex real-world challenges — orchestrating distributed expertise around meaningful problems rather than owning every capability itself.",
  mission:
    "To explore emerging technologies, connect researchers, educators, students, and institutions, facilitate multidisciplinary research and experimentation, and generate and share knowledge that opens new questions and directions.",
  vision:
    "To foster an open ecosystem where diverse disciplines, people, and institutions come together to explore emerging technologies and create knowledge, innovations, and solutions for the complex challenges of the future.",
  contactEmail: "hello@fetlab.org",
};

export const fallbackResearchGroups: ResearchGroupSummary[] = [
  {
    _id: "fallback-tangible-reality",
    title: "Tangible Reality, IoT, Smart Textile & Precision Agriculture",
    shortTitle: "IoT & Smart Textiles",
    slug: "tangible-reality-iot-smart-textile",
    kind: "group",
    summary:
      "Research at the intersection of IoT, edge computing, data-driven AI, tangible reality, wearables, and smart textiles, with a current focus on healthcare and sports applications.",
    themes: ["IoT", "Edge Computing", "AI", "Wearables", "Smart Textiles", "Precision Agriculture"],
    isFeatured: true,
  },
  {
    _id: "fallback-xai-health",
    title: "Explainable AI, Computational Epidemiology & Healthcare",
    shortTitle: "XAI & Epidemiology",
    slug: "explainable-ai-computational-epidemiology-healthcare",
    kind: "group",
    summary:
      "Computational and social-science models for global public health, including the study of dengue and other public-health challenges in Bangladesh.",
    themes: ["Explainable AI", "Computational Epidemiology", "Public Health"],
    isFeatured: true,
  },
  {
    _id: "fallback-agentic-ai",
    title: "Massive- & Large-scale Agentic AI and Intelligent Systems",
    shortTitle: "Agentic AI",
    slug: "agentic-ai-intelligent-systems",
    kind: "group",
    summary:
      "Intelligent systems that observe complex environments, detect risks and anomalies, and support timely decisions across domains from food safety to infrastructure.",
    themes: ["Agentic AI", "Risk Detection", "Early Warning Systems"],
    isFeatured: true,
  },
  {
    _id: "fallback-researchconnect",
    title: "ResearchConnect",
    slug: "researchconnect",
    kind: "initiative",
    summary:
      "A cross-institutional research and innovation collaboration initiative connecting people, ideas, expertise, and opportunities across universities and the wider innovation ecosystem.",
    themes: ["Collaboration", "Network"],
    isFeatured: true,
  },
  {
    _id: "fallback-dtdt",
    title: "Dhaka Traffic Digital Twins (DTDT)",
    shortTitle: "DTDT",
    slug: "dhaka-traffic-digital-twins",
    kind: "initiative",
    summary:
      "A problem-driven research program modelling Dhaka's traffic system as a computational and mathematical space of interacting agents, using digital twins and simulation.",
    themes: ["Mathematical Modelling", "Simulation", "Digital Twins", "Complex Systems"],
    isFeatured: false,
  },
  {
    _id: "fallback-inventors",
    title: "FETLAB Inventors & Innovators",
    slug: "fetlab-inventors-innovators",
    kind: "forum",
    summary:
      "A forum bringing together researchers, faculty, student researchers, grassroots inventors, and practitioners working across diverse fields.",
    themes: ["Innovation", "Grassroots Invention"],
    isFeatured: false,
  },
  {
    _id: "fallback-student-researchers",
    title: "FETLAB Student Researchers",
    slug: "fetlab-student-researchers",
    kind: "forum",
    summary:
      "A student forum for those interested in research, emerging technologies, interdisciplinary inquiry, experimentation, and innovation.",
    themes: ["Students", "Mentorship"],
    isFeatured: false,
  },
];

export const fallbackPeople: PersonSummary[] = [
  {
    _id: "fallback-kadir",
    name: "Dr. Ashraful Kadir",
    slug: "ashraful-kadir",
    role: "Founder & Director",
    affiliation: "Assistant Professor of Mathematics, Dept. of Physical Sciences, IUB",
    category: "leadership",
    bio: "Known within the FETLAB community as Dr. K.",
  },
  {
    _id: "fallback-abedin",
    name: "Md Anowarul Abedin",
    slug: "md-anowarul-abedin",
    role: "Founder / Core Leadership",
    affiliation: "Assistant Professor, Dept. of CSE, UIU",
    category: "leadership",
  },
  {
    _id: "fallback-atanu",
    name: "Atanu Shuvam Roy",
    slug: "atanu-shuvam-roy",
    role: "Founder / Core Leadership",
    affiliation: "Lecturer, Dept. of CSE, ULAB",
    category: "leadership",
  },
];

export const fallbackNotices: NoticeSummary[] = [
  {
    _id: "fallback-notice-welcome",
    title: "FETLAB.org is live",
    slug: "fetlab-org-is-live",
    type: "announcement",
    summary: "Welcome to the new home of FETLAB. Notices, vacancies, and calls will be posted here.",
    publishedAt: new Date().toISOString(),
  },
];
