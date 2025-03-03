import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Utility to connect to MongoDB
import Job from "@/models/Job"; // Mongoose Job model
import mongoose from "mongoose";

// GET /api/Jobs/[id]
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectDB();

    // Extract Job ID from request params
    const id = (await params).id;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Job ID" }, { status: 400 });
    }

    // Find the Job by ID
    const job = await Job.findById(id);

    // If no Job is found, return 404
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Return the found Job
    return NextResponse.json(job, { status: 200 });
  } catch (error) {
    console.error("Error fetching Job: ", error);
    return NextResponse.json(
      { error: "Failed to fetch Job", details: error.message },
      { status: 500 }
    );
  }
}
