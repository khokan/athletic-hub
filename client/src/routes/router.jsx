import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Registration from "../components/pages/Registration";
import EventDetails from "../components/pages/Event/EventDetails";
import AllEventsPage from "../components/pages/Event/Events";
import CreateEvent from "../components/pages/Event/CreateEvent";
import UpdateEvent from "../components/pages/Event/UpdateEvent";
import ManageEvents from "../components/pages/Event/ManageEvents";
import MyBookings from "../components/pages/Event/MyBookings";
import PrivateRouter from "./PrivateRouter";
import ErrorPage from "../shared/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch(`${import.meta.env.VITE_NODE_SERVER_URL}/events`),
        hydrateFallbackElement: (
          <div className="text-center">
            <span className="loading loading-bars loading-xl"></span>{" "}
          </div>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "registration",
        Component: Registration,
      },
      {
        path: "events",
        Component: AllEventsPage,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_NODE_SERVER_URL}/events`),
      },
      {
        path: "/events/:id",
        element: (
            <EventDetails />
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_NODE_SERVER_URL}/events/${params.id}`),
      },
      {
        path: "createEvent",
        element: (
          <PrivateRouter>
            <CreateEvent />
          </PrivateRouter>
        ),
      },
      {
        path: "updateEvent/:id",
        Component: UpdateEvent,
      },
      {
        path: "manageEvents",
        element: (
          <PrivateRouter>
            <ManageEvents />
          </PrivateRouter>
        ),
      },
      {
        path: "myBookings",
        element: (
          <PrivateRouter>
            <MyBookings />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
