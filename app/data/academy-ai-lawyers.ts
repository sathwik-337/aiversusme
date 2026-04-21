import type { AcademyCourse } from "@/app/data/academy";

export const aiLawyersCourse: AcademyCourse = {
  slug: "ai-for-lawyers",
  title: "AI FOR LAWYERS",
  tagline: "Revolutionize your legal practice with AI-powered research, drafting, and case strategy.",
  summary:
    "A comprehensive 20-module masterclass for legal professionals. Master AI tools for legal research, automated contract review, litigation prediction, and e-discovery, while navigating the complex ethical and privacy landscape of AI in law.",
  duration: "20 modules",
  pace: "Self-paced",
  level: "Intermediate",
  format: "Video lessons, legal tool walkthroughs, and hands-on case strategy workshops",
  audience: [
    "Lawyers and Legal Consultants",
    "Law Students and Academics",
    "Corporate Legal Teams",
    "Para-legals and Legal Researchers",
    "Judiciary and Policy Makers",
  ],
  outcomes: [
    "Master AI-powered legal research and case law analysis",
    "Automate contract drafting, review, and due diligence",
    "Implement AI for litigation strategy and case outcome prediction",
    "Leverage AI for e-discovery and digital evidence management",
    "Navigate the ethics, bias, and privacy implications of AI in law",
    "Design and execute an AI-enabled legal practice strategy",
  ],
  isCoding: false,
  price: 999,
  currency: "INR",
  modules: [
    { 
      id: "01", 
      title: "Introduction to AI in Law", 
      description: "Foundations of AI and its transformative potential in the legal sector.", 
      lessons: ["What is AI in Law?", "The Legal AI Landscape", "AI vs. Human Judgment", "Future Trends in Legal AI"],
      quiz: [
        {
          id: "l1-q1",
          question: "AI in law primarily helps in:",
          options: [
            { id: "a", text: "Replacing lawyers" },
            { id: "b", text: "Automating repetitive legal tasks" },
            { id: "c", text: "Ignoring legal processes" },
            { id: "d", text: "Eliminating courts" }
          ],
          correctOptionId: "b",
          explanation: "AI is designed to augment legal work by automating time-consuming and repetitive tasks, not to replace the essential human judgment of a lawyer."
        },
        {
          id: "l1-q2",
          question: "Which is a key benefit of AI in legal practice?",
          options: [
            { id: "a", text: "Increased manual work" },
            { id: "b", text: "Faster document analysis" },
            { id: "c", text: "Reduced accuracy" },
            { id: "d", text: "No impact" }
          ],
          correctOptionId: "b",
          explanation: "AI tools can process and analyze thousands of legal documents in seconds, a task that would take human teams weeks."
        },
        {
          id: "l1-q3",
          question: "AI tools in law mainly rely on:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Legal data and algorithms" },
            { id: "c", text: "Paper records" },
            { id: "d", text: "Manual typing" }
          ],
          correctOptionId: "b",
          explanation: "Legal AI systems are trained on massive datasets of case law, statutes, and contracts using sophisticated machine learning algorithms."
        },
        {
          id: "l1-q4",
          question: "A common misconception about AI in law is:",
          options: [
            { id: "a", text: "It supports lawyers" },
            { id: "b", text: "It improves efficiency" },
            { id: "c", text: "It replaces lawyers completely" },
            { id: "d", text: "It uses data" }
          ],
          correctOptionId: "c",
          explanation: "While AI is powerful, it lacks the complex reasoning, empathy, and ethical judgment required for many aspects of legal practice."
        },
        {
          id: "l1-q5",
          question: "AI enhances legal work by:",
          options: [
            { id: "a", text: "Delaying processes" },
            { id: "b", text: "Improving efficiency" },
            { id: "c", text: "Removing research" },
            { id: "d", text: "Ignoring evidence" }
          ],
          correctOptionId: "b",
          explanation: "AI streamlines legal workflows, allowing lawyers to focus on high-value strategic work rather than administrative tasks."
        }
      ]
    },
    { 
      id: "02", 
      title: "Evolution of LegalTech and AI Adoption", 
      description: "The journey from traditional law to AI-enhanced legal practice.", 
      lessons: ["Brief History of LegalTech", "The Shift to AI-Powered Law", "Stages of AI Adoption in Law Firms", "Global Legal AI Success Stories"],
      quiz: [
        {
          id: "l2-q1",
          question: "Early LegalTech focused on:",
          options: [
            { id: "a", text: "AI automation" },
            { id: "b", text: "Digitization of records" },
            { id: "c", text: "Predictive analytics" },
            { id: "d", text: "Robotics" }
          ],
          correctOptionId: "b",
          explanation: "The first wave of LegalTech was primarily about moving from paper-based systems to digital databases and word processing."
        },
        {
          id: "l2-q2",
          question: "AI adoption increased due to:",
          options: [
            { id: "a", text: "Reduced data" },
            { id: "b", text: "Availability of large datasets" },
            { id: "c", text: "Manual processes" },
            { id: "d", text: "Paper-based systems" }
          ],
          correctOptionId: "b",
          explanation: "The explosion of digital legal data provided the 'fuel' needed to train effective machine learning models for the legal sector."
        },
        {
          id: "l2-q3",
          question: "Traditional legal systems are limited by:",
          options: [
            { id: "a", text: "Automation" },
            { id: "b", text: "Time-consuming processes" },
            { id: "c", text: "Accuracy" },
            { id: "d", text: "AI tools" }
          ],
          correctOptionId: "b",
          explanation: "Manual legal processes are often slow, expensive, and prone to human error when dealing with massive volumes of data."
        },
        {
          id: "l2-q4",
          question: "Modern LegalTech focuses on:",
          options: [
            { id: "a", text: "Manual drafting" },
            { id: "b", text: "AI-driven insights" },
            { id: "c", text: "Paper storage" },
            { id: "d", text: "Offline work" }
          ],
          correctOptionId: "b",
          explanation: "The current focus of LegalTech is on using AI to extract meaningful insights and predictions from legal data."
        },
        {
          id: "l2-q5",
          question: "LegalTech evolution led to:",
          options: [
            { id: "a", text: "Slower processes" },
            { id: "b", text: "Efficient legal workflows" },
            { id: "c", text: "Removal of lawyers" },
            { id: "d", text: "Less accuracy" }
          ],
          correctOptionId: "b",
          explanation: "The integration of technology has made legal services more accessible, efficient, and data-driven."
        }
      ]
    },
    { 
      id: "03", 
      title: "Legal Data and Document Digitization", 
      description: "Transforming physical legal records into AI-ready digital data.", 
      lessons: ["Digitizing Legal Records", "OCR and Data Extraction", "Structuring Legal Data", "Managing Digital Archives"],
      quiz: [
        {
          id: "l3-q1",
          question: "Digitization helps in:",
          options: [
            { id: "a", text: "Data loss" },
            { id: "b", text: "Easy access" },
            { id: "c", text: "Delays" },
            { id: "d", text: "Errors" }
          ],
          correctOptionId: "b",
          explanation: "Digital records can be searched, shared, and analyzed instantly, unlike physical paper files."
        },
        {
          id: "l3-q2",
          question: "Legal data includes:",
          options: [
            { id: "a", text: "Only case names" },
            { id: "b", text: "Judgments, contracts, filings" },
            { id: "c", text: "Only books" },
            { id: "d", text: "Only notes" }
          ],
          correctOptionId: "b",
          explanation: "Legal AI systems process a wide range of documents including court orders, agreements, and legal submissions."
        },
        {
          id: "l3-q3",
          question: "AI requires data in:",
          options: [
            { id: "a", text: "Paper format" },
            { id: "b", text: "Digital format" },
            { id: "c", text: "Verbal format" },
            { id: "d", text: "Random format" }
          ],
          correctOptionId: "b",
          explanation: "AI algorithms can only process data that has been converted into a machine-readable digital format."
        },
        {
          id: "l3-q4",
          question: "Benefit of digitization:",
          options: [
            { id: "a", text: "Faster retrieval" },
            { id: "b", text: "More confusion" },
            { id: "c", text: "Data loss" },
            { id: "d", text: "Delays" }
          ],
          correctOptionId: "a",
          explanation: "Searching through digital archives takes seconds, compared to hours of manual file searching."
        },
        {
          id: "l3-q5",
          question: "Risk:",
          options: [
            { id: "a", text: "Efficiency" },
            { id: "b", text: "Data breaches" },
            { id: "c", text: "Speed" },
            { id: "d", text: "Automation" }
          ],
          correctOptionId: "b",
          explanation: "While digital data is efficient, it must be protected against cyberattacks and unauthorized access."
        }
      ]
    },
    { 
      id: "04", 
      title: "AI in Legal Research", 
      description: "Accelerating and deepening legal research with AI assistants.", 
      lessons: ["AI-Powered Research Platforms", "Natural Language Querying", "Identifying Relevant Statutes", "Research Efficiency and Accuracy"],
      quiz: [
        {
          id: "l4-q1",
          question: "AI legal research tools:",
          options: [
            { id: "a", text: "Slow research" },
            { id: "b", text: "Quick case retrieval" },
            { id: "c", text: "No data" },
            { id: "d", text: "Manual typing" }
          ],
          correctOptionId: "b",
          explanation: "AI allows lawyers to find relevant case law and statutes almost instantly using natural language queries."
        },
        {
          id: "l4-q2",
          question: "AI improves research by:",
          options: [
            { id: "a", text: "Ignoring data" },
            { id: "b", text: "Analyzing large datasets" },
            { id: "c", text: "Removing cases" },
            { id: "d", text: "Slowing process" }
          ],
          correctOptionId: "b",
          explanation: "AI can scan millions of legal documents to find the most relevant precedents for a specific case."
        },
        {
          id: "l4-q3",
          question: "Example of AI research task:",
          options: [
            { id: "a", text: "Drafting manually" },
            { id: "b", text: "Finding precedents" },
            { id: "c", text: "Filing papers" },
            { id: "d", text: "Court visits" }
          ],
          correctOptionId: "b",
          explanation: "Identifying relevant past judgments (precedents) is one of the most common uses of AI in legal research."
        },
        {
          id: "l4-q4",
          question: "Risk in AI research:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Incomplete results" },
            { id: "c", text: "Automation" },
            { id: "d", text: "Accuracy" }
          ],
          correctOptionId: "b",
          explanation: "If not used correctly, AI might miss obscure but critical cases, or provide 'hallucinated' information if using general-purpose models."
        },
        {
          id: "l4-q5",
          question: "Validation is required to:",
          options: [
            { id: "a", text: "Save time" },
            { id: "b", text: "Ensure accuracy" },
            { id: "c", text: "Avoid AI" },
            { id: "d", text: "Reduce work" }
          ],
          correctOptionId: "b",
          explanation: "A lawyer must always verify AI-found citations and arguments to ensure they are current and accurate."
        }
      ]
    },
    { 
      id: "05", 
      title: "AI-powered Case Law Analysis", 
      description: "Analyzing precedents and case outcomes using machine learning.", 
      lessons: ["Precedent Analysis with AI", "Identifying Case Patterns", "Case Law Summarization", "Predicting Judicial Trends"],
      quiz: [
        {
          id: "l5-q1",
          question: "AI helps analyze:",
          options: [
            { id: "a", text: "Only text" },
            { id: "b", text: "Case patterns" },
            { id: "c", text: "Only names" },
            { id: "d", text: "Only dates" }
          ],
          correctOptionId: "b",
          explanation: "AI can identify subtle patterns in how judges rule on specific issues over time."
        },
        {
          id: "l5-q2",
          question: "AI identifies:",
          options: [
            { id: "a", text: "Random info" },
            { id: "b", text: "Legal trends" },
            { id: "c", text: "Irrelevant data" },
            { id: "d", text: "Errors" }
          ],
          correctOptionId: "b",
          explanation: "AI analysis can highlight shifting judicial trends and evolving interpretations of the law."
        },
        {
          id: "l5-q3",
          question: "Benefit:",
          options: [
            { id: "a", text: "Faster insights" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Errors" }
          ],
          correctOptionId: "a",
          explanation: "AI can summarize lengthy judgments and provide key insights in a fraction of the time it takes a human."
        },
        {
          id: "l5-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Bias" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI models might reflect biases present in the historical case data they were trained on."
        },
        {
          id: "l5-q5",
          question: "AI supports lawyers by:",
          options: [
            { id: "a", text: "Replacing them" },
            { id: "b", text: "Assisting decisions" },
            { id: "c", text: "Ignoring data" },
            { id: "d", text: "Avoiding cases" }
          ],
          correctOptionId: "b",
          explanation: "AI provides the data and analysis that help lawyers make more informed strategic decisions."
        }
      ]
    },
    { 
      id: "06", 
      title: "Contract Analysis and Review using AI", 
      description: "Automating the review and analysis of complex legal agreements.", 
      lessons: ["AI Contract Review Tools", "Identifying High-Risk Clauses", "Automated Compliance Checks", "Scaling Contract Workflows"],
      quiz: [
        {
          id: "l6-q1",
          question: "AI detects:",
          options: [
            { id: "a", text: "Only names" },
            { id: "b", text: "Clauses and risks" },
            { id: "c", text: "Colors" },
            { id: "d", text: "Fonts" }
          ],
          correctOptionId: "b",
          explanation: "AI can identify specific types of clauses (e.g., indemnity, termination) and flag potential risks or deviations from standards."
        },
        {
          id: "l6-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Errors" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Reviewing hundreds of pages of contracts takes AI seconds, compared to days for a human team."
        },
        {
          id: "l6-q3",
          question: "AI reduces:",
          options: [
            { id: "a", text: "Accuracy" },
            { id: "b", text: "Manual review time" },
            { id: "c", text: "Legal risk" },
            { id: "d", text: "Work quality" }
          ],
          correctOptionId: "b",
          explanation: "By handling the initial review, AI significantly cuts down the time lawyers spend on routine document reading."
        },
        {
          id: "l6-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Misinterpretation" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI might miss highly nuanced language or context-specific meanings that a human lawyer would catch."
        },
        {
          id: "l6-q5",
          question: "Validation ensures:",
          options: [
            { id: "a", text: "Accuracy" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Removal" }
          ],
          correctOptionId: "a",
          explanation: "A human lawyer must review AI's findings to ensure they are correct and apply to the specific legal context."
        }
      ]
    },
    { 
      id: "07", 
      title: "AI in Due Diligence", 
      description: "Streamlining due diligence processes with AI-driven automation.", 
      lessons: ["AI for M&A Due Diligence", "Identifying Legal Risks", "Automated Document Sorting", "Due Diligence Efficiency"],
      quiz: [
        {
          id: "l7-q1",
          question: "AI helps in:",
          options: [
            { id: "a", text: "Ignoring data" },
            { id: "b", text: "Reviewing documents" },
            { id: "c", text: "Deleting records" },
            { id: "d", text: "Avoiding analysis" }
          ],
          correctOptionId: "b",
          explanation: "AI can quickly sort and analyze thousands of documents in a virtual data room during M&A."
        },
        {
          id: "l7-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Faster processing" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Errors" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI allows due diligence teams to cover much more ground in less time, reducing deal cycles."
        },
        {
          id: "l7-q3",
          question: "AI analyzes:",
          options: [
            { id: "a", text: "Only names" },
            { id: "b", text: "Risk factors" },
            { id: "c", text: "Colors" },
            { id: "d", text: "Fonts" }
          ],
          correctOptionId: "b",
          explanation: "AI flags liabilities, unusual clauses, and regulatory non-compliance in target companies."
        },
        {
          id: "l7-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Missing details" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "If the AI isn't trained on specific industry documents, it might miss subtle red flags."
        },
        {
          id: "l7-q5",
          question: "AI improves:",
          options: [
            { id: "a", text: "Accuracy" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Removal" }
          ],
          correctOptionId: "a",
          explanation: "By reducing human fatigue in repetitive document review, AI helps maintain a higher overall standard of accuracy."
        }
      ]
    },
    { 
      id: "08", 
      title: "Drafting Legal Documents with AI", 
      description: "Using AI to draft high-quality legal documents and pleadings.", 
      lessons: ["AI Document Assembly", "Personalizing Legal Drafts", "Ensuring Drafting Consistency", "AI-Powered Pleading Creation"],
      quiz: [
        {
          id: "l8-q1",
          question: "AI drafting helps:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Speed" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "AI can generate first drafts of contracts, letters, and pleadings based on standard templates and case facts."
        },
        {
          id: "l8-q2",
          question: "AI can draft:",
          options: [
            { id: "a", text: "Contracts" },
            { id: "b", text: "Notes only" },
            { id: "c", text: "Books" },
            { id: "d", text: "Files" }
          ],
          correctOptionId: "a",
          explanation: "AI tools are widely used for assembling complex contracts and legal submissions."
        },
        {
          id: "l8-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Inaccuracy" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI might include outdated clauses or fail to account for the very latest changes in law."
        },
        {
          id: "l8-q4",
          question: "Customization requires:",
          options: [
            { id: "a", text: "Editing" },
            { id: "b", text: "Ignoring" },
            { id: "c", text: "Deleting" },
            { id: "d", text: "Avoiding" }
          ],
          correctOptionId: "a",
          explanation: "A lawyer must always tailor an AI draft to the specific facts and requirements of the client."
        },
        {
          id: "l8-q5",
          question: "Final review by:",
          options: [
            { id: "a", text: "AI" },
            { id: "b", text: "Lawyer" },
            { id: "c", text: "Student" },
            { id: "d", text: "System" }
          ],
          correctOptionId: "b",
          explanation: "The lawyer remains responsible for the quality and accuracy of the final document."
        }
      ]
    },
    { 
      id: "09", 
      title: "AI in Litigation Strategy and Case Prediction", 
      description: "Using data-driven insights to design winning litigation strategies.", 
      lessons: ["Predicting Case Outcomes", "Strategic Decision Support", "Analyzing Opposing Counsel", "Litigation Risk Management"],
      quiz: [
        {
          id: "l9-q1",
          question: "AI predicts:",
          options: [
            { id: "a", text: "Random" },
            { id: "b", text: "Case outcomes" },
            { id: "c", text: "Names" },
            { id: "d", text: "Dates" }
          ],
          correctOptionId: "b",
          explanation: "AI can analyze thousands of similar past cases to estimate the likelihood of winning a current case."
        },
        {
          id: "l9-q2",
          question: "AI uses:",
          options: [
            { id: "a", text: "Guess" },
            { id: "b", text: "Historical data" },
            { id: "c", text: "Chalk" },
            { id: "d", text: "Books" }
          ],
          correctOptionId: "b",
          explanation: "Case predictions are based on statistical analysis of historical court records and judicial behavior."
        },
        {
          id: "l9-q3",
          question: "Benefit:",
          options: [
            { id: "a", text: "Insight" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI provides strategic insights that help lawyers advise clients on whether to settle or go to trial."
        },
        {
          id: "l9-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Over-reliance" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Statistics are not certainties; over-relying on a prediction can lead to poor tactical choices."
        },
        {
          id: "l9-q5",
          question: "AI supports:",
          options: [
            { id: "a", text: "Strategy building" },
            { id: "b", text: "Ignoring" },
            { id: "c", text: "Avoiding" },
            { id: "d", text: "Removing" }
          ],
          correctOptionId: "a",
          explanation: "AI helps lawyers identify the most effective arguments and anticipate the moves of opposing counsel."
        }
      ]
    },
    { 
      id: "10", 
      title: "AI in E-Discovery", 
      description: "Leveraging AI for large-scale digital discovery and analysis.", 
      lessons: ["What is E-Discovery AI?", "Predictive Coding and TAR", "Managing Massive Data Sets", "Reducing Discovery Costs"],
      quiz: [
        {
          id: "l10-q1",
          question: "E-discovery means:",
          options: [
            { id: "a", text: "Manual search" },
            { id: "b", text: "Digital evidence search" },
            { id: "c", text: "Paper filing" },
            { id: "d", text: "Court visits" }
          ],
          correctOptionId: "b",
          explanation: "E-discovery is the process of identifying, collecting, and producing electronically stored information (ESI) in response to a request for production in a law suit."
        },
        {
          id: "l10-q2",
          question: "AI helps by:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI can sort through terabytes of emails and documents to find relevant evidence far faster than humans."
        },
        {
          id: "l10-q3",
          question: "AI processes:",
          options: [
            { id: "a", text: "Large data" },
            { id: "b", text: "Small data" },
            { id: "c", text: "No data" },
            { id: "d", text: "Random" }
          ],
          correctOptionId: "a",
          explanation: "AI is essential for managing the massive volumes of digital data involved in modern litigation."
        },
        {
          id: "l10-q4",
          question: "Risk:",
          options: [
            { id: "a", text: "Missing evidence" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "If search parameters are poorly defined, the AI might miss critical pieces of evidence."
        },
        {
          id: "l10-q5",
          question: "Benefit:",
          options: [
            { id: "a", text: "Efficiency" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI significantly reduces the time and cost of the discovery phase of litigation."
        }
      ]
    },
    { 
      id: "11", 
      title: "AI for Client Interaction and Chatbots", 
      description: "Enhancing client engagement with AI-driven assistants.", 
      lessons: ["Building Legal Chatbots", "Automated Client Onboarding", "24/7 Legal Inquiries", "Conversational AI for Law"],
      quiz: [
        {
          id: "l11-q1",
          question: "AI chatbots help in:",
          options: [
            { id: "a", text: "Support" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delay" },
            { id: "d", text: "Remove" }
          ],
          correctOptionId: "a",
          explanation: "AI chatbots provide 24/7 support to clients, answering routine questions and improving responsiveness."
        },
        {
          id: "l11-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Chatbots offer instant responses, reducing wait times for clients and freeing up staff for complex work."
        },
        {
          id: "l11-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Miscommunication" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI might provide incorrect or overly generic legal information, which could mislead a client."
        },
        {
          id: "l11-q4",
          question: "Use case:",
          options: [
            { id: "a", text: "Client queries" },
            { id: "b", text: "Court filing" },
            { id: "c", text: "Judging" },
            { id: "d", text: "Arrest" }
          ],
          correctOptionId: "a",
          explanation: "Handling initial client inquiries and screening is a primary use case for legal chatbots."
        },
        {
          id: "l11-q5",
          question: "Limitation:",
          options: [
            { id: "a", text: "Context understanding" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI often struggles with the complex emotional and factual nuances of individual legal cases."
        }
      ]
    },
    { 
      id: "12", 
      title: "AI in Compliance and Regulatory Monitoring", 
      description: "Monitoring regulations and ensuring compliance with AI.", 
      lessons: ["Real-time Regulatory Tracking", "Automated Compliance Audits", "Predictive Risk Monitoring", "Global Compliance Management"],
      quiz: [
        {
          id: "l12-q1",
          question: "AI monitors:",
          options: [
            { id: "a", text: "Regulations" },
            { id: "b", text: "Games" },
            { id: "c", text: "Books" },
            { id: "d", text: "Files" }
          ],
          correctOptionId: "a",
          explanation: "AI systems can scan thousands of regulatory updates in real-time to ensure a business remains compliant."
        },
        {
          id: "l12-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Real-time alerts" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI provides immediate notifications when a new law or regulation impacts a company's operations."
        },
        {
          id: "l12-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "False alerts" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI might flag irrelevant changes, leading to 'alert fatigue' for compliance officers."
        },
        {
          id: "l12-q4",
          question: "Helps in:",
          options: [
            { id: "a", text: "Risk reduction" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Remove" }
          ],
          correctOptionId: "a",
          explanation: "By ensuring all rules are followed, AI significantly lowers the risk of legal penalties and fines."
        },
        {
          id: "l12-q5",
          question: "Requires:",
          options: [
            { id: "a", text: "Updates" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Compliance AI must be constantly updated to reflect the latest legal and regulatory environment."
        }
      ]
    },
    { 
      id: "13", 
      title: "AI in Intellectual Property (Search, Filing, Infringement)", 
      description: "Managing IP portfolios and identifying infringement using AI.", 
      lessons: ["AI-Powered Trademark Search", "Automated Patent Filing", "Identifying IP Infringement", "IP Portfolio Optimization"],
      quiz: [
        {
          id: "l13-q1",
          question: "AI helps in:",
          options: [
            { id: "a", text: "Patent search" },
            { id: "b", text: "Cooking" },
            { id: "c", text: "Painting" },
            { id: "d", text: "Gaming" }
          ],
          correctOptionId: "a",
          explanation: "AI can search global patent and trademark databases to identify potential conflicts or prior art."
        },
        {
          id: "l13-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI can analyze visual and textual IP data far faster than a human researcher."
        },
        {
          id: "l13-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Inaccuracy" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI might miss subtle similarities that could still constitute IP infringement."
        },
        {
          id: "l13-q4",
          question: "Detects:",
          options: [
            { id: "a", text: "Infringement" },
            { id: "b", text: "Names" },
            { id: "c", text: "Dates" },
            { id: "d", text: "Files" }
          ],
          correctOptionId: "a",
          explanation: "AI is used to monitor the web and marketplaces for unauthorized use of protected IP."
        },
        {
          id: "l13-q5",
          question: "Requires:",
          options: [
            { id: "a", text: "Validation" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "A legal expert must verify AI-flagged IP issues to determine if they truly constitute infringement."
        }
      ]
    },
    { 
      id: "14", 
      title: "AI in Corporate Law and Transactions", 
      description: "Optimizing corporate legal workflows and transactions with AI.", 
      lessons: ["AI for Corporate Governance", "Automating Transactional Work", "Corporate Compliance with AI", "Strategic Corporate Advice"],
      quiz: [
        {
          id: "l14-q1",
          question: "AI supports:",
          options: [
            { id: "a", text: "Contracts" },
            { id: "b", text: "Games" },
            { id: "c", text: "Painting" },
            { id: "d", text: "Files" }
          ],
          correctOptionId: "a",
          explanation: "Corporate lawyers use AI to manage massive volumes of commercial agreements and corporate records."
        },
        {
          id: "l14-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Efficiency" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI streamlines the legal aspects of corporate transactions, saving time and reducing costs."
        },
        {
          id: "l14-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Errors" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Automated review might miss unique deal terms that are not part of standard training data."
        },
        {
          id: "l14-q4",
          question: "Used in:",
          options: [
            { id: "a", text: "M&A" },
            { id: "b", text: "Cooking" },
            { id: "c", text: "Gaming" },
            { id: "d", text: "Painting" }
          ],
          correctOptionId: "a",
          explanation: "Mergers and acquisitions involve massive document review where AI is highly effective."
        },
        {
          id: "l14-q5",
          question: "Requires:",
          options: [
            { id: "a", text: "Oversight" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Human lawyers must oversee AI-driven corporate transactions to ensure strategic goals are met."
        }
      ]
    },
    { 
      id: "15", 
      title: "AI in Cyber Law and Digital Evidence", 
      description: "Navigating the intersection of AI, cyber law, and evidence.", 
      lessons: ["Analyzing Digital Evidence", "AI for Cybercrime Investigation", "Navigating Cyber Regulations", "AI in Digital Forensics"],
      quiz: [
        {
          id: "l15-q1",
          question: "AI helps in:",
          options: [
            { id: "a", text: "Digital evidence" },
            { id: "b", text: "Painting" },
            { id: "c", text: "Cooking" },
            { id: "d", text: "Gaming" }
          ],
          correctOptionId: "a",
          explanation: "AI can process and analyze vast amounts of digital data (emails, logs, files) to find evidence of cybercrime."
        },
        {
          id: "l15-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Analysis" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI can find connections between disparate pieces of digital evidence that a human might miss."
        },
        {
          id: "l15-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Data misuse" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Sensitive digital evidence must be handled securely to avoid breaches or contamination."
        },
        {
          id: "l15-q4",
          question: "Used in:",
          options: [
            { id: "a", text: "Cybercrime" },
            { id: "b", text: "Cooking" },
            { id: "c", text: "Painting" },
            { id: "d", text: "Gaming" }
          ],
          correctOptionId: "a",
          explanation: "Investigating data breaches and online fraud is a primary use case for AI in cyber law."
        },
        {
          id: "l15-q5",
          question: "Requires:",
          options: [
            { id: "a", text: "Security" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Digital evidence handling requires strict security protocols and a clear chain of custody."
        }
      ]
    },
    { 
      id: "16", 
      title: "AI in Forensics and Investigation Support", 
      description: "Using AI to support legal investigations and forensics.", 
      lessons: ["AI-Driven Fact Finding", "Automated Evidence Sorting", "Investigation Pattern Recognition", "Supporting Forensic Analysis"],
      quiz: [
        {
          id: "l16-q1",
          question: "AI supports:",
          options: [
            { id: "a", text: "Investigation" },
            { id: "b", text: "Cooking" },
            { id: "c", text: "Painting" },
            { id: "d", text: "Gaming" }
          ],
          correctOptionId: "a",
          explanation: "AI is used to process forensic data and identify patterns that support criminal and civil investigations."
        },
        {
          id: "l16-q2",
          question: "Benefit:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI can analyze forensic data at a scale that is impossible for manual teams."
        },
        {
          id: "l16-q3",
          question: "Risk:",
          options: [
            { id: "a", text: "Inaccuracy" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Flawed forensic AI could lead to wrongful conclusions if the underlying data or algorithms are biased."
        },
        {
          id: "l16-q4",
          question: "Used in:",
          options: [
            { id: "a", text: "Evidence analysis" },
            { id: "b", text: "Cooking" },
            { id: "c", text: "Painting" },
            { id: "d", text: "Gaming" }
          ],
          correctOptionId: "a",
          explanation: "Sorting and analyzing massive volumes of physical and digital evidence is a key AI use case."
        },
        {
          id: "l16-q5",
          question: "Requires:",
          options: [
            { id: "a", text: "Validation" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Forensic AI results must be validated by human experts to be admissible in court."
        }
      ]
    },
    { 
      id: "17", 
      title: "Ethics of AI in Legal Practice", 
      description: "Navigating the ethical challenges of AI-powered law.", 
      lessons: ["AI and Professional Responsibility", "Maintaining Client Confidentiality", "The Role of Human Oversight", "Ethical AI Guidelines for Lawyers"],
      quiz: [
        {
          id: "l17-q1",
          question: "Concern:",
          options: [
            { id: "a", text: "Bias" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Algorithmic bias is a major ethical concern, as it can lead to unfair outcomes for marginalized groups."
        },
        {
          id: "l17-q2",
          question: "Responsible use:",
          options: [
            { id: "a", text: "Fairness" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Lawyers must ensure that their use of AI is fair, transparent, and ethically sound."
        },
        {
          id: "l17-q3",
          question: "Transparency builds:",
          options: [
            { id: "a", text: "Trust" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Being open about how AI is used in a case helps build trust with clients and the court."
        },
        {
          id: "l17-q4",
          question: "Role of lawyer:",
          options: [
            { id: "a", text: "Guidance" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "The lawyer must act as the ethical pilot, ensuring AI is used responsibly and effectively."
        },
        {
          id: "l17-q5",
          question: "Risk:",
          options: [
            { id: "a", text: "Misuse" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Using AI without proper understanding or oversight can lead to ethical breaches and legal malpractice."
        }
      ]
    },
    { 
      id: "18", 
      title: "Data Privacy and Legal Implications (Indian Context)", 
      description: "Understanding data privacy laws and their impact on legal AI.", 
      lessons: ["India's Data Protection Framework", "Securing Legal Data", "Cross-Border Data Flows", "Privacy Risks in Legal AI"],
      quiz: [
        {
          id: "l18-q1",
          question: "Law relevance:",
          options: [
            { id: "a", text: "Data protection" },
            { id: "b", text: "Painting" },
            { id: "c", text: "Cooking" },
            { id: "d", text: "Gaming" }
          ],
          correctOptionId: "a",
          explanation: "India's data protection laws (like the DPDP Act) significantly impact how legal AI can handle personal data."
        },
        {
          id: "l18-q2",
          question: "Risk:",
          options: [
            { id: "a", text: "Breach" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "A breach of sensitive legal data can have severe consequences for both the firm and its clients."
        },
        {
          id: "l18-q3",
          question: "Protection:",
          options: [
            { id: "a", text: "Encryption" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Encryption is a key technical safeguard for protecting sensitive legal data from unauthorized access."
        },
        {
          id: "l18-q4",
          question: "Consent:",
          options: [
            { id: "a", text: "Permission" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Obtaining explicit consent from clients before processing their data with AI is a legal and ethical requirement."
        },
        {
          id: "l18-q5",
          question: "Importance:",
          options: [
            { id: "a", text: "Safety" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Ensuring data safety is essential for maintaining client trust and complying with the law."
        }
      ]
    },
    { 
      id: "19", 
      title: "Risks, Bias, and Limitations of AI in Law", 
      description: "Understanding the pitfalls and limitations of legal AI systems.", 
      lessons: ["Identifying AI Bias in Law", "Managing AI-Driven Risks", "The Hallucination Problem", "Boundaries of Legal AI"],
      quiz: [
        {
          id: "l19-q1",
          question: "Bias comes from:",
          options: [
            { id: "a", text: "Data" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI bias is often a reflection of the biases present in the historical legal data used to train the models."
        },
        {
          id: "l19-q2",
          question: "Risk:",
          options: [
            { id: "a", text: "Inaccuracy" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI can 'hallucinate' or provide incorrect information, which could be disastrous in a legal context if not caught."
        },
        {
          id: "l19-q3",
          question: "Limitation:",
          options: [
            { id: "a", text: "Context gap" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "AI often lacks the deep contextual and nuanced understanding that human lawyers bring to a case."
        },
        {
          id: "l19-q4",
          question: "Overuse leads to:",
          options: [
            { id: "a", text: "Dependency" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Over-reliance on AI can lead to a decline in critical legal reasoning and judgment among practitioners."
        },
        {
          id: "l19-q5",
          question: "Solution:",
          options: [
            { id: "a", text: "Human oversight" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "The 'human-in-the-loop' approach is the best way to manage the risks and limitations of legal AI."
        }
      ]
    },
    { 
      id: "20", 
      title: "Capstone – AI-enabled Legal Practice / Case Strategy", 
      description: "Final project: Designing a complete AI-integrated legal strategy.", 
      lessons: ["Defining Legal Objectives", "Selecting Your Legal AI Stack", "Designing Your AI Workflow", "Presenting Your AI Strategy"],
      quiz: [
        {
          id: "l20-q1",
          question: "Strategy includes:",
          options: [
            { id: "a", text: "AI tools" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "A modern legal strategy should identify where AI can add value to the practice or a specific case."
        },
        {
          id: "l20-q2",
          question: "Tool selection:",
          options: [
            { id: "a", text: "Use case" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Legal AI tools should be selected based on their fit for specific legal tasks and objectives."
        },
        {
          id: "l20-q3",
          question: "Success measured by:",
          options: [
            { id: "a", text: "Results" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "The success of an AI strategy should be measured by improved legal outcomes and practice efficiency."
        },
        {
          id: "l20-q4",
          question: "Risk planning:",
          options: [
            { id: "a", text: "Mitigation" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Identifying potential AI risks and having a plan to mitigate them is essential for any legal practice."
        },
        {
          id: "l20-q5",
          question: "Ethics ensured by:",
          options: [
            { id: "a", text: "Policies" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Clear firm-wide policies are the foundation for ethical and responsible AI use in legal practice."
        }
      ]
    },
  ],
};
