import { useState, useEffect } from "react";
import Link from "next/link";
import BlogHolder from "./blogHolder";

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/api/blogs");
      const fetchedblogs = await response.json();
      setBlogs(fetchedblogs.blogs.slice(0, 6));
    };
    fetchBlogs();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Blogs</h1>
      <ul className="flex flex-col gap-6">
        {blogs.map((blog, index) => (
          <Link key={index} href={`/blogs/${blog._id}`} className="flex">
            <BlogHolder key={index} {...blog} />
          </Link>
        ))}
      </ul>

      <div className="w-full text-center py-10">
        <Link href={"/blogs"} className="underline underline-offset-4 px-1">
          View All
        </Link>
      </div>
    </div>
  );
}
