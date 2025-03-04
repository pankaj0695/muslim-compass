"use client";

import { motion } from "framer-motion";
import { Calendar, Mail } from "lucide-react";

export function JobCard({
  image,
  company,
  title,
  description,
  email,
  createdAt,
}) {
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg rounded-xl border border-gray-300 p-6 shadow-sm min-w-[85vw] md:min-w-[360px] bg-white h-80"
    >
      <div className="flex items-center gap-3 mb-4">
        {image && (
          <img
            src={image}
            alt={`${company} logo`}
            className="md:block h-8 md:h-12 rounded-full object-cover"
          />
        )}
        <h2 className="text-base md:text-[24px] font-medium text-black/80">
          {company}
        </h2>
      </div>

      <div className="space-y-5">
        <h3 className="text-base md:text-[24px] font-medium text-gray-900">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600">
          {description.length > 150
            ? `${description.substring(0, 150)}...`
            : description}
        </p>
      </div>

      <div className="mt-6 text-gray-600 flex flex-col md:flex-row gap-2 md:gap-6">
        <p className="text-xs md:text-md flex items-center gap-2">
          <Mail className="h-5 w-5" /> {email}
        </p>
        <p className="text-xs md:text-md flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {formatDate(createdAt)}
        </p>
      </div>
    </motion.div>
  );
}
