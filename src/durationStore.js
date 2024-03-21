import { createSlice } from "@reduxjs/toolkit";

const durationStore = createSlice({
  name: "duration",
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value += -1;
    },
    durationByMount: (state, action) => {
      state.value = action.payload;
    }, 
  },
});

export const { increment, decrement, durationByMount } = durationStore.actions;
export default durationStore.reducer;
