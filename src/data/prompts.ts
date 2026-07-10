import { Prompt } from "@/types";

export const prompts: Prompt[] = [
  // ---------------- Productivity ----------------
  {
    id: "prod-1",
    title: "Turn meeting notes into action items",
    category: "Productivity",
    tool: "Claude or ChatGPT",
    description: "Convert raw, messy meeting notes into a clean summary with clear owners and deadlines.",
    prompt:
      "You are helping me turn raw meeting notes into a clear summary.\n\nHere are my notes:\n[paste raw notes]\n\nProduce:\n1. A 3-4 sentence summary of what was discussed\n2. A bullet list of decisions made\n3. A table of action items with columns: Task | Owner | Due date\n\nIf an owner or due date isn't clear from the notes, write \"TBD\" rather than guessing.",
    tags: ["meetings", "summarization", "action items"],
    likes: 24,
  },
  {
    id: "prod-2",
    title: "Draft a weekly status update",
    category: "Productivity",
    tool: "Claude or ChatGPT",
    description: "Generate a concise weekly update for your manager or team from a rough list of what you did.",
    prompt:
      "Write a weekly status update for my manager based on the bullet points below. Audience: my direct manager, who is busy and wants a fast read.\n\nFormat:\n- Headline (1 line: overall status)\n- Done this week (bullets)\n- In progress (bullets)\n- Blockers or risks (bullets, or \"None\" if empty)\n- Next week's focus (bullets)\n\nKeep the whole thing under 150 words. Here's what happened this week:\n[paste your rough notes]",
    tags: ["status update", "reporting"],
    likes: 25,
  },
  {
    id: "prod-3",
    title: "Prioritize a messy to-do list",
    category: "Productivity",
    tool: "Claude",
    description: "Get help triaging a long task list using urgency and impact.",
    prompt:
      "Here is my current to-do list, in no particular order:\n[paste tasks]\n\nGroup these into three priority tiers: \"Do today\", \"This week\", and \"Later / delegate\". For each item, add a one-line reason for its tier based on urgency and impact. Flag anything that looks like it could be delegated to someone else.",
    tags: ["prioritization", "planning"],
    likes: 26,
  },
  {
    id: "prod-4",
    title: "Summarize a long email thread",
    category: "Productivity",
    tool: "Claude",
    description: "Get the gist of a sprawling email thread before you reply.",
    prompt:
      "Summarize the email thread below. I need to reply and want to understand the full context fast.\n\nInclude:\n- What the thread is ultimately about (1-2 sentences)\n- Key points raised, in chronological order\n- Any open questions that still need my answer\n- The most recent message's tone (e.g. neutral, frustrated, urgent)\n\nThread:\n[paste email thread]",
    tags: ["email", "summarization"],
    likes: 27,
  },

  // ---------------- Engineering ----------------
  {
    id: "eng-1",
    title: "Explain an unfamiliar code module",
    category: "Engineering",
    tool: "Claude or GitHub Copilot",
    description: "Get a plain-language walkthrough of code you've just inherited.",
    prompt:
      "I'm new to this codebase. Explain what the following code does, step by step, for a developer who knows the language but not this specific system.\n\nInclude:\n1. A one-paragraph high-level summary of its purpose\n2. Key functions/classes and what each is responsible for\n3. Any non-obvious logic, edge cases, or assumptions worth flagging\n4. Questions I should ask the original author if I had the chance\n\nCode:\n[paste code]",
    tags: ["code review", "onboarding"],
    likes: 36,
  },
  {
    id: "eng-2",
    title: "Generate unit tests for a function",
    category: "Engineering",
    tool: "GitHub Copilot or Claude",
    description: "Get a starting set of unit tests, including edge cases you might not think of.",
    prompt:
      "Write unit tests for the function below using [testing framework, e.g. Jest / pytest].\n\nCover:\n- Typical/expected inputs\n- Edge cases (empty input, null/undefined, boundary values)\n- At least one failure case that should throw or return an error\n\nFunction:\n[paste function]\n\nReturn only the test file contents, with brief comments explaining each test's purpose.",
    tags: ["testing", "quality"],
    likes: 37,
  },
  {
    id: "eng-3",
    title: "Draft a pull request description",
    category: "Engineering",
    tool: "Claude or ChatGPT",
    description: "Turn a diff and some context into a clear, reviewable PR description.",
    prompt:
      "Write a pull request description based on the change summary below.\n\nStructure:\n- **Summary**: what changed and why (2-3 sentences)\n- **Changes**: bullet list of the concrete changes\n- **Testing**: how this was verified\n- **Risk / rollback**: anything a reviewer should watch for, and how to roll back if needed\n\nContext:\n[paste your rough notes or diff summary]",
    tags: ["pull request", "documentation"],
    likes: 38,
  },
  {
    id: "eng-4",
    title: "Debug an error message",
    category: "Engineering",
    tool: "Claude or GitHub Copilot",
    description: "Get a structured hypothesis list for a confusing error or stack trace.",
    prompt:
      "I'm seeing the following error and I'm not sure of the root cause:\n\nError:\n[paste error/stack trace]\n\nRelevant code:\n[paste relevant code]\n\nGive me:\n1. The most likely cause, in plain language\n2. 2-3 alternative causes, ranked by likelihood\n3. A specific next step to confirm or rule out each one",
    tags: ["debugging", "troubleshooting"],
    likes: 39,
  },

  // ---------------- Customer Support ----------------
  {
    id: "sup-1",
    title: "Reply to a frustrated customer",
    category: "Customer Support",
    tool: "Claude or ChatGPT",
    description: "Draft an empathetic, clear response to a customer complaint.",
    prompt:
      "Draft a support reply to the customer message below. Tone: empathetic, calm, and solution-focused — acknowledge their frustration without being overly apologetic or robotic.\n\nInclude:\n- A brief acknowledgment of the specific issue\n- A clear explanation of what we're doing about it (or will need to check)\n- A concrete next step and timeframe\n\nCustomer message:\n[paste customer message]\n\nContext on our side (what happened, what we can offer):\n[paste internal context]",
    tags: ["support reply", "tone"],
    likes: 36,
  },
  {
    id: "sup-2",
    title: "Summarize a support ticket for escalation",
    category: "Customer Support",
    tool: "Claude",
    description: "Turn a long back-and-forth ticket into a concise escalation summary for engineering.",
    prompt:
      "Summarize the support ticket thread below so I can escalate it to engineering.\n\nFormat:\n- Customer impact (1-2 sentences, plain language)\n- Steps to reproduce (numbered, if identifiable from the thread)\n- What's already been tried\n- Urgency/severity, with reasoning\n\nTicket thread:\n[paste ticket thread]",
    tags: ["escalation", "summarization"],
    likes: 37,
  },
  {
    id: "sup-3",
    title: "Build a macro/canned response library",
    category: "Customer Support",
    tool: "Claude or ChatGPT",
    description: "Draft reusable response templates for common support scenarios.",
    prompt:
      "Draft 3 canned response templates for our support team covering these common scenarios: [list scenarios, e.g. \"refund request\", \"login issue\", \"feature not working as expected\"].\n\nFor each template:\n- Use a friendly, professional tone consistent with our brand voice: [describe brand voice]\n- Include a placeholder in [brackets] wherever specific details need to be filled in\n- Keep each under 120 words",
    tags: ["templates", "efficiency"],
    likes: 38,
  },
  {
    id: "sup-4",
    title: "Turn support tickets into a FAQ",
    category: "Customer Support",
    tool: "Claude",
    description: "Identify recurring themes across many tickets and draft FAQ entries.",
    prompt:
      "Below are summaries of recent support tickets. Identify the 5 most common themes or questions, and for each one draft a short FAQ entry (question + answer, 2-3 sentences).\n\nTicket summaries:\n[paste list of ticket summaries]",
    tags: ["faq", "knowledge base"],
    likes: 39,
  },

  // ---------------- Leadership ----------------
  {
    id: "lead-1",
    title: "Draft an all-hands announcement",
    category: "Leadership",
    tool: "Claude",
    description: "Communicate a significant change to the whole company clearly and with the right tone.",
    prompt:
      "Draft an all-hands announcement about the following change: [describe the change, e.g. reorg, new product launch, policy update].\n\nRequirements:\n- Open with the headline, not a long preamble\n- Explain the \"why\" behind the decision in plain language\n- Address the most likely question or concern employees will have\n- Close with what happens next and where to ask questions\n- Tone: direct, honest, and calm — avoid corporate jargon\n\nKeep it under 300 words.",
    tags: ["comms", "change management"],
    likes: 38,
  },
  {
    id: "lead-2",
    title: "Prepare talking points for a difficult 1:1",
    category: "Leadership",
    tool: "Claude",
    description: "Structure a sensitive performance conversation before it happens.",
    prompt:
      "Help me prepare for a 1:1 conversation about [describe the situation, e.g. a performance concern, a missed deadline, team conflict].\n\nGive me:\n1. A short framing statement to open the conversation\n2. 3-4 specific, factual points to raise (not vague generalities)\n3. Questions to ask to understand their perspective\n4. A constructive way to close with clear next steps\n\nKeep the tone direct but supportive, not accusatory.",
    tags: ["1:1s", "management"],
    likes: 39,
  },
  {
    id: "lead-3",
    title: "Summarize quarterly results for the board",
    category: "Leadership",
    tool: "Claude",
    description: "Turn detailed internal metrics into a board-ready narrative summary.",
    prompt:
      "Turn the raw metrics and notes below into a board-ready summary of this quarter's performance.\n\nStructure:\n- Headline result (1 sentence)\n- 3-4 supporting metrics with brief context on why each matters\n- One key risk or challenge, stated plainly\n- One forward-looking priority for next quarter\n\nTone: confident but honest — do not spin weak results as positives.\n\nRaw metrics/notes:\n[paste data and notes]",
    tags: ["board update", "reporting"],
    likes: 40,
  },
  {
    id: "lead-4",
    title: "Draft a team charter or working agreement",
    category: "Leadership",
    tool: "Claude or ChatGPT",
    description: "Create a first draft of a team's operating norms for the team to react to and edit.",
    prompt:
      "Draft a one-page team working agreement for a [team type, e.g. product engineering] team of [size] people.\n\nCover:\n- Core working hours / response-time expectations\n- Meeting norms (which meetings are mandatory, async-first practices)\n- Decision-making approach (who decides what, and how disagreements are resolved)\n- Communication channels and when to use each\n\nWrite it as a draft for the team to discuss and edit, not a final policy.",
    tags: ["team norms", "management"],
    likes: 41,
  },

  // ---------------- Data & Analytics ----------------
  {
    id: "data-1",
    title: "Explain a dataset in plain language",
    category: "Data & Analytics",
    tool: "ChatGPT or Claude",
    description: "Get a non-technical summary of what a spreadsheet or dataset shows.",
    prompt:
      "I'm going to describe a dataset. Explain, in plain language for a non-technical stakeholder, what the data likely shows and what questions it can and can't answer.\n\nDataset description / columns:\n[paste column names and a few sample rows]\n\nContext: this data is used for [describe purpose, e.g. tracking support ticket volume].",
    tags: ["data literacy", "reporting"],
    likes: 27,
  },
  {
    id: "data-2",
    title: "Write a SQL query from a plain-language request",
    category: "Data & Analytics",
    tool: "ChatGPT or Claude",
    description: "Translate a business question into a starting SQL query against your schema.",
    prompt:
      "Write a SQL query ([dialect, e.g. PostgreSQL]) that answers this question: [describe the question, e.g. \"monthly active users by plan tier for the last 6 months\"].\n\nRelevant schema:\n[paste table/column names]\n\nReturn the query with inline comments explaining each part, and note any assumptions you had to make about the schema.",
    tags: ["sql", "analytics"],
    likes: 28,
  },
  {
    id: "data-3",
    title: "Turn a metrics table into an executive summary",
    category: "Data & Analytics",
    tool: "Claude",
    description: "Translate a raw metrics table into 3-4 sentences a non-analyst can act on.",
    prompt:
      "Here is a table of metrics: [paste table].\n\nWrite a 3-4 sentence executive summary that:\n- States the single most important trend\n- Notes any anomaly or outlier worth investigating\n- Avoids jargon — assume the reader is a non-technical stakeholder\n- Suggests one concrete next step",
    tags: ["reporting", "kpis"],
    likes: 29,
  },
  {
    id: "data-4",
    title: "Design a simple A/B test",
    category: "Data & Analytics",
    tool: "Claude",
    description: "Get a structured starting plan for testing a hypothesis.",
    prompt:
      "Help me design an A/B test for this hypothesis: [describe hypothesis, e.g. \"a shorter signup form increases conversion\"].\n\nInclude:\n- The primary metric and 1-2 guardrail metrics\n- A suggested sample size / duration approach (in general terms, not exact stats)\n- Risks of the test (novelty effects, seasonality, etc.)\n- What result would count as a clear win vs. inconclusive",
    tags: ["experimentation", "product analytics"],
    likes: 30,
  },

  // ---------------- Marketing & Comms ----------------
  {
    id: "mkt-1",
    title: "Draft a product launch announcement",
    category: "Marketing & Comms",
    tool: "ChatGPT or Claude",
    description: "Create a first draft of a launch announcement for a new feature or product.",
    prompt:
      "Draft a product launch announcement for [product/feature name].\n\nAudience: [describe audience, e.g. existing customers / prospects]\nKey benefit: [describe the main value proposition]\nSupporting details: [list 2-3 supporting points or features]\n\nFormat as a short blog-style post: headline, 1-paragraph intro, bullet list of key benefits, closing call-to-action. Tone: confident and clear, avoid hype words like \"revolutionary\" or \"game-changing\".",
    tags: ["launch", "copywriting"],
    likes: 39,
  },
  {
    id: "mkt-2",
    title: "Repurpose a blog post into social copy",
    category: "Marketing & Comms",
    tool: "ChatGPT",
    description: "Turn one piece of long-form content into several short social posts.",
    prompt:
      "Turn the article below into:\n1. Three short LinkedIn post variations (each under 100 words, professional tone)\n2. One Twitter/X thread outline (5 tweets, punchy and direct)\n\nArticle:\n[paste article text or summary]",
    tags: ["social media", "repurposing"],
    likes: 40,
  },
  {
    id: "mkt-3",
    title: "Write subject lines for an email campaign",
    category: "Marketing & Comms",
    tool: "ChatGPT",
    description: "Generate and rank subject line options for an email send.",
    prompt:
      "Generate 8 subject line options for an email about: [describe the email content/offer].\n\nFor each, keep it under 60 characters. Then rank the top 3 you'd test first, with a one-line reason for each choice (e.g. curiosity, urgency, clarity).",
    tags: ["email marketing", "copywriting"],
    likes: 41,
  },
  {
    id: "mkt-4",
    title: "Create a mood board brief for visuals",
    category: "Marketing & Comms",
    tool: "Midjourney",
    description: "Generate image prompts for a campaign's visual direction.",
    prompt:
      "Generate 4 image-generation prompts for a mood board for a campaign about: [describe campaign/theme].\n\nEach prompt should specify: subject, color palette, lighting, and overall mood/style (e.g. \"minimalist\", \"bold and energetic\", \"warm and human\"). Vary the direction across the 4 so we have real options to react to.",
    tags: ["visual design", "campaign"],
    likes: 42,
  },

  // ---------------- People & HR ----------------
  {
    id: "hr-1",
    title: "Draft a job description",
    category: "People & HR",
    tool: "Claude or ChatGPT",
    description: "Create a clear, inclusive job description from a rough set of requirements.",
    prompt:
      "Draft a job description for a [role title] role on the [team name] team.\n\nMust-have requirements: [list]\nNice-to-haves: [list]\nKey responsibilities: [list]\n\nUse clear, inclusive language — avoid gendered or overly aggressive phrases like \"rockstar\" or \"ninja\", and avoid inflating requirements beyond what's actually needed for the role.",
    tags: ["recruiting", "job description"],
    likes: 45,
  },
  {
    id: "hr-2",
    title: "Draft onboarding checklist for a new hire",
    category: "People & HR",
    tool: "Claude or Notion AI",
    description: "Create a first-week and first-month onboarding plan.",
    prompt:
      "Draft an onboarding checklist for a new [role title] joining the [team name] team.\n\nStructure it as:\n- Before day 1 (setup tasks)\n- Week 1 (goals: orientation and access)\n- Weeks 2-4 (goals: first small contribution)\n- 90-day check-in goals\n\nKeep each item action-oriented and specific enough that a manager could hand this to the new hire directly.",
    tags: ["onboarding", "checklist"],
    likes: 46,
  },
  {
    id: "hr-3",
    title: "Summarize employee survey feedback",
    category: "People & HR",
    tool: "Claude",
    description: "Identify themes across open-text engagement survey responses.",
    prompt:
      "Below are open-text responses from an employee engagement survey. Identify the 4-5 most common themes (positive and negative), and for each theme give 1-2 representative quotes (paraphrased, anonymized) and a suggested action.\n\nResponses:\n[paste survey responses]",
    tags: ["engagement survey", "feedback"],
    likes: 47,
  },
  {
    id: "hr-4",
    title: "Draft interview questions for a role",
    category: "People & HR",
    tool: "Claude or ChatGPT",
    description: "Generate structured, role-specific interview questions and what to listen for.",
    prompt:
      "Draft 6 interview questions for a [role title] interview, focused on assessing [key skill/competency, e.g. \"cross-team collaboration\"].\n\nFor each question, include a one-line note on what a strong answer typically demonstrates, so interviewers can calibrate what they're listening for.",
    tags: ["interviewing", "hiring"],
    likes: 3,
  },

  // ---------------- Sales ----------------
  {
    id: "sales-1",
    title: "Draft a cold outreach email",
    category: "Sales",
    tool: "ChatGPT or Claude",
    description: "Write a short, personalized outreach email that doesn't sound like a template.",
    prompt:
      "Draft a cold outreach email to [describe prospect/role, e.g. \"a VP of Engineering at a mid-size SaaS company\"].\n\nWhat we offer: [describe product/value proposition]\nWhy this prospect specifically: [describe relevant trigger, e.g. recent funding round, hiring surge, tech stack]\n\nRequirements: under 120 words, no generic flattery, one clear call-to-action, and a tone that sounds like a real person, not a template.",
    tags: ["outreach", "prospecting"],
    likes: 9,
  },
  {
    id: "sales-2",
    title: "Prepare for a discovery call",
    category: "Sales",
    tool: "Claude",
    description: "Build a structured question list ahead of a first prospect call.",
    prompt:
      "Help me prepare for a discovery call with [describe prospect and what we know about them].\n\nGive me:\n- 5 open-ended discovery questions to understand their current process and pain points\n- 2 questions to uncover budget/timeline without being blunt about it\n- A short list of things to listen for that would indicate strong or weak fit",
    tags: ["discovery call", "prospecting"],
    likes: 10,
  },
  {
    id: "sales-3",
    title: "Summarize a sales call for CRM notes",
    category: "Sales",
    tool: "Claude or ChatGPT",
    description: "Turn a call transcript or rough notes into structured CRM-ready notes.",
    prompt:
      "Turn the call notes below into structured CRM notes.\n\nFormat:\n- Summary (2-3 sentences)\n- Pain points mentioned\n- Objections raised\n- Next steps and owner\n- Deal risk level (low/medium/high) with a one-line reason\n\nCall notes:\n[paste rough notes or transcript]",
    tags: ["crm", "call notes"],
    likes: 11,
  },
  {
    id: "sales-4",
    title: "Handle a common objection",
    category: "Sales",
    tool: "Claude or ChatGPT",
    description: "Prepare a thoughtful response to a recurring sales objection.",
    prompt:
      "A prospect raised this objection: \"[paste objection, e.g. 'your product is more expensive than Competitor X']\".\n\nDraft a response that:\n- Acknowledges the concern genuinely, without being dismissive\n- Reframes around value rather than just defending price\n- Ends with a question that re-engages the conversation\n\nKeep it conversational — this is for a live call, not an email.",
    tags: ["objection handling", "negotiation"],
    likes: 12,
  },
];

export const promptCategories = [
  "Productivity",
  "Engineering",
  "Customer Support",
  "Leadership",
  "Data & Analytics",
  "Marketing & Comms",
  "People & HR",
  "Sales",
] as const;
