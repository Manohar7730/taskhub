import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addTask } from "../../services/task.api";

export default function AddTask() {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTask({
        projectId,
        title,
        description,
        status,
        priority,
        dueDate,
        progress,
      });

      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Add New Task</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border p-2.5"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border p-2.5"
              placeholder="Describe the task..."
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border p-2.5"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-gray-700">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border p-2.5"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border p-2.5"
            />
          </div>

          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Progress ({progress}%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-600 py-2.5 text-white"
          >
            Create Task
          </button>
        </form>

        <button
          onClick={() => navigate(`/projects/${projectId}`)}
          className="mt-4 w-full text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
