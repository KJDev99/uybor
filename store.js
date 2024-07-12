'use client'
import { configureStore, createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: "block",
  reducers: {
    setView: (state, action) => action.payload,
  },
});

export const { setView } = viewSlice.actions;

const store = configureStore({
  reducer: {
    view: viewSlice.reducer,
  },
});

export default store;
