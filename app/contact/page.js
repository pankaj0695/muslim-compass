"use client";

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission logic here
      console.log("Form submitted:", formData);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-foreground">
            Contact Us
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-2 text-left text-muted-foreground"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-left">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 text-left text-muted-foreground"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-left">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="subject"
                className="mb-2 text-left text-muted-foreground"
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="p-2 border border-gray-300 rounded"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              {errors.subject && (
                <p className="text-red-500 text-left">{errors.subject}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="mb-2 text-left text-muted-foreground"
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="p-2 border border-gray-300 rounded h-32"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-left">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#8b5e34] text-white hover:bg-[#2d1810] transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
