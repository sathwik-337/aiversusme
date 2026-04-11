import type { AcademyCourse } from "@/app/data/academy";

export const academyMiniCourse: AcademyCourse = {
  slug: "ai-for-non-engineers",
  title: "AI for Beginners",
  tagline: "A beginner mini-course to learn AI and start using it without coding.",
  summary:
    "A short practical course for complete beginners who want to understand AI, see where it is used, start using tools like ChatGPT, and explore productivity and earning opportunities.",
  goal: "Understand AI and start using AI tools confidently without writing code.",
  duration: "2 to 3 hours total",
  pace: "4 modules",
  level: "Absolute beginner",
  format: "8 video lessons, 4 module quizzes, and a 10-question final exam",
  audience: [
    "Students",
    "Business owners",
    "Working professionals",
    "Freelancers",
    "Curious non-technical learners",
  ],
  outcomes: [
    "Explain AI in simple language",
    "Understand AI, ML, and deep learning at a basic level",
    "Recognize common AI use cases in real life and business",
    "Use ChatGPT and other AI tools more effectively",
    "See practical work and earning opportunities with AI",
    "Finish quizzes and a final exam to confirm understanding",
  ],
  modules: [
    {
      id: "01",
      title: "Introduction to AI",
      description:
        "Start with the basic meaning of AI and understand key terms without technical confusion.",
      lessons: [
        "What AI actually is",
        "Real-life examples of AI",
        "Why AI is important",
        "AI vs ML vs deep learning",
        "A simple way to talk about AI confidently",
      ],
      videos: [
        {
          title: "Video 1: What is AI?",
          summary:
            "Cover what AI is, real-life examples, and why AI matters.",
          sourceUrl: "https://www.youtube.com/watch?v=ad79nYk2keg&t=6s",
          duration: "10 to 15 min",
          required: true,
        },
        {
          title: "Video 2: AI vs ML vs Deep Learning",
          summary:
            "Explain the basic differences in a simple non-technical way.",
          sourceUrls: [
            "https://www.youtube.com/watch?v=ukzFI9rgwfU",
            "https://www.youtube.com/watch?v=6M5VXKLf4D4&t=34s",
          ],
          duration: "10 to 15 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m1-q1",
          question: "What is AI in simple terms?",
          options: [
            { id: "a", text: "Technology that helps machines do tasks needing human-like intelligence" },
            { id: "b", text: "A type of internet cable" },
            { id: "c", text: "A robot in every office" },
            { id: "d", text: "A coding language only for engineers" },
          ],
          correctOptionId: "a",
          explanation: "AI is best understood as technology that helps machines perform intelligent tasks.",
        },
        {
          id: "m1-q2",
          question: "Which is a common example of AI?",
          options: [
            { id: "a", text: "Email spam filtering" },
            { id: "b", text: "A paper notebook" },
            { id: "c", text: "A desk lamp" },
            { id: "d", text: "A wall clock" },
          ],
          correctOptionId: "a",
          explanation: "Spam filtering uses pattern recognition, which is a common AI use case.",
        },
        {
          id: "m1-q3",
          question: "Machine learning is:",
          options: [
            { id: "a", text: "A branch of AI that learns from data" },
            { id: "b", text: "A replacement for the internet" },
            { id: "c", text: "A hardware device" },
            { id: "d", text: "A type of spreadsheet" },
          ],
          correctOptionId: "a",
          explanation: "Machine learning is part of AI and learns patterns from data.",
        },
        {
          id: "m1-q4",
          question: "Deep learning is usually described as:",
          options: [
            { id: "a", text: "A more advanced subset of machine learning" },
            { id: "b", text: "A type of keyboard" },
            { id: "c", text: "Something unrelated to AI" },
            { id: "d", text: "A video game engine" },
          ],
          correctOptionId: "a",
          explanation: "Deep learning sits inside machine learning and is often used for language, speech, and image tasks.",
        },
        {
          id: "m1-q5",
          question: "What is the right beginner mindset for AI?",
          options: [
            { id: "a", text: "AI is a tool I can learn step by step" },
            { id: "b", text: "AI is only for coders" },
            { id: "c", text: "AI should never be checked" },
            { id: "d", text: "AI has no everyday use" },
          ],
          correctOptionId: "a",
          explanation: "This course is designed to make AI understandable and usable for non-engineers.",
        },
      ],
    },
    {
      id: "02",
      title: "AI in Real Life",
      description:
        "See where AI already appears in daily life, business, and future work opportunities.",
      lessons: [
        "AI in business",
        "AI in daily life",
        "Industries using AI",
        "Business impact of AI",
        "Future opportunities around AI",
      ],
      videos: [
        {
          title: "Video 3: Applications of AI",
          summary:
            "Cover AI in business, daily life, and industries already using AI.",
          sourceUrls: [
            "https://www.youtube.com/watch?v=dxpBcqSWbuk&t=7s",
            
          ],
          duration: "10 to 15 min",
          required: true,
        },
        {
          title: "Video 4: Future of AI",
          summary:
            "Cover job opportunities, business impact, and growth potential.",
          sourceUrl: "https://www.youtube.com/watch?v=dv9q7Ema40k",
          duration: "10 to 15 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m2-q1",
          question: "Which business area commonly uses AI today?",
          options: [
            { id: "a", text: "Customer support" },
            { id: "b", text: "Only space missions" },
            { id: "c", text: "Only furniture making" },
            { id: "d", text: "Only paper filing" },
          ],
          correctOptionId: "a",
          explanation: "Customer support, search, recommendations, and analytics are common AI use cases.",
        },
        {
          id: "m2-q2",
          question: "Which is an example of AI in daily life?",
          options: [
            { id: "a", text: "Streaming recommendations" },
            { id: "b", text: "A stapler" },
            { id: "c", text: "A glass table" },
            { id: "d", text: "A printed page" },
          ],
          correctOptionId: "a",
          explanation: "Recommendation systems are one of the most common daily-life uses of AI.",
        },
        {
          id: "m2-q3",
          question: "Why should non-engineers care about AI’s future?",
          options: [
            { id: "a", text: "Because AI affects jobs, business, and productivity" },
            { id: "b", text: "Because only coders will use it" },
            { id: "c", text: "Because AI has no effect on work" },
            { id: "d", text: "Because AI is only for labs" },
          ],
          correctOptionId: "a",
          explanation: "AI is changing how work is done across many roles, not just technical ones.",
        },
        {
          id: "m2-q4",
          question: "Which statement is most accurate?",
          options: [
            { id: "a", text: "AI is used in many industries, not just tech" },
            { id: "b", text: "AI is only useful in software companies" },
            { id: "c", text: "AI is not used in healthcare" },
            { id: "d", text: "AI is not used in finance" },
          ],
          correctOptionId: "a",
          explanation: "Healthcare, retail, finance, education, marketing, and more already use AI.",
        },
        {
          id: "m2-q5",
          question: "One realistic result of AI growth is:",
          options: [
            { id: "a", text: "New job roles and new service opportunities" },
            { id: "b", text: "No changes in business" },
            { id: "c", text: "The end of all work" },
            { id: "d", text: "The end of the internet" },
          ],
          correctOptionId: "a",
          explanation: "AI creates new demand for people who can apply the tools well in real business settings.",
        },
      ],
    },
    {
      id: "03",
      title: "Using AI Tools",
      description:
        "Learn how to start using ChatGPT and understand which AI tools are best for which tasks.",
      lessons: [
        "How to use ChatGPT",
        "What prompts are",
        "Real use cases for ChatGPT",
        "Different AI tools and when to use them",
        "Free vs paid AI tools",
      ],
      videos: [
        {
          title: "Video 5: Intro to ChatGPT",
          summary:
            "Cover how to use ChatGPT, write prompts, and apply it to real work tasks.",
          sourceUrl: "https://www.youtube.com/watch?v=3ao7Z8duDXc",
          duration: "15 to 20 min",
          required: true,
        },
        {
          title: "Video 6: AI Tools Overview",
          summary:
            "Compare different AI tools and explain which tool is best for what.",
          sourceUrl: "https://www.youtube.com/watch?v=TZe5UqlUg0c",
          duration: "10 to 15 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m3-q1",
          question: "What is a prompt?",
          options: [
            { id: "a", text: "The instruction or question you give to the AI" },
            { id: "b", text: "A keyboard shortcut" },
            { id: "c", text: "A hardware device" },
            { id: "d", text: "A type of browser" },
          ],
          correctOptionId: "a",
          explanation: "A prompt is the input you give an AI tool to guide its response.",
        },
        {
          id: "m3-q2",
          question: "Why is ChatGPT useful for beginners?",
          options: [
            { id: "a", text: "It helps with writing, ideas, summaries, and simple questions" },
            { id: "b", text: "It only works for expert programmers" },
            { id: "c", text: "It cannot answer in plain language" },
            { id: "d", text: "It replaces all human judgment" },
          ],
          correctOptionId: "a",
          explanation: "ChatGPT is beginner-friendly because you can use normal language to ask for help.",
        },
        {
          id: "m3-q3",
          question: "Why should you compare AI tools before choosing one?",
          options: [
            { id: "a", text: "Different tools are better for different tasks" },
            { id: "b", text: "All tools are exactly the same" },
            { id: "c", text: "The most expensive tool is always right" },
            { id: "d", text: "Free tools never help" },
          ],
          correctOptionId: "a",
          explanation: "Some tools are better for text, some for images, some for meetings, and some for automation.",
        },
        {
          id: "m3-q4",
          question: "What is a smart beginner approach to free vs paid tools?",
          options: [
            { id: "a", text: "Start simple and upgrade only if the value is clear" },
            { id: "b", text: "Pay for every tool immediately" },
            { id: "c", text: "Never test free tools" },
            { id: "d", text: "Choose only the newest tool" },
          ],
          correctOptionId: "a",
          explanation: "A practical learner tests value first, then decides if an upgrade is worth it.",
        },
        {
          id: "m3-q5",
          question: "What should you do if AI output looks useful but uncertain?",
          options: [
            { id: "a", text: "Review and verify it before using it" },
            { id: "b", text: "Trust it immediately" },
            { id: "c", text: "Assume confident language means it is correct" },
            { id: "d", text: "Never use AI again" },
          ],
          correctOptionId: "a",
          explanation: "Verification is part of using AI responsibly and effectively.",
        },
      ],
    },
    {
      id: "04",
      title: "Practical Use and Earning",
      description:
        "Use AI for work and productivity, then explore freelancing and business opportunities.",
      lessons: [
        "Save time using AI",
        "Automate simple tasks",
        "Improve productivity",
        "Freelancing ideas using AI",
        "AI services and business opportunities",
      ],
      videos: [
        {
          title: "Video 7: How to Use AI for Work",
          summary:
            "Cover saving time, automating tasks, and improving productivity with AI.",
          sourceUrl: "https://www.youtube.com/watch?v=4uvX6dxD6QA",
          duration: "10 to 15 min",
          required: true,
        },
        {
          title: "Video 8: Make Money Using AI",
          summary:
            "Cover freelancing ideas, AI services, and business opportunities.",
          sourceUrl: "https://www.youtube.com/watch?v=uz_3dSU8rQo",
          duration: "10 to 15 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m4-q1",
          question: "What is one practical way AI helps at work?",
          options: [
            { id: "a", text: "By speeding up repetitive tasks like drafts and summaries" },
            { id: "b", text: "By removing all review forever" },
            { id: "c", text: "By replacing every business decision" },
            { id: "d", text: "By stopping communication" },
          ],
          correctOptionId: "a",
          explanation: "AI is especially useful for first drafts, summaries, ideas, and repetitive support tasks.",
        },
        {
          id: "m4-q2",
          question: "What does automation mean in this course?",
          options: [
            { id: "a", text: "Reducing manual repetitive work with tools" },
            { id: "b", text: "Turning off your laptop" },
            { id: "c", text: "Avoiding all software" },
            { id: "d", text: "Removing all human thinking" },
          ],
          correctOptionId: "a",
          explanation: "Automation here means using AI and simple tools to reduce repeated manual effort.",
        },
        {
          id: "m4-q3",
          question: "Which is an example of an AI-based freelance service?",
          options: [
            { id: "a", text: "Content drafting and AI-assisted research for clients" },
            { id: "b", text: "Selling blank pages" },
            { id: "c", text: "Only chip manufacturing" },
            { id: "d", text: "Repairing office chairs" },
          ],
          correctOptionId: "a",
          explanation: "Many non-engineers use AI to support content, research, admin, and creative services.",
        },
        {
          id: "m4-q4",
          question: "Why can AI create business opportunities for non-engineers?",
          options: [
            { id: "a", text: "Because you can offer AI-supported services without building the models yourself" },
            { id: "b", text: "Because only engineers can sell services" },
            { id: "c", text: "Because AI has no commercial use" },
            { id: "d", text: "Because customers never need human help" },
          ],
          correctOptionId: "a",
          explanation: "A lot of opportunity comes from applying tools to real client and business needs.",
        },
        {
          id: "m4-q5",
          question: "What is the main aim of this final module?",
          options: [
            { id: "a", text: "To connect AI learning with productivity and earning opportunities" },
            { id: "b", text: "To teach advanced neural network math" },
            { id: "c", text: "To avoid using AI tools" },
            { id: "d", text: "To focus only on coding frameworks" },
          ],
          correctOptionId: "a",
          explanation: "The last module turns knowledge into practical value for work and income opportunities.",
        },
      ],
    },
  ],
  finalExam: [
    {
      id: "f1",
      question: "What is the main goal of this mini course?",
      options: [
        { id: "a", text: "To understand AI and start using it without coding" },
        { id: "b", text: "To become an AI scientist immediately" },
        { id: "c", text: "To learn only advanced coding" },
        { id: "d", text: "To avoid AI tools" },
      ],
      correctOptionId: "a",
      explanation: "This course is designed for non-engineers who want practical AI understanding and usage.",
    },
    {
      id: "f2",
      question: "Which statement about AI is most accurate?",
      options: [
        { id: "a", text: "AI can support human work but should still be reviewed" },
        { id: "b", text: "AI is always correct" },
        { id: "c", text: "AI is only for programmers" },
        { id: "d", text: "AI has no business use" },
      ],
      correctOptionId: "a",
      explanation: "AI is useful, but verification and judgment still matter.",
    },
    {
      id: "f3",
      question: "What is machine learning?",
      options: [
        { id: "a", text: "A branch of AI that learns from data" },
        { id: "b", text: "A browser" },
        { id: "c", text: "A mobile charger" },
        { id: "d", text: "A spreadsheet theme" },
      ],
      correctOptionId: "a",
      explanation: "Machine learning is one part of AI and learns from data patterns.",
    },
    {
      id: "f4",
      question: "Which is an everyday AI use case?",
      options: [
        { id: "a", text: "Streaming recommendations" },
        { id: "b", text: "A glass cup" },
        { id: "c", text: "A wooden shelf" },
        { id: "d", text: "A printed calendar" },
      ],
      correctOptionId: "a",
      explanation: "Recommendations are one of the most familiar everyday AI applications.",
    },
    {
      id: "f5",
      question: "What is a prompt?",
      options: [
        { id: "a", text: "The instruction you give to the AI" },
        { id: "b", text: "A laptop battery" },
        { id: "c", text: "A social platform" },
        { id: "d", text: "A monitor setting" },
      ],
      correctOptionId: "a",
      explanation: "Prompts are the questions or instructions that guide the AI response.",
    },
    {
      id: "f6",
      question: "Why compare AI tools?",
      options: [
        { id: "a", text: "Because different tools are better for different tasks" },
        { id: "b", text: "Because all tools are identical" },
        { id: "c", text: "Because only paid tools work" },
        { id: "d", text: "Because free tools cannot be tested" },
      ],
      correctOptionId: "a",
      explanation: "Tool selection matters because tasks vary across text, images, research, and automation.",
    },
    {
      id: "f7",
      question: "How can AI help in work settings?",
      options: [
        { id: "a", text: "By reducing time spent on repetitive tasks" },
        { id: "b", text: "By removing all human decisions" },
        { id: "c", text: "By ending communication" },
        { id: "d", text: "By replacing every system overnight" },
      ],
      correctOptionId: "a",
      explanation: "One of AI’s most practical benefits is saving time on repetitive work.",
    },
    {
      id: "f8",
      question: "Which is a realistic way to earn using AI?",
      options: [
        { id: "a", text: "Offering AI-assisted services such as content or research support" },
        { id: "b", text: "Selling random empty files" },
        { id: "c", text: "Ignoring client needs" },
        { id: "d", text: "Using AI with no clear use case" },
      ],
      correctOptionId: "a",
      explanation: "Many service opportunities come from using AI to improve valuable client work.",
    },
    {
      id: "f9",
      question: "What should you do before trusting important AI output?",
      options: [
        { id: "a", text: "Review and verify it" },
        { id: "b", text: "Assume it is perfect" },
        { id: "c", text: "Share it immediately without checking" },
        { id: "d", text: "Delete it automatically" },
      ],
      correctOptionId: "a",
      explanation: "Verification is an essential habit in responsible AI usage.",
    },
    {
      id: "f10",
      question: "What unlocks the next module in this course?",
      options: [
        { id: "a", text: "Completing the current module quiz" },
        { id: "b", text: "Refreshing the page" },
        { id: "c", text: "Skipping the video" },
        { id: "d", text: "Opening the browser again" },
      ],
      correctOptionId: "a",
      explanation: "Each next module stays locked until the current module quiz is completed.",
    },
  ],
  syllabus: [
    {
      week: "Module 1",
      theme: "Introduction to AI",
      focus: "Understand what AI is and how AI, ML, and deep learning differ.",
      deliverable: "Complete the 5-question quiz.",
    },
    {
      week: "Module 2",
      theme: "AI in Real Life",
      focus: "See AI in business, daily life, industries, and future opportunities.",
      deliverable: "Complete the 5-question quiz.",
    },
    {
      week: "Module 3",
      theme: "Using AI Tools",
      focus: "Learn ChatGPT basics, prompts, tool selection, and free vs paid options.",
      deliverable: "Complete the 5-question quiz.",
    },
    {
      week: "Module 4",
      theme: "Practical Use and Earning",
      focus: "Use AI for productivity and explore freelancing or business opportunities.",
      deliverable: "Complete the 5-question quiz and unlock the final exam.",
    },
  ],
};

export const academyMiniFaqs = [
  {
    question: "Do I need coding knowledge?",
    answer: "No. This course is designed for absolute beginners with no coding background.",
  },
  {
    question: "Can I paste my own video links?",
    answer: "Yes. Each lesson video slot is ready for a manual link, and the player will render it in an iframe.",
  },
  {
    question: "Can learners skip modules?",
    answer: "No. Each next module stays locked until the current module quiz is completed.",
  },
];
