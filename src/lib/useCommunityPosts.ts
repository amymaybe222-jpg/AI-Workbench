"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase, DEMO_USER_ID } from "@/lib/supabase";
import { CommunityComment, CommunityPost } from "@/types";

export function useCommunityPosts() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const load = useCallback(async () => {
    const [postsRes, commentsRes, likesRes] = await Promise.all([
      supabase
        .from("posts_with_like_counts")
        .select("*")
        .not("author", "is", null)
        .order("created_at", { ascending: false }),
      supabase.from("comments").select("*").order("created_at", { ascending: true }),
      supabase.from("post_likes").select("post_id").eq("user_id", DEMO_USER_ID),
    ]);

    const commentsByPost = new Map<string, CommunityComment[]>();
    for (const c of commentsRes.data ?? []) {
      const list = commentsByPost.get(c.post_id) ?? [];
      list.push(c as CommunityComment);
      commentsByPost.set(c.post_id, list);
    }

    const mapped: CommunityPost[] = (postsRes.data ?? []).map((p) => ({
      id: p.id,
      user_id: p.user_id,
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

    setPosts(mapped);
    setLikedIds((likesRes.data ?? []).map((r) => r.post_id));
    setHydrated(true);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addPost(post: {
    title: string;
    body: string;
    tags: string[];
    tool: string;
    author: string;
    role: string;
    team: string;
  }) {
    const { data } = await supabase
      .from("posts")
      .insert({
        user_id: DEMO_USER_ID,
        title: post.title,
        body: post.body,
        tags: post.tags,
        tool: post.tool,
        author: post.author,
        role: post.role,
        team: post.team,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    await load();
    return data?.id as string | undefined;
  }

  async function addComment(postId: string, comment: { author: string; role: string; body: string }) {
    await supabase.from("comments").insert({
      post_id: postId,
      author: comment.author,
      role: comment.role,
      body: comment.body,
    });
    await load();
  }

  async function toggleLike(postId: string) {
    const isLiked = likedIds.includes(postId);
    setLikedIds((prev) => (isLiked ? prev.filter((id) => id !== postId) : [...prev, postId]));
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, like_count: p.like_count + (isLiked ? -1 : 1) } : p))
    );
    if (isLiked) {
      await supabase.from("post_likes").delete().eq("user_id", DEMO_USER_ID).eq("post_id", postId);
    } else {
      await supabase.from("post_likes").insert({ user_id: DEMO_USER_ID, post_id: postId });
    }
  }

  function getPost(id: string) {
    return posts.find((p) => p.id === id);
  }

  return { posts, hydrated, likedIds, addPost, addComment, toggleLike, getPost };
}
