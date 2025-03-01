import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Utility to connect to MongoDB
import Event from "@/models/Event"; // Mongoose Event model

// POST /api/events
export async function POST(request) {
    try {
        // Connect to the database
        await connectDB();

        // Parse the request body
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.details || !body.startDate || !body.endDate || !body.location || !body.contactInfo) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create a new event using the Mongoose model
        const newEvent = new Event(body);

        // Save the event to the database
        await newEvent.save();

        // Return the created event
        return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event", details: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const events = await Event.find({});

        return NextResponse.json({ events }, { status: 200 });
    } catch (error) {
        console.error("Error getting events: ", error);
        return NextResponse.json(
            { error: "Failed to create event", details: error.message },
            { status: 500 }
        )
    }
}