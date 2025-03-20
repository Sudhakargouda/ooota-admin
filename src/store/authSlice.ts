import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

// Function to safely retrieve user from localStorage
const getStoredUser = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user && user !== "undefined" ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User | null }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user ? JSON.stringify(action.payload.user) : "null");
    },
    
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
