import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useBookingApi from "../../../api/useBookingApi";
import Swal from "sweetalert2";
// import { myBookingPromise } from "../../../api/apiBookings";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { myBookingPromise } = useBookingApi();
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"

  useEffect(() => {
    if (!user?.email) return;

    myBookingPromise(user.email)
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [user?.email]);

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
      await axios
        .delete(`${import.meta.env.VITE_NODE_SERVER_URL}/bookings/${id}`)
        .then(() => {
          setBookings(bookings.filter((b) => b._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting booking:", err);
        });
      Swal.fire("Deleted!", "Your booked event has been deleted.", "success");
    }
  };

  if (loading)
    return <p className="text-center mt-8">Loading your bookings...</p>;

  return (
    <>
      <section className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-primary">
            📋 My Booked Events
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          >
            Switch to {viewMode === "table" ? "Card" : "Table"} View
          </Button>
        </div>

        {bookings.length === 0 ? (
          <p className="text-muted-foreground">
            You haven't booked any events yet.
          </p>
        ) : viewMode === "table" ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Booked Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={booking._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {booking.event_name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {format(new Date(booking.event_date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.bookedAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(booking._id)}
                      >
                        <FaTrash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <Card key={booking._id} className="border">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    {booking.event_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    📅 Event on:{" "}
                    {format(new Date(booking.event_date), "dd MMM yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    📅 Booked on:{" "}
                    {format(new Date(booking.bookedAt), "dd MMM yyyy")}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(booking._id)}
                  >
                    <FaTrash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default MyBookings;
