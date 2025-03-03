import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Utility to connect to MongoDB
import Job from "@/models/Job"; // Mongoose Job model

// POST /api/jobs
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const newJob = new Job(body);

    await newJob.save();

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating Job:", error);
    return NextResponse.json(
      { error: "Failed to create Job", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find({});

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Error getting Jobs: ", error);
    return NextResponse.json(
      { error: "Failed to fetch Jobs", details: error.message },
      { status: 500 }
    );
  }
}
