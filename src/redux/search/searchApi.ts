import { baseApi } from "../baseApi";
import { getSessionToken } from "@/lib/utils";

const searchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserSearchResults: build.query({
      query: (username) => {
        const token = getSessionToken();
        return {
          url: "student/search-user/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { username },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserSearchResultsQuery } = searchApi;
