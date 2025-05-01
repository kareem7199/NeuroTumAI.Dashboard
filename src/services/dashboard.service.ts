import { ApiAxiosResponse } from "@/types/common/ApiResponse";
import { Statstics } from "@/types/statstics/Statstics";
import axiosInstance from "@/utils/axiosInstance";

const getStatistics = async () : ApiAxiosResponse<Statstics> => axiosInstance.get(`/Admin/stats`);

export default {
  getStatistics
};
