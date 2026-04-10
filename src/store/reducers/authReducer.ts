import { createSlice } from '@reduxjs/toolkit';
import { IUserReducer } from '../../interfaces/userInterface';
import { loginUser } from '../actions/asyncActions/user.asyncActions';
const initialState: IUserReducer = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmZmZDI3ODkzZmU5ZWMxZGIyZjMzYjE2NjcwZTcyZCIsIm5iZiI6MTc3NTg0OTE5NC4zMjYwMDAyLCJzdWIiOiI2OWQ5NGVlYTM4MjBjZDYzZmQwMjY3MjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t0FA1J6YUBwIjQ_Dqq1qjqT7B1InLHxU7rcgxNfGfQs',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: state => {
      state.user = null;
      // state.token = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.user = null;
      // state.token = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, state => {
      state.user = null;
      // state.token = null;
    });
  },
});
export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
