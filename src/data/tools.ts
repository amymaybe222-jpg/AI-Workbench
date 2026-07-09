import { AiTool } from "@/types";

export const aiTools: AiTool[] = [
  {
    id: "claude",
    name: "Claude",
    maker: "Anthropic",
    bestFor: ["Long-document analysis", "Writing & editing", "Coding", "Careful reasoning"],
    description:
      "A conversational AI assistant built for careful reasoning, long-context analysis, and trustworthy writing. Strong at working with large documents and codebases in a single conversation.",
    strengths: [
      "Very large context window — good for pasting whole documents or codebases",
      "Strong, controllable writing style and tone",
      "Reliable step-by-step reasoning and code generation",
      "Artifacts/canvas-style outputs for drafts, code, and docs",
    ],
    limitations: [
      "No native image generation",
      "Knowledge cutoff means very recent events may be missing",
    ],
    pricingNote: "Free tier available; paid plans unlock higher usage limits and priority access.",
    learnSlug: "understanding-claude",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    maker: "OpenAI",
    bestFor: ["Brainstorming", "General Q&A", "Image generation", "Plugins/integrations"],
    description:
      "A widely-adopted general-purpose assistant with a large plugin/GPT ecosystem, voice mode, and built-in image generation.",
    strengths: [
      "Broad ecosystem of custom GPTs and integrations",
      "Built-in image generation and data analysis tools",
      "Voice mode for hands-free use",
      "Fast responses for everyday tasks",
    ],
    limitations: [
      "Style and tone can require more prompting to control precisely",
      "Context window is smaller than some competitors on lower tiers",
    ],
    pricingNote: "Free tier available; Plus/Team plans add advanced tools and higher limits.",
    learnSlug: "understanding-chatgpt",
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    maker: "Notion",
    bestFor: ["Notes summarization", "Docs & wikis", "Meeting notes", "Task drafting"],
    description:
      "AI features embedded directly inside Notion docs and databases — summarizing, drafting, and translating content where your team already keeps its knowledge base.",
    strengths: [
      "Works inline with existing docs, wikis, and project trackers",
      "Good for summarizing meeting notes and long pages",
      "Q&A across your connected workspace content",
    ],
    limitations: [
      "Only useful if your team already lives in Notion",
      "Less capable than dedicated chat assistants for complex reasoning",
    ],
    pricingNote: "Add-on priced per member on top of a Notion workspace plan.",
    learnSlug: "understanding-notion-ai",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    maker: "GitHub / Microsoft",
    bestFor: ["Code completion", "Unit tests", "Refactoring", "IDE workflows"],
    description:
      "An AI pair programmer embedded directly in the IDE, offering inline completions, chat, and PR summaries tied to your actual codebase.",
    strengths: [
      "Inline suggestions as you type, in the editor you already use",
      "Chat mode understands open files and repo context",
      "Good at boilerplate, tests, and repetitive refactors",
    ],
    limitations: [
      "Best value is realized inside a supported IDE, not as a standalone chat tool",
      "Can produce plausible-looking but incorrect code — review is still required",
    ],
    pricingNote: "Paid per-seat subscription; often provided via a company GitHub org.",
    learnSlug: "understanding-copilot",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    maker: "Perplexity AI",
    bestFor: ["Research", "Cited web answers", "Market/competitor scans"],
    description:
      "An AI answer engine that searches the live web and returns cited, sourced summaries — useful when you need up-to-date facts with references.",
    strengths: [
      "Answers include clickable source citations",
      "Good for fast research and fact-checking",
      "Handles current events and recent releases well",
    ],
    limitations: [
      "Less suited to long creative or technical writing tasks",
      "Quality depends on the quality of indexed sources",
    ],
    pricingNote: "Free tier available; Pro plan adds more searches and file uploads.",
    learnSlug: "understanding-perplexity",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    maker: "Midjourney Inc.",
    bestFor: ["Concept art", "Marketing visuals", "Mood boards"],
    description:
      "A leading image-generation tool for producing highly stylized visuals from text prompts, popular for marketing, concept art, and creative exploration.",
    strengths: [
      "High visual quality and strong stylistic control",
      "Large prompt community and reference styles",
    ],
    limitations: [
      "No native text/document capability — image generation only",
      "Precise text-in-image rendering is still inconsistent",
    ],
    pricingNote: "Subscription tiers based on monthly generation volume.",
    learnSlug: "understanding-midjourney",
  },
];

export function getToolById(id: string): AiTool | undefined {
  return aiTools.find((t) => t.id === id);
}
