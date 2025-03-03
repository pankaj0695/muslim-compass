"use client";

import { useState, useEffect } from "react";
import EventCard from "./ui/eventCard";
import Link from "next/link";

const EventSection = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const fetchedEvents = await response.json();
      const validEvents = fetchedEvents.events.filter(
        (event) => new Date(event.endDate) > new Date()
      );
      validEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      setEvents(validEvents.slice(0, 6));
    };
    fetchEvents();
  }, []);
  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6">
        {events.map((event, index) => (
          <Link key={index} href={`/events/${event._id}`} className="flex">
            <EventCard {...event} key={index} />
          </Link>
        ))}
      </div>

      <div className="pt-10 text-center">
        <Link href="/events" className="underline underline-offset-4">
          View All
        </Link>
      </div>
    </div>
  );
};

export default EventSection;
