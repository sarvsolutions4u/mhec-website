/**
 * MHEC — programme content.
 * Theme: secure a recognised qualification AND build the skills to use it.
 * The four main sections appear on the site in the order listed in `sections`.
 * Edit text here; pages, forms, menus, the planner, sitemap and structured data all read from it.
 */

import type { PhotoKey } from "./media";
import catalogue from "./data/online-programs.json";
import othmData from "./data/othm-diplomas.json";

export type Delivery = "online" | "partner" | "blended" | "onsite" | "ukdiploma";

export const deliveryLabels: Record<Delivery, { label: string; detail: string }> = {
  online: {
    label: "Online through MHEC",
    detail: "Live online classes taught and supported by MHEC.",
  },
  partner: {
    label: "With partner university",
    detail: "Taught and awarded by the university or college; MHEC handles admission and student support.",
  },
  blended: {
    label: "Online + exam centre",
    detail: "Online classes through MHEC, with exams at an approved centre.",
  },
  onsite: {
    label: "At your workplace",
    detail: "Delivered by MHEC trainers at your premises in Oman.",
  },
  ukdiploma: {
    label: "UK diploma",
    detail: "Awarded by an Ofqual-regulated UK awarding body such as OTHM or Qualifi; studied online with MHEC support.",
  },
};

export type SectionKey = "admissions" | "pathways" | "corporate" | "online";

export const sections: {
  key: SectionKey;
  href: string;
  title: string;
  short: string;
  summary: string;
  image: PhotoKey;
}[] = [
  {
    key: "admissions",
    href: "/university-admissions",
    title: "University Admission Services",
    short: "University Admissions",
    summary:
      "Choose the right university and programme, apply with the right documents and get admitted — in Oman, the GCC or abroad.",
    image: "graduates",
  },
  {
    key: "pathways",
    href: "/pathway-programs",
    title: "Pathway Programmes",
    short: "Pathway Programmes",
    summary:
      "Finish school, meet entry requirements or move up a level: school completion, GED, foundation, diploma, top-up and pre-master's routes.",
    image: "library",
  },
  {
    key: "corporate",
    href: "/corporate-training",
    title: "Corporate Training",
    short: "Corporate Training",
    summary:
      "Practical skills training for teams in Oman — at your premises or live online — built around the gaps you tell us about.",
    image: "workshop",
  },
  {
    key: "online",
    href: "/online-programs",
    title: "Online Programmes",
    short: "Online Programmes",
    summary:
      "Professional qualifications and job-ready skill programmes taught live online through MHEC, from anywhere in Oman or the GCC.",
    image: "online",
  },
];

/* ------------------------------------------------------------------ */
/* 1. University admissions                                            */
/* ------------------------------------------------------------------ */

// Add the universities and colleges you currently work with. The section is hidden while the list is empty.
export const partnerUniversities: { name: string; country: string; note: string }[] = [];

export const admissionLevels = [
  {
    title: "Undergraduate degrees",
    examples: "Business, IT, engineering, health sciences, arts and more",
    forWho: "You have completed Grade 12 or an equivalent qualification.",
  },
  {
    title: "Postgraduate degrees",
    examples: "MBA, master's and postgraduate diplomas",
    forWho: "You hold a bachelor's degree and want to specialise or progress at work.",
  },
  {
    title: "Diplomas and foundation",
    examples: "Foundation year, diploma, advanced diploma",
    forWho: "You want a step into a degree or a shorter, career-focused qualification.",
  },
];

export const admissionRoutes = [
  {
    title: "Study in Oman and the GCC",
    delivery: "partner" as Delivery,
    body: "Stay close to home and family. We compare universities and colleges in Oman and across the GCC on programme fit, entry requirements, fees and intake dates, then manage your application.",
  },
  {
    title: "Study abroad",
    delivery: "partner" as Delivery,
    body: "Planning to study in the UK, Malaysia, India or elsewhere? We shortlist universities that fit your grades and budget, prepare your application and guide you through the offer and visa paperwork.",
  },
];

