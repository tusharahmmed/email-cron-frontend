import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
import {IDriverRequest, IMeta, IQuote} from "@/types";

const DRIVER_URL = "/customers";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDriverRequest: builder.mutation({
      query: (payload) => ({
        url: `${DRIVER_URL}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.driver],
    }),
    getDriverRequests: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${DRIVER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDriverRequest[], meta: IMeta) => {
        return {
          driverRequests: response,
          meta,
        };
      },
      providesTags: [tagTypes.driver],
    }),
    getDriverRequestDetails: builder.query({
      query: (id: string) => ({
        url: `${DRIVER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.driver],
    }),
    deleteDriverRequest: builder.mutation({
      query: (id) => ({
        url: `${DRIVER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.driver],
    }),
    updateDriverRequest: builder.mutation({
      query: (data) => ({
        url: `${DRIVER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.driver],
    }),
  }),
});

export const {
  useCreateDriverRequestMutation,
  useGetDriverRequestsQuery,
  useGetDriverRequestDetailsQuery,
  useDeleteDriverRequestMutation,
  useUpdateDriverRequestMutation,
} = driverApi;
