import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Blog model
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
