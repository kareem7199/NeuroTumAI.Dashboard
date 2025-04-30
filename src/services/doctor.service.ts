import { ApiAxiosResponseWithPagination } from "@/types/common/ApiResponse";
import PendingDoctor from "@/types/doctor/PendingDoctor";
import axiosInstance from "@/utils/axiosInstance";

const getPendingDoctors = async (
  pageIndex: number,
  pageSize: number,
  search?: string
): ApiAxiosResponseWithPagination<PendingDoctor[]> => {
  const response = await axiosInstance.get("/Admin/pendingDoctors", {
    params: { pageIndex, pageSize, search },
  });
  return response;
};

export default {
  getPendingDoctors,
};
