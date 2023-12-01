import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../api/apiSlice";

const initialState = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postDeleted: (state, action) => {
      const postId = action.payload._id;
      state = state.filter((post) => post.id !== postId);
    },
    postUpdated: (state, action) => {
      state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    postsFetched: (action) => {
      action.payload;
    },
    postCreated: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getPosts.matchFulfilled,
      (state, action) => {
        // action.payload contains the data returned by the API
        return action.payload;
      }
    );
  },
});

export const { postDeleted, postUpdated, postsFetched, postCreated } =
  postsSlice.actions;
export default postsSlice.reducer;
