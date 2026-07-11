"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LinkButton } from "@/components/ui/LinkButton";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storageKeys";
import { downloadCertificate } from "@/lib/certificate";
import { Quiz, QuizResult } from "@/types";
import { cn } from "@/lib/utils";

const PASS_THRESHOLD = 80;

type Phase = "intro" | "question" | "result";

export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));
  const [certName, setCertName] = useState("");
  const [certGenerated, setCertGenerated] = useState(false);
  const [, setResults] = useLocalStorage<QuizResult[]>(STORAGE_KEYS.quizResults, []);

  const currentQuestion = quiz.questions[currentIndex];
  const selected = answers[currentIndex];

  const correctCount = answers.reduce<number>(
    (acc, ans, i) => acc + (ans === quiz.questions[i].correctIndex ? 1 : 0),
    0
  );
  const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = scorePercent >= PASS_THRESHOLD;

  function selectOption(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishQuiz();
    }
  }

  function goPrev() {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }

  function finishQuiz() {
    const finalCorrect = answers.reduce<number>(
      (acc, ans, i) => acc + (ans === quiz.questions[i].correctIndex ? 1 : 0),
      0
    );
    const finalScore = Math.round((finalCorrect / quiz.questions.length) * 100);
    const result: QuizResult = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      scorePercent: finalScore,
      correctCount: finalCorrect,
      totalQuestions: quiz.questions.length,
      completedAt: new Date().toISOString(),
    };
    setResults((prev) => [...prev.filter((r) => r.quizId !== quiz.id), result]);
    setPhase("result");
  }

  function restart() {
    setAnswers(Array(quiz.questions.length).fill(null));
    setCurrentIndex(0);
    setCertGenerated(false);
    setCertName("");
    setPhase("intro");
  }

  function handleGenerateCertificate() {
    if (!certName.trim()) return;
    downloadCertificate({
      name: certName.trim(),
      quizTitle: quiz.title,
      scorePercent,
      date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    });
    setResults((prev) =>
      prev.map((r) => (r.quizId === quiz.id ? { ...r, certificateName: certName.trim() } : r))
    );
    setCertGenerated(true);
  }

  if (phase === "intro") {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <Badge tone="primary" className="mx-auto mb-4">
          {quiz.questions.length} questions · ~{quiz.estimatedMinutes} min
        </Badge>
        <h1 className="text-2xl font-semibold text-text">{quiz.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">{quiz.description}</p>
        <p className="mt-4 text-xs text-text-muted">
          Score {PASS_THRESHOLD}% or higher to unlock a downloadable certificate.
        </p>
        <Button className="mt-6" size="lg" onClick={() => setPhase("question")}>
          Start assessment
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </Card>
    );
  }

  if (phase === "question") {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="sr-only">{quiz.title}</h1>
        <ProgressBar
          value={((currentIndex + 1) / quiz.questions.length) * 100}
          label={`Question ${currentIndex + 1} of ${quiz.questions.length}`}
        />
        <Card className="mt-6">
          <h2 className="text-lg font-medium leading-relaxed text-text">{currentQuestion.question}</h2>
          <div className="mt-5 space-y-2.5" role="radiogroup" aria-label={currentQuestion.question}>
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={selected === i}
                onClick={() => selectOption(i)}
                className={cn(
                  "focus-ring flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors duration-150",
                  selected === i
                    ? "border-primary bg-primary/10 text-text"
                    : "border-border bg-surface-raised text-text-muted hover:border-primary/30 hover:text-text"
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                    selected === i ? "border-primary bg-primary" : "border-border"
                  )}
                >
                  {selected === i && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                {option}
              </button>
            ))}
          </div>
        </Card>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" onClick={goPrev} disabled={currentIndex === 0}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </Button>
          <Button onClick={goNext} disabled={selected === null}>
            {currentIndex === quiz.questions.length - 1 ? "See results" : "Next"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  }

  // Result phase
  return (
    <div className="mx-auto max-w-2xl">
      <Card className={cn("text-center", passed ? "border-secondary/30" : "border-accent/30")}>
        <div
          className={cn(
            "mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4",
            passed ? "border-secondary/30 bg-secondary/10 text-secondary" : "border-accent/30 bg-accent/10 text-accent"
          )}
        >
          <span className="font-mono text-2xl font-bold">{scorePercent}%</span>
        </div>
        <h1 className="mt-5 text-xl font-semibold text-text">
          {passed ? "Nice work — you passed!" : "Not quite at the threshold yet"}
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          You answered {correctCount} of {quiz.questions.length} questions correctly.
        </p>

        {passed ? (
          certGenerated ? (
            <div className="mt-6 flex flex-col items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-secondary" aria-hidden="true" />
              <p className="text-sm text-text">Certificate downloaded for {certName}.</p>
            </div>
          ) : (
            <div className="mx-auto mt-6 max-w-sm text-left">
              <label htmlFor="cert-name" className="text-xs font-medium text-text-muted">
                Enter your name for the certificate
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="cert-name"
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="Full name"
                  className="focus-ring w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-base text-text placeholder:text-text-muted focus:border-primary"
                />
                <Button variant="secondary" onClick={handleGenerateCertificate} disabled={!certName.trim()}>
                  <Award className="h-4 w-4" aria-hidden="true" />
                  Download
                </Button>
              </div>
            </div>
          )
        ) : (
          <p className="mx-auto mt-4 max-w-sm text-sm text-text-muted">
            Score {PASS_THRESHOLD}% or higher to unlock a certificate. Review the explanations below, then try again.
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={restart}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Retake assessment
          </Button>
          <LinkButton href="/assessments" variant="ghost">
            Back to all assessments
          </LinkButton>
        </div>
      </Card>

      <div className="mt-8 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-text-muted">Review</h2>
        {quiz.questions.map((q, i) => {
          const userAnswer = answers[i];
          const isCorrect = userAnswer === q.correctIndex;
          return (
            <Card key={q.id}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{q.question}</p>
                  {isCorrect ? (
                    <>
                      <p className="mt-1.5 text-sm text-text-muted">
                        Correct answer: <span className="text-text">{q.options[q.correctIndex]}</span>
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{q.explanation}</p>
                    </>
                  ) : (
                    <>
                      {userAnswer !== null && (
                        <p className="mt-1.5 text-sm text-accent">Your answer: {q.options[userAnswer]}</p>
                      )}
                      <p className="mt-2 text-sm font-medium text-accent">Not quite right — try again.</p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
