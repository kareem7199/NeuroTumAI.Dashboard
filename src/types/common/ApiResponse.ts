import { AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
}

interface ApiResponseWithPagination<T, K extends string> {
  success: boolean;
  message: string;
  data: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  } & {
    [key in K]: T;
  };
}

export type ApiAxiosResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>;
export type ApiAxiosResponseWithPagination<T, K extends string> = Promise<
  AxiosResponse<ApiResponseWithPagination<T, K>>
>;
