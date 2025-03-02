"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textArea";
import { ImagePlus, Loader2 } from "lucide-react";
import { addBlog } from "@/app/actions/blogsActions";

export default function NewBlogPost() {
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    content: "",
    imageFile: {},
  });
  const router = useRouter();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setFormData((prev) => ({ ...prev, imageFile: file }));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.subTitle) newErrors.subTitle = "Subtitle is required";
    if (!formData.content) newErrors.content = "Content is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
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
      // Step 3: Call the addBlog function with the updated formData
      const newEvent = await addBlog({ formData: updatedFormData });

      // Log the created blog (for debugging)
      console.log("Blog created successfully:", newEvent);

      // Step 4: Reset the form fields after successful submission
      setFormData({
        title: "",
        subTitle: "",
        content: "",
        imageFile: {},
      });

      // Reset the coverImage state
      setCoverImage(null);

      // Show a success message to the user
      alert("Blog created successfully!");
      router.push("/blogs");
    } catch (error) {
      // Log the error (for debugging)
      console.error("Error creating blog:", error);

      // Show an error message to the user
      alert("Failed to create blog: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Create a New Story
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Share your thoughts with the world
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Cover Image Upload */}
              <div>
                <Label htmlFor="cover-image">Cover Image</Label>
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

              {/* Title */}
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your story title"
                  className="mt-2 text-xl font-bold"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Subtitle */}
              <div>
                <Label htmlFor="subTitle">Subtitle</Label>
                <Input
                  id="subTitle"
                  name="subTitle"
                  type="text"
                  value={formData.subTitle}
                  onChange={handleChange}
                  placeholder="Add a subtitle to your story"
                  className="mt-2 text-lg"
                />
                {errors.subTitle && (
                  <p className="text-sm text-red-500">{errors.subTitle}</p>
                )}
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Tell your story..."
                  className="mt-2 min-h-[400px] text-lg leading-relaxed"
                />
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="min-w-[150px] bg-amber-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing
                  </>
                ) : (
                  "Publish Story"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
