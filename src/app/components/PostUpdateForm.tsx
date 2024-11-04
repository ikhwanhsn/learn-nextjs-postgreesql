"use client";

import { useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostUpdateFormProps {
  post: Post;
  onPostUpdated: (post: Post) => void;
}

export default function PostUpdateForm({
  post,
  onPostUpdated,
}: PostUpdateFormProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const updatedPost = await res.json();
    onPostUpdated(updatedPost);
    if (res.ok) {
      alert("Post updated successfully");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h3>Update Post</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button type="submit">Update</button>
    </form>
  );
}
