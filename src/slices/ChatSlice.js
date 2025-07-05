import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase.config";



const initialState = {
  value: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatingUserInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { chatingUserInfo } = chatSlice.actions;

export default chatSlice.reducer;
