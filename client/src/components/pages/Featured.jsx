import { format, startOfToday } from "date-fns";
import React, { use, useEffect, useState } from "react";
import { FaCalendar, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CardFooter } from "../ui/card";

const Featured = () => {
  const sampleEventData = useLoaderData();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const sorted = sampleEventData
      .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
      .slice(0, 6)
      .map((event) => ({
        ...event,
        eventDate: format(new Date(event.eventDate), "dd-MMM-yyyy"),
      }));

    setEvents(sorted);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Featured Events</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <Card
            key={event._id}
            className="flex justify-between bg-muted shadow-md hover:shadow-xl transition-shadow"
          >
            <figure className="px-4 pt-4">
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>

            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-primary">
                {event.eventName}
              </h3>
              <p className="text-md text-secondary-foreground mt-1">
                {event.description}
              </p>
              <div className="flex items-center gap-2 text-sm mt-3 text-accent-foreground">
                <FaCalendar className="text-primary" />
                <span>{event.eventDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm ttext-accent-foreground">
                <FaMapMarkerAlt className="text-primary" />
                <span>{event.location}</span>
              </div>             
            </CardContent>
            <CardFooter className="flex justify-end">
                <Link to={`/events/${event._id}`}>
                  <Button variant="default">View Details</Button>
                </Link>
              </CardFooter>
          </Card>
        ))}
      </div>

      {/* See All Button */}
      <div className="text-center mt-10">
        <Link to="/events">
          <Button variant="outline">See All Events</Button>
        </Link>
      </div>
    </div>
  );
};

export default Featured;
