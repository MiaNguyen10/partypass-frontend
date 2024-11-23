import { useContext } from "react";
import PropTypes from "prop-types";
import { PermissionContext } from "./PermissionProvider";
import { Outlet } from "react-router-dom";
import AccessDenied from "../../pages/AccessDenied";

const RestrictedPermission = ({ permission, children }) => {
    const { isAllowedTo } = useContext(PermissionContext);
    const currentUserRole = "admin";

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
