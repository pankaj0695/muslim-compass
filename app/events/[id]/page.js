"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EventDetailsSection from "@/app/components/event/eventDetailsSection";
import { format, isValid } from "date-fns";

export default function EventDetails() {
  const [event, setEvent] = useState({});
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/events/${id}`);
      const fetchedEvent = await response.json();
      setEvent(fetchedEvent);
    };
    fetchEvent();
  }, [id]);

  const formattedStartDate = isValid(new Date(event.startDate))
    ? format(new Date(event.startDate), "MMMM d, yyyy")
    : "";
  const formattedEndDate = isValid(new Date(event.endDate))
    ? format(new Date(event.endDate), "MMMM d, yyyy")
    : "";
  const formattedStartTime = isValid(new Date(event.startDate))
    ? format(new Date(event.startDate), "h:mm a")
    : "";
  const formattedEndTime = isValid(new Date(event.endDate))
    ? format(new Date(event.endDate), "h:mm a")
    : "";

  return (
    <div>
      <EventDetailsSection
        event={{
          ...event,
          formattedStartDate,
          formattedEndDate,
          formattedStartTime,
          formattedEndTime,
        }}
      />
    </div>
  );
}
