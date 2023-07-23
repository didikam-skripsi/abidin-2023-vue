import axios from "axios";
import { getToken } from "@/utils/auth";

export const authAxios = () => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
