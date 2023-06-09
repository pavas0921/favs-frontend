import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../services/login";

const initialState = {
  token: "",
  userid: "",
  loading: false,
};

export const Login = createAsyncThunk("user/login", async (credentials) => {
  const data = await loginAPI(credentials);
  return data;
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        (state.loading = false),
          (state.token = action.payload.token),
          (state.userid = action.payload.userid);
      });
  },
});

export const selectLoginState = (state) => state.login;
export default loginSlice.reducer;
