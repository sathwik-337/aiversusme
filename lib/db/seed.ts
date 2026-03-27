import { db } from "./index";
import { jobs } from "./schema";
import type { jobs as jobsTable } from "./schema";

const baseJobs = [
  // --- Worker ---
  { title: "General Worker", category: "Worker", risk: 85, salary: "₹1,80,000 - ₹3,60,000", demand: "High", synonyms: "Laborer, Factory Hand, Utility Worker" },
  { title: "Construction Worker", category: "Worker", risk: 70, salary: "₹2,40,000 - ₹4,80,000", demand: "High", synonyms: "Builder, Mason, Site Worker" },
  { title: "Sanitation Worker", category: "Worker", risk: 65, salary: "₹1,50,000 - ₹3,00,000", demand: "High", synonyms: "Sweeper, Garbage Collector" },
  
  // --- Driver ---
  { title: "Cab Driver", category: "Driver", risk: 80, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Taxi Driver, Uber Driver, Ola Driver, Chauffeur, Cabby" },
  { title: "Truck Driver", category: "Driver", risk: 75, salary: "₹3,00,000 - ₹7,20,000", demand: "High", synonyms: "Lorry Driver, Heavy Vehicle Driver, Trailer Driver" },
  { title: "Bus Driver", category: "Driver", risk: 70, salary: "₹2,40,000 - ₹5,40,000", demand: "Medium", synonyms: "Coach Driver, Transit Driver" },
  { title: "Ambulance Driver", category: "Driver", risk: 40, salary: "₹2,40,000 - ₹4,80,000", demand: "High", synonyms: "Emergency Vehicle Operator" },

  // --- Manager ---
  { title: "HR Manager", category: "Manager", risk: 40, salary: "₹7,00,000 - ₹25,00,000", demand: "Medium", synonyms: "Human Resources Manager, Personnel Manager, HR Lead" },
  { title: "Operations Manager", category: "Manager", risk: 35, salary: "₹8,00,000 - ₹30,00,000", demand: "High", synonyms: "Ops Manager, Plant Manager, General Manager" },
  { title: "Sales Manager", category: "Manager", risk: 30, salary: "₹6,00,000 - ₹20,00,000", demand: "High", synonyms: "Business Development Manager, Sales Head" },
  { title: "Project Manager", category: "Manager", risk: 25, salary: "₹10,00,000 - ₹35,00,000", demand: "High", synonyms: "PM, Program Manager, Project Lead" },

  // --- Supervisor ---
  { title: "Production Supervisor", category: "Supervisor", risk: 60, salary: "₹4,80,000 - ₹12,00,000", demand: "Medium", synonyms: "Floor Supervisor, Shift Lead" },
  { title: "Site Supervisor", category: "Supervisor", risk: 50, salary: "₹3,60,000 - ₹9,00,000", demand: "High", synonyms: "Construction Supervisor, Field Supervisor" },
  { title: "Store Supervisor", category: "Supervisor", risk: 55, salary: "₹3,00,000 - ₹7,20,000", demand: "Medium", synonyms: "Retail Supervisor, Inventory Lead" },

  // --- Helper ---
  { title: "Office Helper", category: "Helper", risk: 85, salary: "₹1,50,000 - ₹3,00,000", demand: "High", synonyms: "Peon, Office Boy, Attendant" },
  { title: "Kitchen Helper", category: "Helper", risk: 80, salary: "₹1,20,000 - ₹2,40,000", demand: "High", synonyms: "Dishwasher, Commis III, Kitchen Hand" },
  { title: "Store Helper", category: "Helper", risk: 75, salary: "₹1,50,000 - ₹3,00,000", demand: "High", synonyms: "Warehouse Helper, Loader" },

  // --- Office & Admin ---
  { title: "Team Leader", category: "Office", risk: 45, salary: "₹4,80,000 - ₹15,00,000", demand: "High", synonyms: "Team Lead, Supervisor, Coordinator" },
  { title: "Office Assistant", category: "Office", risk: 70, salary: "₹2,40,000 - ₹5,40,000", demand: "Medium", synonyms: "Admin Assistant, Clerical Assistant" },
  { title: "Admin Executive", category: "Office", risk: 60, salary: "₹3,00,000 - ₹7,20,000", demand: "Medium", synonyms: "Administrative Executive, Admin Officer" },
  { title: "Computer Operator", category: "Office", risk: 80, salary: "₹1,80,000 - ₹4,20,000", demand: "High", synonyms: "Data Entry Operator, Typist, PC Operator" },

  // --- Field & Labor ---
  { title: "Delivery Boy", category: "Labor", risk: 90, salary: "₹1,80,000 - ₹4,80,000", demand: "Very High", synonyms: "Delivery Executive, Courier Boy, Zomato Swiggy Rider, Delivery Driver" },
  { title: "Warehouse Worker", category: "Labor", risk: 85, salary: "₹1,80,000 - ₹3,60,000", demand: "High", synonyms: "Store Keeper, Picker, Packer, Stocker" },
  { title: "Electrician", category: "Skilled", risk: 15, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Electrical Technician, Wireman" },
  { title: "Plumber", category: "Skilled", risk: 10, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Pipefitter, Plumbing Technician" },
  { title: "Technician", category: "Skilled", risk: 30, salary: "₹3,00,000 - ₹8,40,000", demand: "High", synonyms: "Maintenance Technician, Service Engineer" },
  { title: "Mechanic", category: "Skilled", risk: 20, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Auto Mechanic, Repairman, Fitter" },

  // --- Transport & Logistics ---
  { title: "Logistics Coordinator", category: "Logistics", risk: 50, salary: "₹3,60,000 - ₹9,00,000", demand: "High", synonyms: "Supply Chain Coordinator, Dispatcher" },
  { title: "Fleet Manager", category: "Logistics", risk: 40, salary: "₹6,00,000 - ₹18,00,000", demand: "Medium", synonyms: "Vehicle Manager, Transport Manager" },

  // --- Customer & Sales ---
  { title: "Telecaller", category: "Sales", risk: 95, salary: "₹1,50,000 - ₹4,80,000", demand: "High", synonyms: "BPO Executive, Customer Care, Telemarketing, Inside Sales" },
  { title: "Customer Support Executive", category: "Sales", risk: 85, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Customer Service, Helpdesk, Support Agent" },
  { title: "Sales Executive", category: "Sales", risk: 30, salary: "₹3,00,000 - ₹12,00,000", demand: "High", synonyms: "Salesperson, Business Development Executive, Account Executive" },
  { title: "Field Sales Agent", category: "Sales", risk: 40, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Sales Rep, Direct Sales, Outdoor Sales" },
  { title: "Relationship Manager", category: "Sales", risk: 25, salary: "₹5,00,000 - ₹18,00,000", demand: "High", synonyms: "RM, Client Manager, Account Manager" },

  // --- Skilled Jobs ---
  { title: "Software Developer", category: "Skilled", risk: 20, salary: "₹8,00,000 - ₹35,00,000", demand: "High", synonyms: "Programmer, Web Developer, Coder, Software Engineer" },
  { title: "Web Developer", category: "Skilled", risk: 25, salary: "₹5,00,000 - ₹20,00,000", demand: "High", synonyms: "Frontend Developer, Backend Developer, Full Stack Developer" },
  { title: "Data Scientist", category: "Skilled", risk: 15, salary: "₹10,00,000 - ₹45,00,000", demand: "Very High", synonyms: "AI Engineer, Machine Learning Engineer" },
  { title: "Lawyer", category: "Skilled", risk: 10, salary: "₹6,00,000 - ₹50,00,000", demand: "Medium", synonyms: "Attorney, Legal Counsel, Solicitor" },
  { title: "Accountant", category: "Skilled", risk: 60, salary: "₹3,00,000 - ₹15,00,000", demand: "High", synonyms: "Chartered Accountant, CA, Bookkeeper" },
  { title: "Graphic Designer", category: "Skilled", risk: 30, salary: "₹3,00,000 - ₹12,00,000", demand: "Medium", synonyms: "UI/UX Designer, Visual Artist" },
  { title: "Electrical Engineer", category: "Skilled", risk: 10, salary: "₹4,00,000 - ₹18,00,000", demand: "High", synonyms: "Power Engineer" },
  { title: "Mechanical Engineer", category: "Skilled", risk: 15, salary: "₹4,00,000 - ₹20,00,000", demand: "Medium", synonyms: "Design Engineer" },
  { title: "Actor", category: "Skilled", risk: 5, salary: "₹5,00,000 - ₹1,00,00,000", demand: "Competitive", synonyms: "Performer, Artist" },

  // --- Security ---
  { title: "Security Guard", category: "Security", risk: 80, salary: "₹1,80,000 - ₹3,60,000", demand: "High", synonyms: "Watchman, Security Officer, Guard" },
];

function generateJobs() {
  const generated: any[] = [];
  const industries = [
    "Healthcare", "Finance", "Retail", "Manufacturing", "IT", "Education", 
    "Hospitality", "Logistics", "Construction", "Agriculture", "Automotive", 
    "Pharma", "Textile", "E-commerce", "Banking", "Insurance", "Telecommunications",
    "Real Estate", "Media", "Energy"
  ];
  const levels = ["Junior", "Senior", "Lead", "Associate", "Trainee", "Expert", "Principal", "Head of"];
  
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
      synonyms: job.synonyms
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
          synonyms: `${job.synonyms}, ${level} ${job.title}, ${industry} ${job.title}`
        });
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
