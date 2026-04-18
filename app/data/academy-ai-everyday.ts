import type { AcademyCourse } from "@/app/data/academy";

export const aiEverydayCourse: AcademyCourse = {
  slug: "ai-for-everyday",
  title: "AI FOR EVERYDAY",
  tagline: "A masterclass on the top 30 AI tools to supercharge your productivity, creativity, and daily life.",
  summary:
    "The ultimate guide to the modern AI ecosystem. This 30-module course covers everything from LLMs and content creation to automation, video generation, and AI-driven productivity systems. Learn how to use the best tools on the market to work smarter and live better.",
  duration: "30 days",
  pace: "Self-paced",
  level: "Beginner to Intermediate",
  format: "Practical tool walkthroughs, prompt libraries, and daily implementation challenges",
  audience: [
    "Content Creators and Marketers",
    "Students and Researchers",
    "Entrepreneurs and Small Business Owners",
    "Professionals looking for a productivity edge",
    "Anyone curious about the best AI tools available today",
  ],
  outcomes: [
    "Master the top 30 AI tools used by industry leaders",
    "Build automated workflows that save hours of manual work every week",
    "Generate professional-grade text, images, video, and audio using AI",
    "Optimize your schedule and tasks with AI-driven productivity assistants",
    "Create stunning presentations, websites, and documents in minutes",
    "Develop a personalized AI tech stack tailored to your specific needs",
  ],
  isCoding: false,
  price: 99,
  currency: "INR",
  modules: [
    {
      id: "01",
      title: "ChatGPT",
      description: "Mastering the world's most famous AI assistant for everything from writing to coding support.",
      lessons: ["Advanced prompting techniques", "Custom Instructions and GPTs", "Using ChatGPT for data analysis", "ChatGPT mobile and voice features"],
      notesDownloadUrl: "/academy/notes/ai-for-everyday/ai-for-everyday-full.pdf",
      quiz: [
        { id: "ed1-q1", question: "How do 'Custom Instructions' in ChatGPT fundamentally change the user experience compared to standard prompting?", options: [{ id: "a", text: "They make the AI respond faster by using less tokens" }, { id: "b", text: "They provide a persistent 'system prompt' that the AI references in every new chat to maintain consistent persona and formatting" }, { id: "c", text: "They allow the user to bypass the monthly subscription fee" }, { id: "d", text: "They enable the AI to access the user's local hard drive files" }], correctOptionId: "b", explanation: "Custom Instructions allow you to define who you are and how the AI should behave (e.g., 'always use professional tone') without repeating those rules in every single chat." },
        { id: "ed1-q2", question: "What is the primary function of ChatGPT's 'Data Analysis' (formerly Advanced Data Analysis) feature?", options: [{ id: "a", text: "To delete old chats automatically" }, { id: "b", text: "To write and execute Python code in a secure environment to perform complex calculations, data visualization, and file editing" }, { id: "c", text: "To search for your home address on the web" }, { id: "d", text: "To increase the word limit of a prompt" }], correctOptionId: "b", explanation: "Data Analysis gives ChatGPT a 'brain with a calculator' by allowing it to write code to solve problems accurately." },
        { id: "ed1-q3", question: "In ChatGPT, what is a 'GPT' (Custom GPT)?", options: [{ id: "a", text: "A new version of the internet" }, { id: "b", text: "A tailored version of ChatGPT that combines instructions, extra knowledge, and any combination of skills" }, { id: "c", text: "A physical robot sold by OpenAI" }, { id: "d", text: "A type of cryptocurrency" }], correctOptionId: "b", explanation: "GPTs allow anyone to create a specialized version of ChatGPT for a specific purpose, like a 'Creative Writing Coach' or a 'Tech Support Assistant'." },
        { id: "ed1-q4", question: "How does the 'Voice Mode' in the ChatGPT mobile app differ from standard text-to-speech?", options: [{ id: "a", text: "It is 10 times louder" }, { id: "b", text: "It allows for real-time, near-human-speed verbal conversations with emotional nuance and interruptibility" }, { id: "c", text: "It only works when you are shouting" }, { id: "d", text: "It translates every word into Latin automatically" }], correctOptionId: "b", explanation: "Modern voice modes (like GPT-4o's) process audio directly, allowing for much more natural and fluid interaction than older text-to-speech engines." },
        { id: "ed1-q5", question: "Which feature allows ChatGPT to browse the live web for up-to-date information?", options: [{ id: "a", text: "Search with Bing" }, { id: "b", text: "Google Chrome Integration" }, { id: "c", text: "The 'Live' button" }, { id: "d", text: "It cannot browse the web" }], correctOptionId: "a", explanation: "ChatGPT uses 'Search with Bing' to overcome its knowledge cutoff and find real-time data like news or stock prices." }
      ]
    },
    {
      id: "02",
      title: "Claude",
      description: "Using Anthropic's Claude for nuanced writing, large document analysis, and coding.",
      lessons: ["Claude's unique 'Artifacts' feature", "Analyzing long PDF documents", "Writing in a specific brand voice", "Comparing Claude with other LLMs"],
      quiz: [{ id: "ed2-q1", question: "In what specific scenario does Claude's 'Artifacts' UI provide a significant technical advantage over a standard chat interface?", options: [{ id: "a", text: "When you want to search through your old chat history" }, { id: "b", text: "When iterating on complex code, websites, or documents that need to be viewed and edited side-by-side with the conversation" }, { id: "c", text: "When you need to upload a file larger than 1GB" }, { id: "d", text: "When using the mobile app in low-light mode" }], correctOptionId: "b", explanation: "Artifacts create a dedicated workspace for the content you're building, allowing you to see code or text changes in real-time while continuing to prompt the AI for refinements." }]
    },
    {
      id: "03",
      title: "Google Gemini",
      description: "Leveraging Google's ecosystem integration and multimodal capabilities.",
      lessons: ["Integrating Gemini with Google Workspace", "Multimodal search and analysis", "Gemini Advanced vs Pro", "Using Gemini for travel planning"],
      quiz: [{ id: "ed3-q1", question: "What is the primary benefit of Gemini's 'Extensions' feature within the Google ecosystem?", options: [{ id: "a", text: "It allows Gemini to install Chrome browser extensions automatically" }, { id: "b", text: "It enables Gemini to pull real-time data from your Gmail, Drive, and Maps to provide contextually aware answers" }, { id: "c", text: "It increases the length of the AI's responses" }, { id: "d", text: "It allows Gemini to translate text into 500 different languages" }], correctOptionId: "b", explanation: "Extensions allow the AI to act as a personal assistant by accessing your personal data (with permission) across Google's suite of apps." }]
    },
    {
      id: "04",
      title: "Perplexity AI",
      description: "The future of search: Using Perplexity for cited, real-time research.",
      lessons: ["Pro Search for deep research", "Understanding sources and citations", "Using 'Pages' to create reports", "Search settings and focus modes"],
      quiz: [{ id: "ed4-q1", question: "How does Perplexity AI's 'Pro Search' (formerly Copilot) differ from a standard keyword search?", options: [{ id: "a", text: "It costs money per search" }, { id: "b", text: "It uses an agentic workflow to ask follow-up questions and search multiple sources to synthesize a comprehensive, cited answer" }, { id: "c", text: "It only searches academic journals" }, { id: "d", text: "It is 10 times faster than a regular search" }], correctOptionId: "b", explanation: "Pro Search doesn't just give links; it acts as a researcher that clarifies your intent and combines information from various parts of the web into a coherent report." }]
    },
    {
      id: "05",
      title: "Jasper",
      description: "Enterprise-grade AI for marketing teams and brand-consistent content.",
      lessons: ["Setting up Brand Voice", "Campaign management in Jasper", "Using templates for blog posts", "Jasper's SEO integrations"],
      quiz: [{ id: "ed5-q1", question: "Why is Jasper's 'Brand Voice' feature considered an enterprise-level requirement for marketing teams?", options: [{ id: "a", text: "It makes the AI's voice sound more human when reading text out loud" }, { id: "b", text: "It ensures all generated content matches the company's specific tone, vocabulary, and style guidelines across different users" }, { id: "c", text: "It allows the company to trademark the AI's output automatically" }, { id: "d", text: "It is required by law for all corporate AI usage" }], correctOptionId: "b", explanation: "Consistency is key in marketing. Brand Voice prevents the 'AI-generated' generic feel by forcing the model to adhere to a specific corporate identity." }]
    },
    {
      id: "06",
      title: "Copy.ai",
      description: "Automating GTM (Go-To-Market) workflows and sales copy.",
      lessons: ["Workflow automation for sales", "Generating ad copy at scale", "Social media content planning", "Copy.ai OS for business"],
      quiz: [{ id: "ed6-q1", question: "What is the strategic purpose of 'Workflows' in Copy.ai for a sales team?", options: [{ id: "a", text: "To write 100 emails at once without any data" }, { id: "b", text: "To automate the process of taking a raw input (like a URL) and transforming it into multiple assets (LinkedIn posts, emails, ad copy) instantly" }, { id: "c", text: "To track the physical location of sales leads" }, { id: "d", text: "To replace the CRM entirely" }], correctOptionId: "b", explanation: "Workflows allow for 'one-to-many' content creation, where one piece of information can be repurposed into an entire marketing campaign automatically." }]
    },
    {
      id: "07",
      title: "QuillBot",
      description: "The ultimate paraphrasing and summarizing tool for writers and students.",
      lessons: ["Paraphrasing modes and settings", "Using the Co-Writer feature", "Summarizing long articles", "Grammar and plagiarism checks"],
      quiz: [{ id: "ed7-q1", question: "How does QuillBot's 'Academic' mode differ from its 'Standard' paraphrasing mode?", options: [{ id: "a", text: "It uses bigger words to sound smarter" }, { id: "b", text: "It focuses on maintaining formal tone and precise terminology suitable for research papers and professional reports" }, { id: "c", text: "It automatically adds citations to every sentence" }, { id: "d", text: "It is only available to users with a .edu email address" }], correctOptionId: "b", explanation: "Academic mode is specifically tuned to avoid slang and maintain the rigor required for scholarly or professional writing." }]
    },
    {
      id: "08",
      title: "Grammarly",
      description: "Beyond spellcheck: Using Grammarly's AI for tone, clarity, and rewriting.",
      lessons: ["Setting writing goals", "AI-powered text generation", "Clarity and engagement suggestions", "Grammarly for business teams"],
      quiz: [{ id: "ed8-q1", question: "What does Grammarly's 'Tone Detector' use to provide feedback to the writer?", options: [{ id: "a", text: "A list of 'bad' words" }, { id: "b", text: "Machine learning models that analyze word choice, phrasing, and punctuation to predict how a reader will perceive the message" }, { id: "c", text: "The volume of the user's typing" }, { id: "d", text: "The user's previous social media history" }], correctOptionId: "b", explanation: "Tone detection helps ensure your email doesn't sound 'aggressive' when you intended it to be 'confident' by analyzing the nuances of your language." }]
    },
    {
      id: "09",
      title: "Runway ML",
      description: "Professional AI video generation and editing tools.",
      lessons: ["Gen-2: Text to Video", "Video to Video transformations", "Removing backgrounds and objects", "Motion brush and camera controls"],
      quiz: [{ id: "ed9-q1", question: "In Runway's Gen-2, what does the 'Motion Brush' feature allow a creator to do?", options: [{ id: "a", text: "Paint new objects into a video" }, { id: "b", text: "Select specific areas of a still image and define the direction and intensity of movement for only those parts" }, { id: "c", text: "Change the color of a moving car" }, { id: "d", text: "Delete the video's audio track" }], correctOptionId: "b", explanation: "Motion Brush gives creators precise control over animation, allowing them to make 'just the clouds move' or 'just the water ripple' in a static shot." }]
    },
    {
      id: "10",
      title: "Pika Labs",
      description: "Creating cinematic animations and videos from text and images.",
      lessons: ["Animating static images", "Using Pika on Discord vs Web", "Video upscaling and refinement", "Stylizing your videos"],
      quiz: [{ id: "ed10-q1", question: "What is the primary technical advantage of using '-motion' parameters in Pika Labs?", options: [{ id: "a", text: "It makes the video file size smaller" }, { id: "b", text: "It allows the user to mathematically control the level of camera movement or character action in the generated clip" }, { id: "c", text: "It changes the video from 2D to 3D" }, { id: "d", text: "It automatically adds music to the video" }], correctOptionId: "b", explanation: "Pika's parameters allow for fine-tuned control over the 'energy' of a scene, ranging from a subtle breeze to a chaotic explosion." }]
    },
    {
      id: "11",
      title: "Sora",
      description: "Understanding the future of hyper-realistic AI video (OpenAI).",
      lessons: ["Sora's capabilities and limits", "The technology behind Sora", "Safety and red-teaming in AI video", "Impact on the film industry"],
      quiz: [{ id: "ed11-q1", question: "Technically, how does Sora maintain 'Temporal Consistency' (objects not changing shape) over a long 60-second video?", options: [{ id: "a", text: "By using a very fast frame rate" }, { id: "b", text: "By representing video as 'spacetime patches' and using a diffusion transformer architecture to maintain a global understanding of the 3D scene" }, { id: "c", text: "By hiring human editors to fix each frame" }, { id: "d", text: "By only generating videos of simple, stationary objects" }], correctOptionId: "b", explanation: "Sora's architecture allows it to 'remember' the 3D geometry of a scene across time, preventing the common 'morphing' glitches seen in earlier AI video models." }]
    },
    {
      id: "12",
      title: "Descript",
      description: "The AI-powered 'word processor' for video and podcast editing.",
      lessons: ["Editing video by editing text", "Overdub: AI voice cloning", "Studio Sound: Pro audio in one click", "Automated filler word removal"],
      quiz: [{ id: "ed12-q1", question: "How does Descript's 'Underlord' (AI Assistant) significantly reduce the 'First Cut' time for a podcaster?", options: [{ id: "a", text: "By recording the podcast for them" }, { id: "b", text: "By automatically identifying and removing 'filler words' (ums, ahs), silence gaps, and repetitive takes based on the transcript" }, { id: "c", text: "By posting the video to YouTube automatically" }, { id: "d", text: "By buying better microphones for the guests" }], correctOptionId: "b", explanation: "Descript's AI can 'read' the audio and perform tedious editing tasks in seconds that would take a human hours of manual clicking." }]
    },
    {
      id: "13",
      title: "CapCut",
      description: "Using AI features in the world's most popular mobile video editor.",
      lessons: ["Auto-captions and styling", "AI background removal", "Script-to-video tools", "Smart stabilization and tracking"],
      quiz: [{ id: "ed13-q1", question: "What is the primary technical benefit of CapCut's 'AI Script-to-Video' feature for creators?", options: [{ id: "a", text: "It writes the script using GPT and then automatically finds and syncs relevant stock footage and captions to match the pacing" }, { id: "b", text: "It makes the phone battery last longer" }, { id: "c", text: "It turns the phone into a 4K camera" }, { id: "d", text: "It deletes bad comments on social media" }], correctOptionId: "a", explanation: "Script-to-video automates the 'assembly' phase of content creation, allowing a user to go from an idea to a rough draft in minutes." }]
    },
    {
      id: "14",
      title: "ElevenLabs",
      description: "The gold standard for AI voice synthesis and cloning.",
      lessons: ["Text to Speech with emotion", "Instant Voice Cloning", "Professional Voice Cloning", "Speech-to-Speech transformations"],
      quiz: [{ id: "ed14-q1", question: "In ElevenLabs, what is the critical difference between 'Instant Voice Cloning' and 'Professional Voice Cloning'?", options: [{ id: "a", text: "Instant is free, Professional costs money" }, { id: "b", text: "Professional requires a significantly larger dataset (30+ mins) and creates a fine-tuned model that captures the unique nuances and 'soul' of a voice more accurately" }, { id: "c", text: "Instant only works in English" }, { id: "d", text: "There is no technical difference" }], correctOptionId: "b", explanation: "Professional cloning involves training a specific model on your voice, resulting in a result that is nearly indistinguishable from the real person." }]
    },
    {
      id: "15",
      title: "Speechify",
      description: "Turning any text into high-quality audio with AI voices.",
      lessons: ["Reading PDFs and web pages", "Using celebrity voices (Snoop Dogg, etc.)", "Adjusting reading speed for productivity", "Scanning physical books with the app"],
      quiz: [{ id: "ed15-q1", question: "Beyond simple text-to-speech, how does Speechify use 'OCR' (Optical Character Recognition) to aid productivity?", options: [{ id: "a", text: "By translating audio into text" }, { id: "b", text: "By allowing users to snap a photo of physical pages and instantly turn them into high-quality audiobooks" }, { id: "c", text: "By changing the font size of a document" }, { id: "d", text: "By recording phone calls" }], correctOptionId: "b", explanation: "OCR combined with AI voice allows you to 'listen' to physical books or documents while commuting or exercising." }]
    },
    {
      id: "16",
      title: "Adobe Podcast",
      description: "AI-powered audio cleanup and recording tools.",
      lessons: ["Enhance Speech: Removing background noise", "Mic Check for optimal setup", "AI-assisted transcript editing", "Recording remote interviews"],
      quiz: [{ id: "ed16-q1", question: "Technically, what is Adobe's 'Enhance Speech' doing to a low-quality recording?", options: [{ id: "a", text: "Just making it louder" }, { id: "b", text: "Using a generative model to 'reconstruct' the missing frequencies and clarity of the human voice while filtering out environmental noise" }, { id: "c", text: "Adding background music to hide the noise" }, { id: "d", text: "Slowing down the audio to make it clearer" }], correctOptionId: "b", explanation: "Enhance Speech doesn't just 'filter' noise; it uses AI to literally rebuild the voice so it sounds like it was recorded in a professional studio." }]
    },
    {
      id: "17",
      title: "Canva",
      description: "Using Magic Studio to design anything with AI.",
      lessons: ["Magic Media: Text to Image/Video", "Magic Switch: Resizing designs", "Magic Grab and Edit for photos", "AI-powered presentation generation"],
      quiz: [{ id: "ed17-q1", question: "What is the primary function of Canva's 'Magic Switch' feature for a marketing professional?", options: [{ id: "a", text: "To turn the computer off automatically" }, { id: "b", text: "To instantly transform a single design into multiple formats (e.g., an Instagram post into a blog banner or presentation) while intelligently resizing elements" }, { id: "c", text: "To change the language of the entire website" }, { id: "d", text: "To swap the colors of a logo" }], correctOptionId: "b", explanation: "Magic Switch uses AI to handle the tedious work of multi-channel content distribution, ensuring the layout looks good in every size." }]
    },
    {
      id: "18",
      title: "Midjourney",
      description: "Mastering the world's most artistic AI image generator.",
      lessons: ["Mastering prompts and parameters", "Using V6 for hyper-realism", "Inpainting and Outpainting", "Character and Style reference"],
      quiz: [{ id: "ed18-q1", question: "How does the '--cref' (Character Reference) parameter in Midjourney solve a major problem for storytellers?", options: [{ id: "a", text: "It makes the characters look more like cartoons" }, { id: "b", text: "It allows for 'character consistency' by using an existing image to keep the same person or object across multiple different scenes and prompts" }, { id: "c", text: "It automatically generates a name for the character" }, { id: "d", text: "It adds 3D depth to the image" }], correctOptionId: "b", explanation: "Consistency has always been hard in AI art. Character Reference allows you to build a 'cast' for a book or campaign and keep them looking the same throughout." }]
    },
    {
      id: "19",
      title: "Adobe Firefly",
      description: "Generative AI integrated into Photoshop and Illustrator.",
      lessons: ["Generative Fill in Photoshop", "Text to Vector in Illustrator", "Generative Recolor for designs", "Ethical AI and Content Credentials"],
      quiz: [{ id: "ed19-q1", question: "What makes Adobe Firefly's 'Text to Vector' feature in Illustrator unique compared to standard AI image generators?", options: [{ id: "a", text: "It generates photos" }, { id: "b", text: "It creates fully editable, scalable vector paths and layers that can be modified by a graphic designer, rather than just a flat pixel-based image" }, { id: "c", text: "It only works in black and white" }, { id: "d", text: "It is 10 times slower" }], correctOptionId: "b", explanation: "Vector AI is critical for professional design (logos, icons) because it allows for infinite scaling without losing quality." }]
    },
    {
      id: "20",
      title: "Notion AI",
      description: "Integrating AI directly into your notes, docs, and databases.",
      lessons: ["AI for drafting and brainstorming", "Summarizing long pages", "Extracting action items from notes", "AI-powered database properties"],
      quiz: [{ id: "ed20-q1", question: "How does 'Q&A' in Notion AI differ from a standard search bar?", options: [{ id: "a", text: "It is more colorful" }, { id: "b", text: "It allows you to ask natural language questions about your entire workspace and receive synthesized answers based on your private data" }, { id: "c", text: "It only searches for page titles" }, { id: "d", text: "It is a separate app" }], correctOptionId: "b", explanation: "Q&A acts as a personal knowledge assistant that understands the context of all your notes and can answer questions like 'What was the feedback from the last client meeting?'" }]
    },
    {
      id: "21",
      title: "ClickUp AI",
      description: "Using AI to manage projects, tasks, and documents.",
      lessons: ["AI for task summaries", "Generating project subtasks", "AI-powered writing in Docs", "Automating status updates"],
      quiz: [{ id: "ed21-q1", question: "How does ClickUp's 'AI Knowledge Manager' improve team efficiency during complex projects?", options: [{ id: "a", text: "By automatically completing the tasks for the team" }, { id: "b", text: "By allowing users to ask questions like 'What are the blockers for Project X?' and receiving an instant summary based on task comments and docs" }, { id: "c", text: "By deleting tasks that are overdue" }, { id: "d", text: "By assigning all tasks to the manager" }], correctOptionId: "b", explanation: "ClickUp AI acts as a project-specific brain, synthesizing information across thousands of tasks so humans don't have to read every thread manually." }]
    },
    {
      id: "22",
      title: "Reclaim.ai",
      description: "AI-powered calendar management for teams and individuals.",
      lessons: ["Smart Time Blocking", "Habit tracking and scheduling", "Syncing multiple calendars", "AI-driven task prioritization"],
      quiz: [{ id: "ed22-q1", question: "What is the primary technical logic behind Reclaim.ai's 'Flexible Scheduling' for tasks?", options: [{ id: "a", text: "It blocks out the entire day for one task" }, { id: "b", text: "It keeps tasks as 'Free' time until your day fills up, then automatically switches them to 'Busy' to protect your time as deadlines approach" }, { id: "c", text: "It deletes tasks that you haven't started by noon" }, { id: "d", text: "It syncs your calendar with your heart rate" }], correctOptionId: "b", explanation: "Reclaim uses AI to balance availability and productivity, ensuring you stay 'bookable' for meetings while still carving out time for deep work." }]
    },
    {
      id: "23",
      title: "Motion",
      description: "The AI assistant that builds your daily schedule for you.",
      lessons: ["The Motion algorithm explained", "Managing complex projects in Motion", "Setting priorities and deadlines", "Motion for team collaboration"],
      quiz: [{ id: "ed23-q1", question: "Technically, how does Motion handle a new high-priority task that is added in the middle of the day?", options: [{ id: "a", text: "It ignores it until tomorrow" }, { id: "b", text: "It instantly re-runs its scheduling algorithm to shuffle all other tasks and find the optimal path to meet all deadlines" }, { id: "c", text: "It cancels all your meetings automatically" }, { id: "d", text: "It asks you to manually move every other task" }], correctOptionId: "b", explanation: "Motion is an 'algorithmic' calendar that treats your time as a set of constraints to be solved, rather than a static grid." }]
    },
    {
      id: "24",
      title: "Zapier",
      description: "Connecting 6,000+ apps with AI-powered automations.",
      lessons: ["AI for building Zaps", "Using Zapier Central for AI agents", "Filtering and formatting data with AI", "Natural language automation"],
      quiz: [{ id: "ed24-q1", question: "What is the function of 'Zapier Central' in the context of autonomous AI agents?", options: [{ id: "a", text: "A physical building for AI engineers" }, { id: "b", text: "A workspace where you can teach AI agents to perform actions across thousands of apps using natural language and persistent memory" }, { id: "c", text: "A tool for making 3D models" }, { id: "d", text: "A type of social media for bots" }], correctOptionId: "b", explanation: "Zapier Central moves beyond simple 'if-this-then-that' by creating agents that can make decisions and use tools across your entire software stack." }]
    },
    {
      id: "25",
      title: "Make (Integromat)",
      description: "Visual automation for complex AI workflows.",
      lessons: ["Visual workflow builder basics", "Integrating OpenAI and Anthropic APIs", "Building advanced AI content pipelines", "Handling data at scale"],
      quiz: [{ id: "ed25-q1", question: "Why do advanced AI developers often choose Make (Integromat) over Zapier for complex data pipelines?", options: [{ id: "a", text: "Because Zapier doesn't have an AI integration" }, { id: "b", text: "Because Make allows for complex visual logic, arrays, and multi-step data transformations within a single scenario at a lower cost" }, { id: "c", text: "Because Make is easier for beginners" }, { id: "d", text: "Because Make works without an internet connection" }], correctOptionId: "b", explanation: "Make provides a granular, 'low-code' environment that gives developers much more control over how data flows between AI models and other apps." }]
    },
    {
      id: "26",
      title: "AgentGPT",
      description: "Deploying autonomous AI agents in your browser.",
      lessons: ["Defining agent goals", "How autonomous agents work", "Browsing and memory features", "Exporting agent results"],
      quiz: [{ id: "ed26-q1", question: "What is the technical 'Loop' that defines an autonomous agent like AgentGPT?", options: [{ id: "a", text: "Input -> Output -> End" }, { id: "b", text: "Goal -> Task Generation -> Execution -> Feedback -> Task Re-prioritization -> Loop" }, { id: "c", text: "Question -> Answer -> Question" }, { id: "d", text: "Recording -> Uploading -> Deleting" }], correctOptionId: "b", explanation: "Autonomous agents are 'recursive'; they use the output of one step to decide what the next step should be until the final goal is met." }]
    },
    {
      id: "27",
      title: "OpenClaw",
      description: "The open-source alternative for AI-driven browser automation.",
      lessons: ["Setting up OpenClaw", "Web scraping with AI", "Automating form fills and clicks", "Open-source vs closed-source agents"],
      quiz: [{ id: "ed27-q1", question: "How does an 'Agentic Browser' like OpenClaw differ from traditional web scraping scripts (like BeautifulSoup)?", options: [{ id: "a", text: "It is slower" }, { id: "b", text: "It uses computer vision and LLMs to 'understand' the UI layout and interact with elements like a human, rather than relying on brittle HTML selectors" }, { id: "c", text: "It only works on government websites" }, { id: "d", text: "It requires no code at all" }], correctOptionId: "b", explanation: "Traditional scraping breaks if a website changes its code. Agentic browsers can 'see' that a button says 'Submit' even if its underlying ID has changed." }]
    },
    {
      id: "28",
      title: "Durable",
      description: "Building a complete business website in 30 seconds with AI.",
      lessons: ["AI website generation", "Built-in CRM and marketing tools", "Customizing your AI site", "Domain and hosting setup"],
      quiz: [{ id: "ed28-q1", question: "What is Durable's primary technical value proposition for a non-technical entrepreneur?", options: [{ id: "a", text: "It writes the code for you to copy-paste" }, { id: "b", text: "It generates a professional, multi-page website with relevant copy, images, and a contact form based only on a business name and location" }, { id: "c", text: "It hacks into competitor websites" }, { id: "d", text: "It gives you free hosting forever" }], correctOptionId: "b", explanation: "Durable removes the 'blank page' problem by using AI to assemble a fully functional site in seconds, allowing the user to then just 'tweak' rather than 'build'." }]
    },
    {
      id: "29",
      title: "Gamma",
      description: "The AI-powered alternative to PowerPoint and Google Slides.",
      lessons: ["Generating decks from prompts", "Using AI to refine slides", "Interactive and web-based presentations", "Comparing Gamma with Tome"],
      quiz: [{ id: "ed29-q1", question: "What is the technical benefit of Gamma's 'Fluid Layout' system compared to traditional slide software?", options: [{ id: "a", text: "It allows you to print on larger paper" }, { id: "b", text: "It automatically adjusts the content and design to look good on any screen size (mobile, tablet, web) without manual resizing" }, { id: "c", text: "It requires you to use more images" }, { id: "d", text: "It only works in one font" }], correctOptionId: "b", explanation: "Gamma breaks the 'static slide' mold by treating presentations like responsive web pages that AI can instantly reformat." }]
    },
    {
      id: "30",
      title: "Tome",
      description: "Generative storytelling for presentations and projects.",
      lessons: ["Building narratives with AI", "AI-driven layout and design", "Integrating 3D and interactive content", "Using Tome for pitch decks"],
      quiz: [{ id: "ed30-q1", question: "How does Tome's 'Generative Storytelling' engine differ from a standard template-based presentation tool?", options: [{ id: "a", text: "It uses more colors" }, { id: "b", text: "It builds a multi-page narrative structure with consistent visuals and copy from a single high-level prompt" }, { id: "c", text: "It requires the user to write every word" }, { id: "d", text: "It only generates 3 slides" }], correctOptionId: "b", explanation: "Tome uses AI to handle the 'storyboarding' phase, creating a logical flow of information that connects different slides together into a cohesive project." }]
    }
  ],
  finalExam: [
    {
      id: "ed-final-q1",
      question: "In the context of modern productivity, what is an 'AI Tech Stack'?",
      options: [
        { id: "a", text: "A physical pile of computers" },
        { id: "b", text: "The strategic selection of integrated AI tools (e.g., ChatGPT for thinking, Make for connecting, Canva for design) to solve a specific workflow" },
        { id: "c", text: "A programming language used only for AI" },
        { id: "d", text: "The amount of memory an AI model uses" },
      ],
      correctOptionId: "b",
      explanation: "No single tool does everything. A stack is how you combine different AI capabilities to automate and enhance your specific job or life.",
    },
    {
      id: "ed-final-q2",
      question: "What is the primary technical advantage of 'Multimodal' models (like GPT-4o or Gemini 1.5) for everyday users?",
      options: [
        { id: "a", text: "They are 10 times faster at math" },
        { id: "b", text: "They can process and reason across text, image, and audio inputs simultaneously within a single conversation context" },
        { id: "c", text: "They are free for everyone" },
        { id: "d", text: "They don't require an internet connection" },
      ],
      correctOptionId: "b",
      explanation: "Multimodality means you can show the AI a photo of your fridge and ask for a recipe, or give it a recorded lecture and ask for notes, all in one place.",
    },
    {
      id: "ed-final-q3",
      question: "Which of the following best describes 'Agentic Workflow' in AI automation?",
      options: [
        { id: "a", text: "A workflow that uses only one AI tool" },
        { id: "b", text: "A process where the AI is given a goal and then autonomously decides which tools to use and which steps to take to achieve it" },
        { id: "c", text: "A workflow where a human must approve every single word the AI writes" },
        { id: "d", text: "A type of video game" },
      ],
      correctOptionId: "b",
      explanation: "Agents are the 'next level' of AI. They don't just answer questions; they perform tasks by planning and using other software on your behalf.",
    },
    {
      id: "ed-final-q4",
      question: "Why is 'Context Window' a critical technical metric when using AI for large projects (like analyzing a whole book or a codebase)?",
      options: [
        { id: "a", text: "It measures the size of the computer screen" },
        { id: "b", text: "It defines the maximum amount of information the AI can 'remember' and reference at any given moment during a chat" },
        { id: "c", text: "It determines how many people can use the AI at once" },
        { id: "d", text: "It is the speed of the AI's internet connection" },
      ],
      correctOptionId: "b",
      explanation: "If a project is bigger than the context window, the AI will 'forget' the beginning of the conversation or the document, leading to errors.",
    },
    {
      id: "ed-final-q5",
      question: "What is the 'Human-in-the-Loop' (HITL) principle in AI content creation?",
      options: [
        { id: "a", text: "Letting the AI do all the work and then deleting it" },
        { id: "b", text: "A design pattern where AI generates the bulk of the work, but a human provides the critical oversight, editing, and ethical approval for the final output" },
        { id: "c", text: "A type of physical exercise for AI engineers" },
        { id: "d", text: "Using AI to replace all human employees" },
      ],
      correctOptionId: "b",
      explanation: "AI is a co-pilot, not a pilot. HITL ensures that the final result has human creativity, accuracy, and accountability.",
    },
    {
      id: "ed-final-q6",
      question: "In the context of AI image generation, what is 'Inpainting'?",
      options: [
        { id: "a", text: "Deleting the entire image" },
        { id: "b", text: "Using AI to modify or fill in a specific, selected area of an existing image while leaving the rest untouched" },
        { id: "c", text: "Turning a photo into a physical painting" },
        { id: "d", text: "Increasing the resolution of an image" },
      ],
      correctOptionId: "b",
      explanation: "Inpainting allows for precise edits, like changing a character's shirt or adding an object to a table, without regenerating the whole scene.",
    },
    {
      id: "ed-final-q7",
      question: "What is the primary function of 'Voice Cloning' technology like that found in ElevenLabs?",
      options: [
        { id: "a", text: "To record a phone call" },
        { id: "b", text: "To create a digital version of a specific person's voice that can read any text with their unique tone and emotion" },
        { id: "c", text: "To translate text into 100 languages at once" },
        { id: "d", text: "To make a robot sound like a computer" },
      ],
      correctOptionId: "b",
      explanation: "Voice cloning uses a small sample of a person's speech to build a generative model that can speak any new content in that voice.",
    },
    {
      id: "ed-final-q8",
      question: "In AI-powered project management (like ClickUp or Notion), what is 'Automated Summarization' used for?",
      options: [
        { id: "a", text: "To write the whole project code" },
        { id: "b", text: "To instantly condense long comment threads, meeting notes, or documents into key action items and takeaways" },
        { id: "c", text: "To delete old tasks automatically" },
        { id: "d", text: "To track the time spent on each task" },
      ],
      correctOptionId: "b",
      explanation: "Summarization saves hours by highlighting the most important information from a sea of data, allowing for faster decision-making.",
    },
    {
      id: "ed-final-q9",
      question: "What is a 'Generative Presentation' tool like Gamma or Tome primarily designed to eliminate?",
      options: [
        { id: "a", text: "The need for a computer" },
        { id: "b", text: "The 'Blank Slide' problem by generating an initial structure, layout, and content from a single prompt" },
        { id: "c", text: "The need for a presenter" },
        { id: "d", text: "The use of images in slides" },
      ],
      correctOptionId: "b",
      explanation: "These tools use AI to handle the heavy lifting of initial creation, giving you a professional-looking draft to refine in seconds.",
    },
    {
      id: "ed-final-q10",
      question: "What is the strategic value of 'No-Code AI Automation' (using tools like Zapier or Make)?",
      options: [
        { id: "a", text: "It makes the computer run faster" },
        { id: "b", text: "It allows non-technical users to build complex, automated workflows that connect multiple AI tools and apps together without writing code" },
        { id: "c", text: "It is a new way to play video games" },
        { id: "d", text: "It replaces the need for an internet connection" },
      ],
      correctOptionId: "b",
      explanation: "No-code automation democratizes AI, allowing anyone to build sophisticated systems that used to require a team of developers.",
    },
  ],
  syllabus: [
    { week: "Week 1", theme: "The Big Three & Search", focus: "ChatGPT, Claude, Gemini, and Perplexity", deliverable: "Personalized AI Research Assistant setup" },
    { week: "Week 2", theme: "Writing & Marketing", focus: "Jasper, Copy.ai, QuillBot, and Grammarly", deliverable: "AI-powered content marketing kit" },
    { week: "Week 3", theme: "Video & Animation", focus: "Runway, Pika, Sora, and CapCut", deliverable: "Short AI cinematic film" },
    { week: "Week 4", theme: "Audio & Design", focus: "ElevenLabs, Speechify, Adobe Podcast, Canva, and Midjourney", deliverable: "AI-branded podcast pilot" },
    { week: "Week 5", theme: "Productivity & Workspaces", focus: "Notion, ClickUp, Reclaim, and Motion", deliverable: "AI-optimized daily workflow" },
    { week: "Week 6", theme: "Automation & Agents", focus: "Zapier, Make, AgentGPT, and OpenClaw", deliverable: "Autonomous AI automation bot" },
    { week: "Week 7", theme: "Web & Presentations", focus: "Durable, Gamma, and Tome", deliverable: "AI-generated business launch package" }
  ]
};
