// Builds a meta description in the 150-160 character range that search engines
// won't truncate awkwardly. Content-driven pages (learn topics, quizzes,
// community posts) have short on-page summaries that read fine in a card but
// are too short for a meta description on their own, so we pad with a
// `suffix` that adds real context, then cut cleanly at a word boundary.
export function buildMetaDescription(base: string, suffix: string, max = 160): string {
  const combined = `${base.trim()} ${suffix.trim()}`.trim();
  if (combined.length <= max) return combined;

  const hardCut = combined.slice(0, max - 1);
  const lastSpace = hardCut.lastIndexOf(" ");
  const wordBoundaryCut = lastSpace >= 130 ? hardCut.slice(0, lastSpace) : hardCut;
  return `${wordBoundaryCut}…`;
}
