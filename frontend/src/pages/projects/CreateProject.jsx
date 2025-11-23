import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../services/project.api";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProject({ title, description, dueDate });
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Create New Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TITLE */}
          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              className="w-full rounded-lg border p-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              placeholder="e.g. Marketing Website Redesign"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows="4"
              className="w-full rounded-lg border p-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* DUE DATE */}
          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border p-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-600 py-2.5 font-medium text-white transition hover:bg-cyan-700 active:scale-95"
          >
            Create Project
          </button>
        </form>

        {/* CANCEL */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 w-full font-medium text-gray-600 transition hover:text-gray-800 active:scale-95"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
