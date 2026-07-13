import { createClient } from "@/lib/supabase/client";

export const supabase = createClient();

// There's no real authentication system in this demo app (no Supabase Auth
// wired up, `users.password_hash` is a placeholder). This is the id of the
// first seeded user (Ava Thompson, migration 0001), used everywhere the app
// needs to attribute a like/save/comment/quiz result to "the current user".
export const DEMO_USER_ID = "11111111-1111-1111-1111-111111111111";
