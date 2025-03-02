"use client";

import { useState, useEffect } from "react";
import BlogPage from "../components/blogListSection";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs");
      const fetchedblogs = await response.json();
      setBlogs(fetchedblogs.blogs);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <BlogPage blogs={blogs} />
    </div>
  );
}
