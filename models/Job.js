import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    tag: { type: String },
    name: { type: String },
    title: { type: String },
    category: { type: String },
    company: { type: String },
    description: { type: String },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
    website: { type: String },
    address: { type: String },
    expiryDate: { type: Date },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Job model
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
