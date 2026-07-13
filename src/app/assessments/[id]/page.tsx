import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import { Quiz, QuizQuestion } from "@/types";

const QuizRunner = dynamic(() => import("@/components/assessments/QuizRunner").then((m) => m.QuizRunner));

export async function generateStaticParams() {
  const { data } = await supabase.from("quizzes").select("id");
  return (data ?? []).map((quiz) => ({ id: quiz.id }));
}

async function getQuiz(id: string): Promise<Quiz | null> {
  const [quizRes, questionsRes] = await Promise.all([
    supabase.from("quizzes").select("*").eq("id", id).maybeSingle(),
    supabase.from("quiz_questions").select("*").eq("quiz_id", id).order("order_index", { ascending: true }),
  ]);
  if (!quizRes.data) return null;
  return {
    id: quizRes.data.id,
    title: quizRes.data.title,
    description: quizRes.data.description,
    estimated_minutes: quizRes.data.estimated_minutes,
    questions: (questionsRes.data as QuizQuestion[]) ?? [],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const quiz = await getQuiz(id);
  if (!quiz) return {};
  return {
    title: quiz.title,
    description: quiz.description,
  };
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quiz = await getQuiz(id);
  if (!quiz) notFound();

  return <QuizRunner quiz={quiz} />;
}
