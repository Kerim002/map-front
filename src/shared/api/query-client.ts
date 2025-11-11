import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 3 * 1000,
      gcTime: 60 * 5 * 1000,
    },
  },
});
