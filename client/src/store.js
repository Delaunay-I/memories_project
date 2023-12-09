import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/post/postSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
