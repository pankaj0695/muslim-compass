import React from "react";
import { format, parseISO } from "date-fns";

const BlogHolder = ({
  title,
  author = "Nora Sadek",
  createdAt,
  views = 101,
  likes = 51,
  image, // New prop for image
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Blog Image */}
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}

      {/* Blog Content */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-gray-600">By {author}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h2>

        {/* Meta Info */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
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
