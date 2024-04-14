import { z } from "zod";
import { protectedSessionProcedure } from "../../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addTasksInputSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const addTasks = protectedSessionProcedure
  .input(addTasksInputSchema)
  .mutation(async ({ input: { title, description } }) => {
    return await prisma.task.create({
      data: {
        title,
        description,
      },
    });
  });
export default addTasks;
