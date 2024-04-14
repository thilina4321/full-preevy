import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

const t = initTRPC.context().create({
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError
            ? error.cause.issues?.[0]?.message // we will only ever read out the first issue until we need to display all errors - could get out of hand
            : null,
      },
    };
  },
});

const isAuthApiKeyAuthed = t.middleware(async ({ next }) => {
  return next({
    ctx: {
      authApiToken: true,
    },
  });
});

export const router = t.router;
export const protectedSessionProcedure = t.procedure.use(isAuthApiKeyAuthed);
