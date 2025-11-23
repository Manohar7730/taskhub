import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
} from "../services/auth.api";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const loadUser = useCallback(async () => {
    const token = sessionStorage.getItem("auth-token");
    if (!token) {
      setUser(null);
      setLoadingAuth(false);
      return;
    }

    try {
      setLoadingAuth(true);
      const res = await fetchCurrentUser();
      const returnedUser = res.data?.user ?? res.data;
      setUser(returnedUser);
    } catch (err) {
      console.log(err.message);
      sessionStorage.removeItem("auth-token");
      setUser(null);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    loadUser();

    const onLogout = () => {
      setUser(null);
      setLoadingAuth(false);
      navigate("/login");
    };
    window.addEventListener("app:logout", onLogout);

    return () => {
      window.removeEventListener("app:logout", onLogout);
    };
  }, [loadUser, navigate]);

  // REGISTER
  const register = async (name, email, password) => {
    try {
      sessionStorage.setItem("register-email", email);

      await registerUser({ name, email, password });
      navigate(`/verify-otp`);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });

      const token = res.data.token;
      if (!token) throw new Error("No token returned from server");

      sessionStorage.setItem("auth-token", token);

      await loadUser();

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    }
  };

  // LOGOUT
  const logout = () => {
    sessionStorage.removeItem("auth-token");
    setUser(null);
    navigate("/login");
    try {
      window.dispatchEvent(new CustomEvent("app:logout"));
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        user,
        loadingAuth,
        reloadUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
