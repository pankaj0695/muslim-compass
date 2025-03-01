"use client";

import Image from "next/image";

const EventCard = ({ eventName, location, imageUrl, date, description }) => {
  return (
    <div className="rounded overflow-hidden]">
      {imageUrl && (
        <div className="bg-black/10 min-h-[160px] max-h-[160px] overflow-hidden">
          <Image
            src={imageUrl}
            alt="image"
            width={300}
            height={300}
            className="object-cover w-full h-full self-center"
          />
        </div>
      )}
      <div className="">
        <div className="text-lg font-medium tracking-wide pt-2">
          {eventName}
        </div>
      </div>
      <div className="flex flex-col text-sm">
        <span className="">{location}</span>
        <div className="flex justify-between">
          <span>Free</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
