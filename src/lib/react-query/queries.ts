import { login, register } from "@/services/api/authApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../../services/api/todo";
import { Todo } from "@/types/Todo";
import { IRegister } from "@/types/Register";
import { deleteUser, getList } from "../../services/api/userApi";
import { QUERY_KEYS } from "./queryKeys";
import { useUserContext } from "@/contexts/AuthContext";

export const useLogin = () => {
  const { auth, setAuth } = useUserContext();
  return useMutation({
    mutationFn: (request: { email: string; password: string }) =>
      login(request),
    onSuccess: (response) => {
      console.log(response);
      console.log("userid", response?.data.userId);
      setAuth({
        userid: response?.data.userId,
        username: response?.data.username,
        fullname: response?.data.fullname,
        email: response?.data.email,
        roles: response?.data.roles,
        token: response?.data.token,
      });
      console.log(auth);
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