export const studyDestinations = [
  { name: "Oman", note: "Study close to home with programmes taught in English and Arabic." },
  { name: "UAE and GCC", note: "Regional universities and branch campuses within easy reach of Muscat." },
  { name: "United Kingdom", note: "Shorter degree durations and globally recognised qualifications." },
  { name: "Malaysia", note: "International campuses with competitive tuition and living costs." },
  { name: "India", note: "A wide choice of universities and programmes across every field." },
  { name: "Other countries", note: "Ask us about Europe, Australia, Canada and beyond." },
];

export const admissionSteps = [
  {
    title: "Free profile review",
    body: "Share your marks, work experience and goals. An advisor tells you which levels and universities you qualify for.",
  },
  {
    title: "Shortlist and compare",
    body: "We compare universities on recognition, fees, duration, location and entry requirements, so you choose with clear facts.",
  },
  {
    title: "Application and documents",
    body: "We prepare and check your application, transcripts, certificates and statement, and submit them to the university.",
  },
  {
    title: "Offer, visa and enrolment",
    body: "Once you are accepted, we help you accept the offer, complete visa steps where needed and enrol.",
  },
  {
    title: "Skills before you start",
    body: "Add an English, Excel or AI skills course before your first semester, so you arrive ready to perform.",
  },
];

export const admissionDocuments = [
  "Academic certificates and mark sheets / transcripts",
  "Passport copy, and Omani ID or resident card",
  "Recent passport-size photographs",
  "English test score (IELTS or PTE) where the programme requires it",
  "CV and statement of purpose for postgraduate programmes",
  "Recommendation letters for some programmes",
  "Attested or translated certificates where the university asks for them",
];

/* ------------------------------------------------------------------ */
/* 2. Pathway programmes (ordered as a progression)                    */
/* ------------------------------------------------------------------ */

export type Pathway = {
  slug: string;
  title: string;
  stage: string;
  delivery: Delivery;
  forWho: string;
  body: string;
  leadsTo: string;
  overview: string[];
  eligibility: string[];
  structure: { title: string; body: string }[];
  duration: string;
  outcomes: string[];
  skills: string[]; // course slugs recommended alongside
};

