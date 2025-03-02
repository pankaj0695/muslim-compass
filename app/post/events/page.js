"use client";

import AddEventForm from "@/app/components/forms/addEventForm";
import { useUser } from "@/app/context/userContext";
import { redirect } from "next/navigation";

export default function AddEvent() {
  const { user } = useUser();

  if (!user) {
    alert("You must be logged in to view this page");
    redirect("/");
  }
  return (
    <div>
      <AddEventForm />
    </div>
  );
}
