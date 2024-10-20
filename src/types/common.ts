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

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: USER_ROLE;
  createdAt: string;
  updatedAt: string;
}

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
