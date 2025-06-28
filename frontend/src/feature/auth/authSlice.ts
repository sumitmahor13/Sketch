import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/User";

interface AuthState {
  isAuthenticated:boolean,
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated:false,
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    clearUser(state) {
      state.isAuthenticated = false
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setAuth, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;