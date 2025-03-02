"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import EventDetailsSection from "@/app/components/event/eventDetailsSection";
import { useUser } from "@/app/context/userContext";
import Alert from "@/app/components/ui/Alert";

export default function EventDetails() {
  const [event, setEvent] = useState({});
  const params = useParams();
  const id = params?.id;
  const { user } = useUser();
  const [alert, setAlert] = useState({ message: "", type: "" });
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
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
    </div>
  );
}
