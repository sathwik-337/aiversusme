import { db } from "./index";
import { jobs } from "./schema";
import type { jobs as jobsTable } from "./schema";

const baseJobs = [
  // --- Healthcare ---
  { title: "Doctor", category: "Healthcare", risk: 5, salary: "₹12,00,000 - ₹50,00,000", demand: "Very High", synonyms: "Physician, Medical Practitioner, MD" },
  { title: "Surgeon", category: "Healthcare", risk: 2, salary: "₹20,00,000 - ₹80,00,000", demand: "High", synonyms: "Specialist, Operative Doctor" },
  { title: "Nurse", category: "Healthcare", risk: 10, salary: "₹3,00,000 - ₹12,00,000", demand: "Very High", synonyms: "RN, Registered Nurse, Nursing Officer" },
  { title: "Dentist", category: "Healthcare", risk: 8, salary: "₹5,00,000 - ₹25,00,000", demand: "High", synonyms: "Orthodontist, Oral Surgeon" },
  { title: "Pharmacist", category: "Healthcare", risk: 40, salary: "₹3,00,000 - ₹10,00,000", demand: "Medium", synonyms: "Chemist, Druggist" },
  { title: "Physiotherapist", category: "Healthcare", risk: 5, salary: "₹4,00,000 - ₹15,00,000", demand: "High", synonyms: "PT, Physical Therapist" },
  { title: "Radiologist", category: "Healthcare", risk: 35, salary: "₹15,00,000 - ₹40,00,000", demand: "Medium", synonyms: "X-ray Specialist" },
  { title: "Psychiatrist", category: "Healthcare", risk: 3, salary: "₹10,00,000 - ₹35,00,000", demand: "High", synonyms: "Mental Health Doctor" },
  { title: "Veterinarian", category: "Healthcare", risk: 5, salary: "₹5,00,000 - ₹20,00,000", demand: "High", synonyms: "Vet, Animal Doctor" },
  { title: "Optometrist", category: "Healthcare", risk: 15, salary: "₹4,00,000 - ₹12,00,000", demand: "Medium", synonyms: "Eye Doctor" },
  { title: "Neurologist", category: "Healthcare", risk: 2, salary: "₹25,00,000 - ₹90,00,000", demand: "High", synonyms: "Brain Specialist, Neuro Physician" },
  { title: "Orthopedist", category: "Healthcare", risk: 3, salary: "₹20,00,000 - ₹80,00,000", demand: "High", synonyms: "Bone Specialist, Orthopedic Surgeon" },
  { title: "Cardiologist", category: "Healthcare", risk: 2, salary: "₹30,00,000 - ₹1,20,00,000", demand: "Very High", synonyms: "Heart Specialist" },
  { title: "Dermatologist", category: "Healthcare", risk: 10, salary: "₹15,00,000 - ₹60,00,000", demand: "High", synonyms: "Skin Specialist" },

  // --- Education ---
  { title: "Teacher", category: "Education", risk: 15, salary: "₹3,00,000 - ₹12,00,000", demand: "High", synonyms: "Educator, School Teacher" },
  { title: "Professor", category: "Education", risk: 5, salary: "₹8,00,000 - ₹30,00,000", demand: "Medium", synonyms: "Lecturer, Academic" },
  { title: "Principal", category: "Education", risk: 5, salary: "₹12,00,000 - ₹40,00,000", demand: "Medium", synonyms: "Headmaster, School Head" },
  { title: "Librarian", category: "Education", risk: 65, salary: "₹3,00,000 - ₹8,00,000", demand: "Low", synonyms: "Library Manager" },
  { title: "Special Education Teacher", category: "Education", risk: 2, salary: "₹4,00,000 - ₹15,00,000", demand: "High", synonyms: "Special Needs Educator" },

  // --- Tech & Engineering ---
  { title: "Software Developer", category: "Skilled", risk: 20, salary: "₹8,00,000 - ₹35,00,000", demand: "High", synonyms: "Programmer, Web Developer, Coder, Software Engineer" },
  { title: "Web Developer", category: "Skilled", risk: 25, salary: "₹5,00,000 - ₹20,00,000", demand: "High", synonyms: "Frontend Developer, Backend Developer, Full Stack Developer" },
  { title: "Data Scientist", category: "Skilled", risk: 15, salary: "₹10,00,000 - ₹45,00,000", demand: "Very High", synonyms: "AI Engineer, Machine Learning Engineer" },
  { title: "Cloud Architect", category: "Tech", risk: 10, salary: "₹15,00,000 - ₹50,00,000", demand: "High", synonyms: "Cloud Engineer, AWS Specialist" },
  { title: "Cybersecurity Analyst", category: "Tech", risk: 15, salary: "₹10,00,000 - ₹40,00,000", demand: "Very High", synonyms: "Security Specialist, Ethical Hacker" },
  { title: "DevOps Engineer", category: "Tech", risk: 15, salary: "₹12,00,000 - ₹45,00,000", demand: "High", synonyms: "SRE, Systems Engineer" },
  { title: "UI/UX Designer", category: "Tech", risk: 10, salary: "₹6,00,000 - ₹25,00,000", demand: "High", synonyms: "Product Designer, User Experience Designer" },
  { title: "Mobile App Developer", category: "Tech", risk: 20, salary: "₹8,00,000 - ₹30,00,000", demand: "High", synonyms: "iOS Developer, Android Developer" },
  { title: "Database Administrator", category: "Tech", risk: 45, salary: "₹8,00,000 - ₹25,00,000", demand: "Medium", synonyms: "DBA, Database Manager" },
  { title: "Network Engineer", category: "Tech", risk: 30, salary: "₹6,00,000 - ₹20,00,000", demand: "Medium", synonyms: "Network Architect" },

  // --- Legal & Finance ---
  { title: "Lawyer", category: "Skilled", risk: 10, salary: "₹6,00,000 - ₹50,00,000", demand: "Medium", synonyms: "Attorney, Legal Counsel, Solicitor" },
  { title: "Judge", category: "Legal", risk: 2, salary: "₹15,00,000 - ₹60,00,000", demand: "Low", synonyms: "Magistrate, Justice" },
  { title: "Accountant", category: "Skilled", risk: 60, salary: "₹3,00,000 - ₹15,00,000", demand: "High", synonyms: "Chartered Accountant, CA, Bookkeeper" },
  { title: "Financial Analyst", category: "Finance", risk: 35, salary: "₹8,00,000 - ₹25,00,000", demand: "High", synonyms: "Investment Analyst" },
  { title: "Investment Banker", category: "Finance", risk: 20, salary: "₹15,00,000 - ₹1,00,00,000", demand: "Medium", synonyms: "Equity Research Analyst" },
  { title: "Chartered Accountant", category: "Finance", risk: 25, salary: "₹8,00,000 - ₹40,00,000", demand: "Very High", synonyms: "CA, Auditor, Tax Consultant, ICAI Member" },
  { title: "Company Secretary", category: "Legal", risk: 30, salary: "₹6,00,000 - ₹30,00,000", demand: "High", synonyms: "CS, Corporate Secretary, Legal Compliance Officer, ICSI Member" },
  { title: "ACCA Professional", category: "Finance", risk: 20, salary: "₹6,00,000 - ₹35,00,000", demand: "High", synonyms: "ACCA, Association of Chartered Certified Accountants, Global Accountant" },
  { title: "Insurance Agent", category: "Finance", risk: 75, salary: "₹2,40,000 - ₹10,00,000", demand: "High", synonyms: "Insurance Broker" },
  { title: "Actuary", category: "Finance", risk: 25, salary: "₹12,00,000 - ₹40,00,000", demand: "High", synonyms: "Risk Analyst" },

  // --- Arts & Media ---
  { title: "Graphic Designer", category: "Skilled", risk: 30, salary: "₹3,00,000 - ₹12,00,000", demand: "Medium", synonyms: "UI/UX Designer, Visual Artist" },
  { title: "Actor", category: "Skilled", risk: 5, salary: "₹5,00,000 - ₹1,00,00,000", demand: "Competitive", synonyms: "Performer, Artist" },
  { title: "Writer", category: "Media", risk: 20, salary: "₹4,00,000 - ₹15,00,000", demand: "Medium", synonyms: "Author, Content Writer, Blogger" },
  { title: "Journalist", category: "Media", risk: 30, salary: "₹3,00,000 - ₹15,00,000", demand: "Medium", synonyms: "Reporter, News Anchor" },
  { title: "Photographer", category: "Media", risk: 15, salary: "₹3,00,000 - ₹20,00,000", demand: "Medium", synonyms: "Cameraman, Visual Creator" },
  { title: "Video Editor", category: "Media", risk: 25, salary: "₹4,00,000 - ₹18,00,000", demand: "High", synonyms: "Film Editor, Post-production Specialist" },
  { title: "Musician", category: "Media", risk: 10, salary: "₹3,00,000 - ₹50,00,000", demand: "Competitive", synonyms: "Composer, Singer, Instrumentalist" },

  // --- Construction & Building ---
  { title: "General Worker", category: "Worker", risk: 85, salary: "₹1,80,000 - ₹3,60,000", demand: "High", synonyms: "Laborer, Factory Hand, Utility Worker" },
  { title: "Construction Worker", category: "Worker", risk: 70, salary: "₹2,40,000 - ₹4,80,000", demand: "High", synonyms: "Builder, Mason, Site Worker" },
  { title: "Sanitation Worker", category: "Worker", risk: 65, salary: "₹1,50,000 - ₹3,00,000", demand: "High", synonyms: "Sweeper, Garbage Collector" },
  { title: "Mason", category: "Construction", risk: 15, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Bricklayer, Stone Worker" },
  { title: "Carpenter", category: "Construction", risk: 10, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Woodworker, Furniture Maker" },
  { title: "Plumber", category: "Skilled", risk: 10, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Pipefitter, Plumbing Technician" },
  { title: "Electrician", category: "Skilled", risk: 15, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Electrical Technician, Wireman" },
  { title: "Painter", category: "Construction", risk: 20, salary: "₹1,80,000 - ₹4,80,000", demand: "High", synonyms: "Wall Painter, Decorator" },
  { title: "Welder", category: "Construction", risk: 45, salary: "₹3,00,000 - ₹8,40,000", demand: "High", synonyms: "Fabricator, Metal Worker" },

  // --- Driver & Transport ---
  { title: "Cab Driver", category: "Driver", risk: 80, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Taxi Driver, Uber Driver, Ola Driver, Chauffeur, Cabby" },
  { title: "Truck Driver", category: "Driver", risk: 75, salary: "₹3,00,000 - ₹7,20,000", demand: "High", synonyms: "Lorry Driver, Heavy Vehicle Driver, Trailer Driver" },
  { title: "Bus Driver", category: "Driver", risk: 70, salary: "₹2,40,000 - ₹5,40,000", demand: "Medium", synonyms: "Coach Driver, Transit Driver" },
  { title: "Ambulance Driver", category: "Driver", risk: 40, salary: "₹2,40,000 - ₹4,80,000", demand: "High", synonyms: "Emergency Vehicle Operator" },
  { title: "Auto Driver", category: "Driver", risk: 85, salary: "₹1,80,000 - ₹4,20,000", demand: "High", synonyms: "Rickshaw Driver" },
  { title: "Delivery Boy", category: "Labor", risk: 90, salary: "₹1,80,000 - ₹4,80,000", demand: "Very High", synonyms: "Delivery Executive, Courier Boy, Zomato Swiggy Rider, Delivery Driver" },

  // --- Management ---
  { title: "HR Manager", category: "Manager", risk: 40, salary: "₹7,00,000 - ₹25,00,000", demand: "Medium", synonyms: "Human Resources Manager, Personnel Manager, HR Lead" },
  { title: "Operations Manager", category: "Manager", risk: 35, salary: "₹8,00,000 - ₹30,00,000", demand: "High", synonyms: "Ops Manager, Plant Manager, General Manager" },
  { title: "Sales Manager", category: "Manager", risk: 30, salary: "₹6,00,000 - ₹20,00,000", demand: "High", synonyms: "Business Development Manager, Sales Head" },
  { title: "Project Manager", category: "Manager", risk: 25, salary: "₹10,00,000 - ₹35,00,000", demand: "High", synonyms: "PM, Program Manager, Project Lead" },
  { title: "CEO", category: "Management", risk: 1, salary: "₹50,00,000 - ₹10,00,00,000", demand: "Low", synonyms: "Chief Executive, Managing Director" },
  { title: "Product Manager", category: "Management", risk: 15, salary: "₹12,00,000 - ₹45,00,000", demand: "High", synonyms: "PdM, Product Lead" },

  // --- Service & Skilled ---
  { title: "Barber", category: "Service", risk: 15, salary: "₹2,40,000 - ₹12,00,000", demand: "High", synonyms: "Hair Stylist, Hairdresser" },
  { title: "Beautician", category: "Service", risk: 10, salary: "₹2,40,000 - ₹8,00,000", demand: "High", synonyms: "Makeup Artist, Aesthetician" },
  { title: "Chef", category: "Service", risk: 10, salary: "₹4,00,000 - ₹30,00,000", demand: "High", synonyms: "Cook, Head Chef" },
  { title: "Waiter", category: "Service", risk: 85, salary: "₹1,80,000 - ₹4,80,000", demand: "High", synonyms: "Server, Host" },
  { title: "Security Guard", category: "Security", risk: 80, salary: "₹1,80,000 - ₹3,60,000", demand: "High", synonyms: "Watchman, Security Officer, Guard" },
  { title: "Mechanic", category: "Skilled", risk: 20, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Auto Mechanic, Repairman, Fitter" },
  { title: "Technician", category: "Skilled", risk: 30, salary: "₹3,00,000 - ₹8,40,000", demand: "High", synonyms: "Maintenance Technician, Service Engineer" },
];

function generateJobs() {
  const generated: any[] = [];
  const industries = [
    "Healthcare", "Finance", "Retail", "Manufacturing", "IT", "Education", 
    "Hospitality", "Logistics", "Construction", "Agriculture", "Automotive", 
    "Pharma", "Textile", "E-commerce", "Banking", "Insurance", "Telecommunications",
    "Real Estate", "Media", "Energy", "Public Sector", "Legal", "Science", "Arts",
    "Tourism", "Non-Profit", "Defense", "Space", "Mining", "Fashion"
  ];
  const levels = ["Junior", "Senior", "Lead", "Associate", "Trainee", "Expert", "Principal", "Head of", "Consultant", "Specialist"];
  
  // 1. Add base jobs
  baseJobs.forEach(job => {
    generated.push({
      title: job.title,
      slug: job.title.toLowerCase().replace(/ /g, "-").replace(/[^a-z-]/g, ""),
      risk_score: job.risk,
      salary: job.salary,
      growth_rate: job.risk > 70 ? "Declining" : job.risk > 40 ? "Steady" : "High",
      demand_level: job.demand,
      description: `A ${job.title} is responsible for various tasks in the ${job.category} sector. The risk of automation is estimated at ${job.risk}% based on current AI and robotics trends.`,
      synonyms: job.synonyms,
      job_code: `AIVSME:${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    });
  });

  // 2. Generate variations (Level + Industry + Job)
  industries.forEach(industry => {
    levels.forEach(level => {
      baseJobs.forEach(job => {
        const newTitle = `${level} ${industry} ${job.title}`;
        const slug = newTitle.toLowerCase().replace(/ /g, "-").replace(/[^a-z-]/g, "");
        
        // Avoid duplicates
        if (generated.some(j => j.slug === slug)) return;

        generated.push({
          title: newTitle,
          slug: slug,
          risk_score: Math.round(Math.max(0, Math.min(100, job.risk + (Math.random() * 20 - 10)))),
          salary: job.salary,
          growth_rate: job.risk > 70 ? "Declining" : job.risk > 40 ? "Steady" : "High",
          demand_level: job.demand,
          description: `This role specializes as a ${newTitle} within the ${industry} industry. Automation impacts vary by specific tasks and technology adoption in ${industry}.`,
          synonyms: `${job.synonyms}, ${level} ${job.title}, ${industry} ${job.title}`,
          job_code: `AIVSME:${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        });
      });
    });
  });

  // 3. Additional variations (Industry + Job)
  industries.forEach(industry => {
    baseJobs.forEach(job => {
      const newTitle = `${industry} ${job.title}`;
      const slug = newTitle.toLowerCase().replace(/ /g, "-").replace(/[^a-z-]/g, "");
      
      if (generated.some(j => j.slug === slug)) return;

      generated.push({
        title: newTitle,
        slug: slug,
        risk_score: Math.round(Math.max(0, Math.min(100, job.risk + (Math.random() * 10 - 5)))),
        salary: job.salary,
        growth_rate: job.risk > 70 ? "Declining" : job.risk > 40 ? "Steady" : "High",
        demand_level: job.demand,
        description: `This role specializes as a ${newTitle} within the ${industry} industry.`,
        synonyms: `${job.synonyms}, ${industry} ${job.title}`,
        job_code: `AIVSME:${Math.random().toString(36).substring(2, 9).toUpperCase()}`
      });
    });
  });

  return generated;
}

async function main() {
  const allJobs = generateJobs();
  console.log(`Seeding ${allJobs.length} jobs...`);
  
  // Clean existing jobs to avoid conflicts
  await db.delete(jobs);
  
  // Insert in chunks to avoid payload limits
  const chunkSize = 100;
  for (let i = 0; i < allJobs.length; i += chunkSize) {
    const chunk = allJobs.slice(i, i + chunkSize);
    await db.insert(jobs).values(chunk);
    console.log(`Inserted ${i + chunk.length} jobs...`);
  }
  
  console.log("Seeding complete!");
}

main().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
