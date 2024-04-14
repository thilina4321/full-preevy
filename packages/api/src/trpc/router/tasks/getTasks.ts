import { PrismaClient } from "@prisma/client";
import { protectedSessionProcedure } from "../../trpc";

const prisma = new PrismaClient();

const getTaks = protectedSessionProcedure.query(async () => {
  return await prisma.task.findMany({});
});
export default getTaks;
