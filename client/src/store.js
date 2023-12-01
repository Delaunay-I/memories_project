import { configureStore } from "@reduxjs/toolkit";
// import postsReducer_old from "./reducers/postsReducer";
import postsReducer from "./features/post/postSlice";
import { api } from "./features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    posts: postsReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(api.middleware)
});
