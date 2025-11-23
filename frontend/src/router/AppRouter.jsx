import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import UpdatePassword from "../pages/auth/UpdatePassword";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import PublicRoute from "../components/PublicRoute";
import CreateProject from "../pages/projects/CreateProject";
import ProjectDetails from "../pages/projects/ProjectDetails";
import AddTask from "../pages/tasks/AddTask";
import UpdateTask from "../pages/tasks/UpdateTask";
import UpdateProject from "../pages/projects/UpdateProject";
import TaskDetails from "../pages/tasks/TaskDetails";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects/:id/tasks/create" element={<AddTask />} />
        <Route path="/projects/:id/edit" element={<UpdateProject />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
        <Route path="/task/:taskId/edit" element={<UpdateTask />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
}