export const pathways: Pathway[] = [
  {
    slug: "school-completion",
    title: "Grade 10 and Grade 12 completion",
    stage: "Finish school",
    delivery: "blended",
    forWho: "Adults and young people who left school early or need a recognised secondary certificate for work or university.",
    body: "Complete your secondary education through open schooling. MHEC teaches the subjects online and prepares you for board exams, which you sit at an approved exam centre.",
    leadsTo: "Diploma, foundation or undergraduate admission",
    overview: [
      "A secondary school certificate is the minimum requirement for most diplomas, degrees and many jobs. If you did not complete Grade 10 or Grade 12, open schooling lets you finish without returning to a regular day school.",
      "You choose your subjects, attend live online classes with MHEC tutors and sit the board examinations at an approved centre. Many of our students study while working full time.",
    ],
    eligibility: [
      "Previous school records (the last grade you completed)",
      "Passport and ID copies",
      "Minimum age as set by the exam board",
    ],
    structure: [
      { title: "Eligibility check", body: "We review your previous school records and confirm the level you can register for." },
      { title: "Subject selection", body: "Choose a subject combination that suits your goals, including subjects needed for a later diploma or degree." },
      { title: "Online classes", body: "Live online lessons with MHEC tutors, notes and practice papers for every subject." },
      { title: "Exam registration", body: "We help you register for the board exams and prepare with mock tests." },
      { title: "Board exams and results", body: "Sit your exams at an approved centre and receive your certificate when results are published." },
    ],
    duration: "Depends on the exam board's schedule — your advisor confirms the next exam cycle.",
    outcomes: [
      "A recognised Grade 10 or Grade 12 certificate",
      "Eligibility for diplomas, foundation programmes and degrees",
      "Better prospects for promotion and new jobs",
    ],
    skills: ["business-communication", "excel-with-ai", "graphic-design"],
  },
  {
    slug: "ged",
    title: "GED preparation",
    stage: "Finish school",
    delivery: "online",
    forWho: "Learners who want a US high-school equivalency credential.",
    body: "Structured online preparation for all four GED subjects with practice tests. You take the official test at an authorised GED test centre.",
    leadsTo: "Undergraduate admission and employment",
    overview: [
      "The GED is a high-school equivalency credential made up of four subject tests: Mathematical Reasoning, Reasoning Through Language Arts, Science and Social Studies.",
      "MHEC prepares you online for each subject with live classes, practice questions and full mock tests, so you go into the official test confident.",
    ],
    eligibility: ["Age and identification requirements set by the GED testing service", "Basic English reading and writing"],
    structure: [
      { title: "Diagnostic test", body: "Find out where you stand in each of the four subjects." },
      { title: "Subject classes", body: "Live online classes focused on the topics you need most." },
      { title: "Practice tests", body: "Timed practice for every subject with feedback." },
      { title: "Test booking", body: "We guide you through booking the official test at an authorised centre." },
    ],
    duration: "Usually two to four months of preparation, depending on your starting level.",
    outcomes: ["Readiness for all four GED subject tests", "A route into undergraduate study", "Stronger maths and English for work"],
    skills: ["business-communication", "excel-mastery", "digital-marketing"],
  },
  {
    slug: "english-for-study",
    title: "English for university (IELTS / PTE)",
    stage: "Get ready",
    delivery: "online",
    forWho: "Students who need an English score for admission.",
    body: "Live online coaching for IELTS Academic or PTE, with mock tests and feedback on speaking and writing.",
    leadsTo: "Meets English entry requirements",
    overview: [
      "Most universities that teach in English ask for an IELTS or PTE score. Reaching the required score is often the last step between you and an offer.",
      "We assess your current level, set a target based on your chosen universities and coach you through every part of the test online.",
    ],
    eligibility: ["Open to all levels", "A level assessment at the start"],
    structure: [
      { title: "Level assessment", body: "Find your current band or score and the gap to your target." },
      { title: "Skill coaching", body: "Listening, reading, writing and speaking strategies in live classes." },
      { title: "Marked practice", body: "Writing tasks and speaking practice with detailed feedback." },
      { title: "Mock tests", body: "Full tests under exam timing before you book the real one." },
    ],
    duration: "One to two months, depending on your target score.",
    outcomes: ["A test strategy for your target score", "Confidence in academic English", "Meeting university English requirements"],
    skills: ["business-communication", "python-with-ai", "excel-with-ai"],
  },
  {
    slug: "foundation",
    title: "Foundation year",
    stage: "Bridge the gap",
    delivery: "partner",
    forWho: "Grade 12 students whose qualifications do not yet meet direct degree entry.",
    body: "A preparatory year run by the partner university that builds subject knowledge and study skills, then progresses into year one of a bachelor's degree.",
    leadsTo: "Year one of a bachelor's degree",
    overview: [
      "A foundation year bridges the gap between school and university. It builds subject knowledge, academic English and study skills in the area you plan to study.",
      "It is taught by the partner university or college. MHEC finds the right programme, manages your application and supports you until you progress to your degree.",
    ],
    eligibility: ["Grade 12 or equivalent", "English level as required by the university"],
    structure: [
      { title: "Programme choice", body: "Match the foundation stream to the degree you want — business, IT, engineering or science." },
      { title: "Application", body: "We prepare and submit your application and documents." },
      { title: "Foundation study", body: "Taught by the university, typically over one academic year." },
      { title: "Progression", body: "Move into year one of a bachelor's degree on meeting the required grades." },
    ],
    duration: "Typically one academic year.",
    outcomes: ["Entry to year one of a bachelor's degree", "Academic English and study skills", "Subject preparation for your degree"],
    skills: ["ielts", "excel-with-ai", "python-with-ai"],
  },
  {
    slug: "diploma",
    title: "Diploma and advanced diploma",
    stage: "Bridge the gap",
    delivery: "partner",
    forWho: "Learners who want a job-ready qualification first, with the option to continue to a degree.",
    body: "Career-focused diplomas from partner institutions, with credit that can count towards a degree later.",
    leadsTo: "Degree top-up or lateral entry",
    overview: [
      "Diplomas are shorter, practical qualifications that prepare you for work in fields such as business, IT, hospitality and health administration.",
      "Many diplomas carry credit towards a degree, so you can start working sooner and complete a bachelor's degree later through a top-up route.",
    ],
    eligibility: ["Grade 12 or equivalent (Grade 10 for some programmes)", "English level as required by the institution"],
    structure: [
      { title: "Choose a field", body: "Match a diploma to the job or degree you are aiming for." },
      { title: "Application", body: "We manage your application and documents." },
      { title: "Diploma study", body: "Taught by the partner institution." },
      { title: "Next step", body: "Start work, or continue to a degree through top-up or lateral entry." },
    ],
    duration: "Usually one to two years, depending on the level.",
    outcomes: ["A career-focused qualification", "Credit that can count towards a degree", "Skills employers ask for"],
    skills: ["excel-mastery", "digital-marketing", "business-communication"],
  },
  {
    slug: "uk-diplomas",
    title: "UK diplomas (Level 3 to Level 7)",
    stage: "Bridge the gap",
    delivery: "ukdiploma",
    forWho: "School leavers, diploma seekers and working managers who want a UK-regulated qualification with a route to a UK degree or MBA.",
    body: "Ofqual-regulated UK diplomas from awarding bodies such as OTHM and Qualifi, in business, IT, leadership and more. Levels 3 to 5 lead into UK bachelor's degrees; Level 7 leads to an MBA top-up.",
    leadsTo: "UK bachelor's top-up or MBA top-up",
    overview: [
      "UK diplomas are awarded by UK awarding organisations such as OTHM and Qualifi, both regulated by Ofqual, the qualifications regulator for England. The diplomas are built in credits, so each level can count towards the next stage of a UK degree.",
      "A Level 3 diploma can lead to the first year of a bachelor's degree, Level 4 to the second year, and a Level 5 extended diploma to a final-year top-up. The Level 7 diploma is at master's level and leads to an MBA top-up with advanced standing. Each university assesses applicants individually.",
    ],
    eligibility: [
      "Level 3: from age 16",
      "Level 4 and 5: typically 18+, with a relevant Level 3 diploma, two A-levels or equivalent",
      "Level 7: 21+, with a degree, a Level 6 diploma or management experience",
      "Evidence of English language competency where required",
    ],
    structure: [
      { title: "Choose your level", body: "We match the diploma level to your current qualification and the degree you want." },
      { title: "Register", body: "Complete enrolment and registration with the awarding body for your chosen diploma." },
      { title: "Study the units", body: "Work through the units online with MHEC tutor support and submit assignments." },
      { title: "Achieve your diploma", body: "Receive your UK diploma once all units are passed." },
      { title: "Top up to a degree", body: "Apply for a UK bachelor's top-up or MBA top-up — we help with the university application." },
    ],
    duration: "Each 120-credit level is 1,200 hours of total qualification time; your study plan sets the pace.",
    outcomes: [
      "An Ofqual-regulated UK qualification",
      "Credit towards a UK bachelor's degree or MBA",
      "Business, IT or leadership skills you can use at work",
    ],
    skills: ["excel-mastery", "business-communication", "power-bi"],
  },
  {
    slug: "top-up",
    title: "Degree top-up and lateral entry",
    stage: "Complete a degree",
    delivery: "partner",
    forWho: "Diploma holders and working professionals with prior study.",
    body: "Use your diploma or earlier credits to join a degree in a later year and finish it in less time.",
    leadsTo: "Bachelor's degree",
    overview: [
      "If you already hold a diploma or completed part of a degree, you may not need to start again from year one. Top-up and lateral entry routes recognise your earlier study.",
      "We check which universities accept your qualification and in which year, so you finish your bachelor's degree in the shortest time.",
    ],
    eligibility: ["A recognised diploma, advanced diploma or earlier university credits", "Transcripts of previous study"],
    structure: [
      { title: "Credit review", body: "We review your transcripts and identify the year you can enter." },
      { title: "University match", body: "Compare universities that accept your credits." },
      { title: "Application", body: "We prepare and submit your application." },
      { title: "Final year(s)", body: "Complete the remaining part of your degree with the university." },
    ],
    duration: "Often one to two years, depending on your credits.",
    outcomes: ["A full bachelor's degree", "Less time and cost than starting again", "Eligibility for master's study"],
    skills: ["power-bi", "project-management", "excel-mastery"],
  },
  {
    slug: "pre-masters",
    title: "Pre-master's and bridging",
    stage: "Move up a level",
    delivery: "partner",
    forWho: "Graduates changing field or whose degree needs bridging for master's entry.",
    body: "Short preparatory study that brings you to the entry level for a postgraduate programme.",
    leadsTo: "Master's degree",
    overview: [
      "Pre-master's and bridging programmes prepare graduates for a master's degree when their first degree is in a different field or does not meet entry requirements.",
      "They build subject knowledge, research skills and academic English, and many guarantee progression on meeting the required grades.",
    ],
    eligibility: ["A bachelor's degree", "English level as required by the university"],
    structure: [
      { title: "Goal check", body: "Confirm the master's programme you want and the gap to entry." },
      { title: "Programme match", body: "Find a pre-master's or bridging route that leads to it." },
      { title: "Application", body: "We prepare and submit your application." },
      { title: "Progression", body: "Move into your master's on completing the bridging study." },
    ],
    duration: "Usually one or two semesters.",
    outcomes: ["Entry to a master's programme", "Research and academic writing skills", "Subject knowledge for a new field"],
    skills: ["ielts", "power-bi", "project-management"],
  },
];

