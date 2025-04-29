import { ApiAxiosResponse } from "@/types/common/ApiResponse";
import axiosInstance from "@/utils/axiosInstance";

const login = async (email: string, password: string) : ApiAxiosResponse<string> => await axiosInstance.post("/Admin/login", { email, password });

export default {
    login
}