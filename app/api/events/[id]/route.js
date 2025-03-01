import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Utility to connect to MongoDB
import Event from "@/models/Event"; // Mongoose Event model
import mongoose from "mongoose";

// GET /api/events/[id]
export async function GET(request, { params }) {
  try {
    // Connect to the database
    await connectDB();

    // Extract event ID from request params
    const id = (await params).id;

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    // Find the event by ID
    const event = await Event.findById(id);

    // If no event is found, return 404
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Return the found event
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event: ", error);
    return NextResponse.json(
      { error: "Failed to fetch event", details: error.message },
      { status: 500 }
    );
  }
}
