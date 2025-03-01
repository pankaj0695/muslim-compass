"use client";

import { motion } from "framer-motion";
import {
  Parentheses as Crescent,
  MapPin,
  Calendar,
  Users,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Clock,
  AlertCircle,
} from "lucide-react";
import { format, parseISO } from "date-fns";

const dummy_event = {
  title: "Community Iftar Dinner",
  details: "Join us for a community iftar dinner during Ramadan.",
  tags: ["Ramadan", "Community", "Dinner"],
  startDate: "2023-04-15T18:00:00Z",
  endDate: "2023-04-15T21:00:00Z",
  location: "123 Mosque Road, City",
  pricing: "Free",
  ageRestriction: "All ages",
  owner: "Local Mosque",
  notes: "Please bring your own prayer mats.",
  image:
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1920&auto=format&fit=crop",
  registrationLink: "https://example.com/register",
  capacity: 100,
  contactInfo: {
    email: "events@localmuslim.com",
    phone: "+1234567890",
  },
  socialMediaLinks: {
    facebook: "https://facebook.com/event",
    instagram: "https://instagram.com/event",
  },
  faq: [
    {
      question: "Is parking available?",
      answer: "Yes, free parking is available.",
    },
  ],
};

export default function EventDetailsSection({ event }) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-[#2d1810]">
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1810] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto text-white"
          >
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 items-center text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {event?.startDate &&
                  format(parseISO(event.startDate), "MMMM d, yyyy")}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {event?.startDate &&
                  format(parseISO(event.startDate), "h:mm a")}{" "}
                - {event?.endDate && format(parseISO(event.endDate), "h:mm a")}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {event.location}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Left Column - Event Details */}
        <div className="md:col-span-2 space-y-8">
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#2d1810] mb-4">
              About the Event
            </h2>
            <p
              className="text-[#8b5e34]"
              dangerouslySetInnerHTML={{ __html: event.details }}
            ></p>
            <div className="mt-4 flex flex-wrap gap-2">
              {event?.tags &&
                event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#e9d5c3] text-[#2d1810] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#2d1810] mb-4">
              Important Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Users className="w-5 h-5 text-[#8b5e34] mt-1" />
                <div>
                  <h3 className="font-medium text-[#2d1810]">Capacity</h3>
                  <p className="text-[#8b5e34]">{event.capacity} attendees</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-[#8b5e34] mt-1" />
                <div>
                  <h3 className="font-medium text-[#2d1810]">
                    Age Restriction
                  </h3>
                  <p className="text-[#8b5e34]">{event.ageRestriction}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {event.notes && (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-[#2d1810] mb-4">
                Additional Notes
              </h2>
              <p className="text-[#8b5e34]">{event.notes}</p>
            </motion.div>
          )}

          {event?.faq && event.faq[0].question && (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-[#2d1810] mb-4">
                FAQ
              </h2>
              <div className="space-y-4">
                {event.faq.map((item, index) => (
                  <div key={index} className="border-b border-[#e9d5c3] pb-4">
                    <h3 className="font-medium text-[#2d1810] mb-2">
                      {item.question}
                    </h3>
                    <p className="text-[#8b5e34]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Registration and Contact */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
            <h2 className="text-2xl font-semibold text-[#2d1810] mb-4">
              Register Now
            </h2>
            <p className="text-[#8b5e34] mb-6">
              Secure your spot for this blessed gathering
            </p>
            <button
              onClick={() => window.open(event.registrationLink, "_blank")}
              className="w-full bg-[#8b5e34] text-white py-3 px-6 rounded-lg hover:bg-[#2d1810] transition-colors duration-300"
            >
              Register for Event
            </button>

            {event.contactInfo && (
              <div className="mt-8 space-y-4">
                <h3 className="font-medium text-[#2d1810]">
                  Contact Information
                </h3>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#8b5e34]" />
                  <a
                    href={`mailto:${event.contactInfo.email}`}
                    className="text-[#8b5e34] hover:text-[#2d1810]"
                  >
                    {event.contactInfo.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#8b5e34]" />
                  <a
                    href={`tel:${event.contactInfo.phone}`}
                    className="text-[#8b5e34] hover:text-[#2d1810]"
                  >
                    {event.contactInfo.phone}
                  </a>
                </div>
              </div>
            )}

            {event.socialMediaLinks && (
              <div className="mt-8 space-y-4">
                <h3 className="font-medium text-[#2d1810]">Social Media</h3>
                <div className="flex gap-4">
                  <a
                    href={event.socialMediaLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b5e34] hover:text-[#2d1810]"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href={event.socialMediaLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b5e34] hover:text-[#2d1810]"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
