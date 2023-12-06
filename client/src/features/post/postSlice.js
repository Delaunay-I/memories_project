import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: "",
};

export const getPosts = createAsyncThunk("post/get", async () => {
  const response = await axios.get(url);
  return response.data;
});

export const createPost = createAsyncThunk("post/create", async (newPost) => {
  const response = await axios.post(url, newPost);
  return response.data;
});

export const deletePost = createAsyncThunk("post/delete", async (id) => {
  await axios.delete(`${url}/${id}`);
  return id;
});

export const updatePost = createAsyncThunk(
  "post/update",
  async ({ id, updatedPost }) => {
    const response = await axios.patch(`${url}/${id}`, updatedPost);
    return response.data;
  }
);

export const likePost = createAsyncThunk("post/like", async (id) => {
  const response = await axios.patch(`${url}/${id}/likePost`);
  return response.data;
});

const asyncActions = [getPosts, createPost, deletePost, updatePost, likePost];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers(builder) {
    asyncActions.forEach((action) => {
      builder
        .addCase(action.pending, (state) => {
          state.status = "loading";
        })
        .addCase(action.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    });

    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      });
  },
});

export default postsSlice.reducer;
