"use client";

import Link from "next/link";
import { Award, ArrowRight, Clock, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { quizzes } from "@/data/quizzes";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { QuizResult } from "@/types";

export function AssessmentsList() {
  const [results] = useLocalStorage<QuizResult[]>(STORAGE_KEYS.quizResults, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {quizzes.map((quiz) => {
        const result = results.find((r) => r.quizId === quiz.id);
        return (
          <Card key={quiz.id} hoverable className="group flex flex-col">
            <Link href={`/assessments/${quiz.id}`} className="focus-ring flex flex-1 flex-col rounded-lg">
              <div className="flex items-center justify-between gap-2">
                <Badge tone="primary">
                  <ListChecks className="h-3 w-3" aria-hidden="true" />
                  {quiz.questions.length} questions
                </Badge>
                {result && (
                  <Badge tone={result.scorePercent >= 80 ? "secondary" : "neutral"}>
                    {result.scorePercent >= 80 && <Award className="h-3 w-3" aria-hidden="true" />}
                    Best: {result.scorePercent}%
                  </Badge>
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold text-text">{quiz.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-muted">{quiz.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />~{quiz.estimatedMinutes} min
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100">
                  {result ? "Retake" : "Start"} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
