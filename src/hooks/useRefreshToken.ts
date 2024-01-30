import { setUser } from "@/lib/store/slices/authSlice";
import { useAppDispatch } from "@/lib/store/store";
import axios from "axios";

const useRefreshToken = () => {
  const dispacth = useAppDispatch();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    dispacth(setUser(response?.data));
    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
