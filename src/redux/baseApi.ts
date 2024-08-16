import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiPath = import.meta.env.VITE_API_PATH;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiPath }),
  tagTypes: ["Institutions","IndividualInstitution"],
  endpoints: () => ({}),
});
