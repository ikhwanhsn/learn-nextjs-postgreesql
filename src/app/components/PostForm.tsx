"use client";

import { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      alert("Post created successfully");
    }
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border border-gray-300 p-2"
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border border-gray-300 p-2"
      />
      <br />
      <button className="bg-blue-500 text-white p-2" type="submit">
        Create Post
      </button>
    </form>
  );
}
