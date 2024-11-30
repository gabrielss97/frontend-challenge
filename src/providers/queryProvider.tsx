"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tempo que os dados permanecem "frescos" antes de precisar revalidar
            staleTime: Infinity,
            // Tempo que os dados ficam em cache antes de serem removidos
            gcTime: Infinity,
            // Desabilita revalidação automática quando a janela ganha foco
            refetchOnWindowFocus: false,
            // Desabilita revalidação automática quando o componente é montado
            refetchOnMount: false,
            // Desabilita revalidação automática quando a conexão é reestabelecida
            refetchOnReconnect: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
