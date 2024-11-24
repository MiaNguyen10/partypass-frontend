import { createHashRouter } from "react-router-dom";
import pages from "./config/pages";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";
import HomePage from "./pages/HomePage";
import AddInstitution from "./pages/Institutions/AddInstitution";
import EditInstitution from "./pages/Institutions/EditInstitution";
import Institution from "./pages/Institutions/Institution";
import Institutions from "./pages/Institutions/Institutions";
import AddLocker from "./pages/Locker/AddLocker";
import EditLocker from "./pages/Locker/EditLocker";
import Lockers from "./pages/Locker/Lockers";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AddTicket from "./pages/Tickets/AddTicket";
import EditTicket from "./pages/Tickets/EditTicket";
import Ticket from "./pages/Tickets/Ticket";
import Tickets from "./pages/Tickets/Tickets";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import User from "./pages/Users/User";
import Users from "./pages/Users/Users";

const router = createHashRouter([
  {
    path: pages.loginPath,
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: pages.homePagePath,
        element: <HomePage />,
      },
      {
        path: pages.usersPath,
        element: <Users />,
      },
      {
        path: pages.userDetailPath,
        element: <User />,
      },
      {
        path: pages.editUserPath,
        element: <EditUser />,
      },
      {
        path: pages.addUsersPath,
        element: <AddUser />,
      },
      {
        path: pages.ticketsPath,
        element: <Tickets />,
      },
      {
        path: pages.ticketDetailPath,
        element: <Ticket />,
      },
      {
        path: pages.editTicketPath,
        element: <EditTicket />,
      },
      {
        path: pages.addTicketPath,
        element: <AddTicket />,
      },
      {
        path: pages.institutionsPath,
        element: <Institutions />,
      },
      {
        path: pages.institutionDetailPath,
        element: <Institution />,
      },
      {
        path: pages.editInstitutionPath,
        element: <EditInstitution />,
      },
      {
        path: pages.addInstitutionPath,
        element: <AddInstitution />,
      },
      {
        path: pages.lockersPath,
        element: <Lockers />,
      },
      {
        path: pages.addLockerPath,
        element: <AddLocker />,
      },
      {
        path: pages.editLockerPath,
        element: <EditLocker />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: pages.accessDenied,
    element: <AccessDenied />,
  },
]);

export default router;
