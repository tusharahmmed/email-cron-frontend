import {IMeta, IProvider} from "@/types";
import {baseApi} from "./baseApi";
import {tagTypes} from "@/rtk/tag-types";

const PROVIDER_URL = "/providers";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProvider: builder.mutation({
      query: (payload) => ({
        url: `${PROVIDER_URL}/add-new`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.provider],
    }),
    getAllProviders: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PROVIDER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IProvider[], meta: IMeta) => {
        return {
          providers: response,
          meta,
        };
      },
      providesTags: [tagTypes.provider],
    }),
    getProviderDetails: builder.query({
      query: (id: string) => ({
        url: `${PROVIDER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.provider],
    }),
    deleteProvider: builder.mutation({
      query: (id: string) => ({
        url: `${PROVIDER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.provider],
    }),
    updateProvider: builder.mutation({
      query: (data: any) => ({
        url: `${PROVIDER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.provider],
    }),
  }),
});

export const {
  useCreateProviderMutation,
  useGetAllProvidersQuery,
  useGetProviderDetailsQuery,
  useDeleteProviderMutation,
  useUpdateProviderMutation,
} = providerApi;
