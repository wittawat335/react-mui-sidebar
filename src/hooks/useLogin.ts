import { useMutation } from "@tanstack/react-query";
import React from "react";

export function useLogin() {
  return useMutation(login(),{
    onSuccess: () => {
        // Invalidates cache and refetch 
        queryClient.invalidateQueries("todos")
    }
  })
}
