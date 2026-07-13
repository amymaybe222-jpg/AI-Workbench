import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://ai-workbench.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: learnTopics }, { data: posts }, { data: quizzes }] = await Promise.all([
    supabase.from("learn_topics").select("slug"),
    supabase.from("posts").select("id").not("author", "is", null),
    supabase.from("quizzes").select("id"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/learn`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/tools`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/prompts`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/assessments`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/community`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/team`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const learnRoutes: MetadataRoute.Sitemap = (learnTopics ?? []).map((topic) => ({
    url: `${BASE_URL}/learn/${topic.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const communityRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/community/${post.id}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const assessmentRoutes: MetadataRoute.Sitemap = (quizzes ?? []).map((quiz) => ({
    url: `${BASE_URL}/assessments/${quiz.id}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...learnRoutes, ...communityRoutes, ...assessmentRoutes];
}