/* ------------------------------------------------------------------ */
/* 3. Corporate training                                               */
/* ------------------------------------------------------------------ */

export const corporateFormats = [
  {
    title: "At your premises",
    delivery: "onsite" as Delivery,
    body: "Our trainers come to your office anywhere in Oman. Best for teams working on the same systems.",
  },
  {
    title: "Live online",
    delivery: "online" as Delivery,
    body: "Interactive sessions for teams spread across branches or countries, with recordings for revision.",
  },
  {
    title: "Blended",
    delivery: "blended" as Delivery,
    body: "Online learning between workshops at your premises, so staff learn without long days away from work.",
  },
];

export const corporateAreas = [
  { title: "Excel, Power BI and data reporting", body: "From clean spreadsheets to management dashboards." },
  { title: "AI tools for everyday work", body: "Safe, practical use of AI assistants for writing, analysis and admin." },
  { title: "Business English and communication", body: "Emails, meetings, presentations and customer conversations." },
  { title: "Digital marketing", body: "Social media, search and paid campaigns for in-house teams." },
  { title: "Leadership and soft skills", body: "Supervision, time management, negotiation and teamwork." },
  { title: "Project management", body: "Planning, scheduling and reporting using recognised methods." },
  { title: "Customer service excellence", body: "Front-line service standards and complaint handling." },
  { title: "Finance for non-finance staff", body: "Budgets, costs and reading financial reports." },
];

