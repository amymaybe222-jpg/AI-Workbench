import { ToolTask } from "@/types";

// Simple deterministic keyword-matching dataset that powers the Tool Picker.
// Each task maps a real workplace scenario to keywords and a ranked shortlist of tools.
export const toolTasks: ToolTask[] = [
  {
    id: "write-emails",
    label: "Write or reply to emails",
    keywords: ["email", "reply", "inbox", "message", "correspondence"],
    recommendedToolIds: ["claude", "chatgpt"],
    reasoning:
      "Email drafting is a writing-and-tone task. Claude and ChatGPT both handle this well — Claude is a strong pick when you want to paste a full email thread for context.",
  },
  {
    id: "summarize-documents",
    label: "Summarize long documents or reports",
    keywords: ["summarize", "summarise", "summary", "long document", "report", "condense", "tl;dr"],
    recommendedToolIds: ["claude", "notion-ai"],
    reasoning:
      "Summarization benefits from a large context window so the whole document can be considered at once. Claude excels here; Notion AI is the faster option if the doc already lives in Notion.",
  },
  {
    id: "analyse-data",
    label: "Analyse data or spreadsheets",
    keywords: ["data", "analyse", "analyze", "spreadsheet", "csv", "numbers", "trends", "statistics"],
    recommendedToolIds: ["chatgpt", "claude"],
    reasoning:
      "ChatGPT's built-in data analysis tools are convenient for quick spreadsheet work. Claude is a strong alternative when you need to reason carefully about what the data means, not just compute it.",
  },
  {
    id: "generate-code",
    label: "Generate or refactor code",
    keywords: ["code", "function", "bug", "refactor", "programming", "script", "api", "developer"],
    recommendedToolIds: ["github-copilot", "claude"],
    reasoning:
      "GitHub Copilot works directly in your IDE with full repo context, making it the fastest option for day-to-day coding. Claude is a great complement for larger design discussions or reviewing a whole module at once.",
  },
  {
    id: "write-tests",
    label: "Write unit tests",
    keywords: ["unit test", "test coverage", "testing", "test cases", "qa"],
    recommendedToolIds: ["github-copilot", "claude"],
    reasoning:
      "Copilot can generate tests inline against your actual function signatures. Claude is useful for reasoning through edge cases before you write the tests.",
  },
  {
    id: "research-market",
    label: "Research competitors or markets",
    keywords: ["research", "competitor", "market", "industry", "landscape", "trends report"],
    recommendedToolIds: ["perplexity", "chatgpt"],
    reasoning:
      "Perplexity searches the live web and cites sources, which matters for anything research-based that needs to be verifiable.",
  },
  {
    id: "create-visuals",
    label: "Create marketing visuals or concept art",
    keywords: ["image", "visual", "design", "artwork", "graphic", "illustration", "mood board", "creative"],
    recommendedToolIds: ["midjourney", "chatgpt"],
    reasoning:
      "Midjourney produces the highest visual quality for stylized creative work. ChatGPT's built-in image generation is a fast alternative for quick, simple visuals.",
  },
  {
    id: "meeting-notes",
    label: "Turn meeting notes into a summary",
    keywords: ["meeting", "notes", "minutes", "action items", "recap"],
    recommendedToolIds: ["notion-ai", "claude"],
    reasoning:
      "If your notes already live in Notion, Notion AI can summarize and extract action items without leaving the page. Claude is a strong option for messier or longer transcripts.",
  },
  {
    id: "customer-support",
    label: "Draft customer support responses",
    keywords: ["customer", "support", "ticket", "complaint", "response", "help desk"],
    recommendedToolIds: ["claude", "chatgpt"],
    reasoning:
      "Support replies need a consistent, empathetic tone at speed. Both Claude and ChatGPT handle this well — Claude is especially good at holding a consistent voice across many replies.",
  },
  {
    id: "presentations",
    label: "Draft slides or presentation outlines",
    keywords: ["presentation", "slides", "deck", "powerpoint", "pitch"],
    recommendedToolIds: ["chatgpt", "claude"],
    reasoning:
      "Both assistants are strong at structuring a narrative and outline. Use either to draft the outline and talking points, then build the visual deck separately.",
  },
  {
    id: "hr-policy",
    label: "Draft HR policies or people documents",
    keywords: ["hr", "policy", "people", "handbook", "onboarding", "employee"],
    recommendedToolIds: ["claude", "notion-ai"],
    reasoning:
      "Policy writing benefits from careful, consistent language and the ability to review a full existing handbook for consistency — a strength of Claude's long context window.",
  },
  {
    id: "leadership-comms",
    label: "Write leadership or all-hands communications",
    keywords: ["leadership", "all-hands", "announcement", "town hall", "strategy memo", "exec"],
    recommendedToolIds: ["claude", "chatgpt"],
    reasoning:
      "Leadership communication needs a controlled, consistent tone across a sensitive message — an area where Claude's writing style control is particularly strong.",
  },
];

export function matchTasks(query: string, limit = 3): ToolTask[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const scored = toolTasks
    .map((task) => {
      let score = 0;
      for (const keyword of task.keywords) {
        if (normalized.includes(keyword)) score += 2;
      }
      const labelWords = task.label.toLowerCase().split(/\s+/);
      for (const word of labelWords) {
        if (word.length > 3 && normalized.includes(word)) score += 1;
      }
      return { task, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.task);
}
