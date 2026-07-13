"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, ArrowRight, Clock, ListChecks, ClipboardX } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { supabase, DEMO_USER_ID } from "@/lib/supabase";
import { Quiz, QuizQuestion, QuizResult } from "@/types";

export function AssessmentsList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [bestResults, setBestResults] = useState<Map<string, QuizResult>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [quizzesRes, questionsRes, resultsRes] = await Promise.all([
        supabase.from("quizzes").select("*"),
        supabase.from("quiz_questions").select("*").order("order_index", { ascending: true }),
        supabase
          .from("quiz_results")
          .select("*")
          .eq("user_id", DEMO_USER_ID)
          .order("completed_at", { ascending: false }),
      ]);

      const questionsByQuiz = new Map<string, QuizQuestion[]>();
      for (const q of (questionsRes.data ?? []) as QuizQuestion[]) {
        const list = questionsByQuiz.get(q.quiz_id) ?? [];
        list.push(q);
        questionsByQuiz.set(q.quiz_id, list);
      }

      const mapped: Quiz[] = (quizzesRes.data ?? []).map((q) => ({
        id: q.id,
        title: q.title,
        description: q.description,
        estimated_minutes: q.estimated_minutes,
        questions: questionsByQuiz.get(q.id) ?? [],
      }));
      setQuizzes(mapped);

      const best = new Map<string, QuizResult>();
      for (const r of (resultsRes.data ?? []) as QuizResult[]) {
        const existing = best.get(r.quiz_id);
        if (!existing || r.score_percent > existing.score_percent) best.set(r.quiz_id, r);
      }
      setBestResults(best);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <p className="text-sm text-text-muted">Loading assessments…</p>;
  }

  if (quizzes.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-3 py-14 text-center">
        <ClipboardX className="h-8 w-8 text-text-muted" aria-hidden="true" />
        <p className="text-sm font-medium text-text">No assessments available yet.</p>
        <p className="max-w-sm text-sm text-text-muted">Check back soon — new assessments are added regularly.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => {
        const result = bestResults.get(quiz.id);
        return (
          <Card key={quiz.id} hoverable className="group flex flex-col">
            <Link href={`/assessments/${quiz.id}`} className="focus-ring flex flex-1 flex-col rounded-lg">
              <div className="flex items-center justify-between gap-2">
                <Badge tone="primary">
                  <ListChecks className="h-3 w-3" aria-hidden="true" />
                  {quiz.questions.length} questions
                </Badge>
                {result && (
                  <Badge tone={result.score_percent >= 80 ? "secondary" : "neutral"}>
                    {result.score_percent >= 80 && <Award className="h-3 w-3" aria-hidden="true" />}
                    Best: {result.score_percent}%
                  </Badge>
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">{quiz.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-muted">{quiz.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />~{quiz.estimated_minutes} min
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100">
                  {result ? "Retake quiz" : "Begin quiz"} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
