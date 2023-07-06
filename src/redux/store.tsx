import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state interface
interface AppState {
  token: string | null;
}

// Initial state
const initialState: AppState = {
  token: null,
};

// Create a slice
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Extract the action creators
export const { setToken } = tokenSlice.actions;

// Create store
const store = configureStore({
  reducer: tokenSlice.reducer,
});

export default store;