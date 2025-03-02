"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EventDetailsSection from "@/app/components/event/eventDetailsSection";

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

  return (
    <div>
      <EventDetailsSection event={event} />
    </div>
  );
}
