import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/users/list");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/users/create-user",
        userData
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
