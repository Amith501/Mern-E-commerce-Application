import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api/user";

// Helper function for error extraction
const getErrorMessage = (error) => {
  return error.response?.data?.message || "An unexpected error occurred";
};

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (!data.token) {
        throw new Error("Token not received from server");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login Successful!");

      return { user: data.user, token: data.token, isAuthenticated: true };
    } catch (error) {
      console.error("Login Error:", error);
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Register Thunk
export const registerUser = createAsyncThunk(
  "auth/regsterUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/register`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Register Successful!");

      return { user: data.user, token: data.token, isAuthenticated: true };
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Registration Failed: " + getErrorMessage(error));
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Logout Thunk
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      { withCredentials: true }
    );
    console.log(" Logout API Response:", response.data);
    toast.success(" Logged Out Successfully!");
  } catch (error) {
    console.error(
      " Logout Request Failed:",
      error.response?.data || error.message
    );
    toast.warn(" Logout request failed, but clearing local storage.");
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  return null;
});

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (token) => {
    const response = await axios.get("/api/users", {
      headers: {
        "x-auth-token": token,
      },
    });
    return response.data.users;
  }
);

// Async thunk to update user role
export const updateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ userId, newRole, token }) => {
    const response = await axios.put(
      "/api/user/update-role",
      { userId, newRole },
      {
        headers: {
          Authorization: `Bearer${token}`,
        },
      }
    );
    return response.data.user;
  }
);

// Async thunk to delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ userId, token }) => {
    await axios.delete(`/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    return userId; // Return the ID to remove from the state
  }
);
