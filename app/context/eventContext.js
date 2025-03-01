"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getEvent } from "../actions/eventsActions";

// Create the context
const EventContext = createContext();

// Provider component
export const EventProvider = ({ children, initialEvents }) => {
  const [events, setEvents] = useState(initialEvents || []);

  // Fetch events if not provided initially (e.g., client-side navigation)
  useEffect(() => {
    const populateEvents = async () => {
      const result = await getEvent();
    };
    populateEvents();
  }, [initialEvents]);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the EventContext
export const useEvents = () => useContext(EventContext);
