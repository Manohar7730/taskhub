import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskByID, updateTask } from "../../services/task.api";

export default function UpdateTask() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTaskByID({ taskId });
        setTask(res.data);

        setTitle(res.data.title);
        setDescription(res.data.description);
        setStatus(res.data.status);
        setPriority(res.data.priority);
        setDueDate(res.data.dueDate?.substring(0, 10) || "");
        setProgress(res.data.progress);
      } catch (err) {
        console.error("Failed to load task", err);
      }
    };

    fetchTask();
  }, [taskId]);

  if (!task) return <p className="p-10 text-center">Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTask({
        taskId,
        title,
        description,
        status,
        priority,
        dueDate,
        progress,
      });

      navigate(`/projects/${task.project}`);
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold">Update Task</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold">Title</label>
            <input
              required
              type="text"
              className="w-full rounded-lg border p-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <textarea
              className="w-full rounded-lg border p-2.5"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Status</label>
            <select
              className="w-full rounded-lg border p-2.5"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Priority</label>
            <select
              className="w-full rounded-lg border p-2.5"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Due Date</label>
            <input
              type="date"
              className="w-full rounded-lg border p-2.5"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Progress ({progress}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full"
            />
          </div>

          <button className="w-full rounded-lg bg-cyan-600 py-2.5 text-white">
            Save Changes
          </button>
        </form>

        <button
          onClick={() => navigate(`/projects/${task.project}`)}
          className="mt-4 w-full text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
