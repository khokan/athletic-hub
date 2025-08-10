import { format } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const eventsData = useLoaderData();
  const [text, setText] = useState("");
  useEffect(() => {
    // Format date on load
    const formattedEvents = eventsData
      .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
      .map((e) => ({
        ...e,
        formattedDate: format(new Date(e.eventDate), "dd MMM yyyy"),
      }));

    setEvents(formattedEvents);
  }, []);
  const handleSearch = (text) => {
    if (text === "") {
      setEvents(eventsData);
      return;
    }
    const newEvents = eventsData.filter(
      (event) =>
        event?.eventName?.toLowerCase().includes(text.toLowerCase()) ||
        event.location.toLowerCase().includes(text.toLowerCase())
    );
    if (newEvents.length > 0) setEvents(newEvents);
  };
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary text-center mb-10">
        All Upcoming Athletic Events
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <Input
          value={text}
          onChange={(e) => {
            const value = e.target.value;
            setText(value);
            handleSearch(value);
          }}
          className="w-full md:w-2/3 h-12"
          type="text"
          placeholder="Search by name or location"
        />
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <Card key={event._id} className="hover:shadow-xl transition-shadow justify-between">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="w-full h-full object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-xl text-primary">
                {event.eventName}
              </CardTitle>
              <Badge variant="secondary" className="w-fit">
                {event.eventType}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm font-medium">{event.description}</p>

              <div className="flex items-center gap-2 text-sm">
                <FaCalendarAlt className="text-primary h-4 w-4" />
                <span>{event.formattedDate}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <FaMapMarkerAlt className="text-primary h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </CardContent>

            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/events/${event._id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllEventsPage;
