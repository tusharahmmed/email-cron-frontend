import {USER_ROLE} from "@/constants/role";

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IProvider {
  id: string;
  title: string;
  host: string;
  port: number;
  secure: boolean;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type ICampaignUser = {
  id: string;
  recipient_email: string;
  recipient_reply: string | null;
  campaign_id: string;
  createdAt: string;
  updatedAt: string;
};

export type ICampaign = {
  id: string;
  name: string;
  subject: string;
  email_body: string;
  status: boolean;
  provider_id: string;
  createdAt: string;
  updatedAt: string;
  provider: IProvider;
  users: ICampaignUser[];
};
