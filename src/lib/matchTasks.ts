import { ToolTaskRow } from "@/types";

// Simple deterministic keyword-matching used by the Tool Picker. Operates on
// whatever tool_tasks rows are passed in (fetched from Supabase) rather than
// a static in-memory dataset.
export function matchTasks(tasks: ToolTaskRow[], query: string, limit = 3): ToolTaskRow[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const scored = tasks
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
