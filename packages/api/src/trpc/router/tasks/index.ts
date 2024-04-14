import addTasks from "./addTask";
import getTasks from "./getTasks";

import { router } from "../../trpc";

const tasks = router({
  addTasks,
  getTasks,
});

export default tasks;
