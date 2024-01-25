import { login, register } from "@/lib/axios/authApi";
import { isLogin, setUser } from "@/lib/redux/slices/authSlice";
import { useAppDispatch } from "@/lib/redux/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../axios/todo";
import { Todo } from "@/types/Todo";
import { IRegister } from "@/types/Register";

export const useLogin = () => {
  const dispacth = useAppDispatch();
  return useMutation({
    mutationFn: (request: { email: string; password: string }) =>
      login(request),
    onSuccess: (response) => {
      dispacth(setUser(response?.data));
      dispacth(isLogin(response?.data.success));
    },
    onMutate: () => {
      console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },
  });
};

export const useRegister = () => {
  const dispacth = useAppDispatch();
  return useMutation({
    mutationFn: (request: IRegister) => register(request),
    onMutate: () => {
      console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: (response) => {
      console.log(response.data);
    },
  });
};

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => {
      console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
