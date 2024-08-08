import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiPath = import.meta.env.VITE_API_PATH;
console.log(apiPath)
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  endpoints: () => ({}),
});
