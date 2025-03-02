import React, { useState } from "react";
import BlogHolder from "./blog/blogHolder";
import Link from "next/link";

const BlogPage = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 15;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-8 text-center">
        Latest Blog Posts
      </h1>

      {/* Blog Grid with Equal Height */}
      <div className="grid md:grid-cols-2 gap-6">
        {currentBlogs.map((blog, index) => (
          <Link key={index} href={`/blogs/${blog._id}`} className="flex">
            <BlogHolder key={index} {...blog} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from(
          { length: Math.ceil(blogs.length / blogsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-orange-200 text-black"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BlogPage;
