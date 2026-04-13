import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginAPI, type User } from "../../services/auth/authAPI";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await LoginAPI(email, password);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message ?? "Login failed");
    }
  },
);
type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expiry");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
