"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin,
  Users,
  Mail,
  Phone,
  ImagePlus,
  Instagram,
  FacebookIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format, isAfter, parseISO } from "date-fns";
import { addEvent } from "@/app/actions/eventsActions";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { set } from "mongoose";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading editor...</p>, // Optional: Show a loading placeholder
});

export default function Home() {
  const [step, setStep] = useState(1);
  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    details: "",
    imageFile: {},
    startDate: "",
    endDate: "",
    location: "",
    capacity: "",
    price: "Free",
    ageRestriction: "all",
    registrationLink: "",
    contactInfo: { email: "", phone: "" },
    socialMediaLinks: { facebook: "", instagram: "" },
    notes: "",
    faq: [{ question: "", answer: "" }],
  });
  const totalSteps = 4;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const progressWidth = `${(step / totalSteps) * 100}%`;

  const handleQuillChange = (content) => {
    setFormData((prev) => ({ ...prev, details: content }));
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    return format(parseISO(dateString), "MMMM d, yyyy 'at' h:mm a");
  };

  const validateDateRange = (start, end) => {
    if (!start || !end) return true;
    return isAfter(parseISO(end), parseISO(start));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value },
    }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.title) newErrors.title = "Event title is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.details) newErrors.details = "Event details are required";
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.endDate) newErrors.endDate = "End date is required";
      if (!validateDateRange(formData.startDate, formData.endDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    } else if (step === 2) {
      if (!formData.location) newErrors.location = "Location is required";
      if (!formData.price) newErrors.price = "Price is required";
    } else if (step === 3) {
      if (!formData.contactInfo.email) newErrors.email = "Email is required";
      if (!formData.contactInfo.phone)
        newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function getS3UploadUrl(imgExtension) {
    const res = await fetch("/api/s3url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imgExtension }),
    });

    if (!res.ok) {
      throw new Error("Failed to get upload URL");
    }

    return await res.json();
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let imageUrl = "";
      // Step 1: Upload the image if it exists
      const file = formData.imageFile;
      if (file) {
        const imgExtension = file.name.split(".").pop();
        const { url, key } = await getS3UploadUrl(imgExtension);
        imageUrl = url;

        const uploadRes = await fetch(imageUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type }, // Correct MIME type
        });

        if (uploadRes.ok) {
          console.log("File uploaded successfully:", key);
        } else {
          console.error("Upload failed");
        }
      }

      // Step 2: Add the image URL to the formData object
      const updatedFormData = {
        ...formData,
        image: imageUrl.split("?")[0], // Add the image URL to formData
      };
      delete updatedFormData.imageFile; // Remove the imageFile field
      // Step 3: Call the addEvent function with the updated formData
      const newEvent = await addEvent({ formData: updatedFormData });

      // Log the created event (for debugging)
      console.log("Event created successfully:", newEvent);

      // Step 4: Reset the form fields after successful submission
      setFormData({
        title: "",
        category: "",
        details: "",
        imageFile: {},
        startDate: "",
        endDate: "",
        location: "",
        capacity: "",
        price: "Free",
        ageRestriction: "all",
        registrationLink: "",
        contactInfo: { email: "", phone: "" },
        socialMediaLinks: { facebook: "", instagram: "" },
        notes: "",
        faq: [{ question: "", answer: "" }],
      });

      // Reset the coverImage state
      setCoverImage(null);

      // Show a success message to the user
      alert("Event created successfully!");
      router.push("/events");
    } catch (error) {
      // Log the error (for debugging)
      console.error("Error creating event:", error);

      // Show an error message to the user
      alert("Failed to create event: " + error.message);
    }
    setIsLoading(false);
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-[#2d1810]">Create An Event</h1>
          <p className="mt-2 text-[#8b5e34]">
            A step towards a more lively community
          </p>
        </motion.div>

        <div className="relative h-2 bg-[#e9d5c3] rounded-full mb-12">
          <motion.div
            className="absolute h-full bg-[#8b5e34] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: progressWidth }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {step === 1 && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-[#2d1810] text-sm font-medium">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                  placeholder="Enter event title"
                  required
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-[#2d1810] text-sm font-medium">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Socialization">Socialization</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Breakfast">Breakfast</option>
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="cover-image"
                  className="block text-[#2d1810] text-sm font-medium"
                >
                  Cover Image
                </Label>
                <div className="mt-2">
                  {coverImage ? (
                    <div className="relative">
                      <img
                        src={coverImage}
                        alt="Cover preview"
                        className="w-full h-[400px] object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        className="absolute top-4 right-4"
                        onClick={() => setCoverImage("")}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="cover-image"
                      className="flex justify-center items-center w-full h-[400px] border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <div className="text-center space-y-2">
                        <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          Click to upload cover image
                        </div>
                      </div>
                      <input
                        id="cover-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[#2d1810] text-sm font-medium">
                  Event Details
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.details}
                  onChange={handleQuillChange}
                  className="w-full min-h-40 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                  placeholder="Describe your event"
                  style={{ minHeight: "200px" }} // Adjust height directly with inline style
                />
                {errors.details && (
                  <p className="text-sm text-red-500">{errors.details}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                    required
                  />
                  {formData.startDate && (
                    <p className="text-sm text-[#8b5e34]">
                      {formatDisplayDate(formData.startDate)}
                    </p>
                  )}
                  {errors.startDate && (
                    <p className="text-sm text-red-500">{errors.startDate}</p>
                  )}
                </div>
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                    min={formData.startDate}
                    required
                  />
                  {formData.endDate && (
                    <p className="text-sm text-[#8b5e34]">
                      {formatDisplayDate(formData.endDate)}
                    </p>
                  )}
                  {!validateDateRange(formData.startDate, formData.endDate) && (
                    <p className="text-sm text-red-500">
                      End date must be after start date
                    </p>
                  )}
                  {errors.endDate && (
                    <p className="text-sm text-red-500">{errors.endDate}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-[#2d1810] text-sm font-medium">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-[#8b5e34]" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                    placeholder="Event location"
                    required
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Capacity
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-3.5 text-[#8b5e34]" />
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                      placeholder="Maximum attendees"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Age Restriction
                  </label>
                  <select
                    name="ageRestriction"
                    value={formData.ageRestriction}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                  >
                    <option value="all">All ages</option>
                    <option value="adults">Adults only (18+)</option>
                    <option value="children">Children friendly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[#2d1810] text-sm font-medium">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                  placeholder="Enter price or 'Free'"
                  required
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-[#2d1810] text-sm font-medium">
                  Registration Link
                </label>
                <input
                  type="url"
                  name="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                  placeholder="Registration URL"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-[#8b5e34]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.contactInfo.email}
                      onChange={(e) =>
                        handleNestedChange(
                          "contactInfo",
                          "email",
                          e.target.value
                        )
                      }
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                      placeholder="Contact email"
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-[#8b5e34]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.contactInfo.phone}
                      onChange={(e) =>
                        handleNestedChange(
                          "contactInfo",
                          "phone",
                          e.target.value
                        )
                      }
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                      placeholder="Contact phone"
                      required
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Facebook Link
                  </label>
                  <div className="relative">
                    <FacebookIcon className="absolute left-4 top-3.5 text-[#8b5e34]" />
                    <input
                      type="url"
                      name="facebook"
                      value={formData.socialMediaLinks.facebook}
                      onChange={(e) =>
                        handleNestedChange(
                          "socialMediaLinks",
                          "facebook",
                          e.target.value
                        )
                      }
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                      placeholder="Facebook event URL"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Instagram Link
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-4 top-3.5 text-[#8b5e34]" />
                    <input
                      type="url"
                      name="instagram"
                      value={formData.socialMediaLinks.instagram}
                      onChange={(e) =>
                        handleNestedChange(
                          "socialMediaLinks",
                          "instagram",
                          e.target.value
                        )
                      }
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                      placeholder="Instagram profile URL"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-[#2d1810] text-sm font-medium">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                  rows={4}
                  placeholder="Any additional information or special instructions"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[#2d1810] text-sm font-medium">
                  FAQ
                </label>
                <div className="space-y-4">
                  {formData.faq.map((faq, index) => (
                    <div key={index} className="flex gap-4">
                      <input
                        type="text"
                        name="question"
                        value={faq.question}
                        onChange={(e) => {
                          const newFaq = [...formData.faq];
                          newFaq[index].question = e.target.value;
                          setFormData((prev) => ({ ...prev, faq: newFaq }));
                        }}
                        className="flex-1 px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        placeholder="Question"
                      />
                      <input
                        type="text"
                        name="answer"
                        value={faq.answer}
                        onChange={(e) => {
                          const newFaq = [...formData.faq];
                          newFaq[index].answer = e.target.value;
                          setFormData((prev) => ({ ...prev, faq: newFaq }));
                        }}
                        className="flex-1 px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        placeholder="Answer"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        faq: [...prev.faq, { question: "", answer: "" }],
                      }));
                    }}
                    className="text-[#8b5e34] hover:text-[#2d1810] transition-colors"
                  >
                    + Add another FAQ
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="mt-8 flex justify-between"
            variants={itemVariants}
          >
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-2 rounded-lg text-[#8b5e34] border-2 border-[#8b5e34] hover:bg-[#8b5e34] hover:text-white transition-colors ${
                step === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              disabled={isLoading}
              onClick={() =>
                step < totalSteps ? handleNext() : handleSubmit()
              }
              className="px-6 py-2 rounded-lg bg-[#8b5e34] text-white hover:bg-[#2d1810] transition-colors"
            >
              {isLoading
                ? "Submitting..."
                : step === totalSteps
                ? "Submit"
                : "Next"}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
