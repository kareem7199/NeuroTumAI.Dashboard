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

const acceptDoctor = async (doctorId: number) => {
  await axiosInstance.put(`/Admin/pendingDoctors/accept/${doctorId}`);
};

const rejectDoctor = async (doctorId: number) => {
  await axiosInstance.delete(`/Admin/pendingDoctors/reject/${doctorId}`);
};

export default {
  getPendingDoctors,
  acceptDoctor,
  rejectDoctor
};
