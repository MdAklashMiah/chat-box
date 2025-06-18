import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase.config";



const initialState = {
  value: auth.currentUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { userLoginInfo } = userSlice.actions;

export default userSlice.reducer;
