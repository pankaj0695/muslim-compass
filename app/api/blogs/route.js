import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Utility to connect to MongoDB
import Blog from "@/models/Blog"; // Mongoose Blog model

// POST /api/blogs
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.title || !body.subTitle || !body.content || !body.image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBlog = new Blog(body);

    await newBlog.save();

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({});

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error getting blogs: ", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error.message },
      { status: 500 }
    );
  }
}
