"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, BookMarked, LogOut, MessagesSquare, Pencil, Save, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useProfile } from "@/lib/useProfile";
import { useAuth } from "@/lib/useAuth";
import { useCommunityPosts } from "@/lib/useCommunityPosts";
import { supabase, DEMO_USER_ID } from "@/lib/supabase";
import { downloadCertificate } from "@/lib/certificate";
import { QuizResult, UserProfile } from "@/types";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export function ProfileView() {
  const router = useRouter();
  const { isLoggedIn, hydrated: authHydrated, logout } = useAuth();
  const { profile, hydrated: profileHydrated, updateProfile } = useProfile();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [savedPromptCount, setSavedPromptCount] = useState(0);
  const { posts } = useCommunityPosts();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<UserProfile>(profile);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  useEffect(() => {
    if (authHydrated && !isLoggedIn) {
      router.replace("/login?redirect=/profile");
    }
  }, [authHydrated, isLoggedIn, router]);

  useEffect(() => {
    async function load() {
      const [resultsRes, savedRes] = await Promise.all([
        supabase
          .from("quiz_results")
          .select("*, quizzes(title)")
          .eq("user_id", DEMO_USER_ID)
          .order("completed_at", { ascending: false }),
        supabase.from("saved_prompts").select("prompt_id", { count: "exact", head: true }).eq("user_id", DEMO_USER_ID),
      ]);

      const mapped: QuizResult[] = (resultsRes.data ?? []).map((r) => ({
        id: r.id,
        user_id: r.user_id,
        quiz_id: r.quiz_id,
        quiz_title: r.quizzes?.title ?? r.quiz_id,
        score_percent: r.score_percent,
        correct_count: r.correct_count,
        total_questions: r.total_questions,
        completed_at: r.completed_at,
        certificate_name: r.certificate_name,
      }));
      setResults(mapped);
      setSavedPromptCount(savedRes.count ?? 0);
    }
    load();
  }, []);

  const myPosts = posts.filter((p) => p.author === profile.name);
  const certificates = results.filter((r) => r.score_percent >= 80 && r.certificate_name);
  const avgScore = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.score_percent, 0) / results.length)
    : 0;

  function startEditing() {
    setDraft(profile);
    setAvatarError(null);
    setEditing(true);
  }

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    updateProfile(draft);
    setEditing(false);
  }

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setAvatarError("Image must be under 2MB.");
      return;
    }

    setAvatarError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((d) => ({ ...d, avatarDataUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  function redownload(result: QuizResult) {
    downloadCertificate({
      name: result.certificate_name || profile.name,
      quizTitle: result.quiz_title,
      scorePercent: result.score_percent,
      date: new Date(result.completed_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  }

  if (!authHydrated || !isLoggedIn || !profileHydrated) {
    return <div className="h-64 animate-pulse rounded-xl border border-border bg-surface" />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="h-fit">
        {editing ? (
          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <span className="text-xs font-medium text-text-muted">Photo</span>
              <div className="mt-1.5 flex items-center gap-3">
                <Avatar name={draft.name} avatarDataUrl={draft.avatarDataUrl} className="h-14 w-14 shrink-0 text-lg" />
                <label className="focus-ring flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-text-muted hover:border-primary/40 hover:text-primary">
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="sr-only" />
                  Choose photo
                </label>
              </div>
              {avatarError && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{avatarError}</p>}
              <p className="mt-1.5 text-xs text-text-muted">JPG, PNG, or GIF. Max 2MB.</p>
            </div>
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
              <label htmlFor="p-website" className="text-xs font-medium text-text-muted">
                Website
              </label>
              <input
                id="p-website"
                type="url"
                value={draft.website ?? ""}
                onChange={(e) => setDraft({ ...draft, website: e.target.value })}
                placeholder="https://your-site.com"
                className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-base text-text placeholder:text-text-muted focus:border-primary"
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
              <Avatar name={profile.name} avatarDataUrl={profile.avatarDataUrl} className="h-14 w-14 text-lg" />
              <button
                type="button"
                onClick={startEditing}
                className="focus-ring flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-text-muted hover:border-primary/40 hover:text-primary"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                Edit
              </button>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-text">{profile.name}</h2>
            <p className="text-sm text-text-muted">
              {profile.role} · {profile.team}
            </p>
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-3 inline-block truncate text-sm font-medium text-primary hover:text-primary-hover"
              >
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="focus-ring mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-medium text-text-muted hover:text-text"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Sign out
            </button>
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
            <p className="mt-2 font-mono text-xl font-semibold text-text">{savedPromptCount}</p>
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
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface-raised p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-text">{r.quiz_title}</p>
                    <p className="text-xs text-text-muted">
                      {r.correct_count}/{r.total_questions} correct ·{" "}
                      {new Date(r.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge tone={r.score_percent >= 80 ? "secondary" : "neutral"}>{r.score_percent}%</Badge>
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
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-secondary/25 bg-secondary/[0.04] p-3"
                >
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-secondary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-text">{r.quiz_title}</p>
                      <p className="text-xs text-text-muted">
                        {r.certificate_name} · {r.score_percent}%
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
