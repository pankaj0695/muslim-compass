export async function addEvent({ formData }) {
    try {
        // Send a POST request to the /api/events route
        const response = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Convert form data to JSON
        });

        // Check if the request was successful
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to add event");
        }

        // Parse the response data
        const data = await response.json();

        // Return the created event data
        return data;
    } catch (error) {
        console.error("Error adding event:", error);
        throw error; // Re-throw the error for handling in the calling component
    }
}

export async function getEvent() {
    try {
        const response = await fetch("/api/events", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to get events data")
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the event: ", error);
        throw error;
    }
}