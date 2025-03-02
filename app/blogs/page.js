"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BlogPage from "../components/blogListSection";
import { useUser } from "../context/userContext";
import Alert from "../components/ui/Alert";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useUser();
  const [alert, setAlert] = useState({ message: "", type: "" });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setAlert({
        message: "You must be logged in to view this page",
        type: "error",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000); // Redirect after 3 seconds
    }
  }, [user, router]);

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
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
    </div>
  );
}
