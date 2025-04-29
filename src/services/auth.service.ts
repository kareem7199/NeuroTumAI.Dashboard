import User from "@/types/auth/User";
import { ApiAxiosResponse } from "@/types/common/ApiResponse";
import axiosInstance from "@/utils/axiosInstance";

const login = async (email: string, password: string) : ApiAxiosResponse<string> => await axiosInstance.post("/Admin/login", { email, password });

const getUserData = async () : ApiAxiosResponse<User> => await axiosInstance.get("/Admin");

export default {
    login,
    getUserData
}