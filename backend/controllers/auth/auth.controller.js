import register from "./register.controller.js";
import login from "./login.controller.js";
import me from "./profile.controller.js";
import { verifyOtp } from "./otp.controller.js";
import { requestPasswordOtp } from "./password.controller.js";
import { updatePassword } from "./password.controller.js";

export { register, login, me, verifyOtp, requestPasswordOtp, updatePassword };