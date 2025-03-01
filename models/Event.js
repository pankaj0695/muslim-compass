import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: { type: String },
    answer: { type: String },
});

const contactInfoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
});

const socialMediaLinksSchema = new mongoose.Schema({
    facebook: { type: String },
    instagram: { type: String },
});

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        details: { type: String, required: true },
        tags: { type: [String], default: [] },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        timings: { type: String },
        location: { type: String, required: true },
        pricing: { type: String },
        ageRestriction: { type: String },
        owner: { type: String },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "cancelled"],
            default: "upcoming",
        },
        faq: { type: [faqSchema], default: [] },
        notes: { type: String },
        image: { type: String },
        registrationLink: { type: String },
        capacity: { type: Number },
        contactInfo: { type: contactInfoSchema, required: true },
        socialMediaLinks: { type: socialMediaLinksSchema },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Event model
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;