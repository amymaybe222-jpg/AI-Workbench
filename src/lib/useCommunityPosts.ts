"use client";

import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "./storageKeys";
import { communityPosts as seedPosts } from "@/data/community";
import { CommunityComment, CommunityPost } from "@/types";

export function useCommunityPosts() {
  const [posts, setPosts, hydrated] = useLocalStorage<CommunityPost[]>(STORAGE_KEYS.communityPosts, seedPosts);
  const [likedIds, setLikedIds] = useLocalStorage<string[]>(STORAGE_KEYS.likedPosts, []);

  function addPost(post: Omit<CommunityPost, "id" | "createdAt" | "likes" | "comments">) {
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost.id;
  }

  function addComment(postId: string, comment: Omit<CommunityComment, "id" | "createdAt">) {
    const newComment: CommunityComment = {
      ...comment,
      id: `c-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );
  }

  function toggleLike(postId: string) {
    const isLiked = likedIds.includes(postId);
    setLikedIds((prev) => (isLiked ? prev.filter((id) => id !== postId) : [...prev, postId]));
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + (isLiked ? -1 : 1) } : p))
    );
  }

  function getPost(id: string) {
    return posts.find((p) => p.id === id);
  }

  return { posts, hydrated, likedIds, addPost, addComment, toggleLike, getPost };
}
