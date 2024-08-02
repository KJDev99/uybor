'use client';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// View slice
const viewSlice = createSlice({
  name: 'view',
  initialState: 'block',
  reducers: {
    setView: (state, action) => action.payload,
  },
});

// Currency slice
const currencySlice = createSlice({
  name: 'currency',
  initialState: 'UZS',
  reducers: {
    setCurrency: (state, action) => action.payload,
  },
});

// Configure store
const store = configureStore({
  reducer: {
    view: viewSlice.reducer,
    currency: currencySlice.reducer,
  },
});

// Export actions
export const { setView } = viewSlice.actions;
export const { setCurrency } = currencySlice.actions;

// Export store
export default store;
