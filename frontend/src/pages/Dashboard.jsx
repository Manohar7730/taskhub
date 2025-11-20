import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuthContext";
import api from "../services/api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const callUpdatePassword = async () => {
    try {
      await api.post("/auth/password/request-otp", { email: user.email });

      sessionStorage.setItem("otp-email", user.email);
      sessionStorage.setItem("otp-purpose", "PASSWORD_RESET");

      navigate("/update-password");
    } catch (err) {
      alert("Failed to send OTP", err.message);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="w-[350px] rounded-xl bg-white p-6 text-center shadow-xl">
        <h1 className="mb-4 text-3xl font-semibold text-cyan-600">Dashboard</h1>

        <p className="mb-6 text-gray-700">
          Welcome, <span className="font-medium">{user?.name}</span>
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={callUpdatePassword}
            className="w-full rounded-md bg-cyan-500 py-2 font-medium text-white transition hover:bg-cyan-600 active:scale-95"
          >
            Change Password
          </button>

          <button
            onClick={logout}
            className="w-full rounded-md bg-red-500 py-2 font-medium text-white hover:bg-red-600 active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
