import { jwtDecode } from "jwt-decode";
import { createContext } from "react";
import PropTypes from "prop-types";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode(token);
  const institutionId = decodedToken.institution_id;
  const name = decodedToken.name;
  const role = decodedToken.role;

  return (
    <UserInfoContext.Provider value={{ institutionId, name, role }}>
      {children}
    </UserInfoContext.Provider>
  );
};

UserInfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
