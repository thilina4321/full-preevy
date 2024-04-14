import { trpcConfigFe } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTasks = (trpcConfigFe as any).tasks.getTasks.useQuery();
  const addTasks = (trpcConfigFe as any).tasks.addTasks.useMutation();

  const submitTask = async () => {
    if (!title || !description) return;

    try {
      await addTasks.mutateAsync({ title, description });

      setTitle("");
      setDescription("");

      await getTasks.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (getTasks.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-5">Hello Preevy</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Add Tasks</h2>
        <div className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={submitTask}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold mb-4">Show Tasks</h2>
        <div className="space-y-3">
          {getTasks.data?.map((task: any) => (
            <div key={task.id} className="p-4 shadow rounded-lg bg-white">
              <p className="text-lg font-medium">{task.title}</p>
              <p className="text-gray-600">{task.description || "No description"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
