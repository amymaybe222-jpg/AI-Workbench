// Prompt category list, used for filter chips in the Prompt Library.
// Kept as a static constant since it mirrors the `prompt_category` Postgres
// enum (supabase/migrations/0002_prompt_library.sql) — the categories
// themselves aren't user data and don't need a round-trip to fetch.
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
