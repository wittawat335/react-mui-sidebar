import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { appConfig } from "@/config/appConfig";

const queryClient = new QueryClient();
const devEnv = appConfig.environments == "Devlopment" ? true : false;

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devEnv ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
};
