import { Quiz } from "@/types";

export const quizzes: Quiz[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Core concepts every professional should know before using AI tools day to day.",
    estimatedMinutes: 6,
    questions: [
      {
        id: "q1",
        question: "What best describes what a generative AI model actually does?",
        options: [
          "It searches a database of pre-written answers and returns the closest match",
          "It predicts the most likely next words based on patterns learned from training data",
          "It runs a fixed set of if/else rules written by engineers",
          "It only reformats existing text without creating anything new",
        ],
        correctIndex: 1,
        explanation:
          "Generative models produce new content by predicting likely continuations based on learned patterns — they don't look up stored answers.",
      },
      {
        id: "q2",
        question: "Why do LLMs sometimes produce confident but incorrect information (\"hallucination\")?",
        options: [
          "The model is intentionally trying to deceive the user",
          "The servers are overloaded and return random text",
          "The model predicts plausible-sounding text rather than verifying facts against a source",
          "Hallucination only happens with free-tier accounts",
        ],
        correctIndex: 2,
        explanation:
          "Because models generate statistically plausible text rather than retrieving verified facts, they can produce incorrect statements confidently.",
      },
      {
        id: "q3",
        question: "What is a model's \"context window\"?",
        options: [
          "The subscription tier you're paying for",
          "The amount of text (prompt, history, documents) the model can consider at once",
          "The time of day the model performs best",
          "A setting that controls how creative the output is",
        ],
        correctIndex: 1,
        explanation:
          "The context window is the amount of text the model can factor into its response, including your prompt and any pasted content.",
      },
      {
        id: "q4",
        question: "Which is the most appropriate first step before pasting customer data into a consumer AI tool?",
        options: [
          "Just paste it — AI tools are private by default",
          "Check your organization's data policy and whether an approved enterprise agreement covers this use",
          "Remove the customer's name only",
          "Ask a colleague if they've done it before",
        ],
        correctIndex: 1,
        explanation:
          "Data policies vary by organization and tool tier — always confirm what's approved before sharing confidential or customer data.",
      },
      {
        id: "q5",
        question: "What is the most reliable way to treat AI-generated statistics or citations?",
        options: [
          "Trust them completely since the model sounds confident",
          "Ignore AI outputs entirely",
          "Verify them against a primary source before relying on them",
          "Only trust them if the number sounds precise",
        ],
        correctIndex: 2,
        explanation:
          "AI-generated facts and figures should be treated as unverified until checked against a trustworthy source, especially for anything customer-facing or regulatory.",
      },
      {
        id: "q6",
        question: "Which task is generative AI generally LEAST suited to on its own?",
        options: [
          "Drafting a first pass of a document",
          "Summarizing a long report",
          "Guaranteeing a legally binding, fully verified compliance statement without human review",
          "Suggesting a first-pass structure for a presentation",
        ],
        correctIndex: 2,
        explanation:
          "AI can draft compliance-related content, but it cannot guarantee legal accuracy — that always requires human/expert verification.",
      },
      {
        id: "q7",
        question: "What does it mean to be transparent about AI use at work?",
        options: [
          "Never using AI tools at all",
          "Noting when AI meaningfully shaped a deliverable so reviewers know to check it accordingly",
          "Only disclosing AI use if directly asked",
          "Using AI only outside of work hours",
        ],
        correctIndex: 1,
        explanation:
          "Being transparent means flagging meaningful AI contribution, particularly for client-facing, financial, or regulated content.",
      },
      {
        id: "q8",
        question: "A colleague pastes an entire unreleased financial report into a free, consumer-tier AI chatbot to summarize it. What's the main concern?",
        options: [
          "The summary might be too short",
          "This may violate data confidentiality policies depending on the tool's data handling terms",
          "Free tools are always slower",
          "There is no concern as long as the summary is accurate",
        ],
        correctIndex: 1,
        explanation:
          "Confidential or unreleased financial data typically shouldn't go into consumer-tier tools without an approved enterprise agreement covering data handling.",
      },
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Basics",
    description: "Practical techniques for writing prompts that get better results, faster.",
    estimatedMinutes: 5,
    questions: [
      {
        id: "q1",
        question: "What is the single biggest lever for improving AI output quality?",
        options: [
          "Typing in all caps",
          "Providing relevant context (audience, goal, constraints)",
          "Making the prompt as short as possible",
          "Repeating the same question multiple times",
        ],
        correctIndex: 1,
        explanation:
          "The more relevant context you provide, the less the model has to guess — this is the highest-leverage change you can make.",
      },
      {
        id: "q2",
        question: "Which prompt structure is generally most reliable?",
        options: [
          "Just the task, with no other detail",
          "Role → Task → Context → Format",
          "A single keyword",
          "A long list of unrelated examples with no explanation",
        ],
        correctIndex: 1,
        explanation:
          "Specifying who the AI should act as, what to do, relevant background, and the desired output format produces consistently better results.",
      },
      {
        id: "q3",
        question: "You get a decent first response but it's too long. What's the best next step?",
        options: [
          "Start an entirely new conversation from scratch",
          "Ask a follow-up like \"make this more concise\" in the same conversation",
          "Give up and write it manually",
          "Repeat the exact same prompt again",
        ],
        correctIndex: 1,
        explanation:
          "The model retains context from earlier turns, so iterating with follow-ups is faster and more effective than restarting.",
      },
      {
        id: "q4",
        question: "Why is specifying the output format (e.g. table, bullet list, email) useful?",
        options: [
          "It isn't useful, formatting doesn't matter",
          "It guarantees factual accuracy",
          "It makes the response easier to use immediately in its intended context",
          "It makes the model respond faster",
        ],
        correctIndex: 2,
        explanation:
          "Specifying format saves you reformatting time and ensures the output slots directly into your intended use (e.g. a table for data, an email for a reply).",
      },
      {
        id: "q5",
        question: "Which of these prompts provides the most useful context?",
        options: [
          "\"Write an email.\"",
          "\"Write a follow-up email to a customer whose refund is delayed, apologetic but not over-apologetic, under 100 words.\"",
          "\"Email please.\"",
          "\"Make something for a customer.\"",
        ],
        correctIndex: 1,
        explanation:
          "This prompt specifies audience, situation, tone, and length constraints — all context that reduces guesswork.",
      },
      {
        id: "q6",
        question: "What's a good use of providing an example in your prompt?",
        options: [
          "To confuse the model with irrelevant information",
          "To show the style, tone, or structure you want replicated",
          "Examples are never useful",
          "Only to make the prompt look more professional",
        ],
        correctIndex: 1,
        explanation:
          "A representative example helps the model match your intended tone or structure more precisely than description alone.",
      },
      {
        id: "q7",
        question: "You need to reason through a complex, multi-step problem. What's a useful prompting technique?",
        options: [
          "Ask for the final answer only, with no reasoning",
          "Ask the model to show its step-by-step reasoning so you can check the logic",
          "Ask ten unrelated questions at once",
          "Avoid giving any context at all",
        ],
        correctIndex: 1,
        explanation:
          "Asking for visible reasoning makes it easier to spot errors in logic before you rely on the conclusion.",
      },
    ],
  },
  {
    id: "choosing-tools",
    title: "Choosing the Right AI Tool",
    description: "Test your ability to match a workplace task to the most appropriate AI tool.",
    estimatedMinutes: 5,
    questions: [
      {
        id: "q1",
        question: "You need to summarize a 40-page contract in one sitting. Which tool trait matters most?",
        options: [
          "Image generation quality",
          "A large context window that can hold the whole document at once",
          "Voice mode",
          "Plugin ecosystem size",
        ],
        correctIndex: 1,
        explanation:
          "Long-document tasks are best served by tools with large context windows, so the whole document can be reasoned over in one pass.",
      },
      {
        id: "q2",
        question: "You want inline code suggestions as you type in your IDE. What's the best fit?",
        options: [
          "Midjourney",
          "Perplexity",
          "GitHub Copilot",
          "Notion AI",
        ],
        correctIndex: 2,
        explanation:
          "GitHub Copilot is built directly into the IDE and provides inline completions aware of your open files and repo.",
      },
      {
        id: "q3",
        question: "You need a fully cited answer about a competitor's recent product launch. What's the best fit?",
        options: [
          "Midjourney",
          "Perplexity",
          "GitHub Copilot",
          "None of these can help",
        ],
        correctIndex: 1,
        explanation:
          "Perplexity searches the live web and returns citations, which is ideal for research that needs to be verifiable.",
      },
      {
        id: "q4",
        question: "Your team's meeting notes and project docs already live entirely in Notion. Which tool saves the most time for summarizing them?",
        options: [
          "Notion AI, since it works inline with existing content",
          "Midjourney",
          "A brand-new standalone chat tool, always",
          "None — you should copy content elsewhere first",
        ],
        correctIndex: 0,
        explanation:
          "The most convenient tool is often the one embedded where the content already lives, avoiding copy-paste overhead.",
      },
      {
        id: "q5",
        question: "You need highly stylized concept art for a marketing campaign mood board. Best fit?",
        options: [
          "GitHub Copilot",
          "Perplexity",
          "Midjourney",
          "Notion AI",
        ],
        correctIndex: 2,
        explanation:
          "Midjourney is purpose-built for high-quality stylized image generation, well suited to concept art and mood boards.",
      },
      {
        id: "q6",
        question: "What's a reasonable general framework for choosing a tool?",
        options: [
          "Always use the newest tool released, regardless of task",
          "Match the tool to the shape of the task, and consider where the work already lives",
          "Only ever use one tool for everything",
          "Choose based on which tool has the most followers on social media",
        ],
        correctIndex: 1,
        explanation:
          "Matching the tool to the task type — and favoring tools embedded where you already work — is a reliable, low-effort heuristic.",
      },
      {
        id: "q7",
        question: "A tool's output looks correct, professional, and confident. Does this guarantee accuracy?",
        options: [
          "Yes, confident tone means accurate content",
          "No — tone and accuracy are independent; verification is still required",
          "Only for image generation tools",
          "Only if the tool is a paid tier",
        ],
        correctIndex: 1,
        explanation:
          "Confident, well-formatted output is not the same as verified output — always check specifics before relying on them.",
      },
    ],
  },
];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}
