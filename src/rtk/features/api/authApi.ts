import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/sign-in`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    userSignup: build.mutation({
      query: (signupData) => ({
        url: `${AUTH_URL}/sign-up`,
        method: "POST",
        data: signupData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {useUserLoginMutation, useUserSignupMutation} = authApi;
