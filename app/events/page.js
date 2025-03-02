"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventCard from "../components/ui/eventCard";
import Link from "next/link";
import FilterToast from "../components/ui/filterToast";
import { useUser } from "../context/userContext";
import Alert from "../components/ui/Alert";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const eventsPerPage = 12;
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setAlert({
        message: "You must be logged in to view this page",
        type: "error",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000); // Redirect after 3 seconds
    }
  }, [user, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const fetchedEvents = await response.json();
      setEvents(fetchedEvents.events);
      setFilteredEvents(fetchedEvents.events);
    };
    fetchEvents();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.category === category));
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  return (
    <div className="mx-[5%] my-[5%]">
      <h1 className="text-3xl font-semibold mb-8">All Events</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-scroll">
        <FilterToast
          text="All"
          onClick={() => handleFilter("")}
          className={selectedCategory === "" ? "bg-primary text-black" : ""}
        />
        <FilterToast
          text="Dinner"
          onClick={() => handleFilter("Dinner")}
          className={
            selectedCategory === "Dinner" ? "bg-primary text-black" : ""
          }
        />
        <FilterToast
          text="Socialization"
          onClick={() => handleFilter("Socialization")}
          className={
            selectedCategory === "Socialization" ? "bg-primary text-black" : ""
          }
        />
        <FilterToast
          text="Prayer"
          onClick={() => handleFilter("Prayer")}
          className={
            selectedCategory === "Prayer" ? "bg-primary text-black" : ""
          }
        />
        <FilterToast
          text="Breakfast"
          onClick={() => handleFilter("Breakfast")}
          className={
            selectedCategory === "Breakfast" ? "bg-primary text-black" : ""
          }
        />
      </div>

      {/* Event Grid with Equal Heights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12">
        {currentEvents.length > 0 ? (
          currentEvents.map((event, index) => (
            <Link key={index} href={`/events/${event._id}`} className="flex">
              <EventCard {...event} />
            </Link>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from(
          { length: Math.ceil(filteredEvents.length / eventsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-orange-200 text-black"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default Events;
