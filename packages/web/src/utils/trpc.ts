import { createTRPCNext } from "@trpc/next";
import { httpBatchLink } from "@trpc/client";
// Import the router type from your server file

export const trpcConfigFe = createTRPCNext<any>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ],
    };
  },
  ssr: true,
});
