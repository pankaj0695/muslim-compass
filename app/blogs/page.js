"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import BlogPage from "../components/blogListSection";
import { useUser } from "../context/userContext";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useUser();

  if (!user) {
    alert("You must be logged in to view this page");
    redirect("/");
  }
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
