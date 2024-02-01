import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { appConfig } from "@/data/config";
import { Environment } from "@/data/constants";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const devEnv = appConfig.app_env == Environment.Devlopment ? true : false;
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devEnv ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
};
