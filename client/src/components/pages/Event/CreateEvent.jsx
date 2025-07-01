import React, { use, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useCreateEventApi from "../../../api/useCreateEventApi";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"; // Add this import at the top

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { myCreateEventPromise } = useCreateEventApi();
  const [date, setDate] = useState(null);
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newEvent = Object.fromEntries(formData.entries());

    myCreateEventPromise(newEvent)
      .then((data) => {
        if (data.insertedId) {
          toast.success("Event created successfully!");
          form.reset(); // reset the form after successful submission
          navigate("/events"); // redirect to events page
        }
      })
      .catch((err) => toast.error("Error adding event:", err));
  };

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">
          Create New Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateEvent} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="eventName">Event Name</Label>
            <Input id="eventName" name="eventName" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Select name="eventType" required>
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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            type="hidden"
            name="eventDate"
            value={date ? format(date, "yyyy-MM-dd") : ""}
            required
          />

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="eventImage">Event Image URL</Label>
            <Input id="eventImage" type="url" name="eventImage" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="creatorName">Creator Name</Label>
            <Input
              id="creatorName"
              name="creatorName"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="creatorEmail">Creator Email</Label>
            <Input
              id="creatorEmail"
              name="creatorEmail"
              defaultValue={user?.email}
              readOnly
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEvent;
