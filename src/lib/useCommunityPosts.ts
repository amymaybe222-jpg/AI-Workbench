"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CommunityComment, CommunityPost } from "@/types";
import type { CommunityPostsInitialData } from "@/lib/community/loadCommunityPosts";

export function useCommunityPosts(initial?: CommunityPostsInitialData) {
  const [posts, setPosts] = useState<CommunityPost[]>(initial?.posts ?? []);
  const [likedIds, setLikedIds] = useState<string[]>(initial?.likedIds ?? []);
  const [currentUserId, setCurrentUserId] = useState<string | null>(initial?.currentUserId ?? null);
  const [hydrated, setHydrated] = useState(!!initial);

  const load = useCallback(async () => {
    const { data: userRes } = await supabase.auth.getUser();
    const userId = userRes.user?.id ?? null;
    setCurrentUserId(userId);

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

    const mapped: CommunityPost[] = (postsRes.data ?? []).map((p) => ({
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

    setPosts(mapped);
    setLikedIds((likesRes.data ?? []).map((r) => r.post_id));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!initial) load();
    // Only fetch on mount when no server-seeded initial data was provided.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addPost(post: {
    title: string;
    body: string;
    tags: string[];
    tool: string;
    author: string;
    role: string;
    team: string;
  }) {
    if (!currentUserId) return undefined;

    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: currentUserId,
        owner_id: currentUserId,
        title: post.title,
        body: post.body,
        tags: post.tags,
        tool: post.tool,
        author: post.author,
        role: post.role,
        team: post.team,
      })
      .select()
      .single();

    if (error) throw error;

    await load();
    return data?.id as string | undefined;
  }

  async function updatePost(
    postId: string,
    patch: { title: string; body: string; tags: string[]; tool: string }
  ) {
    const { error } = await supabase
      .from("posts")
      .update({ title: patch.title, body: patch.body, tags: patch.tags, tool: patch.tool })
      .eq("id", postId);
    if (error) throw error;
    await load();
  }

  async function deletePost(postId: string) {
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) throw error;
    await load();
  }

  async function addComment(postId: string, comment: { author: string; role: string; body: string }) {
    if (!currentUserId) return;
    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      owner_id: currentUserId,
      author: comment.author,
      role: comment.role,
      body: comment.body,
    });
    if (error) throw error;
    await load();
  }

  async function updateComment(commentId: string, body: string) {
    const { error } = await supabase.from("comments").update({ body }).eq("id", commentId);
    if (error) throw error;
    await load();
  }

  async function deleteComment(commentId: string) {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (error) throw error;
    await load();
  }

  async function toggleLike(postId: string) {
    if (!currentUserId) return;
    const isLiked = likedIds.includes(postId);
    setLikedIds((prev) => (isLiked ? prev.filter((id) => id !== postId) : [...prev, postId]));
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, like_count: p.like_count + (isLiked ? -1 : 1) } : p))
    );
    if (isLiked) {
      await supabase.from("post_likes").delete().eq("user_id", currentUserId).eq("post_id", postId);
    } else {
      await supabase.from("post_likes").insert({ user_id: currentUserId, post_id: postId });
    }
  }

  function getPost(id: string) {
    return posts.find((p) => p.id === id);
  }

  return {
    posts,
    hydrated,
    likedIds,
    currentUserId,
    addPost,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment,
    toggleLike,
    getPost,
  };
}
