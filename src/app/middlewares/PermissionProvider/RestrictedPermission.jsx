import { useContext } from "react";
import PropTypes from "prop-types";
import { PermissionContext } from "./PermissionProvider";
import { Outlet } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";
import { jwtDecode } from "jwt-decode";
import { roles } from "../../config/Constant";

const RestrictedPermission = ({ permission, children }) => {
  const { isAllowedTo } = useContext(PermissionContext);
  const token = sessionStorage.getItem("token");
  const decoded = jwtDecode(token);
  const currentUserRoleID = decoded.role;
  const currentUserRole = roles.find(
    (role) => role.id === currentUserRoleID
  ).value;

  if (isAllowedTo(currentUserRole, permission)) {
    return children ? <>{children}</> : <Outlet />;
  }

  return children ? null : <AccessDenied />;
};

RestrictedPermission.propTypes = {
  permission: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default RestrictedPermission;
