import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../reducers/authenticate/authenticateSlice";
import ticketReducer from "../reducers/ticket/ticketSlice";
import institutionReducer from "../reducers/institution/institutionSlice";
import userReducer from "../reducers/user/userSlice";
import lockerReducer from "../reducers/locker/lockerSlice";

export const store = configureStore({
  reducer: {
    auth: authenticateReducer,
    ticket: ticketReducer,
    institution: institutionReducer,
    user: userReducer,
    locker: lockerReducer,
  },
});

export default store;
