import { createBrowserRouter } from "react-router-dom";
import { roles } from "./config/Constant";
import pages from "./config/pages";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import ProtectedRouteForRole from "./middlewares/ProtectedRouteForRole";
import AccessDenied from "./pages/AccessDenied";
import HomePage from "./pages/HomePage";
import AddInstitution from "./pages/Institutions/AddInstitution";
import EditInstitution from "./pages/Institutions/EditInstitution";
import Institution from "./pages/Institutions/Institution";
import Institutions from "./pages/Institutions/Institutions";
import LockerForInstitution from "./pages/Institutions/LockerForInstitution";
import AddLocker from "./pages/Locker/AddLocker";
import EditLocker from "./pages/Locker/EditLocker";
import Locker from "./pages/Locker/Locker";
import Lockers from "./pages/Locker/Lockers";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PurchaseList from "./pages/Purchase/PurchaseList";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import User from "./pages/Users/User";
import Users from "./pages/Users/Users";
import PurchaseItem from "./pages/Purchase/PurchaseItem";
import Ticket from "./pages/Tickets/System_Admin/Ticket";
import EditTicket from "./pages/Tickets/System_Admin/EditTicket";
import AddTicket from "./pages/Tickets/System_Admin/AddTicket";
import Tickets from "./pages/Tickets/System_Admin/Tickets";
import TicketsForInstitution from "./pages/Tickets/Institution_Admin/TicketsForInstitution";
import EditTicketForInstitution from "./pages/Tickets/Institution_Admin/EditTicketForInstitution";
import AddTicketForInstitution from "./pages/Tickets/Institution_Admin/AddTicketForInstitution";
import TicketForInstitution from "./pages/Tickets/Institution_Admin/TicketForInstitution";

const router = createBrowserRouter([
  {
    path: pages.loginPath,
    element: <Login />,
  },
  // Protected routes for login user
  {
    element: <ProtectedRoute />,
    children: [
      //Home path
      {
        path: pages.homePagePath,
        element: <HomePage />,
      },
      //User paths
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
      //Institution paths
      {
        path: pages.institutionDetailPath,
        element: <Institution />,
      },
      // Purchase
      {
        path: pages.purchasePath,
        element: <PurchaseList />,
      },
      {
        path: pages.purchaseDetailPath,
        element: <PurchaseItem />,
      },
      {
        element: <ProtectedRouteForRole permissionRoles={[roles[1].id]} />,
        children: [
          //Ticket path
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
          // Institution: system admin can view, add, edit, delete institution, view lockers of institution
          { path: pages.institutionsPath, element: <Institutions /> },
          {
            path: pages.editInstitutionPath,
            element: <EditInstitution />,
          },
          {
            path: pages.addInstitutionPath,
            element: <AddInstitution />,
          },
          {
            path: pages.lockerForInstitutionPath,
            element: <LockerForInstitution />,
          },
        ],
      },
      {
        element: <ProtectedRouteForRole permissionRoles={[roles[2].id]} />,
        children: [
          // Ticket for institution admin
          {
            path: pages.ticketsPathForInstitution,
            element: <TicketsForInstitution />,
          },
          {
            path: pages.editTicketPathForInstitution,
            element: <EditTicketForInstitution />,
          },
          {
            path: pages.addTicketPathForInstitution,
            element: <AddTicketForInstitution />,
          },
          {
            path: pages.ticketPathForInstitution,
            element: <TicketForInstitution />,
          },
          //Lockers: Institution admin can view, add, edit, delete lockers of responsible institution
          {
            path: pages.lockersPath,
            element: <Lockers />,
          },
          {
            path: pages.lockerDetailPath,
            element: <Locker />,
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
