import PropTypes from "prop-types";
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin } from "../../../core/reducers/user/userSlice";
import { getUserInformation } from "../../../core/thunk/user";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(getUserLogin);

  useEffect(() => {
    if (userLogin) {
      // Fetch user information when userLogin changes
      dispatch(getUserInformation());
    }
  }, [dispatch, userLogin]); // Add userLogin as a dependency

  const institutionId = userLogin?.institution_id || null;
  const name = userLogin?.name || null;
  const role = userLogin?.role || null;

  return (
    <UserInfoContext.Provider value={{ institutionId, name, role }}>
      {children}
    </UserInfoContext.Provider>
  );
};

UserInfoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