export const corporateSectors = [
  "Banking and finance",
  "Energy and industry",
  "Retail and trading",
  "Hospitality and tourism",
  "Healthcare administration",
  "Government and semi-government",
  "Logistics and transport",
  "SMEs and family businesses",
];

export const corporateSteps = [
  { title: "Tell us the skill gap", body: "Share the roles, the number of staff and what they need to do better." },
  { title: "Receive a proposal", body: "A syllabus, schedule and price — usually within two working days." },
  { title: "Training delivered", body: "On-site, online or blended, with hands-on exercises from your own work." },
  { title: "Assessment and report", body: "Participant assessments, attendance, certificates and a summary for HR." },
];

/* ------------------------------------------------------------------ */
/* 4. Online programmes — delivered online through MHEC                */
/* The full list lives in lib/data/online-programs.json (74 programmes) */
/* ------------------------------------------------------------------ */


export type Course = {
  slug: string;
  title: string;
  category: CourseCategory;
  kind: "Professional qualification" | "Skill programme" | "Exam preparation" | "UK diploma";
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  summary: string;
  duration: string;
  audience: string[];
  outcomes: string[];
  modules: string[];
  certificate: string;
  faqs: { q: string; a: string }[];
  // UK diplomas (OTHM) only
  qualificationNumber?: string;
  credits?: string;
  tqt?: string;
  entry?: string[];
  progression?: string[];
};

