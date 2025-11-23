import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getTaskByID } from "../../services/task.api";

const TaskDetails = () => {
const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadTask = useCallback(async () => {
    try {
      const res = await getTaskByID({ taskId });
      setTask(res.data);
    } catch (err) {
      console.log("Error loading task:", err);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [taskId, navigate]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  if (loading) return <p className="p-6">Loading task...</p>;
  if (!task) return <p className="p-6">Task not found.</p>;

  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-xl bg-white p-6 shadow">
      <h1 className="text-3xl font-bold">{task.title}</h1>

      <div className="my-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-semibold">Status</p>
          <p>{task.status}</p>
        </div>

        <div>
          <p className="font-semibold">Priority</p>
          <p>{task.priority}</p>
        </div>

        <div>
          <p className="font-semibold">Progress</p>
          <p>{task.progress}%</p>
        </div>

        <div>
          <p className="font-semibold">Due Date</p>
          <p>{task.dueDate ? task.dueDate.split("T")[0] : "—"}</p>
        </div>
      </div>

      <div className="my-4">
        <p className="font-semibold">Description</p>
        <p className="text-gray-600">{task.description || "No description"}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(`/task/${taskId}/edit`)}
          className="rounded bg-cyan-600 px-4 py-2 text-white"
        >
          Edit Task
        </button>

        <button
          onClick={() => navigate(-1)}
          className="rounded bg-gray-200 px-4 py-2"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
