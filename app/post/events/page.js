"use client";

import { useState, useEffect } from "react";
import AddEventForm from "@/app/components/forms/addEventForm";
import { useUser } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/ui/Alert";

export default function AddEvent() {
  const { user } = useUser();
  const [alert, setAlert] = useState({ message: "", type: "" });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setAlert({
        message: "You must be logged in to post events",
        type: "error",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000); // Redirect after 3 seconds
    }
  }, [user, router]);

  return (
    <div>
      <AddEventForm />
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
