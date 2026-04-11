export type AcademyModule = {
  id: string;
  title: string;
  description: string;
  lessons: string[];
  videos?: AcademyVideo[];
  quiz?: AcademyQuizQuestion[];
  project?: string;
};

export type AcademyVideo = {
  title: string;
  summary: string;
  youtubeId?: string;
  sourceUrl?: string;
  sourceUrls?: string[];
  duration: string;
  required?: boolean;
};

export type AcademyQuizOption = {
  id: string;
  text: string;
};

export type AcademyQuizQuestion = {
  id: string;
  question: string;
  options: AcademyQuizOption[];
  correctOptionId: string;
  explanation: string;
};

export type AcademyWeek = {
  week: string;
  theme: string;
  focus: string;
  deliverable: string;
};

export type AcademyCourse = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  cardImageSrc?: string;
  cardImageAlt?: string;
  goal?: string;
  duration: string;
  pace: string;
  level: string;
  format: string;
  audience: string[];
  outcomes: string[];
  modules: AcademyModule[];
  finalExam?: AcademyQuizQuestion[];
  syllabus: AcademyWeek[];
};

export const academyCourse: AcademyCourse = {
  slug: "ai-for-non-engineers",
  title: "AI for Non-Engineers",
  tagline: "Learn to use AI confidently at work without writing code.",
  summary:
    "A practical flagship course for professionals who want to understand AI, evaluate tools, automate repetitive work, and lead adoption responsibly inside their teams.",
  duration: "5 weeks",
  pace: "4 to 5 hours per week",
  level: "Beginner friendly",
  format: "Self-paced lessons, guided exercises, and a final workflow project",
  audience: [
    "Managers and team leads",
    "Operations and support professionals",
    "Marketers, recruiters, and sales teams",
    "Founders and business owners",
    "Teachers, analysts, and career switchers",
  ],
  outcomes: [
    "Explain core AI concepts in plain business language",
    "Choose the right AI tools for writing, research, planning, and analysis",
    "Write effective prompts that improve speed and output quality",
    "Build simple no-code workflows to remove repetitive work",
    "Review AI output for accuracy, bias, privacy, and risk",
    "Create an AI adoption plan for your role or team",
  ],
  modules: [
    {
      id: "01",
      title: "AI Foundations Without the Jargon",
      description:
        "Build a clear mental model of what AI is, what it is not, and where it creates real value.",
      lessons: [
        "How AI, machine learning, and generative AI differ",
        "Common AI use cases across business functions",
        "Capabilities, limits, and failure patterns",
        "A simple framework for spotting high-value AI opportunities",
      ],
      videos: [
        {
          title: "Intro lesson: What AI can and cannot do",
          summary:
            "Use this slot for a plain-language YouTube lesson that introduces AI capabilities, limitations, and business use cases.",
          duration: "8 to 12 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m1-q1",
          question: "What is the most useful way for a beginner to think about AI at work?",
          options: [
            { id: "a", text: "As a replacement for all human judgment" },
            { id: "b", text: "As a tool that helps with specific tasks and still needs review" },
            { id: "c", text: "As something only engineers can use effectively" },
          ],
          correctOptionId: "b",
          explanation:
            "The course treats AI as task-level support. It can accelerate work, but human judgment is still required for accuracy, context, and trust.",
        },
      ],
      project: "Map three realistic AI opportunities in your current workflow.",
    },
    {
      id: "02",
      title: "Prompting and Productivity Workflows",
      description:
        "Learn how to ask AI for better outputs and turn prompt patterns into repeatable daily workflows.",
      lessons: [
        "Prompt anatomy: role, context, task, constraints, output",
        "How to iterate when the first answer is weak",
        "Prompt patterns for writing, summaries, research, and planning",
        "Reducing hallucinations with verification prompts",
        "Building a reusable prompt library for your role",
      ],
      videos: [
        {
          title: "Prompt design walkthrough",
          summary:
            "Embed a YouTube lesson here that demonstrates role, context, constraints, and output format using a real work scenario.",
          duration: "10 to 15 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m2-q1",
          question: "Which prompt structure usually improves output quality the most?",
          options: [
            { id: "a", text: "A short command with no context" },
            { id: "b", text: "A prompt that includes context, task, constraints, and desired output" },
            { id: "c", text: "Asking the model to do everything in one vague request" },
          ],
          correctOptionId: "b",
          explanation:
            "Better prompts reduce ambiguity. Context, task framing, and output constraints usually produce more useful answers than short generic requests.",
        },
      ],
      project: "Create a reusable prompt library for five common work tasks.",
    },
    {
      id: "03",
      title: "AI Tools and No-Code Automation",
      description:
        "Choose the right tools for the job and turn repeated work into simple no-code systems.",
      lessons: [
        "Chat assistants, meeting copilots, and research tools",
        "When to use text, image, audio, and spreadsheet AI",
        "Comparing tools by accuracy, speed, cost, and privacy",
        "Creating a personal AI stack without tool overload",
        "Breaking work into repeatable automation steps",
        "Human-in-the-loop workflow design",
        "Where automation should stop and review should begin",
      ],
      videos: [
        {
          title: "Choosing the right AI tool for the job",
          summary:
            "Add a YouTube comparison lesson for chat assistants, research tools, and workflow copilots.",
          duration: "8 to 10 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m3-q1",
          question: "What is the best reason to keep your AI toolkit small at first?",
          options: [
            { id: "a", text: "Most teams only need one tool for every task" },
            { id: "b", text: "A smaller stack is easier to evaluate, adopt, and govern" },
            { id: "c", text: "Using multiple tools is never effective" },
          ],
          correctOptionId: "b",
          explanation:
            "The goal is deliberate adoption. A smaller stack reduces confusion and makes it easier to set quality, cost, and privacy expectations.",
        },
        {
          id: "m3-q2",
          question: "What makes an AI workflow safe to automate?",
          options: [
            { id: "a", text: "It runs without any human review" },
            { id: "b", text: "It has clear steps and review points where human judgment matters" },
            { id: "c", text: "It uses the newest tool on the market" },
          ],
          correctOptionId: "b",
          explanation:
            "Useful automation does not mean zero oversight. Good workflows define where AI helps and where people still verify or approve outcomes.",
        },
      ],
      project:
        "Design your AI toolkit and build one no-code workflow that saves at least one hour per week.",
    },
    {
      id: "04",
      title: "Communication, Content, and Research",
      description:
        "Use AI to improve writing, research, presentations, and decision support while keeping output credible.",
      lessons: [
        "Drafting emails, reports, and presentations faster",
        "Turning rough notes into polished communication",
        "Adapting tone for customers, leaders, or internal teams",
        "Editing AI output to sound human and credible",
        "Research workflows with source checking",
        "Using AI for comparison tables and decision briefs",
        "Separating useful assistance from false confidence",
      ],
      videos: [
        {
          title: "AI for writing and research",
          summary:
            "Add a YouTube lesson here that shows how to draft communication, summarize information, and verify research output.",
          duration: "10 to 14 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m4-q1",
          question: "Why should AI-generated communication usually be edited before sending?",
          options: [
            { id: "a", text: "Because AI output can miss tone, nuance, or factual accuracy" },
            { id: "b", text: "Because editing makes the message longer" },
            { id: "c", text: "Because AI cannot draft communication at all" },
          ],
          correctOptionId: "a",
          explanation:
            "AI can draft quickly, but strong communication still depends on human judgment for tone, trust, and factual correctness.",
        },
        {
          id: "m4-q2",
          question: "What is the most important habit when using AI for research?",
          options: [
            { id: "a", text: "Trust the first answer if it sounds confident" },
            { id: "b", text: "Verify claims and sources before using the result" },
            { id: "c", text: "Avoid asking follow-up questions" },
          ],
          correctOptionId: "b",
          explanation:
            "AI can accelerate research, but it is not a final authority. Verification is what turns fast output into reliable decision support.",
        },
      ],
      project:
        "Create a communication kit and a short AI-assisted research brief with documented verification steps.",
    },
    {
      id: "05",
      title: "Responsible AI and Adoption Plan",
      description:
        "Operate with stronger judgment around privacy, compliance, bias, and rollout strategy.",
      lessons: [
        "What data should never be pasted into public tools",
        "Bias, fairness, and hidden risks in AI output",
        "Basic governance for teams using AI",
        "How to review AI work before it reaches customers or leaders",
        "Finding quick wins and sequencing adoption",
        "Defining success metrics and time-saved targets",
        "Upskilling teammates without overwhelm",
        "Presenting an AI rollout plan to stakeholders",
      ],
      videos: [
        {
          title: "Responsible AI and rollout planning",
          summary:
            "Use this lesson slot for privacy, governance, and stakeholder-ready adoption planning.",
          duration: "9 to 12 min",
          required: true,
        },
      ],
      quiz: [
        {
          id: "m5-q1",
          question: "Which behavior is most aligned with responsible AI use?",
          options: [
            { id: "a", text: "Pasting sensitive customer data into any public tool" },
            { id: "b", text: "Checking privacy, bias, and review policies before adoption" },
            { id: "c", text: "Skipping human review if the output looks polished" },
          ],
          correctOptionId: "b",
          explanation:
            "Responsible AI use starts with governance, privacy awareness, and review discipline, not just convenience.",
        },
        {
          id: "m5-q2",
          question: "What makes an AI adoption plan credible to stakeholders?",
          options: [
            { id: "a", text: "It promises instant transformation with no risks" },
            { id: "b", text: "It includes realistic quick wins, metrics, and governance" },
            { id: "c", text: "It focuses only on buying more tools" },
          ],
          correctOptionId: "b",
          explanation:
            "Stakeholders respond better to realistic rollout plans that connect AI use to value, review practices, and measurable outcomes.",
        },
      ],
      project:
        "Write a responsible AI checklist and prepare a role-specific adoption roadmap for the next 90 days.",
    },
  ],
  syllabus: [
    {
      week: "Week 1",
      theme: "AI mindset and foundations",
      focus:
        "Understand the core concepts, the language of AI, and the most realistic use cases for non-technical professionals.",
      deliverable: "Opportunity map of where AI can help in your role.",
    },
    {
      week: "Week 2",
      theme: "Prompting and output quality",
      focus:
        "Learn the prompting patterns that improve reliability for writing, planning, and analytical work.",
      deliverable: "A reusable prompt pack for your top recurring tasks.",
    },
    {
      week: "Week 3",
      theme: "Tools and no-code workflow design",
      focus:
        "Compare AI tools, choose a practical stack, and build one repeatable workflow with human review built in.",
      deliverable: "Your AI toolkit and one no-code workflow blueprint.",
    },
    {
      week: "Week 4",
      theme: "Communication, content, and research",
      focus:
        "Apply AI to content creation, knowledge work, reports, and decision support with human review built in.",
      deliverable: "One polished AI-assisted work artifact plus a verified research brief.",
    },
    {
      week: "Week 5",
      theme: "Responsible use and adoption plan",
      focus:
        "Learn the privacy, compliance, and governance checks needed before AI output is trusted, then package your final rollout plan.",
      deliverable: "Responsible AI checklist and a 90-day role-specific adoption plan.",
    },
  ],
};

export const academyFaqs = [
  {
    question: "Who is this course designed for?",
    answer:
      "It is built for people who use technology at work but do not want to code. The course assumes curiosity, not an engineering background.",
  },
  {
    question: "Do I need advanced math or programming knowledge?",
    answer:
      "No. The course focuses on decision-making, workflows, tool use, and business judgment rather than technical implementation.",
  },
  {
    question: "What will I have by the end of the course?",
    answer:
      "You will leave with a prompt library, a no-code workflow, a responsible AI checklist, and a 90-day adoption plan for your role.",
  },
  {
    question: "Is this course practical or theory-heavy?",
    answer:
      "The structure is practical. Every module ends with an applied exercise or mini project tied to real workplace tasks.",
  },
];
