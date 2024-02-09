import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("user");
let parsedUser = null;
try {
  parsedUser = JSON.parse(storedUser);
} catch (error) {
  console.error("Error parsing stored user:", error);
}
const initialState = {
  user: parsedUser || null,
  isAuthenticated: false,
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;

      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
