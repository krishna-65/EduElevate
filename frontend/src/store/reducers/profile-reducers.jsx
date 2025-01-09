import { createSlice } from "@reduxjs/toolkit";

// Initial state, checking for saved user profile in localStorage
const initialState = {
  user: null, // User will not be stored in localStorage directly anymore
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;

export default profileSlice.reducer;
