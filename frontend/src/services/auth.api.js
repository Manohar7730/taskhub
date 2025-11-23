import api from "./api";

export const fetchCurrentUser = () => {
  return api.get("/auth/me");
};

export const registerUser = ({ name, email, password }) => {
  return api.post("/auth/register", { name, email, password });
};

export const loginUser = ({ email, password }) => {
  return api.post("/auth/login", { email, password });
};

export const forgotPasswordRequestOTP = ({ email }) => {
  return api.post("/auth/password/request-otp", { email });
};

export const updatePassword = ({ email, code, newPassword }) => {
  return api.post("/auth/password/update", {
    email,
    code,
    newPassword,
  });
};

export const verifyOtp = ({ email, code, purpose }) => {
  return api.post("/auth/verify-otp", {
    email,
    code,
    purpose,
  });
};
