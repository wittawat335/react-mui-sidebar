import { useMutation } from "@tanstack/react-query";
import { login } from "../axios/authApi";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/slices/authSlice";

export const useLogin = () => {
  const dispacth = useAppDispatch();
  return useMutation({
    mutationFn: (request: { email: string; password: string }) =>
      login(request),
    onMutate: () => {
      console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: (response) => {
      dispacth(setUser(response?.data.value));
      console.log("Success");
    },
  });
};
