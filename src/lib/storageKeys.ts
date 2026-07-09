// Centralized localStorage keys used across the app's mock-persistence hooks.
export const STORAGE_KEYS = {
  profile: "aiw:profile",
  quizResults: "aiw:quiz-results",
  savedPrompts: "aiw:saved-prompts",
  communityPosts: "aiw:community-posts",
  likedPosts: "aiw:liked-posts",
} as const;

export const DEFAULT_PROFILE = {
  name: "Alex Morgan",
  role: "Product Manager",
  team: "Growth",
  bio: "Exploring how AI fits into day-to-day product work — drafting specs faster and learning to prompt more effectively.",
};
