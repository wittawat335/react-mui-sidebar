import { login, register } from "@/lib/axios/authApi";
import { isLogin, setUser } from "@/lib/redux/slices/authSlice";
import { useAppDispatch } from "@/lib/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../axios/todo";
import { Todo } from "@/types/Todo";
import { IRegister } from "@/types/Register";
import { getList } from "../axios/userApi";
import { QUERY_KEYS } from "./queryKeys";

export const useLogin = () => {
  const dispacth = useAppDispatch();
  return useMutation({
    mutationFn: (request: { email: string; password: string }) =>
      login(request),
    onSuccess: (response) => {
      if (response.data.success) {
        dispacth(setUser(response?.data));
        dispacth(isLogin(true));
      }
    },
    onMutate: () => {
      //console.log("Mutate");
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
      //console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: (response) => {
      //console.log(response.data);
    },
  });
};

export function useUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: getList,
  });
}

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
