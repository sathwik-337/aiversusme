import { db } from "./index";
import { jobs } from "./schema";
import type { jobs as jobsTable } from "./schema";

const initialJobs = [
  {
    title: "Subway and Streetcar Operators",
    slug: "subway-streetcar-operators",
    risk_score: 77,
    calculated_risk: 81,
    polling_risk: 74,
    votes_count: 80,
    salary: "$84,830",
    hourly_salary: "$40.78",
    growth_rate: "3.4%",
    growth_year: "2034",
    demand_level: "Medium",
    volume: 9200,
    job_score: "3.8/10",
    description: "Operate subways or streetcars in a city environment. This role involves maintaining safety protocols and adhering to schedules.",
  },
  {
    title: "Software Developer",
    slug: "software-developer",
    risk_score: 15,
    salary: "₹6,00,000 - ₹30,00,000",
    growth_rate: "High",
    demand_level: "High",
    description: "Responsible for designing, coding, and testing software applications. While AI can assist in coding, the need for complex problem-solving and architecture remains high.",
  },
  {
    title: "Accountant",
    slug: "accountant",
    risk_score: 75,
    salary: "₹3,00,000 - ₹12,00,000",
    growth_rate: "Low",
    demand_level: "Medium",
    description: "Involves managing financial records and audits. Many routine accounting tasks are being automated by AI and specialized software.",
  },
  {
    title: "BPO Executive",
    slug: "bpo-executive",
    risk_score: 90,
    salary: "₹2,00,000 - ₹6,00,000",
    growth_rate: "Declining",
    demand_level: "Low",
    description: "Handles customer queries and data entry. High risk of automation as AI chatbots and automated systems become more sophisticated.",
  },
  {
    title: "Data Analyst",
    slug: "data-analyst",
    risk_score: 30,
    salary: "₹5,00,000 - ₹18,00,000",
    growth_rate: "High",
    demand_level: "High",
    description: "Interprets data to provide business insights. AI tools enhance data processing, but human interpretation and strategy are still crucial.",
  },
  {
    title: "Graphic Designer",
    slug: "graphic-designer",
    risk_score: 45,
    salary: "₹3,00,000 - ₹10,00,000",
    growth_rate: "Medium",
    demand_level: "Medium",
    description: "Creates visual concepts to communicate ideas. Generative AI is changing the landscape, but creative vision and branding require human input.",
  },
  {
    title: "Digital Marketer",
    slug: "digital-marketer",
    risk_score: 25,
    salary: "₹4,00,000 - ₹15,00,000",
    growth_rate: "High",
    demand_level: "High",
    description: "Develops and manages online marketing campaigns. AI helps in optimization, but creativity and understanding human behavior are key.",
  },
  {
    title: "Human Resources Manager",
    slug: "human-resources-manager",
    risk_score: 40,
    salary: "₹7,00,000 - ₹25,00,000",
    growth_rate: "Medium",
    demand_level: "Medium",
    description: "Manages employee relations, recruitment, and benefits. While administrative tasks can be automated, strategic talent management and interpersonal skills remain crucial.",
  },
  {
    title: "Mechanical Engineer",
    slug: "mechanical-engineer",
    risk_score: 20,
    salary: "₹5,00,000 - ₹20,00,000",
    growth_rate: "Medium",
    demand_level: "High",
    description: "Designs and develops mechanical systems. AI can assist in simulations and design, but physical implementation and problem-solving require hands-on expertise.",
  },
  {
    title: "Doctor",
    slug: "doctor",
    risk_score: 5,
    salary: "₹10,00,000 - ₹50,00,000+",
    growth_rate: "High",
    demand_level: "High",
    description: "Diagnoses and treats illnesses. AI can aid in diagnostics, but patient care, empathy, and complex decision-making are irreplaceable human skills.",
  },
  {
    title: "Lawyer",
    slug: "lawyer",
    risk_score: 10,
    salary: "₹6,00,000 - ₹40,00,000+",
    growth_rate: "Medium",
    demand_level: "High",
    description: "Represents clients in legal matters. AI can automate legal research, but argumentation, negotiation, and client relationships require human expertise.",
  },
];

