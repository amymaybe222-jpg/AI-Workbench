// Centralized localStorage keys used across the app's mock-persistence hooks.
export const STORAGE_KEYS = {
  profile: "aiw:profile",
  isLoggedIn: "aiw:is-logged-in",
  theme: "aiw:theme",
} as const;

export const DEFAULT_PROFILE = {
  name: "Alex Morgan",
  role: "Product Manager",
  team: "Growth",
  website: "",
};
