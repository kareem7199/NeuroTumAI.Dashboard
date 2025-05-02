import {
  ApiAxiosResponse,
  ApiAxiosResponseWithPagination,
} from "@/types/common/ApiResponse";
import { ContactUsMessage } from "@/types/contactUs/ContactUsMessage";
import axiosInstance from "@/utils/axiosInstance";

const getMessages = async (
  pageIndex: number,
  pageSize: number,
  search?: string
): ApiAxiosResponseWithPagination<ContactUsMessage[]> => {
  const response = await axiosInstance.get("/Admin/contactUsMessages", {
    params: { pageIndex, pageSize, search },
  });
  return response;
};

const getMessage = async (id: number): ApiAxiosResponse<ContactUsMessage> =>
  axiosInstance.get(`/Admin/contactUsMessages/${id}`);

export default {
  getMessages,
  getMessage,
};
