import React from "react";
import { format, parseISO } from "date-fns";
import { Eye, Heart, User } from "lucide-react";

const BlogDetail = ({
  title,
  subTitle,
  content,
  author = "Nora Sadek",
  createdAt,
  views = 101,
  likes = 51,
  image,
}) => {
  return (
    <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Blog Image */}
      {image && (
        <img src={image} alt={title} className="w-full h-64 object-cover" />
      )}

      <div className="p-6">
        {/* Title & Subtitle */}
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subTitle && <p className="text-lg text-gray-600 mt-2">{subTitle}</p>}

        {/* Author, Date, Views & Likes */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>By {author}</span>
          </div>
          <div>
            {createdAt
              ? format(parseISO(createdAt), "MMMM d, yyyy")
              : "Date not available"}
          </div>
        </div>

        {/* Views & Likes */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Eye className="w-5 h-5" />
            <span>{views} views</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Heart className="w-5 h-5 text-red-500" />
            <span>{likes} likes</span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="mt-6 text-gray-800 leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
