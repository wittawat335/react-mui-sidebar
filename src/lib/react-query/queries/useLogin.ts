import { login } from "@/lib/axios/authApi";
import { setUser } from "@/lib/redux/slices/authSlice";
import { useAppDispatch } from "@/lib/redux/store";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const dispacth = useAppDispatch();
  return useMutation({
    mutationFn: (request: { email: string; password: string }) =>
      login(request),
    onMutate: () => {
      //console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: (response) => {
      dispacth(setUser(response?.data));
      //console.log("Success");
    },
  });
};
