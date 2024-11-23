import { createContext } from "react";
import PropTypes from "prop-types";

export const PermissionContext = createContext({ isAllowTo: () => false });

const PermissionProvider = ({ children }) => {
  const isAllowedTo = (userRole, permission) =>
    permission.includes(userRole);

  return (
    <PermissionContext.Provider value={{ isAllowedTo }}>
      {children}
    </PermissionContext.Provider>
  );
};

PermissionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PermissionProvider;
