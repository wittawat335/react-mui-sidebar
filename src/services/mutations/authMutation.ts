import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => login(user),
    onMutate: () => {
      console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: (response) => {
      console.log("Success");
    },
  });
};
