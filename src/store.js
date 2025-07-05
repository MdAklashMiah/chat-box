import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/UserSlice'
import chatSlice from './slices/ChatSlice'

export const store = configureStore({
  reducer: {
    userLogin: userSlice,
    chatUser : chatSlice,
  },
})