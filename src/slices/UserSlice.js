import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  value: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginInfo: (state) => {
      console.log(state)
    },
  },
})

export const { userLoginInfo } = userSlice.actions

export default userSlice.reducer