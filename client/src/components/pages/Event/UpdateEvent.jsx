import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import useUpdateEventApi from "../../../api/useUpdateEventApi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const { myUpdateEventPromise } = useUpdateEventApi();
  const [date, setDate] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_NODE_SERVER_URL}/events/${id}`)
      .then((res) => {
       setEvent(res.data)
       // Initialize date state with the event's date
       if (res.data?.eventDate) 
        setDate(new Date(res.data.eventDate));
      }
      )
      .catch((err) => console.error("Failed to load event:", err));
  }, [id]);

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedEvent = Object.fromEntries(formData.entries());

    myUpdateEventPromise(id, updatedEvent)
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Event updated successfully!");
          navigate("/manageEvents");
        }
      })
      .catch((err) => console.error("Update failed:", err));
  };

  if (!event) {
    return <p className="text-center mt-10">Loading event details...</p>;
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Update Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateEvent} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              name="eventName"
              defaultValue={event.eventName}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Select name="eventType" defaultValue={event.eventType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Swimming">Swimming</SelectItem>
                <SelectItem value="Sprinting">Sprinting</SelectItem>
                <SelectItem value="Long Jump">Long Jump</SelectItem>
                <SelectItem value="High Jump">High Jump</SelectItem>
                <SelectItem value="Hurdle Race">Hurdle Race</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Event Date */}
          <div className="grid gap-2">
            <Label>Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : 'Select a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <Input
              type="hidden"
              name="eventDate"
              defaultValue={date ? format(date, 'dd MMM yyyy') : event.eventDate}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={event.description}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="eventImage">Event Image URL</Label>
            <Input
              id="eventImage"
              type="url"
              name="eventImage"
              defaultValue={event.eventImage}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={event.location}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="creatorName">Creator Name</Label>
            <Input
              id="creatorName"
              name="creatorName"
              defaultValue={event.creatorName}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="creatorEmail">Creator Email</Label>
            <Input
              id="creatorEmail"
              name="creatorEmail"
              defaultValue={event.creatorEmail}
              readOnly
              className="bg-muted" // Visual indication for readonly field
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Update Event</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateEvent;
