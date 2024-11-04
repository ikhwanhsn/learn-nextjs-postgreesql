"use client";

import useSWR from "swr";
import { useState } from "react";
import PostUpdateForm from "./PostUpdateForm";

interface Post {
  id: number;
  title: string;
  content: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PostList() {
  const { data: posts, mutate } = useSWR<Post[]>("/api/posts", fetcher);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Post deleted successfully");
    }
    mutate();
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts?.map((post) => (
          <li key={post.id} className="flex gap-2 items-center">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button
              className="bg-orange-400 text-white p-2"
              onClick={() => handleEdit(post)}
            >
              Edit
            </button>
            <button
              className="bg-red-400 text-white p-2"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {selectedPost && (
        <PostUpdateForm
          post={selectedPost}
          onPostUpdated={(updatedPost) => {
            mutate();
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
}
