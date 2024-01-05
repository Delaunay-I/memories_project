import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/user" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const signin = createAsyncThunk("auth/signin", async (formData) => {
  const response = await API.post("/signin", formData);
  return response.data;
});

export const signup = createAsyncThunk("auth/signup", async (formData) => {
  const response = await API.post("/signup", formData);
  return response.data;
});

const initialState = {
  token: "",
  authData: "",
  result: "",
  status: "idle",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log("from reducer:", action.payload);
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...action.payload?.result,
          token: action.payload?.token,
        })
      );
      state.authData = action.payload?.data;
    },
    logout(state) {
      localStorage.clear();
      state.authData = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authData = action.payload?.data;
        state.token = action.payload?.token;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // builder.addCase(login.fulfilled, (state, action) => {
    //     localStorage.setItem('profile', JSON.stringify({...action?.data}));
    //     state.authData = action?.data;
    // })
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
