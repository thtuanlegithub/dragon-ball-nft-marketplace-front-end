// store.ts
import { configureStore } from '@reduxjs/toolkit';
import walletReducer from './slices/walletSlice';

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    // Các reducer khác nếu có
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
