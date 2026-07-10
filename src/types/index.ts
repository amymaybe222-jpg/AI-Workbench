// Shared domain types for the AI Workbench app.
// Mock data implements these interfaces; localStorage-backed hooks read/write compatible shapes.

export interface LearnTopic {
  slug: string;
  title: string;
  category: "Foundations" | "Tools";
  summary: string;
  readTime: string;
  tags: string[];
  sections: { heading: string; body: string[] }[];
  keyTakeaways: string[];
  relatedTools?: string[];
}

export interface AiTool {
  id: string;
  name: string;
  maker: string;
  bestFor: string[];
  description: string;
  strengths: string[];
  limitations: string[];
  pricingNote: string;
  learnSlug?: string;
}

export interface ToolTask {
  id: string;
  label: string;
  keywords: string[];
  recommendedToolIds: string[];
  reasoning: string;
}

export type PromptCategory =
  | "Productivity"
  | "Engineering"
  | "Customer Support"
  | "Leadership"
  | "Data & Analytics"
  | "Marketing & Comms"
  | "People & HR"
  | "Sales";

export interface Prompt {
  id: string;
  title: string;
  category: PromptCategory;
  tool: string;
  description: string;
  prompt: string;
  tags: string[];
  likes: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  quizId: string;
  quizTitle: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  completedAt: string;
  certificateName?: string;
}

export interface CommunityComment {
  id: string;
  author: string;
  role: string;
  body: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  author: string;
  role: string;
  team: string;
  body: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: CommunityComment[];
  /** Shorter, keyword-focused variants for <title>/meta description, used when `title` runs too long for search snippets. */
  seoTitle?: string;
  seoDescription?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  team: string;
  bio: string;
  website?: string;
}
