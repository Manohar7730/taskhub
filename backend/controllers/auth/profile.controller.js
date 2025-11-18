import UserModel from "../../models/User.model.js";

const me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default me;
