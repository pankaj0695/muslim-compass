"use client";
import { JobCard } from "./ui/jobsCard";
import { useRef } from "react";
import Link from "next/link";

export default function JobsSection() {
  const containerRef = useRef(null);

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
        <JobCard className="w-full sm:w-auto" />
        <JobCard className="w-full sm:w-auto" />
        <JobCard className="w-full sm:w-auto" />
        <JobCard className="w-full sm:w-auto" />
        <JobCard className="w-full sm:w-auto" />
        <JobCard className="w-full sm:w-auto" />
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-opacity"
      >
        &larr;
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-opacity"
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
