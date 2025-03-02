"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogDetail from "@/app/components/blog/BlogDetail";
import { useUser } from "@/app/context/userContext";
import Alert from "@/app/components/ui/Alert";

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
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

  return (
    <div>
      <BlogDetail {...blog} />
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
