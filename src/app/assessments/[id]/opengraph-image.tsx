import { ImageResponse } from "next/og";
import { ogSize, ogContentType, loadOgFonts, OgTemplate } from "@/lib/og";
import { quizzes, getQuiz } from "@/data/quizzes";

export const alt = "Assessment";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ id: quiz.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = getQuiz(id);
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Assessment"
        title={quiz?.title ?? "Assessment"}
        date={quiz ? `${quiz.questions.length} questions · ~${quiz.estimatedMinutes} min` : undefined}
      />
    ),
    { ...ogSize, fonts }
  );
}