const trendingCanonical: JobInsert[] = [
  {
    title: "Web Developer",
    slug: "web-developer",
    risk_score: 35,
    salary: rupeeRange(4, 18),
    growth_rate: "High",
    demand_level: "High",
    description: "Builds and maintains websites and web applications. Automation assists with scaffolding, but full-stack problem solving and integration remain human-led.",
  },
  {
    title: "Electrical Engineer",
    slug: "electrical-engineer",
    risk_score: 22,
    salary: rupeeRange(6, 24),
    growth_rate: "Medium",
    demand_level: "High",
    description: "Designs and develops electrical systems. AI aids in simulation and design, but safety, compliance, and implementation demand human oversight.",
  },
  {
    title: "Actor",
    slug: "actor",
    risk_score: 40,
    salary: rupeeRange(3, 20),
    growth_rate: "Medium",
    demand_level: "Medium",
    description: "Performs in films, theatre, or digital media. Generative media expands options, but live performance and unique expression remain valuable.",
  },
  {
    title: "Electrician",
    slug: "electrician",
    risk_score: 28,
    salary: rupeeRange(3, 14),
    growth_rate: "Medium",
    demand_level: "High",
    description: "Installs and repairs electrical systems onsite. Automation cannot replace hands-on diagnostics and compliance with local codes.",
  },
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rupeeRange(minLakh: number, maxLakh: number) {
  const fmt = (v: number) => `₹${v.toLocaleString("en-IN")}`;
  const min = minLakh * 100000;
  const max = maxLakh * 100000;
  return `${fmt(min)} - ${fmt(max)}`;
}

type JobInsert = typeof jobsTable.$inferInsert;

function generateJobs(count: number): JobInsert[] {
  const roles = [
    "Software Developer","Data Scientist","AI Engineer","ML Engineer","Web Developer","Mobile App Developer","DevOps Engineer","Cloud Architect","Network Engineer","Database Administrator",
    "UI/UX Designer","Graphic Designer","Product Manager","Project Manager","Business Analyst","QA Engineer","Automation Tester","Cybersecurity Analyst","IT Support Specialist","Site Reliability Engineer",
    "Mechanical Engineer","Electrical Engineer","Civil Engineer","Chemical Engineer","Aerospace Engineer","Biomedical Engineer","Industrial Engineer","Robotics Engineer","Materials Engineer",
    "Doctor","Nurse","Pharmacist","Dentist","Physiotherapist","Radiologist","Lab Technician","Nutritionist","Psychologist","Veterinarian",
    "Accountant","Financial Analyst","Investment Banker","Auditor","Tax Consultant","Economist","Risk Analyst","Compliance Officer","Insurance Underwriter","Actuary",
    "Teacher","Professor","Lecturer","School Counselor","Principal","Curriculum Developer","Education Coordinator","Trainer","Instructional Designer","Librarian",
    "Lawyer","Paralegal","Legal Researcher","Judge Assistant","Compliance Counsel","Corporate Counsel","Patent Attorney","Mediator","Notary","Legal Advisor",
    "Marketing Manager","Digital Marketer","SEO Specialist","Content Strategist","Copywriter","Social Media Manager","Brand Manager","PR Specialist","Market Research Analyst","Ad Operations Specialist",
    "Sales Executive","Account Executive","Business Development Manager","Inside Sales","Field Sales","Sales Operations Analyst","Customer Success Manager","CRM Specialist","Retail Manager","E-commerce Manager",
    "HR Manager","Recruiter","Talent Acquisition Specialist","HR Generalist","Compensation Analyst","Benefits Coordinator","Training Manager","Organizational Development Specialist","Payroll Specialist","Employee Relations Manager",
    "Logistics Manager","Supply Chain Analyst","Procurement Specialist","Operations Manager","Inventory Analyst","Warehouse Supervisor","Quality Assurance Specialist","Production Planner","Manufacturing Supervisor","Import Export Coordinator",
    "Journalist","Editor","Reporter","Content Creator","Video Editor","Photographer","Animator","Sound Engineer","Game Designer","Game Developer",
    "Chef","Restaurant Manager","Hotel Manager","Travel Consultant","Event Planner","Tour Guide","Flight Attendant","Pilot","Ground Staff","Reservation Agent"
  ];
  const seniorities = ["Junior","Associate","Senior","Lead","Principal","Assistant"];
  const growths = ["High","Medium","Low","Declining"];
  const demandLevels = ["High","Medium","Low"];
  const descriptions = [
    "Role focused on delivering outcomes using technology and collaboration.",
    "Position requiring analytical thinking and domain expertise.",
    "Responsibilities include planning, execution, and stakeholder communication.",
    "Emphasis on quality, efficiency, and continuous improvement."
  ];
  const out: JobInsert[] = [];
  let i = 0;
  while (out.length < count) {
    const role = roles[i % roles.length];
    const level = seniorities[rand(0, seniorities.length - 1)];
    const title = `${level} ${role}`;
    const slug = slugify(title);
    const risk = rand(0, 100);
    const minL = rand(2, 15);
    const maxL = minL + rand(3, 20);
    const salary = rupeeRange(minL, maxL);
    const growth_rate = growths[rand(0, growths.length - 1)];
    const demand_level = demandLevels[rand(0, demandLevels.length - 1)];
    const description = descriptions[rand(0, descriptions.length - 1)];
    out.push({
      title,
      slug,
      risk_score: risk,
      salary,
      growth_rate,
      demand_level,
      description
    });
    i++;
  }
  return out;
}

async function seed() {
  console.log("Seeding jobs...");
  for (const job of initialJobs) {
    await db.insert(jobs).values(job).onConflictDoNothing();
  }
  for (const job of trendingCanonical) {
    await db.insert(jobs).values(job).onConflictDoNothing();
  }
  const generated = generateJobs(1200);
  const batchSize = 200;
  for (let i = 0; i < generated.length; i += batchSize) {
    const chunk = generated.slice(i, i + batchSize);
    await Promise.all(chunk.map(j => db.insert(jobs).values(j).onConflictDoNothing()));
    console.log(`Inserted ${Math.min(i + batchSize, generated.length)} / ${generated.length}`);
  }
  console.log("Seeding completed!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
