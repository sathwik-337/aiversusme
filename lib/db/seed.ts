import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const baseJobs = [
  // --- Healthcare ---
  { title: "Doctor", category: "Healthcare", risk: 5, salary: "₹12,00,000 - ₹50,00,000", demand: "Very High", synonyms: "Physician, Medical Practitioner, MD", isProfessional: true },
  { title: "Surgeon", category: "Healthcare", risk: 2, salary: "₹20,00,000 - ₹80,00,000", demand: "High", synonyms: "Specialist, Operative Doctor", isProfessional: true },
  { title: "Nurse", category: "Healthcare", risk: 10, salary: "₹3,00,000 - ₹12,00,000", demand: "Very High", synonyms: "RN, Registered Nurse, Nursing Officer", isProfessional: true },
  { title: "Dentist", category: "Healthcare", risk: 8, salary: "₹5,00,000 - ₹25,00,000", demand: "High", synonyms: "Orthodontist, Oral Surgeon", isProfessional: true },
  { title: "Pharmacist", category: "Healthcare", risk: 40, salary: "₹3,00,000 - ₹10,00,000", demand: "Medium", synonyms: "Chemist, Druggist", isProfessional: true },
  { title: "Physiotherapist", category: "Healthcare", risk: 5, salary: "₹4,00,000 - ₹15,00,000", demand: "High", synonyms: "PT, Physical Therapist", isProfessional: true },
  { title: "Radiologist", category: "Healthcare", risk: 35, salary: "₹15,00,000 - ₹40,00,000", demand: "Medium", synonyms: "X-ray Specialist", isProfessional: true },
  { title: "Psychiatrist", category: "Healthcare", risk: 3, salary: "₹10,00,000 - ₹35,00,000", demand: "High", synonyms: "Mental Health Doctor", isProfessional: true },
  { title: "Veterinarian", category: "Healthcare", risk: 5, salary: "₹5,00,000 - ₹20,00,000", demand: "High", synonyms: "Vet, Animal Doctor", isProfessional: true },
  { title: "Optometrist", category: "Healthcare", risk: 15, salary: "₹4,00,000 - ₹12,00,000", demand: "Medium", synonyms: "Eye Doctor", isProfessional: true },
  { title: "Neurologist", category: "Healthcare", risk: 2, salary: "₹25,00,000 - ₹90,00,000", demand: "High", synonyms: "Brain Specialist, Neuro Physician", isProfessional: true },
  { title: "Orthopedist", category: "Healthcare", risk: 3, salary: "₹20,00,000 - ₹80,00,000", demand: "High", synonyms: "Bone Specialist, Orthopedic Surgeon", isProfessional: true },
  { title: "Cardiologist", category: "Healthcare", risk: 2, salary: "₹30,00,000 - ₹1,20,00,000", demand: "Very High", synonyms: "Heart Specialist", isProfessional: true },
  { title: "Dermatologist", category: "Healthcare", risk: 10, salary: "₹15,00,000 - ₹60,00,000", demand: "High", synonyms: "Skin Specialist", isProfessional: true },

  // --- Education ---
  { title: "Teacher", category: "Education", risk: 15, salary: "₹3,00,000 - ₹12,00,000", demand: "High", synonyms: "Educator, School Teacher", isProfessional: true },
  { title: "Professor", category: "Education", risk: 5, salary: "₹8,00,000 - ₹30,00,000", demand: "Medium", synonyms: "Lecturer, Academic", isProfessional: true },
  { title: "Principal", category: "Education", risk: 5, salary: "₹12,00,000 - ₹40,00,000", demand: "Medium", synonyms: "Headmaster, School Head", isProfessional: true },
  { title: "Librarian", category: "Education", risk: 65, salary: "₹3,00,000 - ₹8,00,000", demand: "Low", synonyms: "Library Manager", isProfessional: true },
  { title: "Special Education Teacher", category: "Education", risk: 2, salary: "₹4,00,000 - ₹15,00,000", demand: "High", synonyms: "Special Needs Educator", isProfessional: true },

  // --- Tech & Engineering ---
  { title: "Software Developer", category: "Skilled", risk: 20, salary: "₹8,00,000 - ₹35,00,000", demand: "High", synonyms: "Programmer, Web Developer, Coder, Software Engineer", isProfessional: true },
  { title: "Web Developer", category: "Skilled", risk: 25, salary: "₹5,00,000 - ₹20,00,000", demand: "High", synonyms: "Frontend Developer, Backend Developer, Full Stack Developer", isProfessional: true },
  { title: "Data Scientist", category: "Skilled", risk: 15, salary: "₹10,00,000 - ₹45,00,000", demand: "Very High", synonyms: "AI Engineer, Machine Learning Engineer", isProfessional: true },
  { title: "Cloud Architect", category: "Tech", risk: 10, salary: "₹15,00,000 - ₹50,00,000", demand: "High", synonyms: "Cloud Engineer, AWS Specialist", isProfessional: true },
  { title: "Cybersecurity Analyst", category: "Tech", risk: 15, salary: "₹10,00,000 - ₹40,00,000", demand: "Very High", synonyms: "Security Specialist, Ethical Hacker", isProfessional: true },
  { title: "DevOps Engineer", category: "Tech", risk: 15, salary: "₹12,00,000 - ₹45,00,000", demand: "High", synonyms: "SRE, Systems Engineer", isProfessional: true },
  { title: "UI/UX Designer", category: "Tech", risk: 10, salary: "₹6,00,000 - ₹25,00,000", demand: "High", synonyms: "Product Designer, User Experience Designer", isProfessional: true },
  { title: "Mobile App Developer", category: "Tech", risk: 20, salary: "₹8,00,000 - ₹30,00,000", demand: "High", synonyms: "iOS Developer, Android Developer", isProfessional: true },
  { title: "Database Administrator", category: "Tech", risk: 45, salary: "₹8,00,000 - ₹25,00,000", demand: "Medium", synonyms: "DBA, Database Manager", isProfessional: true },
  { title: "Network Engineer", category: "Tech", risk: 30, salary: "₹6,00,000 - ₹20,00,000", demand: "Medium", synonyms: "Network Architect", isProfessional: true },

  // --- Legal & Finance ---
  { title: "Lawyer", category: "Skilled", risk: 10, salary: "₹6,00,000 - ₹50,00,000", demand: "Medium", synonyms: "Attorney, Legal Counsel, Solicitor", isProfessional: true },
  { title: "Judge", category: "Legal", risk: 2, salary: "₹15,00,000 - ₹60,00,000", demand: "Low", synonyms: "Magistrate, Justice", isProfessional: true },
  { title: "Accountant", category: "Skilled", risk: 60, salary: "₹3,00,000 - ₹15,00,000", demand: "High", synonyms: "Chartered Accountant, CA, Bookkeeper", isProfessional: true },
  { title: "Financial Analyst", category: "Finance", risk: 35, salary: "₹8,00,000 - ₹25,00,000", demand: "High", synonyms: "Investment Analyst", isProfessional: true },
  { title: "Investment Banker", category: "Finance", risk: 20, salary: "₹15,00,000 - ₹1,00,00,000", demand: "Medium", synonyms: "Equity Research Analyst", isProfessional: true },
  { title: "Chartered Accountant", category: "Finance", risk: 25, salary: "₹8,00,000 - ₹40,00,000", demand: "Very High", synonyms: "CA, Auditor, Tax Consultant, ICAI Member", isProfessional: true },
  { title: "Company Secretary", category: "Legal", risk: 30, salary: "₹6,00,000 - ₹30,00,000", demand: "High", synonyms: "CS, Corporate Secretary, Legal Compliance Officer, ICSI Member", isProfessional: true },
  { title: "ACCA Professional", category: "Finance", risk: 20, salary: "₹6,00,000 - ₹35,00,000", demand: "High", synonyms: "ACCA, Association of Chartered Certified Accountants, Global Accountant", isProfessional: true },
  { title: "Insurance Agent", category: "Finance", risk: 75, salary: "₹2,40,000 - ₹10,00,000", demand: "High", synonyms: "Insurance Broker", isProfessional: false },
  { title: "Actuary", category: "Finance", risk: 25, salary: "₹12,00,000 - ₹40,00,000", demand: "High", synonyms: "Risk Analyst", isProfessional: true },

  // --- Arts & Media ---
  { title: "Graphic Designer", category: "Skilled", risk: 30, salary: "₹3,00,000 - ₹12,00,000", demand: "Medium", synonyms: "UI/UX Designer, Visual Artist", isProfessional: true },
  { title: "Actor", category: "Skilled", risk: 5, salary: "₹5,00,000 - ₹1,00,00,000", demand: "Competitive", synonyms: "Performer, Artist", isProfessional: false },
  { title: "Writer", category: "Media", risk: 20, salary: "₹4,00,000 - ₹15,00,000", demand: "Medium", synonyms: "Author, Content Writer, Blogger", isProfessional: true },
  { title: "Journalist", category: "Media", risk: 30, salary: "₹3,00,000 - ₹15,00,000", demand: "Medium", synonyms: "Reporter, News Anchor", isProfessional: true },
  { title: "Photographer", category: "Media", risk: 15, salary: "₹3,00,000 - ₹20,00,000", demand: "Medium", synonyms: "Cameraman, Visual Creator", isProfessional: false },
  { title: "Video Editor", category: "Media", risk: 25, salary: "₹4,00,000 - ₹18,00,000", demand: "High", synonyms: "Film Editor, Post-production Specialist", isProfessional: true },
  { title: "Musician", category: "Media", risk: 10, salary: "₹3,00,000 - ₹50,00,000", demand: "Competitive", synonyms: "Composer, Singer, Instrumentalist", isProfessional: false },

  // --- Construction & Building ---
  { title: "General Worker", category: "Worker", risk: 85, salary: "₹1,80,000 - ₹3,60,000", demand: "High", synonyms: "Laborer, Factory Hand, Utility Worker", isProfessional: false },
  { title: "Construction Worker", category: "Worker", risk: 70, salary: "₹2,40,000 - ₹4,80,000", demand: "High", synonyms: "Builder, Mason, Site Worker", isProfessional: false },
  { title: "Sanitation Worker", category: "Worker", risk: 65, salary: "₹1,50,000 - ₹3,00,000", demand: "High", synonyms: "Sweeper, Garbage Collector", isProfessional: false },
  { title: "Mason", category: "Construction", risk: 15, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Bricklayer, Stone Worker", isProfessional: false },
  { title: "Carpenter", category: "Construction", risk: 10, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Woodworker, Furniture Maker", isProfessional: false },
  { title: "Plumber", category: "Skilled", risk: 10, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Pipefitter, Plumbing Technician", isProfessional: false },
  { title: "Electrician", category: "Skilled", risk: 15, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Electrical Technician, Wireman", isProfessional: false },
  { title: "Electrical Engineer", category: "Skilled", risk: 10, salary: "₹4,00,000 - ₹18,00,000", demand: "High", synonyms: "Power Engineer", isProfessional: true },
  { title: "Mechanical Engineer", category: "Skilled", risk: 15, salary: "₹4,00,000 - ₹20,00,000", demand: "Medium", synonyms: "Design Engineer", isProfessional: true },
  { title: "Painter", category: "Construction", risk: 20, salary: "₹1,80,000 - ₹4,80,000", demand: "High", synonyms: "Wall Painter, Decorator", isProfessional: false },
  { title: "Welder", category: "Construction", risk: 45, salary: "₹3,00,000 - ₹8,40,000", demand: "High", synonyms: "Fabricator, Metal Worker", isProfessional: false },

  // --- Driver & Transport ---
  { title: "Cab Driver", category: "Driver", risk: 80, salary: "₹2,40,000 - ₹6,00,000", demand: "High", synonyms: "Taxi Driver, Uber Driver, Ola Driver, Chauffeur, Cabby", isProfessional: false },
  { title: "Truck Driver", category: "Driver", risk: 75, salary: "₹3,00,000 - ₹7,20,000", demand: "High", synonyms: "Lorry Driver, Heavy Vehicle Driver, Trailer Driver", isProfessional: false },
  { title: "Bus Driver", category: "Driver", risk: 70, salary: "₹2,40,000 - ₹5,40,000", demand: "Medium", synonyms: "Coach Driver, Transit Driver", isProfessional: false },
  { title: "Ambulance Driver", category: "Driver", risk: 40, salary: "₹2,40,000 - ₹4,80,000", demand: "High", synonyms: "Emergency Vehicle Operator", isProfessional: false },
  { title: "Auto Driver", category: "Driver", risk: 85, salary: "₹1,80,000 - ₹4,20,000", demand: "High", synonyms: "Rickshaw Driver", isProfessional: false },
  { title: "Delivery Boy", category: "Labor", risk: 90, salary: "₹1,80,000 - ₹4,80,000", demand: "Very High", synonyms: "Delivery Executive, Courier Boy, Zomato Swiggy Rider, Delivery Driver", isProfessional: false },

  // --- Management ---
  { title: "HR Manager", category: "Manager", risk: 40, salary: "₹7,00,000 - ₹25,00,000", demand: "Medium", synonyms: "Human Resources Manager, Personnel Manager, HR Lead", isProfessional: true },
  { title: "Operations Manager", category: "Manager", risk: 35, salary: "₹8,00,000 - ₹30,00,000", demand: "High", synonyms: "Ops Manager, Plant Manager, General Manager", isProfessional: true },
  { title: "Sales Manager", category: "Manager", risk: 30, salary: "₹6,00,000 - ₹20,00,000", demand: "High", synonyms: "Business Development Manager, Sales Head", isProfessional: true },
  { title: "Project Manager", category: "Manager", risk: 25, salary: "₹10,00,000 - ₹35,00,000", demand: "High", synonyms: "PM, Program Manager, Project Lead", isProfessional: true },
  { title: "CEO", category: "Management", risk: 1, salary: "₹50,00,000 - ₹10,00,00,000", demand: "Low", synonyms: "Chief Executive, Managing Director", isProfessional: true },
  { title: "Product Manager", category: "Management", risk: 15, salary: "₹12,00,000 - ₹45,00,000", demand: "High", synonyms: "PdM, Product Lead", isProfessional: true },

  // --- Service & Skilled ---
  { title: "Barber", category: "Service", risk: 15, salary: "₹2,40,000 - ₹12,00,000", demand: "High", synonyms: "Hair Stylist, Hairdresser", isProfessional: false },
  { title: "Beautician", category: "Service", risk: 10, salary: "₹2,40,000 - ₹8,00,000", demand: "High", synonyms: "Makeup Artist, Aesthetician", isProfessional: false },
  { title: "Chef", category: "Service", risk: 10, salary: "₹4,00,000 - ₹30,00,000", demand: "High", synonyms: "Cook, Head Chef", isProfessional: true },
  { title: "Waiter", category: "Service", risk: 85, salary: "₹1,80,000 - ₹4,80,000", demand: "High", synonyms: "Server, Host", isProfessional: false },
  { title: "Security Guard", category: "Security", risk: 80, salary: "₹1,80,000 - ₹3,60,000", demand: "High", synonyms: "Watchman, Security Officer, Guard", isProfessional: false },
  { title: "Mechanic", category: "Skilled", risk: 20, salary: "₹2,40,000 - ₹7,20,000", demand: "High", synonyms: "Auto Mechanic, Repairman, Fitter", isProfessional: false },
  { title: "Technician", category: "Skilled", risk: 30, salary: "₹3,00,000 - ₹8,40,000", demand: "High", synonyms: "Maintenance Technician, Service Engineer", isProfessional: false },
  { title: "Coffee Maker", category: "Service", risk: 70, salary: "₹1,80,000 - ₹3,60,000", demand: "High", synonyms: "Barista, Coffee Brewer", isProfessional: false },
];

const industries = [
  "Information Technology", "Healthcare", "Finance", "Education", "Legal", "Construction", 
  "Manufacturing", "Retail", "Hospitality", "Media", "Transportation", "Energy", 
  "Agriculture", "Aerospace", "Fashion", "Entertainment", "Real Estate", "Automotive",
  "Telecommunications", "Pharmaceutical", "Biotechnology", "Insurance", "E-commerce",
  "Logistics", "Sustainability", "Government", "Non-Profit", "Marketing", "Consulting",
  "Security", "Public Relations", "Human Resources", "Data Science", "Artificial Intelligence",
  "Cybersecurity", "Blockchain", "Gaming", "Robotics", "Space Exploration", "Marine",
  "Mining", "Chemical", "Architecture", "Design", "Sports", "Tourism", "Wellness",
  "Renewable Energy", "Fintech", "EdTech", "Venture Capital", "Public Policy", "Urban Planning",
  "Cyber Intelligence", "Cloud Computing", "Machine Learning", "Quantum Computing", "Nanotechnology",
  "Mental Health", "Social Media", "Digital Marketing", "Content Creation", "E-learning",
  "Renewable Systems", "Circular Economy", "Bioinformatics", "Genomics", "Neuroscience"
];

const jobFunctions = [
  "Engineer", "Analyst", "Manager", "Consultant", "Specialist", "Technician", 
  "Coordinator", "Director", "Developer", "Designer", "Administrator", "Lead",
  "Architect", "Researcher", "Expert", "Practitioner", "Advisor", "Strategist",
  "Officer", "Associate", "Scientist", "Auditor", "Counsel", "Instructor", "Planner",
  "Technologist", "Producer", "Editor", "Writer", "Artist", "Instructor", "Coach"
];

const standardJobTitles = [
  "Accountants and Auditors", "Actors", "Actuaries", "Acupuncturists", "Acute Care Nurses", 
  "Adapted Physical Education Specialists", "Adhesive Bonding Machine Operators and Tenders", 
  "Administrative Law Judges, Adjudicators, and Hearing Officers", "Administrative Services Managers", 
  "Adult Basic Education, Adult Secondary Education, and English as a Second Language Instructors", 
  "Advanced Practice Psychiatric Nurses", "Advertising and Promotions Managers", "Advertising Sales Agents", 
  "Aerospace Engineering and Operations Technologists and Technicians", "Aerospace Engineers", 
  "Agents and Business Managers of Artists, Performers, and Athletes", "Agricultural Engineers", 
  "Agricultural Equipment Operators", "Agricultural Inspectors", "Agricultural Sciences Teachers, Postsecondary", 
  "Agricultural Technicians", "Web Developers", "Air Traffic Controllers", "Aircraft Cargo Handling Supervisors", 
  "Aircraft Mechanics and Service Technicians", "Aircraft Structure, Surfaces, Rigging, and Systems Assemblers", 
  "Airfield Operations Specialists", "Airline Pilots, Copilots, and Flight Engineers", "Allergists and Immunologists", 
  "Ambulance Drivers and Attendants, Except Emergency Medical Technicians", "Amusement and Recreation Attendants", 
  "Anesthesiologist Assistants", "Anesthesiologists", "Animal Breeders", "Animal Caretakers", 
  "Animal Control Workers", "Animal Scientists", "Animal Trainers", "Anthropologists and Archeologists", 
  "Anthropology and Archeology Teachers, Postsecondary", "Appraisers and Assessors of Real Estate", 
  "Arbitrators, Mediators, and Conciliators", "Architects, Except Landscape and Naval", 
  "Architectural and Civil Drafters", "Architectural and Engineering Managers", "Architecture Teachers, Postsecondary", 
  "Archivists", "Area, Ethnic, and Cultural Studies Teachers, Postsecondary", "Art Directors", "Art Therapists", 
  "Art, Drama, and Music Teachers, Postsecondary", "Fine Artists, Including Painters, Sculptors, and Illustrators", 
  "Astronomers", "Athletes and Sports Competitors", "Athletic Trainers", "Atmospheric and Space Scientists", 
  "Atmospheric, Earth, Marine, and Space Sciences Teachers, Postsecondary", "Audio and Video Technicians", 
  "Audiologists", "Audiovisual Equipment Installers and Repairers", "Automotive and Watercraft Service Attendants", 
  "Automotive Body and Related Repairers", "Automotive Engineering Technicians", "Automotive Engineers", 
  "Automotive Glass Installers and Repairers", "Automotive Service Technicians and Mechanics", "Aviation Inspectors", 
  "Avionics Technicians", "Baggage Porters and Bellhops", "Bailiffs", "Bakers", "Barbers", "Baristas", "Bartenders", 
  "Bicycle Repairers", "Bill and Account Collectors", "Billing and Posting Clerks", "Biochemists and Biophysicists", 
  "Bioengineers and Biomedical Engineers", "Biofuels Processing Technicians", "Biofuels Production Managers", 
  "Biofuels/Biodiesel Technology and Product Development Managers", "Bioinformatics Scientists", 
  "Bioinformatics Technicians", "Biological Science Teachers, Postsecondary", "Biological Technicians", 
  "Biologists", "Biomass Plant Technicians", "Biomass Power Plant Managers", "Biostatisticians", "Boilermakers", 
  "Bookkeeping, Accounting, and Auditing Clerks", "Brickmasons and Blockmasons", "Bridge and Lock Tenders", 
  "Broadcast Announcers and Radio Disc Jockeys", "Broadcast Technicians", "Brokerage Clerks", 
  "Brownfield Redevelopment Specialists and Site Managers", "Budget Analysts", 
  "Bus and Truck Mechanics and Diesel Engine Specialists", "Bus Drivers, School", "Bus Drivers, Transit and Intercity", 
  "Business Continuity Planners", "Business Intelligence Analysts", "Business Teachers, Postsecondary", 
  "Butchers and Meat Cutters", "Buyers and Purchasing Agents, Farm Products", "Cabinetmakers and Bench Carpenters", 
  "Camera and Photographic Equipment Repairers", "Camera Operators, Television, Video, and Film", 
  "Captains, Mates, and Pilots of Water Vessels", "Cardiovascular Technologists and Technicians", 
  "Career/Technical Education Teachers, Middle School", "Career/Technical Education Teachers, Postsecondary", 
  "Career/Technical Education Teachers, Secondary School", "Cargo and Freight Agents", "Carpenters", 
  "Carpet Installers", "Cartographers and Photogrammetrists", "Cashiers", "Cement Masons and Concrete Finishers", 
  "Chefs and Head Cooks", "Chemical Engineers", "Chemical Equipment Operators and Tenders", 
  "Chemical Plant and System Operators", "Chemical Technicians", "Chemistry Teachers, Postsecondary", "Chemists", 
  "Chief Executives", "Chief Sustainability Officers", "Child, Family, and School Social Workers", "Childcare Workers", 
  "Chiropractors", "Choreographers", "Civil Engineering Technologists and Technicians", "Civil Engineers", 
  "Claims Adjusters, Examiners, and Investigators", "Cleaners of Vehicles and Equipment", 
  "Cleaning, Washing, and Metal Pickling Equipment Operators and Tenders", "Clergy", "Climate Change Policy Analysts", 
  "Clinical and Counseling Psychologists", "Clinical Data Managers", "Clinical Neuropsychologists", 
  "Clinical Nurse Specialists", "Clinical Research Coordinators", "Coaches and Scouts", 
  "Coating, Painting, and Spraying Machine Setters, Operators, and Tenders", "Coil Winders, Tapers, and Finishers", 
  "Coin, Vending, and Amusement Machine Servicers and Repairers", "Commercial and Industrial Designers", 
  "Commercial Divers", "Communications Teachers, Postsecondary", "Community Health Workers", 
  "Compensation and Benefits Managers", "Compensation, Benefits, and Job Analysis Specialists", "Compliance Managers", 
  "Compliance Officers", "Computer and Information Research Scientists", "Computer and Information Systems Managers", 
  "Computer Hardware Engineers", "Computer Network Architects", "Computer Network Support Specialists", 
  "Computer Numerically Controlled Tool Operators", "Computer Numerically Controlled Tool Programmers", 
  "Computer Programmers", "Computer Science Teachers, Postsecondary", "Computer Systems Analysts", 
  "Computer Systems Engineers/Architects", "Computer User Support Specialists", 
  "Computer, Automated Teller, and Office Machine Repairers", "Concierges", "Conservation Scientists", 
  "Construction and Building Inspectors", "Construction Laborers", "Construction Managers", 
  "Continuous Mining Machine Operators", "Control and Valve Installers and Repairers, Except Mechanical Door", 
  "Conveyor Operators and Tenders", "Cooks, Fast Food", "Cooks, Institution and Cafeteria", "Cooks, Private Household", 
  "Cooks, Restaurant", "Cooks, Short Order", "Cooling and Freezing Equipment Operators and Tenders", "Coroners", 
  "Correctional Officers and Jailers", "Correspondence Clerks", "Cost Estimators", "Costume Attendants", 
  "Counter and Rental Clerks", "Couriers and Messengers", "Court Reporters and Simultaneous Captioners", 
  "Court, Municipal, and License Clerks", "Craft Artists", "Crane and Tower Operators", "Credit Analysts", 
  "Credit Authorizers, Checkers, and Clerks", "Credit Counselors", "Criminal Justice and Law Enforcement Teachers, Postsecondary", 
  "Critical Care Nurses", "Crossing Guards and Flaggers", "Crushing, Grinding, and Polishing Machine Setters, Operators, and Tenders", 
  "Curators", "Customer Service Representatives", "Customs and Border Protection Officers", "Customs Brokers", 
  "Cutters and Trimmers, Hand", "Cutting and Slicing Machine Setters, Operators, and Tenders", 
  "Cutting, Punching, and Press Machine Setters, Operators, and Tenders, Metal and Plastic", "Cytogenetic Technologists", 
  "Cytotechnologists", "Dancers", "Data Entry Keyers", "Data Warehousing Specialists", "Database Administrators", 
  "Database Architects", "Demonstrators and Product Promoters", "Dental Assistants", "Dental Hygienists", 
  "Dental Laboratory Technicians", "Dentists, General", "Dermatologists", "Derrick Operators, Oil and Gas", 
  "Desktop Publishers", "Detectives and Criminal Investigators", "Diagnostic Medical Sonographers", 
  "Dietetic Technicians", "Dietitians and Nutritionists", "Dining Room and Cafeteria Attendants and Bartender Helpers", 
  "Directors, Religious Activities and Education", "Dishwashers", "Dispatchers, Except Police, Fire, and Ambulance", 
  "Document Management Specialists", "Door-to-Door Sales Workers, News and Street Vendors, and Related Workers", 
  "Dredge Operators", "Drilling and Boring Machine Tool Setters, Operators, and Tenders, Metal and Plastic", 
  "Driver/Sales Workers", "Drywall and Ceiling Tile Installers", "Earth Drillers, Except Oil and Gas", 
  "Economics Teachers, Postsecondary", "Economists", "Editors", "Education Administrators, Kindergarten through Secondary", 
  "Education Administrators, Postsecondary", "Education and Childcare Administrators, Preschool and Daycare", 
  "Education Teachers, Postsecondary", "Educational, Guidance, and Career Counselors and Advisors", 
  "Electric Motor, Power Tool, and Related Repairers", "Electrical and Electronic Engineering Technologists and Technicians", 
  "Electrical and Electronic Equipment Assemblers", "Electrical and Electronics Drafters", 
  "Electrical and Electronics Installers and Repairers, Transportation Equipment", 
  "Electrical and Electronics Repairers, Commercial and Industrial Equipment", 
  "Electrical and Electronics Repairers, Powerhouse, Substation, and Relay", "Electrical Engineers", 
  "Electrical Power-Line Installers and Repairers", "Electricians", "Electro-Mechanical and Mechatronics Technologists and Technicians", 
  "Electromechanical Equipment Assemblers", "Electronic Equipment Installers and Repairers, Motor Vehicles", 
  "Electronics Engineers, Except Computer", "Elementary School Teachers, Except Special Education", 
  "Elevator and Escalator Installers and Repairers", "Eligibility Interviewers, Government Programs", "Embalmers", 
  "Emergency Management Directors", "Emergency Medical Technicians", "Endoscopy Technicians", "Energy Auditors", 
  "Energy Engineers, Except Wind and Solar", "Engine and Other Machine Assemblers", "Engineering Teachers, Postsecondary", 
  "English Language and Literature Teachers, Postsecondary", "Environmental Compliance Inspectors", "Environmental Economists", 
  "Environmental Engineering Technologists and Technicians", "Environmental Engineers", "Environmental Restoration Planners", 
  "Environmental Science and Protection Technicians, Including Health", "Environmental Science Teachers, Postsecondary", 
  "Environmental Scientists and Specialists, Including Health", "Epidemiologists", "Equal Opportunity Representatives and Officers", 
  "Etchers and Engravers", "Excavating and Loading Machine and Dragline Operators, Surface Mining", 
  "Executive Secretaries and Executive Administrative Assistants", "Exercise Physiologists", 
  "Exercise Trainers and Group Fitness Instructors", "Explosives Workers, Ordnance Handling Experts, and Blasters", 
  "Extruding and Drawing Machine Setters, Operators, and Tenders, Metal and Plastic", 
  "Extruding and Forming Machine Setters, Operators, and Tenders, Synthetic and Glass Fibers", 
  "Extruding, Forming, Pressing, and Compacting Machine Setters, Operators, and Tenders", "Fabric and Apparel Patternmakers", 
  "Facilities Managers", "Fallers", "Family and Consumer Sciences Teachers, Postsecondary", "Family Medicine Physicians", 
  "Farm and Home Management Educators", "Farm Equipment Mechanics and Service Technicians", "Farm Labor Contractors", 
  "Farmers, Ranchers, and Other Agricultural Managers", "Farmworkers and Laborers, Crop, Nursery, and Greenhouse", 
  "Farmworkers, Farm, Ranch, and Aquacultural Animals", "Fashion Designers", "Fast Food and Counter Workers", 
  "Fence Erectors", "Fiberglass Laminators and Fabricators", "File Clerks", "Film and Video Editors", 
  "Financial and Investment Analysts", "Financial Clerks", "Financial Examiners", "Financial Managers", 
  "Financial Quantitative Analysts", "Fire Inspectors and Investigators", "Fire-Prevention and Protection Engineers", 
  "Firefighters", "First-Line Supervisors of Construction Trades and Extraction Workers", 
  "First-Line Supervisors of Correctional Officers", "First-Line Supervisors of Entertainment and Recreation Workers, Except Gambling Services", 
  "First-Line Supervisors of Farming, Fishing, and Forestry Workers", "First-Line Supervisors of Firefighting and Prevention Workers", 
  "First-Line Supervisors of Food Preparation and Serving Workers", "First-Line Supervisors of Gambling Services Workers", 
  "First-Line Supervisors of Helpers, Laborers, and Material Movers, Hand", 
  "First-Line Supervisors of Housekeeping and Janitorial Workers", 
  "First-Line Supervisors of Landscaping, Lawn Service, and Groundskeeping Workers", 
  "First-Line Supervisors of Material-Moving Machine and Vehicle Operators", 
  "First-Line Supervisors of Mechanics, Installers, and Repairers", "First-Line Supervisors of Non-Retail Sales Workers", 
  "First-Line Supervisors of Office and Administrative Support Workers", "First-Line Supervisors of Personal Service Workers", 
  "First-Line Supervisors of Police and Detectives", "First-Line Supervisors of Production and Operating Workers", 
  "First-Line Supervisors of Retail Sales Workers", "First-Line Supervisors of Transportation Workers, All Other", 
  "Fish and Game Wardens", "Fitness and Wellness Coordinators", "Flight Attendants", 
  "Floor Layers, Except Carpet, Wood, and Hard Tiles", "Floor Sanders and Finishers", "Floral Designers", 
  "Food and Tobacco Roasting, Baking, and Drying Machine Operators and Tenders", "Food Batchmakers", 
  "Food Cooking Machine Operators and Tenders", "Food Preparation Workers", "Food Science Technicians", 
  "Food Scientists and Technologists", "Food Servers, Nonrestaurant", "Food Service Managers", 
  "Foreign Language and Literature Teachers, Postsecondary", "Forensic Science Technicians", 
  "Forest and Conservation Technicians", "Forest and Conservation Workers", "Forest Fire Inspectors and Prevention Specialists", 
  "Foresters", "Forestry and Conservation Science Teachers, Postsecondary", 
  "Forging Machine Setters, Operators, and Tenders, Metal and Plastic", "Foundry Mold and Coremakers", 
  "Fraud Examiners, Investigators and Analysts", "Freight Forwarders", "Fuel Cell Engineers", "Fundraisers", 
  "Fundraising Managers", "Funeral Attendants", "Funeral Home Managers", "Furnace, Kiln, Oven, Drier, and Kettle Operators and Tenders", 
  "Furniture Finishers", "Gambling and Sports Book Writers and Runners", "Gambling Cage Workers", 
  "Gambling Change Persons and Booth Cashiers", "Gambling Dealers", "Gambling Managers", 
  "Gambling Surveillance Officers and Gambling Investigators", "Gas Compressor and Gas Pumping Station Operators", 
  "Gas Plant Operators", "Gem and Diamond Workers", "General and Operations Managers", "General Internal Medicine Physicians", 
  "Genetic Counselors", "Geneticists", "Geodetic Surveyors", "Geographers", 
  "Geographic Information Systems Technologists and Technicians", "Geography Teachers, Postsecondary", 
  "Geological Technicians, Except Hydrologic Technicians", "Geoscientists, Except Hydrologists and Geographers", 
  "Geothermal Production Managers", "Geothermal Technicians", "Glass Blowers, Molders, Benders, and Finishers", "Glaziers", 
  "Government Property Inspectors and Investigators", "Graders and Sorters, Agricultural Products", "Graphic Designers", 
  "Grinding and Polishing Workers, Hand", "Grinding, Lapping, Polishing, and Buffing Machine Tool Setters, Operators, and Tenders, Metal and Plastic", 
  "Hairdressers, Hairstylists, and Cosmetologists", "Hazardous Materials Removal Workers", 
  "Health and Safety Engineers, Except Mining Safety Engineers and Inspectors", "Health Education Specialists", 
  "Health Informatics Specialists", "Health Specialties Teachers, Postsecondary", "Healthcare Social Workers", 
  "Hearing Aid Specialists", "Heat Treating Equipment Setters, Operators, and Tenders, Metal and Plastic", 
  "Heating, Air Conditioning, and Refrigeration Mechanics and Installers", "Heavy and Tractor-Trailer Truck Drivers", 
  "Helpers--Brickmasons, Blockmasons, Stonemasons, and Tile and Marble Setters", "Helpers--Carpenters", 
  "Helpers--Electricians", "Helpers--Extraction Workers", "Helpers--Installation, Maintenance, and Repair Workers", 
  "Helpers--Painters, Paperhangers, Plasterers, and Stucco Masons", "Helpers--Pipelayers, Plumbers, Pipefitters, and Steamfitters", 
  "Helpers--Production Workers", "Helpers--Roofers", "Highway Maintenance Workers", "Histology Technicians", "Historians", 
  "History Teachers, Postsecondary", "Histotechnologists", "Hoist and Winch Operators", "Home Appliance Repairers", 
  "Home Health Aides", "Hospitalists", "Hosts and Hostesses, Restaurant, Lounge, and Coffee Shop", 
  "Hotel, Motel, and Resort Desk Clerks", "Human Factors Engineers and Ergonomists", 
  "Human Resources Assistants, Except Payroll and Timekeeping", "Human Resources Managers", "Human Resources Specialists", 
  "Hydroelectric Plant Technicians", "Hydroelectric Production Managers", "Hydrologists", "Industrial Ecologists", 
  "Industrial Engineering Technologists and Technicians", "Industrial Engineers", "Industrial Machinery Mechanics", 
  "Industrial Production Managers", "Industrial Truck and Tractor Operators", "Industrial-Organizational Psychologists", 
  "Information and Record Clerks", "Information Security Analysts", "Information Technology Project Managers", 
  "Inspectors, Testers, Sorters, Samplers, and Weighers", "Instructional Coordinators", 
  "Insulation Workers, Floor, Ceiling, and Wall", "Insulation Workers, Mechanical", "Insurance Appraisers, Auto Damage", 
  "Insurance Claims and Policy Processing Clerks", "Insurance Sales Agents", "Insurance Underwriters", "Intelligence Analysts", 
  "Interior Designers", "Interpreters and Translators", "Interviewers, Except Eligibility and Loan", "Investment Fund Managers", 
  "Janitors and Cleaners, Except Maids and Housekeeping Cleaners", "Jewelers and Precious Stone and Metal Workers", 
  "Judges, Magistrate Judges, and Magistrates", "Judicial Law Clerks", "Kindergarten Teachers, Except Special Education", 
  "Labor Relations Specialists", "Laborers and Freight, Stock, and Material Movers, Hand", "Landscape Architects", 
  "Landscaping and Groundskeeping Workers", "Lathe and Turning Machine Tool Setters, Operators, and Tenders, Metal and Plastic", 
  "Laundry and Dry-Cleaning Workers", "Law Teachers, Postsecondary", "Lawyers", "Layout Workers, Metal and Plastic", 
  "Legal Secretaries and Administrative Assistants", "Librarians and Media Collections Specialists", "Library Assistants, Clerical", 
  "Library Science Teachers, Postsecondary", "Library Technicians", "Licensed Practical and Licensed Vocational Nurses", 
  "Lifeguards, Ski Patrol, and Other Recreational Protective Service Workers", "Light Truck Drivers", 
  "Loading and Moving Machine Operators, Underground Mining", "Loan Interviewers and Clerks", "Loan Officers", 
  "Locker Room, Coatroom, and Dressing Room Attendants", "Locksmiths and Safe Repairers", "Locomotive Engineers", 
  "Lodging Managers", "Log Graders and Scalers", "Logging Equipment Operators", "Logisticians", "Logistics Analysts", 
  "Logistics Engineers", "Loss Prevention Managers", "Low Vision Therapists, Orientation and Mobility Specialists, and Vision Rehabilitation Therapists", 
  "Machine Feeders and Offbearers", "Machinists", "Magnetic Resonance Imaging Technologists", "Maids and Housekeeping Cleaners", 
  "Mail Clerks and Mail Machine Operators, Except Postal Service", "Maintenance and Repair Workers, General", 
  "Maintenance Workers, Machinery", "Makeup Artists, Theatrical and Performance", "Management Analysts", 
  "Manicurists and Pedicurists", "Manufactured Building and Mobile Home Installers", "Manufacturing Engineers", 
  "Marine Engineers and Naval Architects", "Market Research Analysts and Marketing Specialists", "Marketing Managers", 
  "Marriage and Family Therapists", "Massage Therapists", "Materials Engineers", "Materials Scientists", 
  "Mathematical Science Teachers, Postsecondary", "Mathematicians", "Meat, Poultry, and Fish Cutters and Trimmers", 
  "Mechanical Door Repairers", "Mechanical Drafters", "Mechanical Engineering Technologists and Technicians", 
  "Mechanical Engineers", "Mechatronics Engineers", "Media Programming Directors", "Media Technical Directors/Managers", 
  "Medical and Clinical Laboratory Technicians", "Medical and Clinical Laboratory Technologists", 
  "Medical and Health Services Managers", "Medical Appliance Technicians", "Medical Assistants", "Medical Equipment Preparers", 
  "Medical Equipment Repairers", "Medical Records Specialists", "Medical Scientists, Except Epidemiologists", 
  "Medical Secretaries and Administrative Assistants", "Medical Transcriptionists", "Meeting, Convention, and Event Planners", 
  "Mental Health and Substance Abuse Social Workers", "Mental Health Counselors", "Merchandise Displayers and Window Trimmers", 
  "Metal-Refining Furnace Operators and Tenders", "Meter Readers, Utilities", "Microbiologists", "Microsystems Engineers", 
  "Middle School Teachers, Except Special and Career/Technical Education", "Midwives", 
  "Milling and Planing Machine Setters, Operators, and Tenders, Metal and Plastic", "Millwrights", 
  "Mining and Geological Engineers, Including Mining Safety Engineers", "Mixing and Blending Machine Setters, Operators, and Tenders",
  "Molders, Shapers, and Casters, Except Metal and Plastic", 
  "Molding, Coremaking, and Casting Machine Setters, Operators, and Tenders, Metal and Plastic", 
  "Molecular and Cellular Biologists", "Morticians, Undertakers, and Funeral Arrangers", 
  "Motion Picture Projectionists", "Motorboat Mechanics and Service Technicians", "Motorboat Operators", 
  "Motorcycle Mechanics", "Multiple Machine Tool Setters, Operators, and Tenders, Metal and Plastic", 
  "Museum Technicians and Conservators", "Music Directors and Composers", "Music Therapists", 
  "Musical Instrument Repairers and Tuners", "Musicians and Singers", "Nannies", "Nanosystems Engineers", 
  "Nanotechnology Engineering Technologists and Technicians", "Natural Sciences Managers", "Naturopathic Physicians", 
  "Network and Computer Systems Administrators", "Neurodiagnostic Technologists", "Neurologists", 
  "Neuropsychologists", "New Accounts Clerks", "News Analysts, Reporters, and Journalists", 
  "Non-Destructive Testing Specialists", "Nuclear Engineers", "Nuclear Medicine Technologists", 
  "Nuclear Monitoring Technicians", "Nuclear Power Reactor Operators", "Nuclear Technicians", "Nurse Anesthetists", 
  "Nurse Midwives", "Nurse Practitioners", "Nursing Assistants", "Nursing Instructors and Teachers, Postsecondary", 
  "Obstetricians and Gynecologists", "Occupational Health and Safety Specialists", "Occupational Health and Safety Technicians", 
  "Occupational Therapists", "Occupational Therapy Aides", "Occupational Therapy Assistants", "Office Clerks, General", 
  "Office Machine Operators, Except Computer", "Online Merchants", 
  "Operating Engineers and Other Construction Equipment Operators", "Operations Research Analysts", 
  "Ophthalmic Laboratory Technicians", "Ophthalmic Medical Technicians", "Ophthalmic Medical Technologists", 
  "Ophthalmologists, Except Pediatric", "Opticians, Dispensing", "Optometrists", "Oral and Maxillofacial Surgeons", 
  "Order Clerks", "Orderlies", "Orthodontists", "Orthopedic Surgeons, Except Pediatric", "Orthoptists", 
  "Orthotists and Prosthetists", "Outdoor Power Equipment and Other Small Engine Mechanics", 
  "Packaging and Filling Machine Operators and Tenders", "Packers and Packagers, Hand", 
  "Painters, Construction and Maintenance", "Painting, Coating, and Decorating Workers", 
  "Paper Goods Machine Setters, Operators, and Tenders", "Paperhangers", "Paralegals and Legal Assistants", "Paramedics", 
  "Park Naturalists", "Parking Attendants", "Parking Enforcement Workers", "Parts Salespersons", "Passenger Attendants", 
  "Patient Representatives", "Patternmakers, Metal and Plastic", "Patternmakers, Wood", 
  "Paving, Surfacing, and Tamping Equipment Operators", "Payroll and Timekeeping Clerks", "Pediatric Surgeons", 
  "Pediatricians, General", "Personal Care Aides", "Personal Financial Advisors", "Pest Control Workers", 
  "Pesticide Handlers, Sprayers, and Applicators, Vegetation", "Petroleum Engineers", 
  "Petroleum Pump System Operators, Refinery Operators, and Gaugers", "Pharmacists", "Pharmacy Aides", 
  "Pharmacy Technicians", "Philosophy and Religion Teachers, Postsecondary", "Phlebotomists", "Photographers", 
  "Photographic Process Workers and Processing Machine Operators", "Photonics Engineers", "Photonics Technicians", 
  "Physical Medicine and Rehabilitation Physicians", "Physical Therapist Aides", "Physical Therapist Assistants", 
  "Physical Therapists", "Physician Assistants", "Physicians, Pathologists", "Physicists", 
  "Physics Teachers, Postsecondary", "Pile Driver Operators", "Commercial Pilots", "Pipelayers", 
  "Plasterers and Stucco Masons", "Plating Machine Setters, Operators, and Tenders, Metal and Plastic", 
  "Plumbers, Pipefitters, and Steamfitters", "Podiatrists", "Poets, Lyricists and Creative Writers", 
  "Police and Sheriff's Patrol Officers", "Police Identification and Records Officers", 
  "Political Science Teachers, Postsecondary", "Political Scientists", "Postal Service Clerks", "Postal Service Mail Carriers", 
  "Postal Service Mail Sorters, Processors, and Processing Machine Operators", "Postmasters and Mail Superintendents", 
  "Postsecondary Teachers", "Potters, Manufacturing", "Pourers and Casters, Metal", "Power Distributors and Dispatchers", 
  "Power Plant Operators", "Precision Agriculture Technicians", "Prepress Technicians and Workers", 
  "Preschool Teachers, Except Special Education", "Preschool, Elementary, Middle, Secondary, and Special Education Teachers", 
  "Pressers, Textile, Garment, and Related Materials", "Preventive Medicine Physicians", 
  "Print Binding and Finishing Workers", "Printing Press Operators", "Private Detectives and Investigators", 
  "Probation Officers and Correctional Treatment Specialists", "Procurement Clerks", "Producers and Directors", 
  "Production, Planning, and Expediting Clerks", "Proofreaders and Copy Markers", 
  "Property, Real Estate, and Community Association Managers", "Prosthodontists", "Psychiatric Aides", 
  "Psychiatric Technicians", "Psychiatrists", "Psychology Teachers, Postsecondary", "Public Relations Managers", 
  "Public Relations Specialists", "Public Safety Telecommunicators", "Pump Operators, Except Wellhead Pumpers", 
  "Purchasing Agents, Except Wholesale, Retail, and Farm Products", "Purchasing Managers", "Quality Control Analysts", 
  "Quality Control Systems Managers", "Radiation Therapists", "Radio Frequency Identification Device Specialists", 
  "Radio, Cellular, and Tower Equipment Installers and Repairers", "Radiologic Technologists and Technicians", 
  "Radiologists", "Rail Car Repairers", "Rail Yard Engineers, Dinkey Operators, and Hostlers", 
  "Rail-Track Laying and Maintenance Equipment Operators", "Railroad Brake, Signal, and Switch Operators and Locomotive Firers", 
  "Railroad Conductors and Yardmasters", "Range Managers", "Real Estate Brokers", "Real Estate Sales Agents", 
  "Receptionists and Information Clerks", "Recreation and Fitness Studies Teachers, Postsecondary", "Recreation Workers", 
  "Recreational Therapists", "Recreational Vehicle Service Technicians", "Recycling and Reclamation Workers", 
  "Recycling Coordinators", "Refractory Materials Repairers, Except Brickmasons", 
  "Refuse and Recyclable Material Collectors", "Registered Nurses", "Regulatory Affairs Managers", 
  "Regulatory Affairs Specialists", "Rehabilitation Counselors", "Reinforcing Iron and Rebar Workers", 
  "Remote Sensing Scientists and Technologists", "Remote Sensing Technicians", 
  "Reservation and Transportation Ticket Agents and Travel Clerks", "Residential Advisors", "Respiratory Therapists", 
  "Retail Loss Prevention Specialists", "Retail Salespersons", "Riggers", "Robotics Engineers", "Robotics Technicians", 
  "Rock Splitters, Quarry", "Rolling Machine Setters, Operators, and Tenders, Metal and Plastic", "Roof Bolters, Mining", 
  "Roofers", "Rotary Drill Operators, Oil and Gas", "Roustabouts, Oil and Gas", "Sailors and Marine Oilers", 
  "Sales Engineers", "Sales Managers", "Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products", 
  "Sales Representatives, Wholesale and Manufacturing, Technical and Scientific Products", 
  "Sawing Machine Setters, Operators, and Tenders, Wood", "School Psychologists", "Search Marketing Strategists", 
  "Secondary School Teachers, Except Special and Career/Technical Education", 
  "Secretaries and Administrative Assistants, Except Legal, Medical, and Executive", 
  "Securities, Commodities, and Financial Services Sales Agents", "Security and Fire Alarm Systems Installers", 
  "Security Guards", "Security Management Specialists", "Security Managers", "Segmental Pavers", "Self-Enrichment Teachers", 
  "Semiconductor Processing Technicians", 
  "Separating, Filtering, Clarifying, Precipitating, and Still Machine Setters, Operators, and Tenders", 
  "Septic Tank Servicers and Sewer Pipe Cleaners", "Service Unit Operators, Oil and Gas", "Set and Exhibit Designers", 
  "Sewers, Hand", "Sewing Machine Operators", "Shampooers", "Sheet Metal Workers", "Ship Engineers", 
  "Shipping, Receiving, and Inventory Clerks", "Shoe and Leather Workers and Repairers", "Shoe Machine Operators and Tenders", 
  "Signal and Track Switch Repairers", "Skincare Specialists", "Slaughterers and Meat Packers", 
  "Social and Community Service Managers", "Social and Human Service Assistants", "Social Science Research Assistants", 
  "Social Work Teachers, Postsecondary", "Sociologists", "Sociology Teachers, Postsecondary", 
  "Software Quality Assurance Analysts and Testers", "Soil and Plant Scientists", "Solar Energy Installation Managers", 
  "Solar Energy Systems Engineers", "Solar Photovoltaic Installers", "Solar Sales Representatives and Assessors", 
  "Solar Thermal Installers and Technicians", "Sound Engineering Technicians", "Spa Managers", 
  "Special Education Teachers, Elementary School", "Special Education Teachers, Kindergarten", 
  "Special Education Teachers, Middle School", "Special Education Teachers, Preschool", 
  "Special Education Teachers, Secondary School", "Special Effects Artists and Animators", "Speech-Language Pathologists", 
  "Speech-Language Pathology Assistants", "Sports Medicine Physicians", "Stationary Engineers and Boiler Operators", 
  "Statistical Assistants", "Statisticians", "Stockers and Order Fillers", "Stone Cutters and Carvers, Manufacturing", 
  "Stonemasons", "Structural Iron and Steel Workers", "Structural Metal Fabricators and Fitters", 
  "Substance Abuse and Behavioral Disorder Counselors", "Subway and Streetcar Operators", "Supply Chain Managers", 
  "Surgeons, All Other", "Surgical Assistants", "Surgical Technologists", "Survey Researchers", 
  "Surveying and Mapping Technicians", "Surveyors", "Sustainability Specialists", 
  "Switchboard Operators, Including Answering Service", "Tailors, Dressmakers, and Custom Sewers", "Talent Directors", 
  "Tank Car, Truck, and Ship Loaders", "Tapers", "Tax Examiners and Collectors, and Revenue Agents", "Tax Preparers", 
  "Taxi Drivers", "Teaching Assistants, All Other", "Teaching Assistants, Postsecondary", 
  "Teaching Assistants, Preschool, Elementary, Middle, and Secondary School, Except Special Education", 
  "Teaching Assistants, Special Education", "Team Assemblers", "Technical Writers", "Telecommunications Engineering Specialists", 
  "Telecommunications Equipment Installers and Repairers, Except Line Installers", 
  "Telecommunications Line Installers and Repairers", "Telemarketers", "Telephone Operators", "Tellers", 
  "Terrazzo Workers and Finishers", "Textile Bleaching and Dyeing Machine Operators and Tenders", 
  "Textile Cutting Machine Setters, Operators, and Tenders", "Textile Knitting and Weaving Machine Setters, Operators, and Tenders", 
  "Textile Winding, Twisting, and Drawing Out Machine Setters, Operators, and Tenders", "Tile and Stone Setters", 
  "Timing Device Assemblers and Adjusters", "Tire Builders", "Tire Repairers and Changers", 
  "Title Examiners, Abstractors, and Searchers", "Tool and Die Makers", "Tool Grinders, Filers, and Sharpeners", 
  "Tour Guides and Escorts", "Traffic Technicians", "Training and Development Managers", "Training and Development Specialists", 
  "Transit and Railroad Police", "Transportation Engineers", "Transportation Inspectors", "Transportation Planners", 
  "Transportation Security Screeners", "Transportation Vehicle, Equipment and Systems Inspectors, Except Aviation", 
  "Transportation, Storage, and Distribution Managers", "Travel Agents", "Travel Guides", "Treasurers and Controllers", 
  "Tree Trimmers and Pruners", "Tutors", "Umpires, Referees, and Other Sports Officials", "Upholsterers", 
  "Urban and Regional Planners", "Urologists", "Ushers, Lobby Attendants, and Ticket Takers", "Validation Engineers", 
  "Veterinarians", "Veterinary Assistants and Laboratory Animal Caretaker", "Veterinary Technologists and Technicians", 
  "Video Game Designers", "Waiters and Waitresses", "Watch and Clock Repairers", 
  "Water and Wastewater Treatment Plant and System Operators", "Water Resource Specialists", "Water/Wastewater Engineers", 
  "Weatherization Installers and Technicians", "Web Administrators", "Weighers, Measurers, Checkers, and Samplers, Recordkeeping", 
  "Welders, Cutters, Solderers, and Brazers", "Welding, Soldering, and Brazing Machine Setters, Operators, and Tenders", 
  "Wellhead Pumpers", "Wholesale and Retail Buyers, Except Farm Products", "Wind Energy Development Managers", 
  "Wind Energy Engineers", "Wind Energy Operations Managers", "Wind Turbine Service Technicians", 
  "Woodworking Machine Setters, Operators, and Tenders, Except Sawing", "Word Processors and Typists", 
  "Writers and Authors", "Zoologists and Wildlife Biologists"
];

function getArticle(word: string) {
  const first = word.trim().charAt(0).toLowerCase();
  return ["a", "e", "i", "o", "u"].includes(first) ? "An" : "A";
}

function generateJobs() {
  const generated: any[] = [];
  const seenSlugs = new Set();

  // 1. Add base jobs first
  baseJobs.forEach(job => {
    const slug = job.title.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-]/g, "");
    if (!seenSlugs.has(slug)) {
      generated.push({
        title: job.title,
        slug: slug,
        risk_score: job.risk,
        salary: job.salary,
        growth_rate: job.risk > 70 ? "Declining" : job.risk > 40 ? "Steady" : "High",
        demand_level: job.demand,
        description: `${getArticle(job.title)} ${job.title} is responsible for various tasks in the ${job.category} sector. The risk of automation is estimated at ${job.risk}% based on current AI and robotics trends.`,
        synonyms: job.synonyms,
        job_code: `AIVSME:${Math.random().toString(36).substring(2, 9).toUpperCase()}`
      });
      seenSlugs.add(slug);
    }
  });

  // 2. Add Standard Jobs from the provided list
  standardJobTitles.forEach(title => {
    const slug = title.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    if (!seenSlugs.has(slug)) {
      // Generate realistic synonyms
      let synonyms = title;
      if (title.includes(" and ")) {
        synonyms += `, ${title.split(" and ").join(", ")}`;
      }
      if (title.includes(", ")) {
        synonyms += `, ${title.split(", ").join(", ")}`;
      }

      const risk = Math.floor(Math.random() * 85) + 5;
      generated.push({
        title: title,
        slug: slug,
        risk_score: risk,
        salary: "₹4,00,000 - ₹18,00,000", // Default range
        growth_rate: risk > 70 ? "Declining" : risk > 40 ? "Steady" : "High",
        demand_level: ["High", "Medium", "Very High", "Low"][Math.floor(Math.random() * 4)],
        description: `${getArticle(title)} ${title} is a professional role involving various specialized tasks. The risk of automation is estimated at ${risk}% based on market trends.`,
        synonyms: synonyms,
        job_code: `AIVSME:${Math.random().toString(36).substring(2, 9).toUpperCase()}`
      });
      seenSlugs.add(slug);
    }
  });

  // 3. Generate unique occupation-industry pairs (Removing seniority levels)
  for (const industry of industries) {
    for (const func of jobFunctions) {
      if (generated.length >= 10000) break;

      const title = `${industry} ${func}`;
      const slug = title.toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

      if (!seenSlugs.has(slug)) {
        let risk = Math.floor(Math.random() * 80) + 5;
        const lowerFunc = func.toLowerCase();
        if (lowerFunc.includes("manager") || lowerFunc.includes("director") || lowerFunc.includes("strategist") || lowerFunc.includes("expert")) risk -= 15;
        if (lowerFunc.includes("technician") || lowerFunc.includes("administrator")) risk += 10;
        risk = Math.max(1, Math.min(99, risk));

        generated.push({
          title: title,
          slug: slug,
          risk_score: risk,
          salary: `₹${(Math.floor(Math.random() * 8) + 5).toLocaleString('en-IN')},00,000 - ₹${(Math.floor(Math.random() * 15) + 12).toLocaleString('en-IN')},00,000`,
          growth_rate: risk > 70 ? "Declining" : risk > 40 ? "Steady" : "High",
          demand_level: ["High", "Medium", "Very High", "Low"][Math.floor(Math.random() * 4)],
          description: `A ${title} is an occupation specializing in ${lowerFunc} within the ${industry} domain. The automation risk for this role is currently rated at ${risk}%.`,
          synonyms: `${func}, ${industry} Specialist`,
          job_code: `AIVSME:${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        });
        seenSlugs.add(slug);
      }
    }
    if (generated.length >= 10000) break;
  }

  return generated;
}

async function main() {
  const allJobs = generateJobs();
  
  // Verify uniqueness of slugs
  const slugCheck = new Set();
  const duplicates = [];
  for (const job of allJobs) {
    if (slugCheck.has(job.slug)) {
      duplicates.push(job.slug);
    }
    slugCheck.add(job.slug);
  }
  
  if (duplicates.length > 0) {
    console.error(`Found ${duplicates.length} duplicate slugs! First 5:`, duplicates.slice(0, 5));
    // Remove duplicates from allJobs just in case
    const uniqueJobs = [];
    const finalSlugs = new Set();
    for (const job of allJobs) {
      if (!finalSlugs.has(job.slug)) {
        uniqueJobs.push(job);
        finalSlugs.add(job.slug);
      }
    }
    console.log(`Proceeding with ${uniqueJobs.length} unique jobs.`);
    // Replace allJobs with uniqueJobs
    allJobs.length = 0;
    allJobs.push(...uniqueJobs);
  }

  console.log(`Seeding ${allJobs.length} jobs using pg client...`);
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  try {
    await client.connect();
    console.log("Connected to database.");

    // Clean existing jobs
    await client.query('DELETE FROM "jobs"');
    console.log("Deleted existing jobs.");
    
    // Insert in chunks
    const chunkSize = 100;
    for (let i = 0; i < allJobs.length; i += chunkSize) {
      const chunk = allJobs.slice(i, i + chunkSize);
      
      const values: any[] = [];
      const placeholders: string[] = [];
      
      chunk.forEach((job, index) => {
        const offset = index * 9;
        placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9})`);
        values.push(job.title, job.slug, job.risk_score, job.salary, job.growth_rate, job.demand_level, job.description, job.synonyms, job.job_code);
      });

      await client.query(
        `INSERT INTO "jobs" (title, slug, risk_score, salary, growth_rate, demand_level, description, synonyms, job_code) 
         VALUES ${placeholders.join(", ")}
         ON CONFLICT (slug) DO NOTHING`,
        values
      );
      console.log(`Inserted ${Math.min(i + chunkSize, allJobs.length)} jobs...`);
    }
    
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await client.end();
  }
}

main();