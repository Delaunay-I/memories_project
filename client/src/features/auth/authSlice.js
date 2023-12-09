import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/posts";

// export const login = createAsyncThunk("auth/login", async ()=>{
//     const response = await axios.
// })

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
        console.log("from reducer:", action.payload)
      localStorage.setItem("profile", JSON.stringify({ ...action.payload?.data,  token: action.payload?.token}));
      state.authData = action.payload?.data;
    },
  },
  // extraReducers(builder) {
  //     builder.addCase(login.fulfilled, (state, action) => {
  //         localStorage.setItem('profile', JSON.stringify({...action?.data}));
  //         state.authData = action?.data;
  //     })
  // }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
