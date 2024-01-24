import { useMutation } from "@tanstack/react-query";
import { login } from "../axios/authApi";

export const useLogin = () => {
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
      console.log("Success");
    },
  });
};
