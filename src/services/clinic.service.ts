import { PendingClinic } from "@/types/clinic/PendingClinic";
import { ApiAxiosResponseWithPagination } from "@/types/common/ApiResponse";
import axiosInstance from "@/utils/axiosInstance";

const getPendingClinics = async (
  pageIndex: number,
  pageSize: number,
  search?: string
): ApiAxiosResponseWithPagination<PendingClinic[]> => {
  const response = await axiosInstance.get("/Admin/pendingClinics", {
    params: { pageIndex, pageSize, search },
  });
  return response;
};

const acceptClinic = async (clinicId: number) => {
  await axiosInstance.put(`/Admin/pendingClinics/accept/${clinicId}`);
};

const rejectClinic = async (clinicId: number) => {
  await axiosInstance.delete(`/Admin/pendingClinics/reject/${clinicId}`);
};

export default {
  getPendingClinics,
  acceptClinic,
  rejectClinic
};
