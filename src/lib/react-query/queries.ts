import { isLogin, setAuth } from "@/lib/store/slices/authSlice";
import { useAppDispatch } from "@/lib/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../../services/api/todo";
import { Todo } from "@/types/Todo";
import { IRegister } from "@/types/Register";
import { deleteUser, getList } from "../../services/api/userApi";
import { QUERY_KEYS } from "./queryKeys";

export const useRegister = () => {
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

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: string) => deleteUser(request),
    onMutate: () => {
      //console.log("Mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USERS] });
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
