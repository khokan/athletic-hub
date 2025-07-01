import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react"; // Make sure lucide-react is installed
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  addDays,
  compareAsc,
  differenceInCalendarDays,
  format,
  isAfter,
  isBefore,
  parseISO,
} from "date-fns";
import axios from "axios";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [events, setEvents] = useState([]);
  const [weeklyEvents, setWeeklyEvents] = useState([]);

  useEffect(() => {
    // Simulate remote API fetch
    const fetchEvents = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_NODE_SERVER_URL}/events`
      );
      setEvents(response.data);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const today = new Date();
    const nextWeek = addDays(today, 7);

    const filtered = events
      .map((event) => ({
        ...event,
        dateObj: parseISO(event.eventDate),
      }))
      .filter(
        (event) =>
          isAfter(event.dateObj, today) && isBefore(event.dateObj, nextWeek)
      )
      .sort((a, b) => compareAsc(a.dateObj, b.dateObj));

    setWeeklyEvents(filtered);
  }, [events]);

  const handleSignOut = () => {
    signOutUser();
    setIsOpen(false); // close mobile menu on logout
  };

  const navLinkClass = ({ isActive }) =>
    `text-[18px] ${
      isActive
        ? "underline underline-offset-8 decoration-2 decoration-primary"
        : ""
    }`;

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/events" className={navLinkClass}>
        Events
      </NavLink>
    </>
  );

  const userLinks = (
    <>
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL} alt={user.displayName} />
                <AvatarFallback>{user.displayName.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link to="/createEvent">Create Event</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/myBookings">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/manageEvents">Manage Events</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {weeklyEvents.length > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {weeklyEvents.length}
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <h3 className="text-sm font-semibold mb-2">
                Events in the next 7 days
              </h3>
              {weeklyEvents.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming events.</p>
              ) : (
                <ul className="space-y-2">
                  {weeklyEvents.map((event) => (
                    <li key={event._id} className="text-sm border-b pb-1">
                      <span className="font-medium">{event.eventName}</span>
                      <div className="text-gray-500 text-xs">
                        {format(event.dateObj, "PPPPp")}
                        {" • "}
                        {differenceInCalendarDays(event.dateObj, new Date())}d
                        left
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </PopoverContent>
          </Popover>
          <Button onClick={handleSignOut}>Logout</Button>
        </>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
    </>
  );

  return (
    <div className="w-11/12 mx-auto my-3 bg-muted shadow-md hover:shadow-lg dark:shadow-gray-600 transition-shadow p-2 font-semibold rounded-xl">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <img src="/favicon.png" alt="Logo" className="h-8 w-8" />
          <p className="text-primary">
            Athletic<span className="text-muted-foreground">Hub</span>
          </p>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center gap-6">
          {links}
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-5">
          {userLinks}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 max-w-sm  rounded-xl shadow">
          {links}
          <div className="flex items-center gap-3 mt-3">
            {userLinks}
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
