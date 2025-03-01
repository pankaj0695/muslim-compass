"use client";

import { useState, useEffect } from "react";
import EventCard from "../components/ui/eventCard";
import Link from "next/link";
import FilterToast from "../components/ui/filterToast";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const fetchedEvents = await response.json();
      setEvents(fetchedEvents.events);
    };
    fetchEvents();
  }, []);

  return (
    <div className="mx-[5%] my-[5%]">
      <h1 className="text-3xl font-semibold mb-8">All Events</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-8">
        <FilterToast text="Dinner" />
        <FilterToast text="Socialization" />
        <FilterToast text="Prayer" />
        <FilterToast text="Breakfast" />
      </div>

      {/* Event Grid with Equal Heights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12">
        {events.length > 0 ? (
          events.map((event, index) => (
            <Link key={index} href={`/events/${event._id}`} className="flex">
              <EventCard {...event} />
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Load More Button */}
      {/* <div className="pt-10 text-center">
        <Link href="/events" className="underline underline-offset-4">
          Load More
        </Link>
      </div> */}
    </div>
  );
};

export default Events;
