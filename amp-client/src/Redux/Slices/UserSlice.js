import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeData: (currentState, payload) => {
      currentState = payload;
      return currentState;
    },
    logout: () => {        
        return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeData, logout } = userSlice.actions;

export default userSlice.reducer;
