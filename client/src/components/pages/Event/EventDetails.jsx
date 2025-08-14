import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaFlagCheckered,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaDollarSign,
} from "react-icons/fa";
import { format } from "date-fns";
import { Link, useLoaderData, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const EventDetails = () => {
  const event = useLoaderData();
  const { user } = useAuth();

  if (!event || event.error) {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-error">
        Event not found.
      </div>
    );
  }

  const eventDateFormatted = format(new Date(event.eventDate), "dd MMM yyyy");

  const handleBookNow = async () => {
    if (!event || !user) return;

    const bookingData = {
      event_id: event._id,
      event_name: event.eventName,
      user_email: user.email,
      bookedAt: format(new Date(), "dd-MMM-yyyy"),
    };

    try {
      const res = await axios
        .post(`${import.meta.env.VITE_NODE_SERVER_URL}/bookings`, bookingData)
        .then((res) => {
          if (res.data.insertedId) toast.success("Successfully booked!");
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status outside 2xx
          // toast.error("Error status: " + error.response.status);
          toast.error(error.response.data.message);
        } else if (error.request) {
          // Request was made, but no response received
          toast.error("No response received:", error.request);
        } else {
          // Something else happened in setting up the request
          toast.error("Error message:", error.message);
        }
      } else {
        // Non-Axios error
        toast.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
  <Card className="overflow-hidden">
    {/* Event Image */}
    <div className="relative h-64 w-full overflow-hidden">
      <img
        src={event.eventImage}
        alt={event.eventName}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Header */}
    <CardHeader>
      <CardTitle className="text-3xl text-primary">
        {event.eventName}
      </CardTitle>
      <Badge variant="secondary" className="w-fit">
        {event.eventType}
      </Badge>
    </CardHeader>

    {/* Content */}
    <CardContent className="space-y-4">
      <p className="text-muted-foreground leading-relaxed">
        {event.description}
      </p>

      <div className="space-y-3 text-sm">
        {/* Location */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary h-4 w-4" />
          <span className="font-medium">Location:</span> {event.location}
        </div>

        {/* Event Date */}
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-primary h-4 w-4" />
          <span className="font-medium">Event Date:</span> {eventDateFormatted}
        </div>

        <Separator className="my-2" />

        {/* Creator Info */}
        <div className="flex items-center gap-2">
          <FaUser className="text-primary h-4 w-4" />
          <span className="font-medium">Created By:</span> {event.creatorName}
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-primary h-4 w-4" />
          <span className="font-medium">Email:</span> {event.creatorEmail}
        </div>

        <Separator className="my-2" />

        {/* Registration Fee */}
        <div className="flex items-center gap-2">
          <FaDollarSign className="text-primary h-4 w-4" />
          <span className="font-medium">Registration Fee:</span> ${event.registrationFee}
        </div>

        {/* Prizes */}
        <div className="flex flex-wrap gap-2 mt-1">
          {event.prizes.map((prize, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-sm px-2 py-1"
            >
              {prize}
            </Badge>
          ))}
        </div>
      </div>
    </CardContent>

    {/* Footer */}
    <CardFooter>
      <Button onClick={handleBookNow} className="w-full" size="lg">
        Book Event
      </Button>
    </CardFooter>
  </Card>
</div>

  );
};

export default EventDetails;
