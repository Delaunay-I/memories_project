import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = api;
