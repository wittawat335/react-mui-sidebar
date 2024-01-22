import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: (user: { username: string; password: string }) => login(user),
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
