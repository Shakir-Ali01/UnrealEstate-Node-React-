import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentUser: {},
  },
  reducers: {
    loginUser: (state, action) => {
      return {
        isLoggedIn: true,
        currentUser: {
          ...action.payload,
        },
      };
    },
    logoutUser: (state) => {
      return {
        isLoggedIn: false,
        currentUser: {},
      };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
