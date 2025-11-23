import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectByID, updateProject } from "../../services/project.api";

export default function UpdateProject() {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectByID({ projectId });
        const p = res.data.project;

        setProject(p);
        setTitle(p.title);
        setDescription(p.description);
        setDueDate(p.dueDate?.substring(0, 10) || "");
      } catch (err) {
        console.error("Failed to load project", err);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) return <p>Loading...</p>;

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject({ projectId, title, description, dueDate });
      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.error("Failed to update project", err);
      alert("Update failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Update Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* TITLE */}
          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              className="w-full rounded-lg border p-2.5 outline-none focus:ring-2 focus:ring-cyan-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border p-2.5 outline-none focus:ring-2 focus:ring-cyan-500"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write project details..."
            />
          </div>

          {/* DUE DATE */}
          <div>
            <label className="mb-1 block font-semibold text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border p-2.5 outline-none focus:ring-2 focus:ring-cyan-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* UPDATE BUTTON */}
          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-600 py-2.5 font-medium text-white transition hover:bg-cyan-700 active:scale-95"
          >
            Save Changes
          </button>
        </form>

        {/* CANCEL */}
        <button
          onClick={() => navigate(`/projects/${projectId}`)}
          className="mt-4 w-full font-medium text-gray-600 transition hover:text-gray-800 active:scale-95"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
