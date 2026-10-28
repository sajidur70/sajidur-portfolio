// ===== TYPES FOR MY PORTFOLIO CONTENT =====
// A "type" describes the shape of an object: which keys it has and what kind of value each key holds.
// src/data/portfolio.ts must follow these shapes, and components read them.

// ----- Personal info -----
export type Personal = {
  name: string;
  title: string;
  intro: string;
  location: string;
  availability: string; // "" = hide the green badge
  email: string;
  phone: string; // "" = hide the phone
  photo: string; // path in public/, e.g. "/profile.png"
  resumeUrl: string; // "" = hide the Resume buttons
  siteUrl: string; // my live link, used for SEO
};

// ----- Quick facts in the Hero -----
// A "union" of strings: icon can ONLY be one of these 3 words
export type HighlightIcon = "education" | "code" | "location";

export type Highlight = {
  icon: HighlightIcon;
  text: string;
};

// ----- Social links -----
export type Social = {
  name: string;
  url: string; // "" = hidden
};

// ----- About me -----
export type Fact = {
  label: string;
  value: string;
  detail?: string; // "?" = optional: this key may be missing
  href?: string; // makes the value a link
};

export type About = {
  paragraphs: string[]; // string[] = an array of strings
  motto: string;
  learning: string[];
  facts: Fact[];
};

// ----- Skills -----
export type SkillGroup = {
  category: string;
  items: string[];
};

// ----- Projects -----
export type Project = {
  title: string;
  description: string;
  image: string; // "" = no screenshot
  tech: string[];
  liveUrl: string; // "" = hide the Live Demo button
  githubUrl: string; // "" = hide the Code button
  featured: boolean;
};

export type ProjectStatus = "In progress" | "Planned";

export type UpcomingProject = {
  title: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
};
