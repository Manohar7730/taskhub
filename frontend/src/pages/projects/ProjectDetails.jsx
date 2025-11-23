import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject, getProjectByID } from "../../services/project.api";
import { deleteTask } from "../../services/task.api";

export default function ProjectDetails() {
  const { id: projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectByID({ projectId });

        setProject(res.data.project);
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("Failed to load project", err);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) return <p className="p-10 text-center">Loading...</p>;

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Delete this task?")) return;

    try {
      await deleteTask({ taskId });
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Delete task failed:", err);
    }
  };

  const handleDeleteProject = async () => {
    if (!confirm("Delete this entire project?")) return;

    try {
      await deleteProject({ projectId });
      navigate("/dashboard");
    } catch (err) {
      console.error("Delete project failed:", err);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8 rounded-xl bg-white p-6 shadow">
        <h1 className="mb-2 text-3xl font-bold">{project.title}</h1>

        <p className="mb-3 text-gray-600">{project.description}</p>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
            Due: {new Date(project.dueDate).toLocaleDateString()}
          </span>

          <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700">
            {tasks.length} Tasks
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate(`/projects/${projectId}/edit`)}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-white"
          >
            Edit Project
          </button>

          <button
            onClick={handleDeleteProject}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            Delete Project
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tasks</h2>

          <button
            onClick={() => navigate(`/projects/${projectId}/tasks/create`)}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-white"
          >
            + Add Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="py-4 text-center text-gray-500">No tasks yet.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="rounded-lg border p-4 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>

                    <div className="mt-2 flex gap-2 text-xs">
                      <span>Status: {task.status}</span>
                      <span>Priority: {task.priority}</span>
                      <span>Progress: {task.progress}%</span>
                      {task.dueDate && (
                        <span>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/task/${task._id}`)}
                      className="rounded bg-cyan-600 px-3 py-1.5 text-white"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/task/${task._id}/edit`)}
                      className="rounded bg-cyan-600 px-3 py-1.5 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="rounded bg-red-500 px-3 py-1.5 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
