"use client";

import { useState, useEffect } from "react";
import { getJobs } from "../actions/jobsAction";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    category: "",
    keyword: "",
    city: "",
    type: "",
  });

  useEffect(() => {
    async function loadJobs() {
      const allJobs = await getJobs();
      setJobs(allJobs.jobs);
      setFilteredJobs(allJobs.jobs);
    }
    loadJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const applyFilters = () => {
    let filtered = jobs.filter((job) => {
      if (job.expiryDate) {
        return new Date(job.expiryDate) > new Date();
      }
      return true;
    });

    if (filters.category) {
      filtered = filtered.filter((job) =>
        job.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    if (filters.keyword) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }
    if (filters.city) {
      filtered = filtered.filter((job) =>
        job.address.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.type) {
      filtered = filtered.filter((job) =>
        job.tag.toLowerCase().includes(filters.type.toLowerCase())
      );
    }
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const truncateDescription = (description) => {
    const maxLength = 250; // Adjust the max length as needed
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="min-h-screen bg-[#fefefe] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-[#2d1810]">Available Jobs</h1>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
            placeholder="Keyword"
          />
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
          >
            <option value="">Select a category</option>
            <option value="Accounting / Finance">Accounting / Finance</option>
            <option value="Admin / Office">Admin / Office</option>
            <option value="Arch / Engineering">Arch / Engineering</option>
            <option value="Art / Media / Design">Art / Media / Design</option>
            <option value="Biotech / Science">Biotech / Science</option>
            <option value="Business / Mgmt">Business / Mgmt</option>
            <option value="Customer service">Customer service</option>
            <option value="Education / Teaching">Education / Teaching</option>
            <option value="Government">Government</option>
            <option value="Human resources">Human resources</option>
            <option value="Internet engineering">Internet engineering</option>
            <option value="Legal / Paralegal">Legal / Paralegal</option>
            <option value="Marketing / PR / Ad">Marketing / PR / Ad</option>
            <option value="Medical / Health">Medical / Health</option>
            <option value="Nonprofit sector">Nonprofit sector</option>
            <option value="Other / Misc">Other / Misc</option>
            <option value="Retail / Food / Hosp">Retail / Food / Hosp</option>
            <option value="Sales / Biz dev">Sales / Biz dev</option>
            <option value="Software / QA / DBA">Software / QA / DBA</option>
            <option value="Systems / Networking">Systems / Networking</option>
            <option value="Technical support">Technical support</option>
            <option value="TV / Film / Video">TV / Film / Video</option>
            <option value="Web / Info design">Web / Info design</option>
            <option value="Writing / Editing">Writing / Editing</option>
          </select>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
            placeholder="City"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
          >
            <option value="">Type</option>
            <option value="Offering a Job">Available Job</option>
            <option value="Offering a Training">Available Training</option>
            <option value="Want a Job">Want Job</option>
          </select>
        </div>

        <div className="space-y-10">
          {currentJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg p-6 flex flex-col space-y-4 border border-gray-200 shadow-md"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#2d1810]">
                  {job.title}
                </h2>
                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    job.tag === "Offering a Job"
                      ? "bg-green-500"
                      : job.tag === "Want a Job"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {job.tag}
                </span>
              </div>
              <p className="text-[#8b5e34]">
                {truncateDescription(job.description)}
              </p>
              {job.address && (
                <p className="text-[#2d1810] flex items-center">
                  <MapPin className="mr-2" />
                  {job.address}
                </p>
              )}
              <p className="text-[#2d1810] flex items-center">
                <Calendar className="mr-2" />
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {Array.from(
            { length: Math.ceil(filteredJobs.length / jobsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-[#8b5e34] text-white"
                    : "bg-white text-[#8b5e34] border-2 border-[#8b5e34]"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
