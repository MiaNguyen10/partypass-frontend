import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "../reducers/authenticate/authenticateSlice";
import ticketReducer from "../reducers/ticket/ticketSlice";
import institutionReducer from "../reducers/institution/institutionSlice";
import userReducer from "../reducers/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authenticateReducer,
    ticket: ticketReducer,
    institution: institutionReducer,
    user: userReducer,
  },
});

export default store;
