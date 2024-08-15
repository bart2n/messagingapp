import { baseApi } from "../baseApi";
import { getSessionToken } from "@/lib/utils";

const tokenHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getSessionToken()}`,
});

const institutionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createInstitution: build.mutation({
            query: (body) => ({
                url: "institution/create-institution/",
                method: "POST",
                body,
                headers: tokenHeaders,
            }),
        }),
        getUserInstitutions: build.query({
            query: () => ({
                url: "institution/get-institution/",
                method: "get",
                headers: tokenHeaders,
            }),
        }),
        getInstitutionDetail: build.query({
            query: (institutionId) => ({
                url: `institution/get-institution-detail/`,
                headers: tokenHeaders,
                params: { id: institutionId },
            }),

        }),
        createCourse: build.mutation({
            query: (body) => ({
                url: "course/create-course/",
                method: "POST",
                body,
                headers: tokenHeaders,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateInstitutionMutation, useGetUserInstitutionsQuery, useGetInstitutionDetailQuery, useCreateCourseMutation } = institutionApi;
