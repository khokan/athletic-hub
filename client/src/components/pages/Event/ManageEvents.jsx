import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useManageEventsApi from "../../../api/useManageEventsApi";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ManageEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const { myManageEventsPromise } = useManageEventsApi();

  useEffect(() => {
    if (user?.email) {
      myManageEventsPromise(user.email)
        .then((data) => setEvents(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_NODE_SERVER_URL}/events/${id}`
        );
        if (res.data.deletedCount > 0) {
          setEvents(events.filter((event) => event._id !== id));
        }
      } catch (err) {
        console.error("Failed to delete:", err);
      }
      Swal.fire("Deleted!", "Your event has been deleted.", "success");
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell className="font-medium">
                    {event.eventName}
                  </TableCell>
                  <TableCell>{event.eventType}</TableCell>
                  <TableCell>{event.eventDate}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button asChild variant="default" size="sm">
                      <Link to={`/updateEvent/${event._id}`}>Update</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageEvents;
