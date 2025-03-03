"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { addJob } from "@/app/actions/jobsAction";
import { useUser } from "@/app/context/userContext";
import Alert from "@/app/components/ui/Alert";

export default function PostJobs() {
  const { user } = useUser();
  const [selectedOption, setSelectedOption] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    company: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    image: null,
    imageFile: null,
    expiryDate: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setAlert({
        message: "You must be logged in to post jobs",
        type: "error",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000); // Redirect after 3 seconds
    }
  }, [user, router]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setStep(1);
    setFormData({
      title: "",
      category: "",
      company: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      website: "",
      image: null,
      imageFile: null,
      expiryDate: "",
      name: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (
      selectedOption === "Offering a Job" ||
      selectedOption === "Offering a Training"
    ) {
      if (step === 1) {
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.company) newErrors.company = "Company is required";
        if (!formData.description)
          newErrors.description = "Description is required";
      } else if (step === 2) {
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.website) newErrors.website = "Website is required";
        if (!formData.expiryDate)
          newErrors.expiryDate = "Expiry date is required";
      }
    } else if (selectedOption === "Want a Job") {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.title) newErrors.title = "Title is required";
      if (!formData.description)
        newErrors.description = "Description is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      if (!formData.email) newErrors.email = "Email is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
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
    if (validateStep()) {
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
          tag: selectedOption,
          image: imageUrl.split("?")[0], // Add the image URL to formData
        };
        delete updatedFormData.imageFile;
        // Step 3: Call the addJob function with the updated formData
        const newJob = await addJob({ formData: updatedFormData });

        // Log the created event (for debugging)
        console.log("Job created successfully:", newJob);

        // Step 4: Reset the form fields after successful submission
        setFormData({
          title: "",
          category: "",
          company: "",
          description: "",
          phone: "",
          email: "",
          address: "",
          website: "",
          image: null,
          imageFile: null,
          expiryDate: "",
          name: "",
        });

        // Show a success message to the user
        alert("Job created successfully!");
        router.push("/jobs");
      } catch (error) {
        // Log the error (for debugging)
        console.error("Error creating job:", error);

        // Show an error message to the user
        alert("Failed to create job: " + error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fefefe] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-[#2d1810]">Post Jobs</h1>
          <p className="mt-2 text-[#8b5e34]">Select an option to proceed</p>
        </motion.div>

        <div className="mb-8">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
          >
            <option value="">Select an option</option>
            <option value="Offering a Job">Offering a Job</option>
            <option value="Want a Job">Want a Job</option>
            <option value="Offering a Training">Offering a Training</option>
          </select>
        </div>

        {alert.message && <Alert type={alert.type} message={alert.message} />}

        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {(selectedOption === "Offering a Job" ||
              selectedOption === "Offering a Training") && (
              <>
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="block text-[#2d1810] text-sm font-medium">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        placeholder="Enter title"
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
                        <option value="Accounting / Finance">
                          Accounting / Finance
                        </option>
                        <option value="Admin / Office">Admin / Office</option>
                        <option value="Arch / Engineering">
                          Arch / Engineering
                        </option>
                        <option value="Art / Media / Design">
                          Art / Media / Design
                        </option>
                        <option value="Biotech / Science">
                          Biotech / Science
                        </option>
                        <option value="Business / Mgmt">Business / Mgmt</option>
                        <option value="Customer service">
                          Customer service
                        </option>
                        <option value="Education / Teaching">
                          Education / Teaching
                        </option>
                        <option value="Government">Government</option>
                        <option value="Human resources">Human resources</option>
                        <option value="Internet engineering">
                          Internet engineering
                        </option>
                        <option value="Legal / Paralegal">
                          Legal / Paralegal
                        </option>
                        <option value="Marketing / PR / Ad">
                          Marketing / PR / Ad
                        </option>
                        <option value="Medical / Health">
                          Medical / Health
                        </option>
                        <option value="Nonprofit sector">
                          Nonprofit sector
                        </option>
                        <option value="Other / Misc">Other / Misc</option>
                        <option value="Retail / Food / Hosp">
                          Retail / Food / Hosp
                        </option>
                        <option value="Sales / Biz dev">Sales / Biz dev</option>
                        <option value="Software / QA / DBA">
                          Software / QA / DBA
                        </option>
                        <option value="Systems / Networking">
                          Systems / Networking
                        </option>
                        <option value="Technical support">
                          Technical support
                        </option>
                        <option value="TV / Film / Video">
                          TV / Film / Video
                        </option>
                        <option value="Web / Info design">
                          Web / Info design
                        </option>
                        <option value="Writing / Editing">
                          Writing / Editing
                        </option>
                      </select>
                      {errors.category && (
                        <p className="text-sm text-red-500">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[#2d1810] text-sm font-medium">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        placeholder="Enter company name"
                        required
                      />
                      {errors.company && (
                        <p className="text-sm text-red-500">{errors.company}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[#2d1810] text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        rows={4}
                        placeholder="Enter description"
                        required
                      />
                      {errors.description && (
                        <p className="text-sm text-red-500">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="block text-[#2d1810] text-sm font-medium">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        placeholder="Enter phone number"
                        required
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[#2d1810] text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        placeholder="Enter email"
                        required
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[#2d1810] text-sm font-medium">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        placeholder="Enter address"
                        required
                      />
                      {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[#2d1810] text-sm font-medium">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        placeholder="Enter website URL"
                        required
                      />
                      {errors.website && (
                        <p className="text-sm text-red-500">{errors.website}</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label
                        htmlFor="image"
                        className="block text-[#2d1810] text-sm font-medium"
                      >
                        Image
                      </Label>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                      />
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="mt-4 w-full h-64 object-cover rounded-lg"
                        />
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-[#2d1810] text-sm font-medium">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                        required
                      />
                      {errors.expiryDate && (
                        <p className="text-sm text-red-500">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
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
                    onClick={() => (step < 2 ? handleNext() : handleSubmit())}
                    className="px-6 py-2 rounded-lg bg-[#8b5e34] text-white hover:bg-[#2d1810] transition-colors"
                  >
                    {isLoading
                      ? "Submitting..."
                      : step === 2
                      ? "Submit"
                      : "Next"}
                  </button>
                </div>
              </>
            )}

            {selectedOption === "Want a Job" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                    placeholder="Enter title"
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
                    <option value="Accounting / Finance">
                      Accounting / Finance
                    </option>
                    <option value="Admin / Office">Admin / Office</option>
                    <option value="Arch / Engineering">
                      Arch / Engineering
                    </option>
                    <option value="Art / Media / Design">
                      Art / Media / Design
                    </option>
                    <option value="Biotech / Science">Biotech / Science</option>
                    <option value="Business / Mgmt">Business / Mgmt</option>
                    <option value="Customer service">Customer service</option>
                    <option value="Education / Teaching">
                      Education / Teaching
                    </option>
                    <option value="Government">Government</option>
                    <option value="Human resources">Human resources</option>
                    <option value="Internet engineering">
                      Internet engineering
                    </option>
                    <option value="Legal / Paralegal">Legal / Paralegal</option>
                    <option value="Marketing / PR / Ad">
                      Marketing / PR / Ad
                    </option>
                    <option value="Medical / Health">Medical / Health</option>
                    <option value="Nonprofit sector">Nonprofit sector</option>
                    <option value="Other / Misc">Other / Misc</option>
                    <option value="Retail / Food / Hosp">
                      Retail / Food / Hosp
                    </option>
                    <option value="Sales / Biz dev">Sales / Biz dev</option>
                    <option value="Software / QA / DBA">
                      Software / QA / DBA
                    </option>
                    <option value="Systems / Networking">
                      Systems / Networking
                    </option>
                    <option value="Technical support">Technical support</option>
                    <option value="TV / Film / Video">TV / Film / Video</option>
                    <option value="Web / Info design">Web / Info design</option>
                    <option value="Writing / Editing">Writing / Editing</option>
                  </select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                    rows={4}
                    placeholder="Enter description"
                    required
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label
                    htmlFor="image"
                    className="block text-[#2d1810] text-sm font-medium"
                  >
                    Image
                  </Label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-4 w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                    placeholder="Enter phone number"
                    required
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-[#2d1810] text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-[#e9d5c3] focus:border-[#8b5e34] focus:ring-[#8b5e34] transition-colors"
                    placeholder="Enter email"
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    disabled={isLoading}
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-[#8b5e34] text-white hover:bg-[#2d1810] transition-colors"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
