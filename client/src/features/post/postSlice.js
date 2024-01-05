import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/posts" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const initialState = {
  posts: [],
  status: "idle",
  error: "",
};

export const getPosts = createAsyncThunk("post/get", async () => {
  const response = await API.get('/');
  return response.data;
});

export const createPost = createAsyncThunk("post/create", async ({newPost, name}) => {
  const data = { ...newPost, name };
  const response = await API.post('/', data);
  return response.data;
});

export const deletePost = createAsyncThunk("post/delete", async (id) => {
  await API.delete(`/${id}`);
  return id;
});

export const updatePost = createAsyncThunk(
  "post/update",
  async ({ id, updatedPost, name }) => {
    const response = await API.patch(`/${id}`, updatedPost);
    return response.data;
  }
);

export const likePost = createAsyncThunk("post/like", async (id) => {
  const response = await API.patch(`/${id}/likePost`);
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
