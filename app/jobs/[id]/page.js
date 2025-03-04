"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    }

    fetchJob();
  }, [id]);

  if (!job) return <p className="text-center text-gray-500">Loading job...</p>;

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto my-4 p-4 sm:p-8 bg-white shadow-md rounded-lg">
      {job.image && (
        <img
          src={job.image}
          alt={job.title}
          className="h-20 md:h-32 object-cover rounded-full mx-auto mb-4 "
        />
      )}
      {job.tag === "Offering a Job" || job.tag === "Offering a Training" ? (
        <div className="text-left space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
            {job.title}
          </h1>
          <p className="text-gray-700 mb-2">
            <strong>Category:</strong> {job.category}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Company:</strong> {job.company}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Description:</strong> {job.description}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Address:</strong> {job.address}
          </p>
          {job.website && (
            <p className="text-blue-500 mb-2">
              <strong>Website:</strong>{" "}
              <a href={job.website} target="_blank" rel="noopener noreferrer">
                {job.website}
              </a>
            </p>
          )}
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {job.email}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> {job.phone}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Posted on:</strong> {formatDate(job.createdAt)}
          </p>
        </div>
      ) : (
        <div className="text-left space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
            {job.name}
          </h1>
          <p className="text-gray-700 mb-2">
            <strong>Title:</strong> {job.title}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Category:</strong> {job.category}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Description:</strong> {job.description}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> {job.phone}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {job.email}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Posted on:</strong> {formatDate(job.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
}
