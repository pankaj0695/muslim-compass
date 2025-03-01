"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogDetail from "@/app/components/blog/BlogDetail";

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    }

    fetchBlog();
  }, [id]);

  if (!blog)
    return <p className="text-center text-gray-500">Loading blog...</p>;

  return <BlogDetail {...blog} />;
}
