import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Utility to connect to MongoDB
import Blog from "@/models/Blog"; // Mongoose blog model
import mongoose from "mongoose";

// GET /api/blogs/[id]
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectDB();

    // Extract blog ID from request params
    const id = (await params).id;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    // Find the blog by ID
    const blog = await Blog.findById(id);

    // If no blog is found, return 404
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Return the found blog
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog: ", error);
    return NextResponse.json(
      { error: "Failed to fetch blog", details: error.message },
      { status: 500 }
    );
  }
}
