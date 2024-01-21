import { Authen } from "@/types/Authen";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: Authen) => login(data),
    onMutate: () => {
      console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },
  });
};
