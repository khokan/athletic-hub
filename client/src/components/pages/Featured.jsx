import { format, startOfToday } from "date-fns";
import React, { use, useEffect, useState } from "react";
import {
  FaCalendar,
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CardFooter } from "../ui/card";

const Featured = () => {
  const sampleEventData = useLoaderData();
  console.log("Sample Event Data:", sampleEventData);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event._id}
            className="flex flex-col bg-muted shadow-md hover:shadow-xl transition-shadow"
          >
            <figure className="px-4 pt-4">
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>

            <CardContent className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {event.eventName}
                </h3>
                <p className="text-md text-secondary-foreground mt-1">
                  {event.description}
                </p>
              </div>

              {/* Responsive Row for Date, Location & Prizes */}
              <div className="flex flex-col sm:flex-row sm:justify-between mt-3 gap-4">
                {/* Date, Location & Fee (Left on desktop, top on mobile) */}
                <div className="flex flex-col gap-1 text-sm text-accent-foreground whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-primary" />
                    <span>{event.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDollarSign className="text-primary" />
                    <span>Registration Fee: ${event.registrationFee}</span>
                  </div>
                </div>

                {/* Prizes (Right on desktop, below on mobile) */}
                <div className="flex flex-wrap sm:justify-end justify-start gap-2 mt-2 sm:mt-0">
                  {event.prizes.map((prize, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                    >
                      {prize}
                    </span>
                  ))}
                </div>
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
