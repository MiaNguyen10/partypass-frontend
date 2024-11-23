import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import Institutions from "./pages/Institutions";
import Tickets from "./pages/Tickets/Tickets";
import AddTicket from "./pages/Tickets/AddTicket";
import pages from "./config/pages";

const router = createBrowserRouter([
  {
    path: pages.homePagePath,
    element: <HomePage />,
  },
  {
    path: pages.loginPath,
    element: <Login />,
  },
  {
    path: pages.ticketsPath,
    element: <Tickets />,
  },
  {
    path: pages.editTicketPath,
    element: <Tickets />,
  },
  {
    path: pages.addTicketPath,
    element: <AddTicket />,
  },
  {
    path: pages.usersPath,
    element: <Users />,
  },
  {
    path: pages.institutionsPath,
    element: <Institutions />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
