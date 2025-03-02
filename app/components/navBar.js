"use client";
import {
  User2Icon,
  MenuIcon,
  MapPinIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link"; // Assuming you're using Next.js for routing
import { useState } from "react";

export default function NavBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItemsLeft = [
    {
      title: "Events",
      location: "/events",
    },
    {
      title: "Blogs",
      location: "/blogs",
    },
    {
      title: "Jobs",
      location: "/jobs",
    },
    {
      title: "Yellow Pages",
      location: "/yellow-pages",
    },
  ];

  const navItemsRight = [
    {
      title: "Add Event",
      location: "/post/add-event",
    },
    {
      title: "Post Jobs",
      location: "/post-jobs",
    },
    {
      title: "Post Blogs",
      location: "/post/post-blog",
    },
    {
      title: "Contact",
      location: "/contact",
    },
  ];

  const ItemHolder = ({ title, location }) => {
    return (
      <Link
        href={location}
        className="hover:text-gray-600 transition-colors"
        onClick={() => setIsSidebarOpen(false)}
      >
        {title}
      </Link>
    );
  };

  return (
    <div className="flex flex-col">
      {/* Top Section */}
      <div className="flex justify-between px-[5%] w-full pt-4 md:py-6 items-center">
        {/* Logo Section */}
        <section className="flex-grow">
          <Link href="/" className="flex flex-row gap-2 items-center">
            <img
              src="/muslim-compass-logo.png"
              width="50px"
              alt="Muslim Compass Logo"
            />
            <h2 className="text-xl md:text-2xl font-bold">Muslim Compass</h2>
          </Link>
        </section>

        {/* Search Bar Section */}
        <section className="hidden md:flex flex-grow justify-center">
          <div className="flex px-1 border rounded-full border-black/90 w-full max-w-2xl gap-2">
            <div className="border-r border-black/90 text-sm flex gap-1 items-center py-2 min-w-fit px-3">
              <MapPinIcon className="w-5 h-5 min-w-fit" /> Minneapolis
            </div>
            <div className="flex gap-2 items-center flex-grow">
              <SearchIcon className="w-5 h-5 min-w-fit" />
              <input
                placeholder="Search events / jobs / blogs / announcements"
                className="py-2 flex-grow rounded-full focus:outline-none bg-background"
              />
            </div>
          </div>
        </section>

        {/* User and Menu Section */}
        <section className="flex-grow flex justify-end gap-2 items-center">
          <button className="hover:bg-gray-300 p-2 rounded-full transition-colors">
            <User2Icon />
          </button>
          <button
            className="hover:bg-gray-300 p-2 rounded-full transition-colors md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </button>
        </section>
      </div>

      {/* Mobile Search Bar */}
      <div className="flex md:hidden px-[5%] w-full py-2">
        <div className="flex px-1 border rounded-full border-black/90 w-full gap-2">
          <div className="flex gap-2 items-center flex-grow">
            <SearchIcon className="w-5 h-5 min-w-fit" />
            <input
              placeholder="Search events / jobs / blogs / announcements"
              className="py-2 flex-grow rounded-full focus:outline-none bg-background"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Section */}
      <div className="bg-primary py-2 px-[5%] w-full flex justify-between shadow-sm">
        {/* Left Navigation Items */}
        <ul className="flex gap-4">
          {navItemsLeft.map((item, index) => (
            <li key={index}>
              <ItemHolder title={item.title} location={item.location} />
            </li>
          ))}
        </ul>

        {/* Right Navigation Items */}
        <ul className="hidden md:flex gap-4">
          <li
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onClick={() => setIsDropdownOpen(false)}
          >
            <button className="hover:text-gray-600 transition-colors">
              Posts <span className="ml-1">▼</span>
            </button>
            {isDropdownOpen && (
              <ul className="absolute bg-white shadow-md rounded-md mt-2 w-24">
                {navItemsRight.slice(0, 3).map((item, index) => (
                  <li key={index} className="p-2 hover:bg-gray-100">
                    <ItemHolder title={item.title} location={item.location} />
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <ItemHolder title="Contact" location="/contact" />
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 p-4 h-full">
            <button
              className="hover:bg-gray-300 p-2 rounded-full transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <XIcon />
            </button>
            <ul className="mt-4">
              {navItemsRight.map((item, index) => (
                <li key={index} className="p-2 hover:bg-gray-100">
                  <ItemHolder title={item.title} location={item.location} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
