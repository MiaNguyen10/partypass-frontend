import { createContext } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const token = sessionStorage.getItem("token");

  let institutionId, name, role;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      institutionId = decodedToken.institution_id;
      name = decodedToken.name;
      role = decodedToken.role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <UserInfoContext.Provider value={{ institutionId, name, role }}>
      {children}
    </UserInfoContext.Provider>
  );
};


UserInfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
