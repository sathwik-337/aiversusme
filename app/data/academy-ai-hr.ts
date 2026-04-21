import type { AcademyCourse } from "@/app/data/academy";
export const aiHRCourse: AcademyCourse = {
  slug: "ai-for-hr",
  title: "AI FOR HR",
  tagline: "Revolutionize Human Resources with AI-driven strategies and tools.",
  summary:
    "A comprehensive 20-module course designed for HR professionals, recruiters, and people managers. Master the application of AI in talent acquisition, employee engagement, performance management, and HR operations while navigating ethics and compliance.",
  duration: "20 weeks",
  pace: "Self-paced",
  level: "Intermediate",
  format: "Video lessons, case studies, and a hands-on HR transformation project",
  audience: [
    "HR Professionals and Recruiters",
    "Talent Acquisition Managers",
    "People Operations Specialists",
    "HR Tech Consultants",
    "Business Leaders and People Managers",
  ],
  outcomes: [
    "Implement AI-driven talent sourcing and recruitment marketing strategies",
    "Automate resume screening and interview scheduling with AI tools",
    "Analyze employee sentiment and engagement using predictive analytics",
    "Design personalized learning and development programs with AI",
    "Optimize workforce planning and forecasting using data-driven insights",
    "Navigate the ethics, privacy, and legal frameworks of AI in HR",
    "Develop a complete AI-driven HR transformation strategy for your organization",
  ],
  isCoding: false,
  price: 999,
  currency: "INR",
  modules: [
    {
      id: "01",
      title: "Introduction to AI in HR",
      description: "Foundations of AI and its growing role in modern Human Resources.",
      lessons: [
        "Defining AI in the context of HR",
        "Key AI technologies: Machine Learning, NLP, and Generative AI",
        "The current landscape of AI in HR",
        "Benefits and challenges of AI adoption",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m01.pdf",
      quiz: [
        {
          id: "hr1-q1",
          question: "AI in HR primarily helps to:",
          options: [
            { id: "a", text: "Replace HR teams" },
            { id: "b", text: "Automate repetitive HR tasks" },
            { id: "c", text: "Reduce hiring" },
            { id: "d", text: "Eliminate employees" }
          ],
          correctOptionId: "b",
          explanation: "AI is designed to handle administrative and repetitive tasks, allowing HR professionals to focus on strategic people-centric initiatives."
        },
        {
          id: "hr1-q2",
          question: "A key benefit of AI in HR is:",
          options: [
            { id: "a", text: "Increased manual work" },
            { id: "b", text: "Faster decision-making" },
            { id: "c", text: "Reduced accuracy" },
            { id: "d", text: "No impact" }
          ],
          correctOptionId: "b",
          explanation: "AI can process large amounts of data quickly, providing insights that lead to faster and more informed decisions."
        },
        {
          id: "hr1-q3",
          question: "AI in HR relies on:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Data and algorithms" },
            { id: "c", text: "Paper records" },
            { id: "d", text: "Manual work" }
          ],
          correctOptionId: "b",
          explanation: "Modern AI systems are built on data-driven algorithms that learn and improve over time."
        },
        {
          id: "hr1-q4",
          question: "A misconception about AI in HR is:",
          options: [
            { id: "a", text: "It supports HR" },
            { id: "b", text: "It improves efficiency" },
            { id: "c", text: "It replaces HR completely" },
            { id: "d", text: "It uses data" }
          ],
          correctOptionId: "c",
          explanation: "While AI is powerful, it lacks the emotional intelligence and complex judgment essential to human resources."
        },
        {
          id: "hr1-q5",
          question: "AI enhances HR by:",
          options: [
            { id: "a", text: "Delaying processes" },
            { id: "b", text: "Improving efficiency" },
            { id: "c", text: "Ignoring data" },
            { id: "d", text: "Reducing output" }
          ],
          correctOptionId: "b",
          explanation: "By streamlining workflows and providing insights, AI significantly improves the overall efficiency of HR operations."
        }
      ]
    },
    {
      id: "02",
      title: "Evolution of HRTech and AI Adoption",
      description: "How HR technology has evolved and the roadmap for AI integration.",
      lessons: [
        "History of HR Information Systems (HRIS)",
        "The shift from automation to augmentation",
        "Frameworks for AI adoption in HR",
        "Measuring the ROI of AI in HR",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m02.pdf",
      quiz: [
        {
          id: "hr2-q1",
          question: "Early HRTech focused on:",
          options: [
            { id: "a", text: "AI automation" },
            { id: "b", text: "Record digitization" },
            { id: "c", text: "Predictive analytics" },
            { id: "d", text: "Robotics" }
          ],
          correctOptionId: "b",
          explanation: "The first wave of HR technology was primarily about moving from paper files to digital databases."
        },
        {
          id: "hr2-q2",
          question: "AI adoption increased due to:",
          options: [
            { id: "a", text: "Less data" },
            { id: "b", text: "Big data availability" },
            { id: "c", text: "Manual work" },
            { id: "d", text: "Paper systems" }
          ],
          correctOptionId: "b",
          explanation: "The explosion of digital employee data provided the necessary input for training effective AI models."
        },
        {
          id: "hr2-q3",
          question: "Traditional HR systems are:",
          options: [
            { id: "a", text: "Fully automated" },
            { id: "b", text: "Time-consuming" },
            { id: "c", text: "AI-driven" },
            { id: "d", text: "Fast" }
          ],
          correctOptionId: "b",
          explanation: "Legacy systems often require significant manual effort to manage records and process transactions."
        },
        {
          id: "hr2-q4",
          question: "Modern HRTech focuses on:",
          options: [
            { id: "a", text: "Manual work" },
            { id: "b", text: "AI insights" },
            { id: "c", text: "Paper records" },
            { id: "d", text: "Offline systems" }
          ],
          correctOptionId: "b",
          explanation: "Current technology leverages AI to provide predictive and prescriptive insights for better people management."
        },
        {
          id: "hr2-q5",
          question: "HRTech evolution led to:",
          options: [
            { id: "a", text: "Slow hiring" },
            { id: "b", text: "Efficient HR processes" },
            { id: "c", text: "Less accuracy" },
            { id: "d", text: "More workload" }
          ],
          correctOptionId: "b",
          explanation: "The transition to AI-enabled tools has streamlined workflows across the entire employee lifecycle."
        }
      ]
    },
    {
      id: "03",
      title: "HR Data and Analytics Fundamentals",
      description: "The importance of data quality and analytics in AI-driven HR.",
      lessons: [
        "Types of HR data: Structured vs. Unstructured",
        "Data cleaning and preparation for AI",
        "Descriptive, Predictive, and Prescriptive Analytics",
        "Building a data-driven HR culture",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m03.pdf",
      quiz: [
        {
          id: "hr3-q1",
          question: "HR analytics uses:",
          options: [
            { id: "a", text: "Guess" },
            { id: "b", text: "Employee data" },
            { id: "c", text: "Books" },
            { id: "d", text: "Notes" }
          ],
          correctOptionId: "b",
          explanation: "Analytics involves applying statistical models to employee-related data to uncover patterns and trends."
        },
        {
          id: "hr3-q2",
          question: "HR data includes:",
          options: [
            { id: "a", text: "Only names" },
            { id: "b", text: "Performance, attendance, payroll" },
            { id: "c", text: "Only salaries" },
            { id: "d", text: "Only resumes" }
          ],
          correctOptionId: "b",
          explanation: "Comprehensive HR data covers various aspects of the employee experience and organizational performance."
        },
        {
          id: "hr3-q3",
          question: "AI requires data in:",
          options: [
            { id: "a", text: "Paper" },
            { id: "b", text: "Digital form" },
            { id: "c", text: "Verbal" },
            { id: "d", text: "Random" }
          ],
          correctOptionId: "b",
          explanation: "AI algorithms can only process information that is in a machine-readable digital format."
        },
        {
          id: "hr3-q4",
          question: "Benefit of analytics:",
          options: [
            { id: "a", text: "Better decisions" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Errors" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Data-driven insights allow HR leaders to make objective and effective decisions."
        },
        {
          id: "hr3-q5",
          question: "Risk:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Data misuse" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "b",
          explanation: "Protecting sensitive employee data from unauthorized access or unethical use is a major concern."
        }
      ]
    },
    {
      id: "04",
      title: "AI in Talent Sourcing",
      description: "Using AI to find the right candidates more efficiently.",
      lessons: [
        "AI-powered candidate sourcing tools",
        "Social media and web scraping for talent",
        "Programmatic job advertising",
        "Leveraging AI for passive candidate engagement",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m04.pdf",
      quiz: [
        {
          id: "hr4-q1",
          question: "AI sourcing helps in:",
          options: [
            { id: "a", text: "Ignoring candidates" },
            { id: "b", text: "Finding candidates faster" },
            { id: "c", text: "Reducing hiring" },
            { id: "d", text: "Avoiding platforms" }
          ],
          correctOptionId: "b",
          explanation: "AI tools can scan multiple platforms simultaneously to identify top talent in seconds."
        },
        {
          id: "hr4-q2",
          question: "AI uses:",
          options: [
            { id: "a", text: "Guess" },
            { id: "b", text: "Data from platforms" },
            { id: "c", text: "Paper" },
            { id: "d", text: "Notes" }
          ],
          correctOptionId: "b",
          explanation: "Sourcing AI analyzes professional profiles and public data to match candidates with open roles."
        },
        {
          id: "hr4-q3",
          question: "Benefit:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "The primary advantage of AI in sourcing is the dramatic reduction in time-to-find for recruiters."
        },
        {
          id: "hr4-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Missing talent" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "If search parameters are too narrow or biased, the AI might overlook highly qualified candidates."
        },
        {
          id: "hr4-q5",
          question: "AI improves:",
          options: [
            { id: "a", text: "Reach" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Removal" }
          ],
          correctOptionId: "a",
          explanation: "AI allows companies to tap into a global talent pool and reach passive candidates who aren't actively searching."
        }
      ]
    },
    {
      id: "05",
      title: "AI in Resume Screening and Shortlisting",
      description: "Automating the initial stages of recruitment with AI.",
      lessons: [
        "How AI-based Applicant Tracking Systems (ATS) work",
        "Ranking and scoring candidates using AI",
        "NLP for skill and experience extraction",
        "Reducing manual effort in high-volume hiring",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m05.pdf",
      quiz: [
        {
          id: "hr5-q1",
          question: "AI screening helps:",
          options: [
            { id: "a", text: "Manual sorting" },
            { id: "b", text: "Automated filtering" },
            { id: "c", text: "Ignoring resumes" },
            { id: "d", text: "Deleting data" }
          ],
          correctOptionId: "b",
          explanation: "AI can instantly filter through thousands of resumes to identify those that meet the core requirements."
        },
        {
          id: "hr5-q2",
          question: "AI filters based on:",
          options: [
            { id: "a", text: "Guess" },
            { id: "b", text: "Keywords & skills" },
            { id: "c", text: "Names" },
            { id: "d", text: "Photos" }
          ],
          correctOptionId: "b",
          explanation: "Algorithms match the text in a resume with the specific skills and experience defined in the job description."
        },
        {
          id: "hr5-q3",
          question: "Benefit:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Automated screening handles high volumes of applicants far faster than any human recruiter."
        },
        {
          id: "hr5-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Bias" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "If the screening criteria are biased, the AI will repeat and scale that bias across all candidates."
        },
        {
          id: "hr5-q5",
          question: "Requires:",
          options: [
            { id: "a", text: "Validation" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Recruiters must regularly audit AI screening results to ensure quality and fairness."
        }
      ]
    },
    {
      id: "06",
      title: "AI in Recruitment Marketing",
      description: "Enhancing employer branding and candidate attraction with AI.",
      lessons: [
        "Personalized candidate experiences on career sites",
        "AI-generated job descriptions and ad copy",
        "Predictive modeling for candidate behavior",
        "Optimizing recruitment spend with AI",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m06.pdf",
      quiz: [
        {
          id: "hr6-q1",
          question: "AI helps in:",
          options: [
            { id: "a", text: "Ignoring candidates" },
            { id: "b", text: "Targeted campaigns" },
            { id: "c", text: "Deleting ads" },
            { id: "d", text: "Avoiding hiring" }
          ],
          correctOptionId: "b",
          explanation: "AI analyzes audience data to place job ads in front of the most relevant candidates."
        },
        {
          id: "hr6-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Better reach" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Targeted AI marketing ensures your brand reaches the right talent pools effectively."
        },
        {
          id: "hr6-q3",
          question: "AI uses:",
          options: [
            { id: "a", text: "Guess" },
            { id: "b", text: "Candidate data" },
            { id: "c", text: "Books" },
            { id: "d", text: "Notes" }
          ],
          correctOptionId: "b",
          explanation: "Recruitment marketing AI leverages past candidate behavior and demographic data to optimize ads."
        },
        {
          id: "hr6-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Mis-targeting" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Poorly configured algorithms could waste budget by showing ads to irrelevant audiences."
        },
        {
          id: "hr6-q5",
          question: "Outcome:",
          options: [
            { id: "a", text: "More applicants" },
            { id: "b", text: "Less hiring" },
            { id: "c", text: "Delay" },
            { id: "d", text: "Error" }
          ],
          correctOptionId: "a",
          explanation: "Effective AI-driven marketing leads to a higher volume of qualified applications."
        }
      ]
    },
    {
      id: "07",
      title: "Chatbots for Candidate Engagement",
      description: "Improving the candidate experience with conversational AI.",
      lessons: [
        "Types of HR chatbots and their use cases",
        "Designing conversational flows for recruitment",
        "24/7 candidate support and FAQ automation",
        "Integrating chatbots with recruitment workflows",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m07.pdf",
      quiz: [
        {
          id: "hr7-q1",
          question: "HR chatbots help in:",
          options: [
            { id: "a", text: "Ignoring queries" },
            { id: "b", text: "Candidate interaction" },
            { id: "c", text: "Deleting data" },
            { id: "d", text: "Avoiding hiring" }
          ],
          correctOptionId: "b",
          explanation: "Chatbots provide an immediate channel for candidates to ask questions and get updates."
        },
        {
          id: "hr7-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "24/7 support" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Candidates can interact with the company at any time, even outside of business hours."
        },
        {
          id: "hr7-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Miscommunication" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "A chatbot might misunderstand complex queries or provide overly generic responses."
        },
        {
          id: "hr7-q4",
          question: "Use case:",
          options: [
            { id: "a", text: "FAQs" },
            { id: "b", text: "Payroll" },
            { id: "c", text: "Legal" },
            { id: "d", text: "Finance" }
          ],
          correctOptionId: "a",
          explanation: "Answering frequently asked questions about roles and company culture is a primary use for HR bots."
        },
        {
          id: "hr7-q5",
          question: "Limitation:",
          options: [
            { id: "a", text: "Context understanding" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Current AI often struggles with deep conversational context and emotional nuance."
        }
      ]
    },
    {
      id: "08",
      title: "AI in Interview Scheduling and Coordination",
      description: "Streamlining the logistics of the hiring process.",
      lessons: [
        "Automated interview scheduling tools",
        "Coordination across multiple time zones and calendars",
        "Reducing 'time-to-hire' through logistical automation",
        "AI-driven candidate reminders and follow-ups",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m08.pdf",
      quiz: [
        {
          id: "hr8-q1",
          question: "AI scheduling helps:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Automation" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "AI removes the manual 'back-and-forth' of finding common times for interviews."
        },
        {
          id: "hr8-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Time-saving" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Automated scheduling saves hours of administrative work for recruiters and coordinators."
        },
        {
          id: "hr8-q3",
          question: "AI syncs with:",
          options: [
            { id: "a", text: "Calendars" },
            { id: "b", text: "Books" },
            { id: "c", text: "Notes" },
            { id: "d", text: "Paper" }
          ],
          correctOptionId: "a",
          explanation: "AI scheduling tools integrate directly with Outlook, Google, and other professional calendars."
        },
        {
          id: "hr8-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Errors" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Technical glitches could lead to double-bookings or missing calendar invites."
        },
        {
          id: "hr8-q5",
          question: "Outcome:",
          options: [
            { id: "a", text: "Efficiency" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Logistical automation leads to a smoother, faster hiring process for both candidates and the company."
        }
      ]
    },
    {
      id: "09",
      title: "AI-based Video Interview Analysis",
      description: "Using AI to gain deeper insights from video interviews.",
      lessons: [
        "Asynchronous video interviews and AI scoring",
        "Analyzing verbal and non-verbal cues",
        "Speech-to-text and sentiment analysis in interviews",
        "Ethical considerations of video analysis",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m09.pdf",
      quiz: [
        {
          id: "hr9-q1",
          question: "AI analyzes:",
          options: [
            { id: "a", text: "Random" },
            { id: "b", text: "Facial & speech patterns" },
            { id: "c", text: "Names" },
            { id: "d", text: "Dates" }
          ],
          correctOptionId: "b",
          explanation: "Video AI tools process visual and auditory data to identify traits like confidence and communication clarity."
        },
        {
          id: "hr9-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Insight" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI provides objective data points that help interviewers compare candidates more consistently."
        },
        {
          id: "hr9-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Bias" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Facial and emotion recognition AI can be biased against certain ethnicities or cultural expressions."
        },
        {
          id: "hr9-q4",
          question: "AI uses:",
          options: [
            { id: "a", text: "Data" },
            { id: "b", text: "Guess" },
            { id: "c", text: "Books" },
            { id: "d", text: "Notes" }
          ],
          correctOptionId: "a",
          explanation: "The analysis is based on millions of data points from previous successful interview patterns."
        },
        {
          id: "hr9-q5",
          question: "Requires:",
          options: [
            { id: "a", text: "Oversight" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Human recruiters must always make the final decision and not rely solely on an AI score."
        }
      ]
    },
    {
      id: "10",
      title: "Bias and Fairness in AI Hiring",
      description: "Ensuring ethical and unbiased recruitment practices.",
      lessons: [
        "Identifying sources of bias in AI algorithms",
        "Tools for auditing AI fairness",
        "Strategies for diverse and inclusive AI-driven hiring",
        "Regulatory landscape: NYC AEDT and beyond",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m10.pdf",
      quiz: [
        {
          id: "hr10-q1",
          question: "Bias comes from:",
          options: [
            { id: "a", text: "Data" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI models learn from historical data, which often contains human prejudices and social biases."
        },
        {
          id: "hr10-q2",
          question: "Fair AI means:",
          options: [
            { id: "a", text: "Equal treatment" },
            { id: "b", text: "Ignoring" },
            { id: "c", text: "Deleting" },
            { id: "d", text: "Avoiding" }
          ],
          correctOptionId: "a",
          explanation: "Ensuring that the algorithm evaluates all candidates based on merit, regardless of protected characteristics."
        },
        {
          id: "hr10-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Discrimination" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Unchecked AI bias can lead to systemic discrimination and legal liability for the organization."
        },
        {
          id: "hr10-q4",
          question: "Solution:",
          options: [
            { id: "a", text: "Audits" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Regular bias audits and algorithm transparency are essential for ethical AI hiring."
        },
        {
          id: "hr10-q5",
          question: "Goal:",
          options: [
            { id: "a", text: "Fair hiring" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "The ultimate objective is to build a diverse and qualified workforce through equitable technology."
        }
      ]
    },
    {
      id: "11",
      title: "AI in Employee Onboarding",
      description: "Creating a seamless and personalized onboarding experience.",
      lessons: [
        "Personalized onboarding journeys with AI",
        "Automating onboarding documentation and tasks",
        "AI-driven 'buddy' matching and networking",
        "Measuring onboarding success with predictive analytics",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m11.pdf",
      quiz: [
        { id: "hr11-q1", question: "How does AI help in onboarding?", options: [{ id: "a", text: "Automation" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI automates routine tasks like documentation and scheduling during onboarding." },
        { id: "hr11-q2", question: "What is a benefit of AI-driven onboarding?", options: [{ id: "a", text: "Speed" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "AI significantly speeds up the time it takes for a new hire to become productive." },
        { id: "hr11-q3", question: "Which AI tool is commonly used in onboarding?", options: [{ id: "a", text: "Chatbot" }, { id: "b", text: "Book" }, { id: "c", text: "Note" }, { id: "d", text: "File" }], correctOptionId: "a", explanation: "Chatbots answer new hire questions 24/7, improving the onboarding experience." },
        { id: "hr11-q4", question: "What is a risk of AI in onboarding?", options: [{ id: "a", text: "Errors" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "Technical errors or poor data can lead to a confusing experience for new employees." },
        { id: "hr11-q5", question: "What is the desired outcome of AI onboarding?", options: [{ id: "a", text: "Smooth onboarding" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "The goal is to ensure every employee has a consistent and high-quality introduction to the company." }
      ]
    },
    {
      id: "12",
      title: "AI for Learning and Development (L&D)",
      description: "Upskilling the workforce using AI-powered learning platforms.",
      lessons: [
        "AI-driven skills gap analysis",
        "Content curation and recommendation engines",
        "The role of AI in micro-learning",
        "Measuring the impact of L&D on performance",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m12.pdf",
      quiz: [
        { id: "hr12-q1", question: "AI supports L&D by:", options: [{ id: "a", text: "Training" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI helps identify and deliver the most relevant training content for each employee." },
        { id: "hr12-q2", question: "What is a key benefit of AI in L&D?", options: [{ id: "a", text: "Personalization" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "AI tailors the learning experience to each individual's skills and goals." },
        { id: "hr12-q3", question: "What is a common AI platform for L&D?", options: [{ id: "a", text: "LMS" }, { id: "b", text: "Book" }, { id: "c", text: "Note" }, { id: "d", text: "File" }], correctOptionId: "a", explanation: "Next-gen Learning Management Systems (LMS) use AI to power recommendations and paths." },
        { id: "hr12-q4", question: "What is a risk in AI-driven L&D?", options: [{ id: "a", text: "Inaccuracy" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "AI might recommend irrelevant courses if the skills data is inaccurate." },
        { id: "hr12-q5", question: "What is the outcome of effective AI L&D?", options: [{ id: "a", text: "Skill growth" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "Targeted training leads to faster skill development and a more capable workforce." }
      ]
    },
    {
      id: "13",
      title: "Personalized Training using AI",
      description: "Tailoring learning experiences to individual employee needs.",
      lessons: [
        "Adaptive learning paths",
        "AI coaching and mentoring tools",
        "Generative AI for creating custom training content",
        "Gamification and engagement in AI-driven learning",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m13.pdf",
      quiz: [
        { id: "hr13-q1", question: "AI adapts training based on:", options: [{ id: "a", text: "Content" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI dynamically changes the content based on the learner's performance." },
        { id: "hr13-q2", question: "What is a benefit of personalized training?", options: [{ id: "a", text: "Relevance" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "Employees are more engaged when the training is relevant to their specific role and needs." },
        { id: "hr13-q3", question: "What data does AI use for personalization?", options: [{ id: "a", text: "Performance" }, { id: "b", text: "Guess" }, { id: "c", text: "Book" }, { id: "d", text: "Note" }], correctOptionId: "a", explanation: "Past performance and assessment scores drive the personalization engine." },
        { id: "hr13-q4", question: "What is a risk of AI personalization?", options: [{ id: "a", text: "Data misuse" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "Personalization requires employee data, which must be handled securely." },
        { id: "hr13-q5", question: "What is the goal of AI training?", options: [{ id: "a", text: "Better learning" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "The ultimate goal is higher knowledge retention and better on-the-job performance." }
      ]
    },
    {
      id: "14",
      title: "AI in Performance Management",
      description: "Moving from annual reviews to continuous, data-driven feedback.",
      lessons: [
        "Real-time performance tracking and feedback",
        "AI-assisted performance reviews and goal setting",
        "Analyzing performance data for growth insights",
        "Reducing manager bias in performance evaluations",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m14.pdf",
      quiz: [
        { id: "hr14-q1", question: "AI tracks performance by:", options: [{ id: "a", text: "Performance" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI monitors real-time data to provide continuous performance insights." },
        { id: "hr14-q2", question: "What is a benefit of AI in performance reviews?", options: [{ id: "a", text: "Objectivity" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "AI reduces human bias by basing reviews on objective data and KPIs." },
        { id: "hr14-q3", question: "What data does AI analyze for reviews?", options: [{ id: "a", text: "KPIs" }, { id: "b", text: "Guess" }, { id: "c", text: "Book" }, { id: "d", text: "Note" }], correctOptionId: "a", explanation: "Key Performance Indicators (KPIs) and project data form the basis of the analysis." },
        { id: "hr14-q4", question: "What is a risk in AI performance tracking?", options: [{ id: "a", text: "Bias" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "If the underlying metrics are flawed, the AI's performance assessment will also be biased." },
        { id: "hr14-q5", question: "What is the outcome of AI performance management?", options: [{ id: "a", text: "Improvement" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "Continuous data leads to continuous improvement for both employees and the company." }
      ]
    },
    {
      id: "15",
      title: "Predictive Analytics for Employee Attrition",
      description: "Identifying and retaining 'at-risk' employees using AI.",
      lessons: [
        "Building attrition prediction models",
        "Key drivers of employee turnover",
        "Early warning systems and intervention strategies",
        "Ethical use of predictive attrition data",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m15.pdf",
      quiz: [
        { id: "hr15-q1", question: "AI predicts attrition by:", options: [{ id: "a", text: "Attrition" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI identifies patterns that indicate an employee is likely to leave the organization." },
        { id: "hr15-q2", question: "What is a benefit of attrition prediction?", options: [{ id: "a", text: "Retention" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "By knowing who is at risk, HR can take proactive steps to retain top talent." },
        { id: "hr15-q3", question: "What data is used for attrition models?", options: [{ id: "a", text: "Trends" }, { id: "b", text: "Guess" }, { id: "c", text: "Book" }, { id: "d", text: "Note" }], correctOptionId: "a", explanation: "Historical turnover trends and engagement data power these predictive models." },
        { id: "hr15-q4", question: "What is a risk in attrition prediction?", options: [{ id: "a", text: "Inaccuracy" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "A model might incorrectly flag employees, leading to unnecessary interventions." },
        { id: "hr15-q5", question: "What action follows an attrition alert?", options: [{ id: "a", text: "Preventive steps" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "HR should use the insight to have supportive conversations and address root causes." }
      ]
    },
    {
      id: "16",
      title: "AI in Employee Engagement and Sentiment Analysis",
      description: "Understanding the 'pulse' of the organization with AI.",
      lessons: [
        "NLP for analyzing employee surveys and feedback",
        "Real-time sentiment tracking on internal platforms",
        "Identifying engagement trends and hotspots",
        "Actionable insights for improving workplace culture",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m16.pdf",
      quiz: [
        { id: "hr16-q1", question: "AI measures engagement via:", options: [{ id: "a", text: "Sentiment" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI uses NLP to analyze the sentiment behind employee feedback and comments." },
        { id: "hr16-q2", question: "What is a benefit of sentiment analysis?", options: [{ id: "a", text: "Insight" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "HR gets real-time insights into the morale and culture of the company." },
        { id: "hr16-q3", question: "Which tool is used for engagement analysis?", options: [{ id: "a", text: "Surveys" }, { id: "b", text: "Book" }, { id: "c", text: "Note" }, { id: "d", text: "File" }], correctOptionId: "a", explanation: "AI analyzes employee surveys and feedback at scale." },
        { id: "hr16-q4", question: "What is a risk of engagement AI?", options: [{ id: "a", text: "Misinterpretation" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "AI might misread sarcasm or cultural nuances in written feedback." },
        { id: "hr16-q5", question: "What is the outcome of engagement analysis?", options: [{ id: "a", text: "Improvement" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "Actionable insights lead to targeted improvements in workplace culture." }
      ]
    },
    {
      id: "17",
      title: "AI in Workforce Planning and Forecasting",
      description: "Predicting future talent needs with AI.",
      lessons: [
        "Forecasting labor demand and supply",
        "Scenario planning and 'what-if' analysis",
        "AI-driven succession planning",
        "Optimizing workforce composition and costs",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m17.pdf",
      quiz: [
        { id: "hr17-q1", question: "AI forecasts future:", options: [{ id: "a", text: "Workforce" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI predicts how many employees and what skills will be needed in the future." },
        { id: "hr17-q2", question: "What is a benefit of workforce forecasting?", options: [{ id: "a", text: "Planning" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "It allows for better strategic planning and resource allocation." },
        { id: "hr17-q3", question: "What data does AI use for forecasting?", options: [{ id: "a", text: "Trends" }, { id: "b", text: "Guess" }, { id: "c", text: "Book" }, { id: "d", text: "Note" }], correctOptionId: "a", explanation: "Business growth trends and historical turnover data power the forecast." },
        { id: "hr17-q4", question: "What is a risk in workforce AI?", options: [{ id: "a", text: "Inaccuracy" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "External market shifts can make internal AI forecasts inaccurate." },
        { id: "hr17-q5", question: "What is the goal of workforce planning?", options: [{ id: "a", text: "Efficiency" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "The objective is to have the right talent in the right place at the right time." }
      ]
    },
    {
      id: "18",
      title: "AI in Payroll, Compliance, and HR Operations",
      description: "Automating routine HR tasks for higher accuracy and efficiency.",
      lessons: [
        "AI-powered payroll and benefits administration",
        "Automating compliance monitoring and reporting",
        "AI in document management and HR helpdesks",
        "Reducing operational risks through AI",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m18.pdf",
      quiz: [
        { id: "hr18-q1", question: "AI automates routine:", options: [{ id: "a", text: "Payroll" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI can handle payroll calculations and compliance reporting automatically." },
        { id: "hr18-q2", question: "What is a benefit of AI in HR operations?", options: [{ id: "a", text: "Accuracy" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "Automation reduces human error in sensitive tasks like payroll and tax." },
        { id: "hr18-q3", question: "What is a risk of AI in operations?", options: [{ id: "a", text: "Errors" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "Software bugs or incorrect logic could lead to widespread payroll errors." },
        { id: "hr18-q4", question: "AI helps ensure regulatory:", options: [{ id: "a", text: "Regulation" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI monitors changing laws to ensure the company remains compliant." },
        { id: "hr18-q5", question: "What is the outcome of operational AI?", options: [{ id: "a", text: "Efficiency" }, { id: "b", text: "Delay" }, { id: "c", text: "Error" }, { id: "d", text: "Confusion" }], correctOptionId: "a", explanation: "HR teams spend less time on paperwork and more on people strategy." }
      ]
    },
    {
      id: "19",
      title: "Ethics, Privacy, and Legal Issues in HR AI",
      description: "Navigating the complex legal and ethical landscape.",
      lessons: [
        "Data privacy and GDPR/CCPA in HR",
        "Transparency and explainability in AI decisions",
        "Legal risks of algorithmic discrimination",
        "Building an ethical AI framework for HR",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m19.pdf",
      quiz: [
        { id: "hr19-q1", question: "A primary ethical concern in HR AI is:", options: [{ id: "a", text: "Data misuse" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "Protecting sensitive employee data from unethical use is critical." },
        { id: "hr19-q2", question: "Responsible AI in HR requires:", options: [{ id: "a", text: "Fairness" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "AI must treat all employees and candidates fairly and without bias." },
        { id: "hr19-q3", question: "AI privacy in HR focuses on data:", options: [{ id: "a", text: "Protection" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "Ensuring compliance with data privacy laws like GDPR or DPDP is essential." },
        { id: "hr19-q4", question: "What is a risk of poor AI ethics?", options: [{ id: "a", text: "Breach" }, { id: "b", text: "Speed" }, { id: "c", text: "AI" }, { id: "d", text: "Tools" }], correctOptionId: "a", explanation: "Ethical failures can lead to legal penalties and loss of employee trust." },
        { id: "hr19-q5", question: "What is the solution for ethical AI?", options: [{ id: "a", text: "Policies" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "Clear organizational policies and audits are the foundation of ethical AI use." }
      ]
    },
    {
      id: "20",
      title: "Capstone – AI-driven HR Transformation Strategy",
      description: "Applying your learning to build a real-world HR AI roadmap.",
      lessons: [
        "Identifying high-impact AI use cases for your organization",
        "Designing an HR AI implementation roadmap",
        "Stakeholder management and change management",
        "Final project presentation and peer review",
      ],
      notesDownloadUrl: "/academy/notes/ai-for-hr/ai-for-hr-m20.pdf",
      quiz: [
        { id: "hr20-q1", question: "An HR AI strategy should start with:", options: [{ id: "a", text: "AI integration" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "Identifying where AI can solve specific organizational challenges is the first step." },
        { id: "hr20-q2", question: "Tool selection should be based on:", options: [{ id: "a", text: "Use case" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "The technology must fit the specific needs and context of the company." },
        { id: "hr20-q3", question: "Success of an AI strategy is measured by:", options: [{ id: "a", text: "Results" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "The ROI and actual impact on HR metrics determine the strategy's success." },
        { id: "hr20-q4", question: "Strategy planning must include risk:", options: [{ id: "a", text: "Mitigation" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "Anticipating and planning for potential AI failures or biases is critical." },
        { id: "hr20-q5", question: "Ongoing AI ethics is ensured by:", options: [{ id: "a", text: "Policies" }, { id: "b", text: "Ignore" }, { id: "c", text: "Delete" }, { id: "d", text: "Avoid" }], correctOptionId: "a", explanation: "Continuous policy reviews and audits keep the AI strategy ethical over time." }
      ]
    },
  ],
  syllabus: [
    {
      week: "Module 1-5",
      theme: "Foundations & Recruitment",
      focus: "AI basics and talent acquisition strategies",
      deliverable: "AI-enhanced sourcing plan",
    },
    {
      week: "Module 6-10",
      theme: "Engagement & Fairness",
      focus: "Marketing, chatbots, and bias mitigation",
      deliverable: "Recruitment chatbot flow",
    },
    {
      week: "Module 11-15",
      theme: "Talent Development",
      focus: "Onboarding, L&D, and performance management",
      deliverable: "AI-driven L&D roadmap",
    },
    {
      week: "Module 16-20",
      theme: "Ops & Transformation",
      focus: "Planning, operations, and final strategy",
      deliverable: "HR AI Transformation Roadmap",
    },
  ],
};
