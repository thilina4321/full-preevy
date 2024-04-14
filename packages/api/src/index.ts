import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/router/_app";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4000;

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  }),
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
