"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import EventSection from "./components/eventSection";
import BlogsSection from "./components/blogsSection";
import JobsSection from "./components/jobsSection";

export default function Home() {
  // Animation variants
  const bannerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full px-[5%] mb-[10%]">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Ensures the animation only happens once
        variants={bannerVariants}
        className="w-screen overflow-hidden py-5 md:py-10"
      >
        <Image
          src="/banner.png"
          alt="Hero image"
          width={900}
          height={400}
          className="max-w-[90vw] md:min-w-[90vw]"
          priority={true}
          loading="eager"
        />
      </motion.div>

      {/* Event and Blogs Section */}
      <div className="flex flex-col md:flex-row w-full pt-5 md:pt-10 border-b mb-20 border-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is in view
          variants={sectionVariants}
          className="md:pr-10 flex-[2] pb-10"
        >
          <EventSection />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="md:border-l border-black md:pl-10 flex-[1]"
        >
          <BlogsSection />
        </motion.div>
      </div>

      {/* Jobs Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="border-b pb-20 border-black"
      >
        <JobsSection />
      </motion.div>

      {/* Spacer */}
      <div className="h-[50vh]"></div>
    </div>
  );
}
