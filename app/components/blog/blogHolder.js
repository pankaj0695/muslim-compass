import React from "react";
import { format, parseISO } from "date-fns";

const BlogHolder = ({
  title,
  author = "Nora Sadek",
  createdAt,
  views = 101,
  likes = 51,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 flex flex-col md:flex-row h-full">
      {/* Blog Image on Left */}
      {image && (
        <div className="w-full md:w-1/3 h-40 md:h-auto overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Blog Content on Right */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Author Info */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-gray-600">By {author}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h2>

        {/* Meta Info */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-auto">
          {createdAt && (
            <span>{format(parseISO(createdAt), "MMMM d, yyyy")}</span>
          )}
          <span>{views} views</span>
          <span>{likes} likes</span>
        </div>
      </div>
    </div>
  );
};

export default BlogHolder;
