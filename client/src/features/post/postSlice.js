import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { api } from "../api/apiSlice";

const url = "http://localhost:5000/posts";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

//posts/postDeleted
export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${url}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updatePostAsync = createAsyncThunk(
  "posts/updatePost",
  async (id, updatedPost, thunkAPI) => {
    try {
      axios.patch(`${url}/${id}`, updatedPost);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (newPost, thunkAPI) => {
    try {
      axios.post(url, newPost);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


const initialState = {
  postItems: [],
  isLoading: true,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // postDeleted: (state, action) => {
    //   const postId = action.payload;
    //   state.posts = state.posts.filter((post) => post._id !== action.payload);
    // },
    // postUpdated: (state, action) => {
    //   state.posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    // },
    // postsFetched: (action) => {
    //   action.payload;
    // },
    // postCreated: (state, action) => {
    //   state.posts.push(action.payload);
    // },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postItems = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deletePostAsync.fulfilled]: (state, action) => {
      state.postItems = state.postItems.filter((post) => post._id !== action.payload);
    },
    [updatePostAsync.fulfilled]: (state, action) => {
      state.postItems.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.postItems.push(action.payload);
    }
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     api.endpoints.getPosts.matchFulfilled,
  //     (state, action) => {
  //       // action.payload contains the data returned by the API
  //       return action.payload;
  //     }
  //   );
  // },
});

export const { postDeleted, postUpdated, postsFetched, postCreated } =
  postsSlice.actions;
export default postsSlice.reducer;
