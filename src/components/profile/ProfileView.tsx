"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, BookMarked, MessagesSquare, Pencil, Save, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useCommunityPosts } from "@/lib/useCommunityPosts";
import { STORAGE_KEYS, DEFAULT_PROFILE } from "@/lib/storageKeys";
import { downloadCertificate } from "@/lib/certificate";
import { QuizResult, UserProfile } from "@/types";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function ProfileView() {
  const [profile, setProfile] = useLocalStorage<UserProfile>(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const [results] = useLocalStorage<QuizResult[]>(STORAGE_KEYS.quizResults, []);
  const [savedPrompts] = useLocalStorage<string[]>(STORAGE_KEYS.savedPrompts, []);
  const { posts } = useCommunityPosts();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<UserProfile>(profile);

  const myPosts = posts.filter((p) => p.author === profile.name);
  const certificates = results.filter((r) => r.scorePercent >= 80 && r.certificateName);
  const avgScore = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.scorePercent, 0) / results.length)
    : 0;

  function startEditing() {
    setDraft(profile);
    setEditing(true);
  }

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfile(draft);
    setEditing(false);
  }

  function redownload(result: QuizResult) {
    downloadCertificate({
      name: result.certificateName || profile.name,
      quizTitle: result.quizTitle,
      scorePercent: result.scorePercent,
      date: new Date(result.completedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="h-fit">
        {editing ? (
          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <label htmlFor="p-name" className="text-xs font-medium text-text-muted">
                Name
              </label>
              <input
                id="p-name"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-base text-text focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="p-role" className="text-xs font-medium text-text-muted">
                Role
              </label>
              <input
                id="p-role"
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-base text-text focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="p-team" className="text-xs font-medium text-text-muted">
                Team
              </label>
              <input
                id="p-team"
                value={draft.team}
                onChange={(e) => setDraft({ ...draft, team: e.target.value })}
                className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-base text-text focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="p-bio" className="text-xs font-medium text-text-muted">
                Bio
              </label>
              <textarea
                id="p-bio"
                rows={3}
                value={draft.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                className="focus-ring mt-1.5 w-full resize-y rounded-lg border border-border bg-surface-raised px-3 py-2 text-base text-text focus:border-primary"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm">
                <Save className="h-3.5 w-3.5" aria-hidden="true" />
                Save
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex items-start justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
                {initials(profile.name)}
              </span>
              <button
                type="button"
                onClick={startEditing}
                className="focus-ring flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-text-muted hover:border-primary/40 hover:text-primary"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                Edit
              </button>
            </div>
            <h1 className="mt-4 text-lg font-semibold text-text">{profile.name}</h1>
            <p className="text-sm text-text-muted">
              {profile.role} · {profile.team}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{profile.bio}</p>
          </div>
        )}
      </Card>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card className="text-center">
            <Target className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
            <p className="mt-2 font-mono text-xl font-semibold text-text">{results.length}</p>
            <p className="text-xs text-text-muted">Assessments taken</p>
          </Card>
          <Card className="text-center">
            <Award className="mx-auto h-5 w-5 text-secondary" aria-hidden="true" />
            <p className="mt-2 font-mono text-xl font-semibold text-text">{certificates.length}</p>
            <p className="text-xs text-text-muted">Certificates earned</p>
          </Card>
          <Card className="text-center">
            <BookMarked className="mx-auto h-5 w-5 text-accent" aria-hidden="true" />
            <p className="mt-2 font-mono text-xl font-semibold text-text">{savedPrompts.length}</p>
            <p className="text-xs text-text-muted">Prompts saved</p>
          </Card>
          <Card className="text-center">
            <MessagesSquare className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
            <p className="mt-2 font-mono text-xl font-semibold text-text">{myPosts.length}</p>
            <p className="text-xs text-text-muted">Posts shared</p>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text">Assessment history</h2>
            {results.length > 0 && <Badge tone="neutral">Average: {avgScore}%</Badge>}
          </div>
          {results.length === 0 ? (
            <p className="mt-3 text-sm text-text-muted">
              No assessments completed yet.{" "}
              <Link href="/assessments" className="font-medium text-primary hover:text-primary-hover">
                Take your first one →
              </Link>
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {results.map((r) => (
                <div
                  key={r.quizId}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface-raised p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-text">{r.quizTitle}</p>
                    <p className="text-xs text-text-muted">
                      {r.correctCount}/{r.totalQuestions} correct ·{" "}
                      {new Date(r.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge tone={r.scorePercent >= 80 ? "secondary" : "neutral"}>{r.scorePercent}%</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-text">Certificates</h2>
          {certificates.length === 0 ? (
            <p className="mt-3 text-sm text-text-muted">
              Score 80% or higher on an assessment to earn a downloadable certificate.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {certificates.map((r) => (
                <div
                  key={r.quizId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-secondary/25 bg-secondary/[0.04] p-3"
                >
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-text">{r.quizTitle}</p>
                      <p className="text-xs text-text-muted">
                        {r.certificateName} · {r.scorePercent}%
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => redownload(r)}>
                    Download again
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