export const courseCategories = [
  "AI",
  "Accounting & Finance",
  "Business & Data Analytics",
  "Digital Marketing & Design",
  "Exam Preparation",
  "Languages & Communication",
  "Kids Programme",
  "Soft Skills & Leadership",
  "Management",
  "BIM & CAD",
] as const;
export type CourseCategory = (typeof courseCategories)[number];

export const courses = catalogue.courses as Course[];

/** Example UK diplomas (OTHM) — shown on the Pathway Programmes → UK diplomas page (lib/data/othm-diplomas.json). Add Qualifi diplomas to the same file. */
export type OthmDiploma = {
  slug: string;
  title: string;
  qualificationNumber: string;
  credits: string;
  tqt: string;
  level: string;
  summary: string;
  entry: string[];
  modules: string[];
  progression: string[];
  certificate: string;
};
export const othmDiplomas = othmData.diplomas as OthmDiploma[];

export const categorySlug = (c: string) =>
  c.toLowerCase().replace(/&/g, "and").replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const categoryIntro: Record<CourseCategory, string> = {
  AI: "Practical AI skills for work: Excel with Copilot and ChatGPT, Python with AI and generative AI tools.",
  "Accounting & Finance": "Professional accounting qualifications and practical finance software skills, from ACCA and CMA to Tally and QuickBooks.",
  "Business & Data Analytics": "Excel, Power BI, SQL, Python and Microsoft Office — the data and productivity skills employers ask for most.",
  "Digital Marketing & Design": "Digital marketing, SEO, Google Ads, social media, email and graphic design, taught with live projects.",
  "Exam Preparation": "English tests, university entrance and school exam revision, with mock tests and personal feedback.",
  "Languages & Communication": "Spoken English, business communication, email writing and Arabic for work and daily life.",
  "Kids Programme": "Coding, AI, robotics and personality development modules for children aged 8 to 17.",
  "Soft Skills & Leadership": "Public speaking, negotiation, time management, emotional intelligence and more.",
  Management: "Business management, HR, project management, marketing and supply chain skills for managers.",
  "BIM & CAD": "BIM, Revit, AutoCAD, Fusion 360, interior design and Primavera P6 for engineering and design professionals.",
};

/** Shown in counters. Real totals are higher; these are the rounded figures used in marketing. */
export const headlineCounts = {
  onlineProgrammes: { value: 50, suffix: "+" },
  pathwayRoutes: { value: 5, suffix: "+" },
};

export const onlineStudyOptions = [
  {
    title: "Live online classes",
    body: "Scheduled classes with a trainer. Ask questions and work through exercises in real time.",
  },
  {
    title: "Recordings and materials",
    body: "Every class is recorded. Notes, question banks and mock tests stay available throughout your course.",
  },
  {
    title: "Personal support",
    body: "An advisor who checks your progress, plus trainer support for questions between classes.",
  },
];

/* ------------------------------------------------------------------ */
/* Qualification + skills planner                                       */
/* ------------------------------------------------------------------ */

