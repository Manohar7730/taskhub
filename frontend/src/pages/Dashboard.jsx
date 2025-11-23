import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuthContext";
import { useState, useEffect } from "react";
import { getAllProjects } from "../services/project.api";
import { forgotPasswordRequestOTP } from "../services/auth.api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects();
        setProjects(res.data); 
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const callUpdatePassword = async () => {
    try {
      await forgotPasswordRequestOTP({ email: user.email });

      sessionStorage.setItem("otp-email", user.email);
      sessionStorage.setItem("otp-purpose", "PASSWORD_RESET");

      navigate("/update-password");
    } catch (err) {
      alert("Failed to send OTP", err.message);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-10">
      {/* HEADER */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-semibold">{user?.name}</span>
          </p>
        </div>

        <button
          onClick={() => navigate("/projects/create")}
          className="rounded-md bg-cyan-600 px-5 py-2.5 font-medium text-white transition hover:bg-cyan-700 active:scale-95"
        >
          + New Project
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="mb-10 grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow">
          <h2 className="text-sm font-medium text-gray-500">Total Projects</h2>
          <p className="mt-1 text-3xl font-bold text-gray-800">
            {projects.length}
          </p>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-semibold text-gray-800">
          Your Projects
        </h2>

        {projects.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            No projects created yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)} 
                className="cursor-pointer rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md active:scale-[.98]"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.title}
                </h3>

                <p className="my-1 line-clamp-2 text-sm text-gray-500">
                  {project.description || "No description provided"}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    Due:{" "}
                    {project.dueDate
                      ? new Date(project.dueDate).toLocaleDateString()
                      : "No Due Date"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER BUTTONS */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={callUpdatePassword}
          className="w-full rounded-md bg-cyan-500 py-2.5 font-medium text-white transition hover:bg-cyan-600 active:scale-95"
        >
          Change Password
        </button>

        <button
          onClick={logout}
          className="w-full rounded-md bg-red-500 py-2.5 font-medium text-white hover:bg-red-600 active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
