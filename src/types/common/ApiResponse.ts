import { AxiosResponse } from "axios";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ApiResponseWithPagination<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  totalPages: number;
  data: T
}

export type ApiAxiosResponse<T> = Promise<AxiosResponse<ApiResponse<T>>>;
export type ApiAxiosResponseWithPagination<T> = Promise<
  AxiosResponse<ApiResponseWithPagination<T>>
>;
