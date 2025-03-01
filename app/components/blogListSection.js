import React from "react";
import BlogHolder from "./blog/blogHolder";
import Link from "next/link";

const BlogPage = ({ blogs }) => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-8 text-center">
        Latest Blog Posts
      </h1>

      {/* Blog Grid with Equal Height */}
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog, index) => (
          <Link key={index} href={`/blogs/${blog._id}`} className="flex">
            <BlogHolder key={index} {...blog} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