export const planner: {
  key: string;
  goal: string;
  qualification: { title: string; href: string; note: string };
  skills: { slug: string; why: string }[];
}[] = [
  {
    key: "school",
    goal: "Finish Grade 10 or 12",
    qualification: { title: "Grade 10 / 12 completion or GED", href: "/pathway-programs/school-completion", note: "A recognised secondary certificate opens diplomas, degrees and better jobs." },
    skills: [
      { slug: "business-communication", why: "Confident English for interviews and further study" },
      { slug: "excel-with-ai", why: "The office skill almost every employer asks for" },
      { slug: "graphic-design", why: "A creative, portfolio-building skill" },
    ],
  },
  {
    key: "bachelor",
    goal: "Start a bachelor's degree",
    qualification: { title: "University admission or foundation year", href: "/university-admissions", note: "We match you to universities that fit your grades, budget and goals." },
    skills: [
      { slug: "ielts", why: "Meet English entry requirements" },
      { slug: "python-with-ai", why: "A head start in tech and data" },
      { slug: "digital-marketing", why: "Practical experience to add to your CV" },
    ],
  },
  {
    key: "complete",
    goal: "Complete or upgrade a degree",
    qualification: { title: "Degree top-up or UK Level 5 diploma", href: "/pathway-programs/uk-diplomas", note: "Use your diploma or earlier credits to finish a UK bachelor's degree faster." },
    skills: [
      { slug: "power-bi", why: "Reporting skills managers value" },
      { slug: "project-management", why: "Lead projects at work with confidence" },
      { slug: "excel-mastery", why: "Faster, more reliable everyday work" },
    ],
  },
  {
    key: "master",
    goal: "Move up to a master's",
    qualification: { title: "UK Level 7 diploma or postgraduate admission", href: "/pathway-programs/uk-diplomas#othm-level-7-diploma-strategic-management-leadership", note: "A master's-level UK diploma that leads to an MBA top-up." },
    skills: [
      { slug: "ielts", why: "Reach the postgraduate English score" },
      { slug: "power-bi", why: "Data skills for research and management" },
      { slug: "project-management", why: "Prepare for leadership roles" },
    ],
  },
  {
    key: "career",
    goal: "Grow in my career",
    qualification: { title: "ACCA or CMA professional qualification", href: "/online-programs/acca", note: "Globally recognised qualifications, coached live online." },
    skills: [
      { slug: "excel-with-ai", why: "Save hours on reporting every week" },
      { slug: "power-bi", why: "Dashboards that get noticed" },
      { slug: "business-communication", why: "Present and negotiate with confidence" },
    ],
  },
];

export const whyMhec = [
  { title: "25 years in Muscat", body: "A quarter of a century guiding students and organisations in Oman." },
  { title: "Qualification and skills together", body: "We pair every qualification with the practical skills that make it count at work." },
  { title: "Advice before you pay", body: "Clear facts on recognition, fees, duration and entry requirements before you commit." },
  { title: "Online-first learning", body: "Live online classes, recordings and materials, so you can study around work and family." },
  { title: "Support until you finish", body: "An advisor who follows your progress from enrolment to certificate." },
  { title: "One team, four services", body: "Admissions, pathways, corporate training and online programmes under one roof." },
];

/* ------------------------------------------------------------------ */
/* Form options                                                        */
/* ------------------------------------------------------------------ */

export const qualificationOptions = [
  "Grade 10 or below",
  "Grade 12 / secondary school",
  "Diploma",
  "Bachelor's degree",
  "Master's degree or higher",
  "Professional certification",
  "Other",
];

export function courseOptionsFor(section?: SectionKey) {
  const groups: { label: string; options: string[] }[] = [
    {
      label: "University Admissions",
      options: [...admissionLevels.map((l) => l.title), ...admissionRoutes.map((r) => r.title)],
    },
    { label: "Pathway Programmes", options: pathways.map((p) => p.title) },
    { label: "Corporate Training", options: ["Corporate training for my team", ...corporateAreas.map((a) => a.title)] },
    ...courseCategories.map((cat) => ({
      label: `Online — ${cat}`,
      options: courses.filter((c) => c.category === cat).map((c) => c.title),
    })),
  ];
  if (!section) return groups;
  if (section === "online") return [...groups.slice(3), ...groups.slice(0, 3)];
  const order: SectionKey[] = ["admissions", "pathways", "corporate"];
  const idx = order.indexOf(section);
  return [groups[idx], ...groups.filter((_, i) => i !== idx)];
}

