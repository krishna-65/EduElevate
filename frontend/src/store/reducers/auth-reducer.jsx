import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  signup: null,
  loading: false,
  isauthenticate: false,
  expireTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signup = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsauthenticate: (state, action) => {
      state.isauthenticate = action.payload.isauthenticate;
      state.expireTime = action?.payload?.expireTime || null;
    },
    clearSignupData: (state) => {
      state.signup = null;
      state.loading = false;
      state.token = null;
    },
  },
});

export const { setSignupData, setLoading, setIsauthenticate, clearSignupData } = authSlice.actions;

export default authSlice.reducer;
