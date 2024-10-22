import {ICampaign, IMeta} from "@/types";
import {baseApi} from "./baseApi";
import {tagTypes} from "@/rtk/tag-types";

const CAMPAIGN_URL = "/campaigns";

export const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCampaign: builder.mutation({
      query: (payload) => ({
        url: `${CAMPAIGN_URL}/add-new`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.campaign],
    }),
    getAllCampaigns: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${CAMPAIGN_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ICampaign[], meta: IMeta) => {
        return {
          campaign: response,
          meta,
        };
      },
      providesTags: [tagTypes.campaign],
    }),
    getCampaignDetails: builder.query({
      query: (id: string) => ({
        url: `${CAMPAIGN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.campaign],
    }),
    deleteCampaign: builder.mutation({
      query: (id: string) => ({
        url: `${CAMPAIGN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.campaign],
    }),
    updateCampaign: builder.mutation({
      query: (data: any) => ({
        url: `${CAMPAIGN_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.campaign],
    }),
  }),
});

export const {
  useCreateCampaignMutation,
  useGetAllCampaignsQuery,
  useGetCampaignDetailsQuery,
  useDeleteCampaignMutation,
  useUpdateCampaignMutation,
} = campaignApi;
