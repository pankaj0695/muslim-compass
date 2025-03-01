"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import { CalendarDays, MapPin } from "lucide-react";

const EventCard = ({ title, location, image, startDate }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
      {/* Event Image */}
      {image && (
        <div className="min-h-[180px] max-h-[250px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Event Details */}
      <div className="p-4">
        {/* Event Name */}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{location}</span>
        </div>

        {/* Event Date */}
        {startDate && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span>{format(parseISO(startDate), "MMMM d, yyyy")}</span>
          </div>
        )}

        {/* Free Tag */}
        <div className="mt-3 text-xs font-semibold text-green-600 bg-green-100 py-1 px-3 rounded-full w-fit">
          Free
        </div>
      </div>
    </div>
  );
};

export default EventCard;
