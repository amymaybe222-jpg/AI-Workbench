// Shared domain types for the AI Workbench app.
// These mirror the shape of rows returned by Supabase (see supabase/migrations/*.sql).

export interface LearnTopic {
  slug: string;
  title: string;
  category: "Foundations" | "Tools";
  summary: string;
  read_time: string;
  tags: string[];
  sections: { heading: string; body: string[] }[];
  key_takeaways: string[];
  related_tool_slugs: string[] | null;
}

export interface AiTool {
  id: string;
  name: string;
  maker: string;
  best_for: string[];
  description: string;
  strengths: string[];
  limitations: string[];
  pricing_note: string;
  learn_slug: string | null;
}

export interface ToolTaskRow {
  id: string;
  label: string;
  keywords: string[];
  recommended_tool_ids: string[];
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

export interface PromptRow {
  id: string;
  title: string;
  category: PromptCategory;
  tool: string;
  description: string;
  prompt_text: string;
  tags: string[];
  like_count: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  order_index: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  estimated_minutes: number;
  questions: QuizQuestion[];
}

export interface QuizResult {
  id?: string;
  user_id: string;
  quiz_id: string;
  quiz_title: string;
  score_percent: number;
  correct_count: number;
  total_questions: number;
  completed_at: string;
  certificate_name?: string | null;
}

export interface CommunityComment {
  id: string;
  post_id: string;
  author: string;
  role: string | null;
  body: string;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  author: string;
  role: string | null;
  team: string | null;
  tool: string | null;
  body: string;
  tags: string[];
  created_at: string;
  like_count: number;
  comments: CommunityComment[];
  /** Shorter, keyword-focused variants for <title>/meta description, used when `title` runs too long for search snippets. */
  seo_title?: string | null;
  seo_description?: string | null;
}

export interface UserProfile {
  name: string;
  role: string;
  team: string;
  bio: string;
  website?: string;
}
