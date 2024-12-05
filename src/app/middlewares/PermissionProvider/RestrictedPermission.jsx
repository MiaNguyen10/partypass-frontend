import { useContext } from "react";
import PropTypes from "prop-types";

import { Outlet } from "react-router-dom"; 
import { PermissionContext } from "./PermissionProvider";
import AccessDenied from "../../pages/AccessDenied";
import Login from "../../pages/Login";
import { jwtDecode } from "jwt-decode";
import { roles } from "../../config/Constant";

const RestrictedPermission = ({ allowedRoles, children }) => {
  const { isAllowedTo } = useContext(PermissionContext);
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Login />;
  }

  let currentUserRole = null;

  try {
    const decoded = jwtDecode(token);

    currentUserRole = roles.find((role) => role.id === decoded.role)?.value;

    if (!currentUserRole) {
      console.error("Invalid role detected!");
      return <AccessDenied />;
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    return <AccessDenied />;
  }

  if (isAllowedTo(currentUserRole, allowedRoles)) {
    return children ? <>{children}</> : <Outlet />;
  }

  return children ? null : <AccessDenied />;
};
RestrictedPermission.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node
};

export default RestrictedPermission;
