// components/EventSection.js
import React from 'react';
import EventCard from './ui/eventCard';
import Link from 'next/link';

const EventSection = () => {
    const events = [
        {
            eventName: "Tech Innovators Conference 2023",
            location: "St. Paul, Twin Cities",
            imageUrl: "https://images.unsplash.com/photo-1606788075765-cd65e46937e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            date: "Feb 17",
            description: "A gathering of industry leaders and tech enthusiasts to explore the latest innovations in technology."
        },
        {
            eventName: "Business Leadership Summit",
            location: "St. Paul, Twin Cities",
            imageUrl: "https://images.unsplash.com/photo-1501556424164-6d0cfb8e86f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            date: "Feb 18",
            description: "A premier event to network and learn from top business leaders and entrepreneurs."
        },
        {
            eventName: "Music & Arts Festival",
            location: "St. Paul, Twin Cities",
            imageUrl: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            date: "Feb 19",
            description: "An electrifying celebration of music, art, and culture featuring talented performers and artists."
        },
        {
            eventName: "Modern Art Exhibition",
            location: "St. Paul, Twin Cities",
            imageUrl: "https://images.unsplash.com/photo-1573164574392-3fdf08b19f62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            date: "Feb 20",
            description: "An inspiring showcase of contemporary art by established and emerging artists."
        },
        {
            eventName: "Sports Meet 2023",
            location: "St. Paul, Twin Cities",
            imageUrl: "https://images.unsplash.com/photo-1571019613914-85f342c3d34e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            date: "Feb 21",
            description: "A thrilling competition bringing together athletes from across the region."
        },
        {
            eventName: "Startup Pitch Day",
            location: "St. Paul, Twin Cities",
            imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            date: "Feb 22",
            description: "An exciting event for entrepreneurs to pitch their ideas to investors and industry leaders."
        },
    ];
    return (
        <div className="">
            <h1 className="text-3xl font-semibold mb-8">Upcoming Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6">
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        eventName={event.eventName}
                        location={event.location}
                        imageUrl={event.imageUrl}
                        date={event.date}
                        description={event.description}
                    />
                ))}
            </div>

            <div className='pt-10 text-center'>
                <Link href="/events" className='underline underline-offset-4'>
                    View All
                </Link>
            </div>
        </div>
    );
};

export default EventSection;