/* ------------------------------------------------------------------ */
/* FAQs (also published as FAQPage structured data)                    */
/* ------------------------------------------------------------------ */

export const faqs: Record<SectionKey | "general", { q: string; a: string }[]> = {
  general: [
    {
      q: "What does MHEC offer?",
      a: "MHEC helps you secure a recognised qualification and build practical skills alongside it: university admission services, pathway programmes, corporate training and online professional and skill programmes.",
    },
    {
      q: "Where is MHEC located?",
      a: "Our centre is in the Al Rahma Building, Al Ghubra, Muscat. Most of our own programmes are taught live online, so you can study from anywhere in Oman or the GCC.",
    },
    {
      q: "Which programmes are online?",
      a: "Online programmes and skill programmes are taught live online through MHEC. University and some pathway programmes are taught by partner universities and colleges, with MHEC handling admission and support.",
    },
    {
      q: "How do I start?",
      a: "Send an inquiry or message us on WhatsApp. An advisor reviews your qualifications and recommends a qualification and skills plan, usually within one working day.",
    },
    {
      q: "Can I pay in instalments?",
      a: "Instalment options are available for many programmes. Your advisor will explain the payment plan for the programme you choose.",
    },
  ],
  admissions: [
    {
      q: "Will my degree be recognised in Oman?",
      a: "Recognition depends on the university and the programme. Before you apply, we explain how the qualification can be used for employment and further study in Oman, and any attestation or equivalency steps that may apply.",
    },
    {
      q: "Do you help with study abroad visas?",
      a: "Yes. Once you receive an offer, we guide you through the visa documents and steps for your destination country.",
    },
    {
      q: "What documents do I need to apply?",
      a: "Usually your academic certificates and transcripts, passport and ID copies, photographs, and an English score for many programmes. We give you a checklist for your chosen university.",
    },
  ],
  pathways: [
    {
      q: "I did not finish school. Can I still go to university?",
      a: "Yes. You can complete Grade 10 or 12 through open schooling, or prepare for the GED, and then apply for a diploma, foundation programme or degree.",
    },
    {
      q: "Where do I take the exams for school completion?",
      a: "Classes are online through MHEC. Board exams are taken at an approved exam centre on scheduled dates, and we help you register.",
    },
    {
      q: "Can my diploma count towards a degree?",
      a: "Often, yes. Through top-up or lateral entry routes, recognised diplomas can let you join a degree in a later year.",
    },
    {
      q: "What are UK diplomas?",
      a: "UK diplomas are Ofqual-regulated qualifications from UK awarding bodies such as OTHM and Qualifi. Level 3 to Level 7 diplomas carry credits that can lead into UK bachelor's degree years, a final-year top-up or an MBA top-up. Each university assesses applicants individually.",
    },
  ],
  corporate: [
    {
      q: "Can training be customised for our company?",
      a: "Every corporate programme is built around your roles, systems and goals. We use examples from your own work wherever possible.",
    },
    {
      q: "Do participants receive certificates?",
      a: "Yes. Participants who complete the training and assessment receive an MHEC certificate, and HR receives an attendance and assessment summary.",
    },
    {
      q: "How quickly can you start?",
      a: "We usually send a proposal within two working days and can begin as soon as the schedule is agreed.",
    },
  ],
  online: [
    {
      q: "Who teaches the online programmes?",
      a: "Online programmes are delivered online through MHEC by trainers experienced in the subjects they teach.",
    },
    {
      q: "What if I miss a live class?",
      a: "Every class is recorded and shared, and you can bring questions to the next session or message your trainer.",
    },
    {
      q: "Do I get a certificate?",
      a: "You receive an MHEC certificate of completion for our skill programmes. For professional qualifications and tests such as ACCA, CMA, IELTS and PTE, the qualification or score comes from the awarding body and we prepare you for their exams.",
    },
  ],
};
