import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { quizzes, getQuiz } from "@/data/quizzes";
import { QuizRunner } from "@/components/assessments/QuizRunner";

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ id: quiz.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const quiz = getQuiz(id);
  if (!quiz) return {};
  return {
    title: quiz.title,
    description: quiz.description,
  };
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = getQuiz(id);
  if (!quiz) notFound();

  return <QuizRunner quiz={quiz} />;
}
