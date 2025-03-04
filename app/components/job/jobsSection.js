"use client";
import { JobCard } from "../ui/jobsCard";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function JobsSection() {
  const [jobs, setJobs] = useState(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("/api/jobs");
      const fetchedJobs = await response.json();
      const validJobs = fetchedJobs.jobs.filter(
        (job) => job.tag !== "Want a Job"
      );
      validJobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setJobs(validJobs.slice(0, 6));
    };
    fetchJobs();
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold mb-8">Upcoming Jobs</h1>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 p-4"
      >
        {jobs &&
          jobs.map((job) => (
            <Link key={job._id} href={`/jobs/${job._id}`}>
              <JobCard {...job}></JobCard>
            </Link>
          ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-opacity hidden md:block"
      >
        &larr;
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-opacity hidden md:block"
      >
        &rarr;
      </button>

      <div className="text-xl pl-10 mt-10">
        <Link href="/jobs" className="underline underline-offset-4">
          Explore All
        </Link>
      </div>
    </div>
  );
}
