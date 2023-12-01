import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { api } from "../api/apiSlice";


const url = "http://localhost:5000/posts";

export const getPosts = createAsyncThunk("posts/getPosts", async (name, thunkAPI) => {
  try {
    const resp = await axios(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});


// export const getPosts = () => async (dispatch) => {
//     try {
//       const { data } = await axios.get(url);
//       console.log(data);
//       dispatch({ type: FETCH_ALL, payload: data });
//     } catch (error) {
//       console.log(error);
//     }
//   };

const initialState = {
  posts: [],
  isLoading: true
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postDeleted: (state, action) => {
      console.log(`initial state:`, state)
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
    postUpdated: (state, action) => {
      state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    postsFetched: (action) => {
      action.payload;
    },
    postCreated: (state, action) => {
      state.posts.push(action.payload);
    },
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
    },
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
