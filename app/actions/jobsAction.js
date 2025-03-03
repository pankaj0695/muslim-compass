export async function addJob({ formData }) {
  try {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Convert form data to JSON
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add job");
    }

    // Parse the response data
    const data = await response.json();

    // Return the created job data
    return data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error; // Re-throw the error for handling in the calling component
  }
}

export async function getJobs() {
  try {
    const response = await fetch("/api/jobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get jobs data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the job: ", error);
    throw error;
  }
}
