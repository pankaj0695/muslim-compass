"use client";

import Image from "next/image";
import { format } from "date-fns";
import { CalendarDays, MapPin, Clock } from "lucide-react";

const EventCard = ({ title, location, image, startDate, endDate, price }) => {
  const formattedStartDate = format(new Date(startDate), "MMMM d, yyyy");
  const formattedEndDate = format(new Date(endDate), "MMMM d, yyyy");
  const formattedStartTime = format(new Date(startDate), "h:mm a");
  const formattedEndTime = format(new Date(endDate), "h:mm a");

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-white w-[90vw] max-w-lg">
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
        {startDate && endDate && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            {startDate === endDate ? (
              <span>{formattedStartDate}</span>
            ) : (
              <span>
                {formattedStartDate} - {formattedEndDate}
              </span>
            )}
          </div>
        )}

        {/* Event Time */}
        {startDate && endDate && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
            <Clock className="w-4 h-4 text-gray-500" />
            {startDate === endDate ? (
              <span>
                {formattedStartTime} - {formattedEndTime}
              </span>
            ) : (
              <span>
                {formattedStartTime} - {formattedEndTime}
              </span>
            )}
          </div>
        )}

        {/* Free Tag */}
        <div className="mt-3 text-xs font-semibold text-green-600 bg-green-100 py-1 px-3 rounded-full w-fit">
          {price == "Free" ? price : "$" + price}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
