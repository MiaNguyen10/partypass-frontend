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
import AddTicket from "./pages/Tickets/AddTicket";
import EditTicket from "./pages/Tickets/EditTicket";
import Ticket from "./pages/Tickets/Ticket";
import Tickets from "./pages/Tickets/Tickets";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import User from "./pages/Users/User";
import Users from "./pages/Users/Users";
import PurchaseItem from "./pages/Purchase/PurchaseItem";

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
      //Ticket paths
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
