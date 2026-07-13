import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";
import { supabase } from "@/lib/supabase";

export const alt = "Assessment";
export const size = ogSize;
export const contentType = ogContentType;

export async function generateStaticParams() {
  const { data } = await supabase.from("quizzes").select("id");
  return (data ?? []).map((quiz) => ({ id: quiz.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [quizRes, questionsRes] = await Promise.all([
    supabase.from("quizzes").select("*").eq("id", id).maybeSingle(),
    supabase.from("quiz_questions").select("id", { count: "exact", head: true }).eq("quiz_id", id),
  ]);
  const quiz = quizRes.data;
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Assessment"
        title={quiz?.title ?? "Assessment"}
        date={quiz ? `${questionsRes.count ?? 0} questions · ~${quiz.estimated_minutes} min` : undefined}
      />
    ),
    { ...ogSize, fonts }
  );
}
