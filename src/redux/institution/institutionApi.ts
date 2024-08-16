import { baseApi } from "../baseApi";
import { getSessionToken } from "@/lib/utils";

const institutionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createInstitution: build.mutation({
      query: (body) => {
        const token = getSessionToken();
        return {
          url: "institution/create-institution/",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Institutions"],
    }),
    getUserInstitutions: build.query({
      query: () => {
        const token = getSessionToken();
        return {
          url: "institution/get-institution/",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Institutions"],
    }),
    getInstitutionDetail: build.query({
      query: (institutionId) => {
        const token = getSessionToken();
        return {
          url: `institution/get-institution-detail/`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { id: institutionId },
        };
      },
      providesTags: ["IndividualInstitution"],
    }),
    createCourse: build.mutation({
      query: (body) => {
        const token = getSessionToken();
        return {
          url: "course/create-course/",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["IndividualInstitution"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateInstitutionMutation,
  useGetUserInstitutionsQuery,
  useGetInstitutionDetailQuery,
  useCreateCourseMutation,
} = institutionApi;
