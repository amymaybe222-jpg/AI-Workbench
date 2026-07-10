import { LearnTopic } from "@/types";

export const learnTopics: LearnTopic[] = [
  // ---------- FOUNDATIONS ----------
  {
    slug: "what-is-generative-ai",
    title: "What Is Generative AI?",
    category: "Foundations",
    summary:
      "The basics of generative AI: how it differs from traditional software, and why it matters for professional work.",
    readTime: "4 min",
    tags: ["Basics", "Concepts"],
    sections: [
      {
        heading: "The short version",
        body: [
          "Generative AI refers to models that produce new content — text, code, images, audio — rather than simply retrieving or classifying existing data. Traditional software follows rules you write explicitly; generative AI learns patterns from vast amounts of data and uses them to predict what comes next.",
          "In a work context, this means you can describe an outcome in plain language and get a draft, summary, analysis, or piece of code back — instead of building that output by hand from scratch.",
        ],
      },
      {
        heading: "Why it's different from search",
        body: [
          "A search engine finds existing documents that match your query. A generative AI model synthesizes a new answer by combining patterns it learned during training. That makes it powerful for drafting and reasoning, but it also means outputs can be confidently wrong — they are predictions, not lookups.",
        ],
      },
      {
        heading: "Where it fits in daily work",
        body: [
          "Most professional use cases fall into a few buckets: drafting and rewriting text, summarizing long content, answering questions about a document or codebase, analyzing data, and generating first-pass code or designs. The common thread is that AI produces a strong starting point — a human still reviews and finalizes the result.",
        ],
      },
    ],
    keyTakeaways: [
      "Generative AI creates new content by predicting patterns, it doesn't retrieve stored answers.",
      "Treat outputs as a first draft, not a final answer — verification is part of the workflow.",
      "The biggest wins come from drafting, summarizing, and analyzing — not full automation.",
    ],
  },
  {
    slug: "how-llms-work",
    title: "How Large Language Models Work",
    category: "Foundations",
    summary:
      "A practical, non-technical explanation of how large language models (LLMs) like Claude and ChatGPT generate text.",
    readTime: "5 min",
    tags: ["Basics", "Concepts"],
    sections: [
      {
        heading: "Prediction, not understanding",
        body: [
          "A large language model (LLM) is trained on huge volumes of text to predict the next most likely word (technically, 'token') given everything before it. It repeats this one prediction at a time to generate a full response. There is no internal database of facts being queried — the model's 'knowledge' is encoded as statistical patterns in its parameters.",
        ],
      },
      {
        heading: "Context window",
        body: [
          "Every model has a 'context window' — the amount of text it can consider at once, including your prompt, any pasted documents, and the conversation history. Larger context windows let you paste in whole reports, transcripts, or codebases and ask questions across all of it in one go.",
        ],
      },
      {
        heading: "Why models 'hallucinate'",
        body: [
          "Because the model is predicting plausible text rather than looking up verified facts, it can generate statements that sound confident but are incorrect — especially for very specific, obscure, or recent information. This is why fact-checking outputs against a source (or asking the model to cite one) matters for anything you plan to rely on.",
        ],
      },
    ],
    keyTakeaways: [
      "LLMs generate text by predicting likely continuations, not by retrieving verified facts.",
      "The context window determines how much information the model can reason over at once.",
      "Always verify specific facts, figures, and citations before relying on them.",
    ],
  },
  {
    slug: "prompt-engineering-basics",
    title: "Prompt Engineering Basics",
    category: "Foundations",
    summary: "How to write clear, effective prompts for Claude and ChatGPT that get you better results, faster.",
    readTime: "6 min",
    tags: ["Prompting", "Skills"],
    sections: [
      {
        heading: "Give context, not just instructions",
        body: [
          "The single biggest lever for quality output is context. Instead of 'write a project update', tell the model who the audience is, what happened this week, what tone to use, and how long the result should be. The more relevant context you supply, the less the model has to guess.",
        ],
      },
      {
        heading: "Structure your prompt",
        body: [
          "A reliable pattern: (1) Role — who should the AI act as; (2) Task — what you want done; (3) Context — background, data, constraints; (4) Format — how the output should look (bullet points, table, email, code block); (5) Examples — a sample of the style or structure you want, if helpful.",
        ],
      },
      {
        heading: "Iterate instead of restarting",
        body: [
          "Treat the first response as a draft. Ask follow-up questions like 'make this more concise', 'rewrite for a non-technical audience', or 'add a section on risks' rather than starting a new conversation from scratch — the model retains context from earlier in the thread.",
        ],
      },
    ],
    keyTakeaways: [
      "Context is the highest-leverage part of any prompt.",
      "Use Role → Task → Context → Format as a reliable structure.",
      "Refine through follow-up turns instead of rewriting from zero.",
    ],
  },
  {
    slug: "responsible-ai-at-work",
    title: "Using AI Responsibly at Work",
    category: "Foundations",
    summary:
      "Practical guardrails for data privacy, accuracy, and responsible AI use in a professional setting.",
    readTime: "5 min",
    tags: ["Governance", "Best practice"],
    sections: [
      {
        heading: "Know what you can share",
        body: [
          "Before pasting anything into an AI tool, check your organization's data policy. Customer personal data, confidential financials, and unreleased product details typically should not go into consumer-tier AI tools unless your company has an approved enterprise agreement in place.",
        ],
      },
      {
        heading: "Verify before you rely",
        body: [
          "Treat AI-generated numbers, quotes, citations, and legal or compliance statements as unverified until checked against a primary source. This is especially important for anything customer-facing, financial, or regulatory.",
        ],
      },
      {
        heading: "Disclose meaningful use",
        body: [
          "If AI materially shaped a deliverable — a report, code, or customer communication — it's good practice to note it was AI-assisted, particularly in regulated or client-facing contexts, so reviewers know to check it accordingly.",
        ],
      },
    ],
    keyTakeaways: [
      "Never paste confidential or customer data into a tool without an approved enterprise agreement.",
      "Verify facts, figures, and citations — don't treat AI output as a source of truth.",
      "Be transparent when AI meaningfully contributed to a deliverable.",
    ],
  },
  {
    slug: "choosing-the-right-tool",
    title: "Choosing the Right AI Tool for the Job",
    category: "Foundations",
    summary: "A simple framework for matching a work task to the AI tool most likely to do it well.",
    readTime: "4 min",
    tags: ["Strategy", "Tools"],
    sections: [
      {
        heading: "Match the tool to the task shape",
        body: [
          "Writing and reasoning tasks over long documents favor assistants with large context windows, like Claude. Quick brainstorming, image generation, or plugin-driven tasks often favor ChatGPT. In-editor coding favors GitHub Copilot. Research needing citations favors Perplexity. Work already living in your team's docs favors Notion AI.",
        ],
      },
      {
        heading: "Consider where the work already lives",
        body: [
          "The best tool is often the one embedded closest to where you already work — an AI feature inside your IDE, notes app, or CRM will usually save more time than switching to a separate chat window, even if the underlying model is similar.",
        ],
      },
      {
        heading: "Try the Tool Picker",
        body: [
          "This platform's Tool Picker lets you describe a task in plain language and get a ranked shortlist of tools with reasoning — use it as a starting point, then confirm against your team's approved tool list.",
        ],
      },
    ],
    keyTakeaways: [
      "Match tool choice to task shape: long-document reasoning, quick brainstorming, in-editor coding, cited research, or embedded workspace AI.",
      "The most convenient tool is often the one built into where you already work.",
      "Use the Tool Picker for a fast, reasoned first recommendation.",
    ],
  },

  // ---------- TOOLS ----------
  {
    slug: "understanding-claude",
    title: "Understanding Claude",
    category: "Tools",
    summary: "What Claude, Anthropic's AI assistant, is best at, and how to get the most from it at work.",
    readTime: "4 min",
    tags: ["Claude", "Anthropic"],
    relatedTools: ["claude"],
    sections: [
      {
        heading: "What it is",
        body: [
          "Claude is Anthropic's AI assistant, built with an emphasis on careful reasoning, safety, and handling long documents well. It's a strong general-purpose choice for writing, analysis, and coding.",
        ],
      },
      {
        heading: "When to reach for it",
        body: [
          "Use Claude when you need to work across a large document or codebase in one conversation, want controllable and natural writing tone, or need step-by-step reasoning you can follow and check.",
        ],
      },
      {
        heading: "Tips",
        body: [
          "Paste full documents rather than summarizing them yourself first — Claude's context window is designed for this. Ask it to show its reasoning for complex analysis so you can spot-check the logic.",
        ],
      },
    ],
    keyTakeaways: [
      "Best for long-document analysis, writing, and coding.",
      "Large context window means you can paste full source material directly.",
      "Ask for step-by-step reasoning on complex tasks to make outputs easier to verify.",
    ],
  },
  {
    slug: "understanding-chatgpt",
    title: "Understanding ChatGPT",
    category: "Tools",
    summary: "What ChatGPT, OpenAI's AI assistant, is best at, and how to get the most from it at work.",
    readTime: "4 min",
    tags: ["ChatGPT", "OpenAI"],
    relatedTools: ["chatgpt"],
    sections: [
      {
        heading: "What it is",
        body: [
          "ChatGPT is OpenAI's general-purpose assistant, widely adopted with a large ecosystem of custom GPTs, plugins, image generation, and voice interaction.",
        ],
      },
      {
        heading: "When to reach for it",
        body: [
          "Good for everyday brainstorming, quick Q&A, image generation, and tasks where a purpose-built custom GPT already exists for your workflow.",
        ],
      },
      {
        heading: "Tips",
        body: [
          "Be explicit about tone and format — ChatGPT responds well to direct style instructions ('write like a concise engineering update, no fluff'). Explore custom GPTs your organization has published before building a prompt from scratch.",
        ],
      },
    ],
    keyTakeaways: [
      "Best for brainstorming, general Q&A, and image generation.",
      "Large plugin/custom-GPT ecosystem can shortcut repetitive workflows.",
      "Give explicit tone and format instructions for best results.",
    ],
  },
  {
    slug: "understanding-notion-ai",
    title: "Understanding Notion AI",
    category: "Tools",
    summary: "How Notion AI, embedded in your notes and docs, can save time on everyday knowledge work.",
    readTime: "3 min",
    tags: ["Notion", "Docs"],
    relatedTools: ["notion-ai"],
    sections: [
      {
        heading: "What it is",
        body: [
          "Notion AI is built directly into Notion pages and databases, so you can summarize, draft, or ask questions about content without leaving your workspace.",
        ],
      },
      {
        heading: "When to reach for it",
        body: [
          "Ideal for summarizing meeting notes, drafting first passes of project docs, and answering questions across pages your team has already written.",
        ],
      },
      {
        heading: "Tips",
        body: [
          "Use it right after a meeting to turn raw notes into a structured summary with action items, rather than writing the summary manually.",
        ],
      },
    ],
    keyTakeaways: [
      "Best when your team's knowledge already lives in Notion.",
      "Strong for meeting note summarization and first-draft docs.",
      "Less suited to complex, open-ended reasoning than a dedicated assistant.",
    ],
  },
  {
    slug: "understanding-copilot",
    title: "Understanding GitHub Copilot",
    category: "Tools",
    summary: "How GitHub Copilot, an in-editor AI pair programmer, changes day-to-day engineering work.",
    readTime: "4 min",
    tags: ["Copilot", "Engineering"],
    relatedTools: ["github-copilot"],
    sections: [
      {
        heading: "What it is",
        body: [
          "GitHub Copilot is an AI pair programmer built into your IDE, offering inline code completions and a chat mode aware of your open files and repository.",
        ],
      },
      {
        heading: "When to reach for it",
        body: [
          "Great for boilerplate, unit tests, refactors, and explaining unfamiliar code in a repo you've just joined.",
        ],
      },
      {
        heading: "Tips",
        body: [
          "Write a clear comment describing the function you want before letting it suggest code — the quality of suggestions tracks the quality of your intent signal. Always review generated code the same way you'd review a colleague's PR.",
        ],
      },
    ],
    keyTakeaways: [
      "Best for in-editor code completion, tests, and refactors.",
      "Suggestion quality improves with clear comments and function signatures.",
      "Generated code still requires the same review rigor as human-written code.",
    ],
  },
  {
    slug: "understanding-perplexity",
    title: "Understanding Perplexity",
    category: "Tools",
    summary: "Using Perplexity, an AI research tool that cites its sources, for fast, trustworthy research.",
    readTime: "3 min",
    tags: ["Perplexity", "Research"],
    relatedTools: ["perplexity"],
    sections: [
      {
        heading: "What it is",
        body: [
          "Perplexity is an AI answer engine that searches the live web and returns a synthesized answer with citations you can click through to verify.",
        ],
      },
      {
        heading: "When to reach for it",
        body: [
          "Best for market research, competitor scans, and any question where you need current information with traceable sources.",
        ],
      },
      {
        heading: "Tips",
        body: [
          "Always open at least one or two cited sources for anything you plan to put in a report — citations reflect what the model referenced, not a guarantee of accuracy.",
        ],
      },
    ],
    keyTakeaways: [
      "Best for cited, up-to-date research.",
      "Citations make claims easy to verify — use that feature.",
      "Less suited to long creative or technical writing.",
    ],
  },
  {
    slug: "understanding-midjourney",
    title: "Understanding Midjourney",
    category: "Tools",
    summary: "Generating professional-quality visuals with Midjourney, a leading AI image generation tool.",
    readTime: "3 min",
    tags: ["Midjourney", "Design"],
    relatedTools: ["midjourney"],
    sections: [
      {
        heading: "What it is",
        body: [
          "Midjourney is an image-generation tool known for high visual quality, popular for marketing imagery, concept art, and mood boards.",
        ],
      },
      {
        heading: "When to reach for it",
        body: [
          "Use it for exploratory creative visuals — campaign concepts, illustrative graphics, and mood boards — rather than pixel-precise brand assets.",
        ],
      },
      {
        heading: "Tips",
        body: [
          "Be descriptive about style, lighting, and composition, not just subject matter. Generate several variations and iterate rather than expecting the first result to be final.",
        ],
      },
    ],
    keyTakeaways: [
      "Best for concept art, marketing visuals, and mood boards.",
      "Describe style and composition, not just subject.",
      "Treat outputs as creative exploration, not final brand-locked assets.",
    ],
  },
];

export function getLearnTopic(slug: string): LearnTopic | undefined {
  return learnTopics.find((t) => t.slug === slug);
}
