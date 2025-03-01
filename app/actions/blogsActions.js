export async function addBlog({ formData }) {
  try {
    const response = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Convert form data to JSON
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add blog");
    }

    // Parse the response data
    const data = await response.json();

    // Return the created blog data
    return data;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error; // Re-throw the error for handling in the calling component
  }
}

export async function getBlog() {
  try {
    const response = await fetch("/api/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get blogs data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the blog: ", error);
    throw error;
  }
}
