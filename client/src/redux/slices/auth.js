import { createSlice } from "@reduxjs/toolkit";

// Create a slice for authentication-related state
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentPage: "login",
    isAuthenticated: false,
    data: null,
    error: null,
  },
  reducers: {
    // Reducer function for handling a successful login action
    loginSuccess: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    // Reducer function for handling a failed login action
    loginFailed: (state, action) => {
      state.data = null;
      state.error = action.payload;
    },
    // Reducer function for handling a logout action
    Logout: (state) => {
      state.data = null;
      state.error = null;
      state.currentPage = "login";
    },
    // Reducer function for handling a page selection action
    selectPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Extract the action creators from the authSlice
export const { loginSuccess, loginFailed, Logout, selectPage } =
  authSlice.actions;

// Export the reducer function generated by createSlice
export default authSlice.reducer;
