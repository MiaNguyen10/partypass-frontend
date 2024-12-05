import { Navigate, Outlet, useLocation } from "react-router";
import PropTypes from "prop-types";
import pages from "../config/pages";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteForRole = ({ permissionRole }) => {
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const role = jwtDecode(token).role;

  if (role !== permissionRole) {
    return (
      <Navigate
        to={`${pages.accessDenied}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};
ProtectedRouteForRole.propTypes = {
  permissionRole: PropTypes.string.isRequired,
};

export default ProtectedRouteForRole;
