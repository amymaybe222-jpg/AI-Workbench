import { createClient } from "@/lib/supabase/server";
import { CommunityComment, CommunityPost } from "@/types";

export interface CommunityPostsInitialData {
  posts: CommunityPost[];
  likedIds: string[];
  currentUserId: string | null;
}

// Server-side equivalent of useCommunityPosts' load(), used to seed the
// initial render so the client hook doesn't have to fetch-after-mount.
export async function loadCommunityPostsInitialData(): Promise<CommunityPostsInitialData> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id ?? null;

  const [postsRes, commentsRes, likesRes] = await Promise.all([
    supabase
      .from("posts_with_like_counts")
      .select("*")
      .not("author", "is", null)
      .order("created_at", { ascending: false }),
    supabase.from("comments").select("*").order("created_at", { ascending: true }),
    userId
      ? supabase.from("post_likes").select("post_id").eq("user_id", userId)
      : Promise.resolve({ data: [] as { post_id: string }[] }),
  ]);

  const commentsByPost = new Map<string, CommunityComment[]>();
  for (const c of commentsRes.data ?? []) {
    const list = commentsByPost.get(c.post_id) ?? [];
    list.push(c as CommunityComment);
    commentsByPost.set(c.post_id, list);
  }

  const posts: CommunityPost[] = (postsRes.data ?? []).map((p) => ({
    id: p.id,
    user_id: p.user_id,
    owner_id: p.owner_id,
    title: p.title,
    author: p.author,
    role: p.role,
    team: p.team,
    tool: p.tool,
    body: p.body,
    tags: p.tags ?? [],
    created_at: p.created_at,
    like_count: p.like_count,
    comments: commentsByPost.get(p.id) ?? [],
    seo_title: p.seo_title,
    seo_description: p.seo_description,
  }));

  return {
    posts,
    likedIds: (likesRes.data ?? []).map((r: { post_id: string }) => r.post_id),
    currentUserId: userId,
  };
}
