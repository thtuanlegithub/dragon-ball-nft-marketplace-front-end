// slices/walletSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WalletState = {
  address: string;
  balance: number;
  private_key: string;
};

const initialState: WalletState = {
  address: '',
  balance: 0,
  private_key: '',
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletInfo(state, action: PayloadAction<WalletState>) {
      state.address = action.payload.address;
      state.balance = action.payload.balance;
      state.private_key = action.payload.private_key;
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    setPrivateKey(state, action: PayloadAction<string>) {
      state.private_key = action.payload;
    },
    logout(state) {
      state.address = '';
      state.balance = 0;
      state.private_key = '';
    },
  },
});

export const { setWalletInfo, setBalance, setAddress, setPrivateKey, logout } = walletSlice.actions;

export default walletSlice.reducer;
