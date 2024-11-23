import { createSlice } from "@reduxjs/toolkit";
import { loading_status } from "../../../app/config/Constant";
import { createUser, getUserList } from "../../thunk/user";

const initialState = {
  users: [],
  loading: loading_status.idle,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.users = action.payload.users.map((user) => ({
          ...user,
          date_of_birth: new Date(user.date_of_birth).toDateString(),
        }));
        state.error = null;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.tickets = [];
        state.error = action.error.message;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = loading_status.pending;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = loading_status.succeeded;
        state.tickets.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = loading_status.failed;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const getUsers = (state) => state.user.users;