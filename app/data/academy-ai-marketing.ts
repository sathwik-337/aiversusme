import type { AcademyCourse } from "@/app/data/academy";

export const aiMarketingCourse: AcademyCourse = {
  slug: "ai-for-marketing",
  title: "AI FOR MARKETING",
  tagline: "Master the intersection of Artificial Intelligence and modern marketing to drive growth and ROI.",
  summary:
    "A comprehensive 25-module deep dive into AI-driven marketing. Learn how to leverage machine learning, generative AI, and predictive analytics to revolutionize content strategy, customer insights, and campaign performance.",
  duration: "25 modules",
  pace: "Self-paced",
  level: "Intermediate",
  format: "Video lessons, practical tool walkthroughs, and marketing strategy workshops",
  audience: [
    "Digital Marketers and SEO Specialists",
    "Content Strategists and Copywriters",
    "Marketing Managers and CMOs",
    "Brand Managers and Growth Hackers",
    "Business Owners looking to automate marketing",
  ],
  outcomes: [
    "Master AI tools for high-converting copywriting and ad creatives",
    "Implement AI-driven customer segmentation and buyer persona generation",
    "Optimize SEO and SEM campaigns using predictive AI models",
    "Build automated social media and email marketing workflows",
    "Design and execute a full AI-driven marketing campaign strategy",
    "Navigate ethics and data privacy in AI-powered marketing",
  ],
  isCoding: false,
  price: 999,
  currency: "INR",
  modules: [
    {
      id: "01",
      title: "Introduction to AI in Marketing",
      description: "Foundations of AI and its role in the marketing ecosystem.",
      lessons: ["What is AI in Marketing?", "Types of AI used in Marketing", "The Marketing AI Revolution", "Case Studies of Success"],
      quiz: [
        {
          id: "m1-q1",
          question: "AI in marketing primarily helps in:",
          options: [
            { id: "a", text: "Eliminating marketers" },
            { id: "b", text: "Automating and optimizing campaigns" },
            { id: "c", text: "Reducing customers" },
            { id: "d", text: "Avoiding data" }
          ],
          correctOptionId: "b",
          explanation: "AI automates repetitive tasks and optimizes campaign performance."
        },
        {
          id: "m1-q2",
          question: "A key benefit of AI is:",
          options: [
            { id: "a", text: "Manual work" },
            { id: "b", text: "No impact" },
            { id: "c", text: "Faster insights" },
            { id: "d", text: "Less accuracy" }
          ],
          correctOptionId: "c",
          explanation: "AI provides rapid data analysis and actionable insights."
        },
        {
          id: "m1-q3",
          question: "AI relies on:",
          options: [
            { id: "a", text: "Data and algorithms" },
            { id: "b", text: "Guesswork" },
            { id: "c", text: "Paper" },
            { id: "d", text: "Notes" }
          ],
          correctOptionId: "a",
          explanation: "AI models are built on high-quality data and advanced algorithms."
        },
        {
          id: "m1-q4",
          question: "Misconception about AI:",
          options: [
            { id: "a", text: "Supports marketing" },
            { id: "b", text: "Improves efficiency" },
            { id: "c", text: "Uses data" },
            { id: "d", text: "Replaces marketers completely" }
          ],
          correctOptionId: "d",
          explanation: "AI is a tool to augment human marketers, not replace them entirely."
        },
        {
          id: "m1-q5",
          question: "AI enhances marketing by:",
          options: [
            { id: "a", text: "Delaying" },
            { id: "b", text: "Improving targeting" },
            { id: "c", text: "Reducing reach" },
            { id: "d", text: "Ignoring data" }
          ],
          correctOptionId: "b",
          explanation: "AI improves audience targeting and campaign relevance."
        }
      ]
    },
    {
      id: "02",
      title: "Evolution of Digital Marketing with AI",
      description: "How AI transformed traditional digital marketing strategies.",
      lessons: ["From Manual to Automated", "The shift in consumer behavior", "Real-time marketing with AI", "Future trends in Marketing AI"],
      quiz: [
        {
          id: "m2-q1",
          question: "Early digital marketing focused on:",
          options: [
            { id: "a", text: "Basic online ads" },
            { id: "b", text: "AI" },
            { id: "c", text: "Automation" },
            { id: "d", text: "Analytics" }
          ],
          correctOptionId: "a",
          explanation: "Initial digital marketing was limited to simple display ads and search listings."
        },
        {
          id: "m2-q2",
          question: "AI adoption increased due to:",
          options: [
            { id: "a", text: "Less data" },
            { id: "b", text: "Manual work" },
            { id: "c", text: "Big data" },
            { id: "d", text: "Paper ads" }
          ],
          correctOptionId: "c",
          explanation: "The explosion of data made manual processing impossible, leading to AI adoption."
        },
        {
          id: "m2-q3",
          question: "Traditional marketing is often considered:",
          options: [
            { id: "a", text: "Personalized" },
            { id: "b", text: "AI-driven" },
            { id: "c", text: "Predictive" },
            { id: "d", text: "Generic" }
          ],
          correctOptionId: "d",
          explanation: "Traditional methods often use a one-size-fits-all approach compared to AI personalization."
        },
        {
          id: "m2-q4",
          question: "Modern marketing uses:",
          options: [
            { id: "a", text: "Data-driven strategies" },
            { id: "b", text: "Guesswork" },
            { id: "c", text: "Paper ads" },
            { id: "d", text: "Offline only" }
          ],
          correctOptionId: "a",
          explanation: "Current marketing relies on real-time data to drive strategic decisions."
        },
        {
          id: "m2-q5",
          question: "Evolution of marketing technology led to:",
          options: [
            { id: "a", text: "Slower growth" },
            { id: "b", text: "Targeted campaigns" },
            { id: "c", text: "Less reach" },
            { id: "d", text: "Errors" }
          ],
          correctOptionId: "b",
          explanation: "Technological evolution has enabled highly precise and targeted marketing."
        }
      ]
    },
    {
      id: "03",
      title: "Marketing Data and Customer Insights",
      description: "Leveraging data for deeper customer understanding.",
      lessons: ["Collecting Marketing Data", "Data Cleaning and Preparation", "Identifying Key Insights", "Data-driven decision making"],
      quiz: [
        {
          id: "m3-q1",
          question: "Marketing data primarily includes:",
          options: [
            { id: "a", text: "Only names" },
            { id: "b", text: "Customer behavior data" },
            { id: "c", text: "Only emails" },
            { id: "d", text: "Only sales" }
          ],
          correctOptionId: "b",
          explanation: "Behavioral data provides the most valuable insights for marketing strategies."
        },
        {
          id: "m3-q2",
          question: "AI analyzes data to:",
          options: [
            { id: "a", text: "Guess" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Generate insights" },
            { id: "d", text: "Delete" }
          ],
          correctOptionId: "c",
          explanation: "AI's strength lies in finding patterns and insights within large datasets."
        },
        {
          id: "m3-q3",
          question: "What is a primary benefit of data insights?",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Better decisions" }
          ],
          correctOptionId: "d",
          explanation: "Insights allow for more informed and effective business decisions."
        },
        {
          id: "m3-q4",
          question: "What is a significant risk in data handling?",
          options: [
            { id: "a", text: "Data misuse" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Improper data handling can lead to privacy breaches and ethical issues."
        },
        {
          id: "m3-q5",
          question: "In marketing, an 'insight' means:",
          options: [
            { id: "a", text: "Random data" },
            { id: "b", text: "Meaningful patterns" },
            { id: "c", text: "Guesswork" },
            { id: "d", text: "Errors" }
          ],
          correctOptionId: "b",
          explanation: "Insights are actionable patterns derived from data analysis."
        }
      ]
    },
    {
      id: "04",
      title: "Customer Segmentation using AI",
      description: "Advanced segmentation techniques powered by machine learning.",
      lessons: ["Beyond Demographic Segmentation", "Behavioral Clustering with AI", "Predictive Segmentation", "Implementing Segments in Campaigns"],
      quiz: [
        {
          id: "m4-q1",
          question: "Segmentation in marketing refers to:",
          options: [
            { id: "a", text: "Ignoring customers" },
            { id: "b", text: "Deleting data" },
            { id: "c", text: "Grouping customers" },
            { id: "d", text: "Avoiding marketing" }
          ],
          correctOptionId: "c",
          explanation: "Segmentation is the process of dividing a target market into smaller groups."
        },
        {
          id: "m4-q2",
          question: "AI segments customers using:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Names" },
            { id: "c", text: "Photos" },
            { id: "d", text: "Behavior data" }
          ],
          correctOptionId: "d",
          explanation: "AI uses behavioral patterns to create precise customer segments."
        },
        {
          id: "m4-q3",
          question: "A key benefit of AI segmentation is:",
          options: [
            { id: "a", text: "Targeting" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Better segmentation leads to more accurate and effective targeting."
        },
        {
          id: "m4-q4",
          question: "A risk of poor segmentation is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Wrong grouping" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "b",
          explanation: "Incorrect grouping can lead to irrelevant marketing and wasted budget."
        },
        {
          id: "m4-q5",
          question: "Effective AI segmentation leads to:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Better campaigns" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "Precise segments allow for highly optimized and successful campaigns."
        }
      ]
    },
    {
      id: "05",
      title: "Buyer Persona Generation with AI",
      description: "Creating highly accurate personas using AI tools.",
      lessons: ["AI Persona Tools", "Data-backed Persona creation", "Updating Personas in real-time", "Applying Personas to Content"],
      quiz: [
        {
          id: "m5-q1",
          question: "A buyer persona is:",
          options: [
            { id: "a", text: "A real person" },
            { id: "b", text: "Random data" },
            { id: "c", text: "Guesswork" },
            { id: "d", text: "Ideal customer profile" }
          ],
          correctOptionId: "d",
          explanation: "A persona is a fictional representation of your ideal customer."
        },
        {
          id: "m5-q2",
          question: "AI builds personas using:",
          options: [
            { id: "a", text: "Data" },
            { id: "b", text: "Guesswork" },
            { id: "c", text: "Names" },
            { id: "d", text: "Photos" }
          ],
          correctOptionId: "a",
          explanation: "AI leverages actual customer data to build realistic personas."
        },
        {
          id: "m5-q3",
          question: "The main benefit of AI personas is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Better targeting" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "Personas help marketers tailor messages to specific audience needs."
        },
        {
          id: "m5-q4",
          question: "A risk in persona generation is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Inaccuracy" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "c",
          explanation: "If based on bad data, personas can be inaccurate and misleading."
        },
        {
          id: "m5-q5",
          question: "Personas are particularly helpful in:",
          options: [
            { id: "a", text: "Ignoring" },
            { id: "b", text: "Deleting" },
            { id: "c", text: "Avoiding" },
            { id: "d", text: "Content planning" }
          ],
          correctOptionId: "d",
          explanation: "Personas guide content creation to ensure it resonates with the target audience."
        }
      ]
    },
    {
      id: "06",
      title: "AI in Market Research and Trend Analysis",
      description: "Automating research and identifying emerging trends.",
      lessons: ["AI-powered Competitive Analysis", "Social Listening Tools", "Trend Forecasting with AI", "Consumer Sentiment Analysis"],
      quiz: [
        {
          id: "m6-q1",
          question: "AI helps in market research through:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Trend analysis" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "b",
          explanation: "AI can process vast amounts of data to identify emerging market trends."
        },
        {
          id: "m6-q2",
          question: "A key benefit of AI in research is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Insight" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "AI provides deeper insights into consumer behavior and market shifts."
        },
        {
          id: "m6-q3",
          question: "Market research AI relies on:",
          options: [
            { id: "a", text: "Guess" },
            { id: "b", text: "Book" },
            { id: "c", text: "Note" },
            { id: "d", text: "Consumer data" }
          ],
          correctOptionId: "d",
          explanation: "Data from consumers is the foundation for AI-driven market research."
        },
        {
          id: "m6-q4",
          question: "What is a risk in AI research?",
          options: [
            { id: "a", text: "Inaccuracy" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Biased or incomplete data can lead to inaccurate research results."
        },
        {
          id: "m6-q5",
          question: "The ultimate outcome of AI research is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Better strategy" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "AI-driven insights lead to more effective and competitive marketing strategies."
        }
      ]
    },
    {
      id: "07",
      title: "AI in Content Strategy and Planning",
      description: "Planning content that resonates using AI insights.",
      lessons: ["Content Gap Analysis", "AI-driven Editorial Calendars", "Topic Clusters and Authority", "Predicting Content Performance"],
      quiz: [
        {
          id: "m7-q1",
          question: "AI helps in content strategy through:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Planning" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "c",
          explanation: "AI assists in identifying high-impact topics and planning content calendars."
        },
        {
          id: "m7-q2",
          question: "What is a benefit of AI in content planning?",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Efficiency" }
          ],
          correctOptionId: "d",
          explanation: "AI automates research and scheduling, greatly increasing content team efficiency."
        },
        {
          id: "m7-q3",
          question: "Content AI analyzes:",
          options: [
            { id: "a", text: "Trends" },
            { id: "b", text: "Guesswork" },
            { id: "c", text: "Book" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "a",
          explanation: "AI looks at search and social trends to suggest relevant content."
        },
        {
          id: "m7-q4",
          question: "A risk in AI content strategy is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Irrelevance" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "b",
          explanation: "Over-reliance on AI without human oversight can lead to irrelevant content."
        },
        {
          id: "m7-q5",
          question: "AI planning leads to:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Better content" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "Data-backed planning ensures content is more useful and engaging for the audience."
        }
      ]
    },
    {
      id: "08",
      title: "AI for Copywriting and Ad Creatives",
      description: "Generating high-converting copy and visuals with Generative AI.",
      lessons: ["AI Copywriting Tools", "Prompt Engineering for Ads", "A/B Testing AI Content", "Visual Creative Generation"],
      quiz: [
        {
          id: "m8-q1",
          question: "AI generates which marketing asset?",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Avoid" },
            { id: "d", text: "Ads" }
          ],
          correctOptionId: "d",
          explanation: "AI tools can now generate highly effective ad copy and creative visuals."
        },
        {
          id: "m8-q2",
          question: "A benefit of AI in copywriting is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI can produce draft copy in seconds, significantly speeding up the creative process."
        },
        {
          id: "m8-q3",
          question: "A risk of AI-generated content is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Generic content" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "b",
          explanation: "Without proper prompting, AI can sometimes produce generic or repetitive content."
        },
        {
          id: "m8-q4",
          question: "AI-generated copy usually needs:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Editing" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "c",
          explanation: "Human editing is essential to ensure brand voice and factual accuracy."
        },
        {
          id: "m8-q5",
          question: "The goal of AI in creative is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Better ads" }
          ],
          correctOptionId: "d",
          explanation: "AI aims to help create more engaging and higher-converting advertisements."
        }
      ]
    },
    {
      id: "09",
      title: "AI for Social Media Marketing",
      description: "Automating and optimizing social media growth.",
      lessons: ["AI for Social Posting", "Community Management with AI", "Viral Trend Identification", "Social Analytics with AI"],
      quiz: [
        {
          id: "m9-q1",
          question: "AI helps social media managers with:",
          options: [
            { id: "a", text: "Scheduling" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "AI optimizes posting times and automates scheduling across platforms."
        },
        {
          id: "m9-q2",
          question: "A benefit of AI in social media is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Engagement" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "AI helps identify and create content that drives higher user engagement."
        },
        {
          id: "m9-q3",
          question: "Social AI analyzes:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Book" },
            { id: "c", text: "User behavior" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "c",
          explanation: "AI tracks user interactions to understand what content performs best."
        },
        {
          id: "m9-q4",
          question: "A risk of social AI is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Tools" },
            { id: "d", text: "Wrong targeting" }
          ],
          correctOptionId: "d",
          explanation: "Flawed algorithms can lead to content being shown to the wrong audience."
        },
        {
          id: "m9-q5",
          question: "AI on social media ultimately leads to:",
          options: [
            { id: "a", text: "Growth" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Effective AI use drives follower growth and brand awareness."
        }
      ]
    },
    {
      id: "10",
      title: "AI in Search Engine Optimization (SEO)",
      description: "Mastering SEO with AI-powered tools.",
      lessons: ["AI Keyword Research", "On-page Optimization with AI", "Backlink Analysis with AI", "Semantic Search and AI"],
      quiz: [
        {
          id: "m10-q1",
          question: "AI helps SEO through:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Keyword research" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "b",
          explanation: "AI tools identify high-value keywords and search intent patterns."
        },
        {
          id: "m10-q2",
          question: "What is a benefit of AI in SEO?",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Ranking" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "AI optimization helps content rank higher on search engine result pages."
        },
        {
          id: "m10-q3",
          question: "SEO AI analyzes:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Book" },
            { id: "c", text: "Note" },
            { id: "d", text: "Search data" }
          ],
          correctOptionId: "d",
          explanation: "AI processes search engine data to understand ranking factors."
        },
        {
          id: "m10-q4",
          question: "A risk in SEO AI is:",
          options: [
            { id: "a", text: "Over-optimization" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Over-optimizing content for bots can make it unreadable for humans and lead to penalties."
        },
        {
          id: "m10-q5",
          question: "The goal of AI SEO is more:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Traffic" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "Better rankings and relevance lead to increased organic traffic."
        }
      ]
    },
    {
      id: "11",
      title: "AI in Search Engine Marketing (SEM) and Ads",
      description: "Optimizing paid search and display ads with AI.",
      lessons: ["AI Bidding Strategies", "Smart Campaigns in Google Ads", "Ad Copy Optimization", "Predictive ROI for Ads"],
      quiz: [
        {
          id: "m11-q1",
          question: "AI helps SEM through:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Ad optimization" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "c",
          explanation: "AI continuously optimizes ad elements to improve performance."
        },
        {
          id: "m11-q2",
          question: "A benefit of AI in paid ads is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "ROI" }
          ],
          correctOptionId: "d",
          explanation: "AI bidding and targeting strategies lead to a higher Return on Investment."
        },
        {
          id: "m11-q3",
          question: "Paid ad AI analyzes:",
          options: [
            { id: "a", text: "Click data" },
            { id: "b", text: "Guesswork" },
            { id: "c", text: "Book" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "a",
          explanation: "AI uses historical click and conversion data to predict future performance."
        },
        {
          id: "m11-q4",
          question: "A risk in SEM AI is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Wrong bids" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "b",
          explanation: "Incorrect bidding parameters can lead to overspending or low ad visibility."
        },
        {
          id: "m11-q5",
          question: "AI SEM results in:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Better ads" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "AI helps deliver the right ad to the right person at the right time."
        }
      ]
    },
    {
      id: "12",
      title: "AI for Email Marketing and Personalization",
      description: "Highly personalized email campaigns at scale.",
      lessons: ["AI-driven Subject Lines", "Dynamic Email Content", "Send-time Optimization", "Churn Prediction in Email"],
      quiz: [
        {
          id: "m12-q1",
          question: "AI helps email marketing through:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Avoid" },
            { id: "d", text: "Personalization" }
          ],
          correctOptionId: "d",
          explanation: "AI enables individual-level personalization of content and send times."
        },
        {
          id: "m12-q2",
          question: "A benefit of AI in email is:",
          options: [
            { id: "a", text: "Open rates" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Personalized subject lines and timing lead to significantly higher open rates."
        },
        {
          id: "m12-q3",
          question: "Email AI analyzes:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "User behavior" },
            { id: "c", text: "Book" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "b",
          explanation: "AI tracks how users interact with previous emails to optimize future ones."
        },
        {
          id: "m12-q4",
          question: "A risk in email AI is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Spam" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "c",
          explanation: "Aggressive or poorly targeted AI emails can be flagged as spam."
        },
        {
          id: "m12-q5",
          question: "Personalized emails lead to more:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Conversion" }
          ],
          correctOptionId: "d",
          explanation: "Relevant email content is much more likely to drive sales and actions."
        }
      ]
    },
    {
      id: "13",
      title: "AI in Influencer Marketing and Discovery",
      description: "Finding the right influencers using AI data.",
      lessons: ["Influencer Discovery Tools", "Audience Authenticity Checks", "Predicting Influencer ROI", "Campaign Management with AI"],
      quiz: [
        {
          id: "m13-q1",
          question: "AI helps in influencer marketing with:",
          options: [
            { id: "a", text: "Discovery" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "AI tools scan millions of profiles to find the perfect brand match."
        },
        {
          id: "m13-q2",
          question: "What is a benefit of AI in this field?",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Reach" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "AI identifies influencers with authentic reach in specific niches."
        },
        {
          id: "m13-q3",
          question: "Influencer AI analyzes:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Book" },
            { id: "c", text: "Audience data" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "c",
          explanation: "AI checks audience demographics and engagement authenticity."
        },
        {
          id: "m13-q4",
          question: "A risk in influencer marketing is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Tools" },
            { id: "d", text: "Fake influencers" }
          ],
          correctOptionId: "d",
          explanation: "AI helps detect influencers with fake followers or engagement."
        },
        {
          id: "m13-q5",
          question: "Good influencer selection leads to:",
          options: [
            { id: "a", text: "Brand growth" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Authentic partnerships drive significant brand trust and awareness."
        }
      ]
    },
    {
      id: "14",
      title: "AI for Video Marketing and Content Creation",
      description: "Generating and editing video content with AI.",
      lessons: ["AI Video Generation Tools", "Automated Video Editing", "AI Scripts and Voiceovers", "Video SEO with AI"],
      quiz: [
        {
          id: "m14-q1",
          question: "AI helps in video marketing through:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Video creation" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "b",
          explanation: "AI can generate scripts, voiceovers, and even entire video clips."
        },
        {
          id: "m14-q2",
          question: "A benefit of AI in video is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Speed" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "AI significantly reduces the time needed for video editing and production."
        },
        {
          id: "m14-q3",
          question: "A risk of AI video is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Tools" },
            { id: "d", text: "Low quality" }
          ],
          correctOptionId: "d",
          explanation: "Fully automated video can sometimes lack the 'human touch' or high production value."
        },
        {
          id: "m14-q4",
          question: "What tool helps in video production?",
          options: [
            { id: "a", text: "AI editors" },
            { id: "b", text: "Book" },
            { id: "c", text: "Note" },
            { id: "d", text: "File" }
          ],
          correctOptionId: "a",
          explanation: "AI-powered video editors automate cutting, captioning, and color grading."
        },
        {
          id: "m14-q5",
          question: "Good video content leads to:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Engagement" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "Video is one of the most engaging content formats for modern audiences."
        }
      ]
    },
    {
      id: "15",
      title: "AI for Image and Creative Design",
      description: "Revolutionizing design workflows with AI.",
      lessons: ["Generative Design Tools", "AI for Brand Consistency", "Automated Image Editing", "Design-to-Code Workflows"],
      quiz: [
        {
          id: "m15-q1",
          question: "AI creates which visual assets?",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Visuals" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "c",
          explanation: "AI can generate images, logos, and layout designs from text prompts."
        },
        {
          id: "m15-q2",
          question: "A benefit of AI in design is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Creativity" }
          ],
          correctOptionId: "d",
          explanation: "AI provides designers with new ways to explore creative concepts quickly."
        },
        {
          id: "m15-q3",
          question: "A risk in AI design is:",
          options: [
            { id: "a", text: "Generic design" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Without human guidance, AI design can sometimes feel unoriginal or generic."
        },
        {
          id: "m15-q4",
          question: "AI designs often require:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Editing" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "b",
          explanation: "Designers usually need to refine AI-generated images for final use."
        },
        {
          id: "m15-q5",
          question: "AI tools lead to:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Better visuals" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "AI helps teams produce a higher volume of high-quality visual content."
        }
      ]
    },
    {
      id: "16",
      title: "AI in Customer Journey Mapping",
      description: "Visualizing and optimizing journeys with AI.",
      lessons: ["AI-driven Journey Analysis", "Identifying Friction Points", "Personalizing the Journey", "Multi-touch Attribution with AI"],
      quiz: [
        {
          id: "m16-q1",
          question: "AI maps which marketing element?",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Avoid" },
            { id: "d", text: "Journey" }
          ],
          correctOptionId: "d",
          explanation: "AI tracks every customer touchpoint to map the entire path to purchase."
        },
        {
          id: "m16-q2",
          question: "A benefit of AI journey mapping is:",
          options: [
            { id: "a", text: "Understanding" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "AI provides a deep understanding of how customers move through the sales funnel."
        },
        {
          id: "m16-q3",
          question: "Journey AI analyzes:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Touchpoints" },
            { id: "c", text: "Book" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "b",
          explanation: "AI looks at all digital interactions a customer has with a brand."
        },
        {
          id: "m16-q4",
          question: "A risk in journey mapping is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Inaccuracy" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "c",
          explanation: "Data silos can lead to an incomplete and inaccurate journey map."
        },
        {
          id: "m16-q5",
          question: "Optimized journeys lead to:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Better UX" }
          ],
          correctOptionId: "d",
          explanation: "A smooth, personalized journey results in a superior customer experience."
        }
      ]
    },
    {
      id: "17",
      title: "AI in Conversion Rate Optimization (CRO)",
      description: "Improving conversion rates with AI-driven testing.",
      lessons: ["AI Heatmaps and Analysis", "Predictive A/B Testing", "Automated Landing Page Optimization", "User Behavior Prediction"],
      quiz: [
        {
          id: "m17-q1",
          question: "AI helps CRO through:",
          options: [
            { id: "a", text: "Optimization" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "AI automates the testing and optimization of website elements."
        },
        {
          id: "m17-q2",
          question: "A benefit of AI in CRO is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Conversion" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "AI-driven changes are designed to maximize the percentage of visitors who take action."
        },
        {
          id: "m17-q3",
          question: "CRO AI analyzes:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Book" },
            { id: "c", text: "User behavior" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "c",
          explanation: "AI tracks clicks, scrolls, and time on page to identify conversion barriers."
        },
        {
          id: "m17-q4",
          question: "A risk in CRO AI is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Tools" },
            { id: "d", text: "Wrong testing" }
          ],
          correctOptionId: "d",
          explanation: "Testing the wrong variables can lead to misleading results and no real improvement."
        },
        {
          id: "m17-q5",
          question: "Ultimately, CRO AI increases:",
          options: [
            { id: "a", text: "Sales" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Higher conversion rates directly translate to more sales and leads."
        }
      ]
    },
    {
      id: "18",
      title: "AI for Chatbots and Conversational Marketing",
      description: "Implementing advanced AI assistants for marketing.",
      lessons: ["Building AI Chatbots", "Conversational AI Strategy", "Lead Qualification with Bots", "24/7 Customer Engagement"],
      quiz: [
        {
          id: "m18-q1",
          question: "AI chatbots facilitate:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Conversations" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "b",
          explanation: "Chatbots provide instant, automated dialogue with customers."
        },
        {
          id: "m18-q2",
          question: "What is a benefit of AI bots?",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "24/7 support" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "AI bots can handle customer queries at any time of day or night."
        },
        {
          id: "m18-q3",
          question: "A risk of using chatbots is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Tools" },
            { id: "d", text: "Miscommunication" }
          ],
          correctOptionId: "d",
          explanation: "Bots may sometimes misunderstand complex or nuanced human queries."
        },
        {
          id: "m18-q4",
          question: "Bots are primarily used for:",
          options: [
            { id: "a", text: "Customer queries" },
            { id: "b", text: "Book" },
            { id: "c", text: "Note" },
            { id: "d", text: "File" }
          ],
          correctOptionId: "a",
          explanation: "Chatbots are excellent for answering FAQs and qualifying leads."
        },
        {
          id: "m18-q5",
          question: "Chatbots increase customer:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Engagement" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "Instant responses lead to higher levels of customer satisfaction and engagement."
        }
      ]
    },
    {
      id: "19",
      title: "AI in CRM and Customer Retention",
      description: "Managing relationships and reducing churn with AI.",
      lessons: ["Predictive CRM Insights", "Automated Lead Scoring", "Customer Lifetime Value Prediction", "Retention Campaign Automation"],
      quiz: [
        {
          id: "m19-q1",
          question: "AI helps CRM systems with:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Retention" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "c",
          explanation: "AI identifies at-risk customers and suggests retention strategies."
        },
        {
          id: "m19-q2",
          question: "A benefit of AI CRM is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Loyalty" }
          ],
          correctOptionId: "d",
          explanation: "Proactive service and personalization build long-term customer loyalty."
        },
        {
          id: "m19-q3",
          question: "CRM AI analyzes:",
          options: [
            { id: "a", text: "Customer data" },
            { id: "b", text: "Guesswork" },
            { id: "c", text: "Book" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "a",
          explanation: "AI uses historical purchase and interaction data to predict future needs."
        },
        {
          id: "m19-q4",
          question: "A risk in CRM AI is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Data misuse" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "b",
          explanation: "Handling sensitive customer data requires strict adherence to privacy rules."
        },
        {
          id: "m19-q5",
          question: "Effective CRM AI drives:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Growth" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "Retaining existing customers is a key driver of sustainable business growth."
        }
      ]
    },
    {
      id: "20",
      title: "Predictive Analytics in Marketing",
      description: "Forecasting marketing outcomes with data.",
      lessons: ["Predicting Sales Trends", "Marketing Mix Modeling with AI", "Budget Allocation Optimization", "Customer Behavior Forecasting"],
      quiz: [
        {
          id: "m20-q1",
          question: "Predictive AI forecasts:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Avoid" },
            { id: "d", text: "Trends" }
          ],
          correctOptionId: "d",
          explanation: "Predictive models identify patterns to forecast future market trends."
        },
        {
          id: "m20-q2",
          question: "What is a benefit of predictive analytics?",
          options: [
            { id: "a", text: "Forecasting" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Accurate forecasting helps businesses prepare for demand and shifts."
        },
        {
          id: "m20-q3",
          question: "Predictive models use:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Historical data" },
            { id: "c", text: "Book" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "b",
          explanation: "Past data is the primary input for predicting future outcomes."
        },
        {
          id: "m20-q4",
          question: "A risk in predictive AI is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Inaccuracy" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "c",
          explanation: "If the historical data is flawed, the predictions will be inaccurate."
        },
        {
          id: "m20-q5",
          question: "Predictive AI leads to:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Better planning" }
          ],
          correctOptionId: "d",
          explanation: "Reliable forecasts allow for much more effective long-term planning."
        }
      ]
    },
    {
      id: "21",
      title: "AI for Pricing and Revenue Optimization",
      description: "Dynamic pricing strategies powered by AI.",
      lessons: ["Dynamic Pricing Models", "Competitor Pricing Monitoring", "Price Elasticity Analysis", "Revenue Growth Strategies"],
      quiz: [
        {
          id: "m21-q1",
          question: "AI enables which pricing model?",
          options: [
            { id: "a", text: "Dynamic pricing" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Dynamic pricing adjusts prices in real-time based on demand and supply."
        },
        {
          id: "m21-q2",
          question: "What is a benefit of AI pricing?",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Revenue" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "Optimized pricing strategies maximize overall business revenue."
        },
        {
          id: "m21-q3",
          question: "Pricing AI analyzes:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Book" },
            { id: "c", text: "Market data" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "c",
          explanation: "AI tracks competitor prices and market demand to suggest price points."
        },
        {
          id: "m21-q4",
          question: "A risk in AI pricing is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Tools" },
            { id: "d", text: "Wrong pricing" }
          ],
          correctOptionId: "d",
          explanation: "Aggressive dynamic pricing can alienate customers if not managed carefully."
        },
        {
          id: "m21-q5",
          question: "Ultimately, AI pricing increases:",
          options: [
            { id: "a", text: "Profit" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Data-driven pricing ensures maximum margin and profit."
        }
      ]
    },
    {
      id: "22",
      title: "Marketing Automation using AI",
      description: "Scaling marketing efforts through full automation.",
      lessons: ["Building AI Workflows", "Cross-channel Automation", "Scaling Personalization", "Measuring Automation Success"],
      quiz: [
        {
          id: "m22-q1",
          question: "AI primarily automates:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Marketing tasks" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "b",
          explanation: "AI handles repetitive tasks like posting, emailing, and lead scoring."
        },
        {
          id: "m22-q2",
          question: "A benefit of AI automation is:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Efficiency" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "c",
          explanation: "Automation frees up human marketers to focus on strategy and creativity."
        },
        {
          id: "m22-q3",
          question: "What helps in building workflows?",
          options: [
            { id: "a", text: "Book" },
            { id: "b", text: "Note" },
            { id: "c", text: "File" },
            { id: "d", text: "Automation tools" }
          ],
          correctOptionId: "d",
          explanation: "Modern AI platforms provide visual tools to build complex marketing workflows."
        },
        {
          id: "m22-q4",
          question: "A risk in automation is:",
          options: [
            { id: "a", text: "Errors" },
            { id: "b", text: "Speed" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "a",
          explanation: "Incorrectly configured workflows can send the wrong messages at scale."
        },
        {
          id: "m22-q5",
          question: "Automation allows for better:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Scaling" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "b",
          explanation: "AI enables marketers to handle thousands of leads as easily as ten."
        }
      ]
    },
    {
      id: "23",
      title: "Ethics, Privacy, and Data Protection in Marketing",
      description: "Navigating the ethical landscape of Marketing AI.",
      lessons: ["Data Privacy Laws (GDPR/CCPA)", "AI Bias in Marketing", "Transparency and Trust", "Ethical AI Implementation"],
      quiz: [
        {
          id: "m23-q1",
          question: "A major ethical concern in AI is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Data misuse" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "c",
          explanation: "Misusing customer data is the most significant ethical risk in AI marketing."
        },
        {
          id: "m23-q2",
          question: "AI ethics primarily involves:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Avoid" },
            { id: "d", text: "Fairness" }
          ],
          correctOptionId: "d",
          explanation: "Ensuring AI models are fair and unbiased is a key ethical requirement."
        },
        {
          id: "m23-q3",
          question: "Data privacy focuses on:",
          options: [
            { id: "a", text: "Protection" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Privacy laws require strict protection of customer personal information."
        },
        {
          id: "m23-q4",
          question: "A risk of poor ethics is a data:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "Breach" },
            { id: "c", text: "AI" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "b",
          explanation: "Lax ethical and security standards increase the risk of harmful data breaches."
        },
        {
          id: "m23-q5",
          question: "The solution to ethical risks is:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Policies" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "c",
          explanation: "Clear organizational policies are essential for ethical AI use."
        }
      ]
    },
    {
      id: "24",
      title: "AI in Brand Management and Reputation Monitoring",
      description: "Protecting and growing your brand with AI.",
      lessons: ["Real-time Reputation Monitoring", "Brand Sentiment Analysis", "Crisis Management with AI", "Brand Voice Consistency"],
      quiz: [
        {
          id: "m24-q1",
          question: "AI helps brand managers through:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Avoid" },
            { id: "d", text: "Reputation monitoring" }
          ],
          correctOptionId: "d",
          explanation: "AI monitors the web in real-time for any mentions of a brand."
        },
        {
          id: "m24-q2",
          question: "A benefit of AI brand monitoring is:",
          options: [
            { id: "a", text: "Brand trust" },
            { id: "b", text: "Delay" },
            { id: "c", text: "Error" },
            { id: "d", text: "Confusion" }
          ],
          correctOptionId: "a",
          explanation: "Quick responses to issues build long-term trust with consumers."
        },
        {
          id: "m24-q3",
          question: "Reputation AI analyzes:",
          options: [
            { id: "a", text: "Guesswork" },
            { id: "b", text: "Feedback" },
            { id: "c", text: "Book" },
            { id: "d", text: "Note" }
          ],
          correctOptionId: "b",
          explanation: "AI processes reviews and social comments to gauge brand sentiment."
        },
        {
          id: "m24-q4",
          question: "A risk in AI monitoring is:",
          options: [
            { id: "a", text: "Speed" },
            { id: "b", text: "AI" },
            { id: "c", text: "Misinterpretation" },
            { id: "d", text: "Tools" }
          ],
          correctOptionId: "c",
          explanation: "AI can sometimes misinterpret sarcasm or complex human emotions."
        },
        {
          id: "m24-q5",
          question: "Effective monitoring drives:",
          options: [
            { id: "a", text: "Delay" },
            { id: "b", text: "Error" },
            { id: "c", text: "Confusion" },
            { id: "d", text: "Brand growth" }
          ],
          correctOptionId: "d",
          explanation: "A healthy brand reputation is essential for sustained business growth."
        }
      ]
    },
    {
      id: "25",
      title: "Capstone – AI-driven Marketing Campaign Strategy",
      description: "Final project: Designing a complete AI-integrated marketing plan.",
      lessons: ["Defining Campaign Goals", "Selecting the AI Tech Stack", "Designing the AI Workflow", "Presenting the AI Strategy"],
      quiz: [
        {
          id: "m25-q1",
          question: "A capstone project involves an:",
          options: [
            { id: "a", text: "AI campaign" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "The final project brings together all AI concepts into a single campaign plan."
        },
        {
          id: "m25-q2",
          question: "Tool selection is based on:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Use case" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "b",
          explanation: "AI tools must be chosen based on the specific needs of the campaign."
        },
        {
          id: "m25-q3",
          question: "Success is measured by:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Results" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "c",
          explanation: "The ultimate test of an AI campaign is the actual data and results achieved."
        },
        {
          id: "m25-q4",
          question: "Campaign planning must include risk:",
          options: [
            { id: "a", text: "Ignore" },
            { id: "b", text: "Delete" },
            { id: "c", text: "Avoid" },
            { id: "d", text: "Mitigation" }
          ],
          correctOptionId: "d",
          explanation: "Identifying and planning for potential AI failures is critical for success."
        },
        {
          id: "m25-q5",
          question: "Every campaign needs clear ethical:",
          options: [
            { id: "a", text: "Policies" },
            { id: "b", text: "Ignore" },
            { id: "c", text: "Delete" },
            { id: "d", text: "Avoid" }
          ],
          correctOptionId: "a",
          explanation: "Ethical guidelines ensure the campaign respects customer privacy and trust."
        }
      ]
    },
  ],
};
