const UserService = require("../services/userService");

const registerUser = async (req, res) => {
  try {
    const result = await UserService.addUser(req.body);
    return res.status(200).json({ status: "success", message: "User Registered Successfully", data: result });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};

module.exports = {
  registerUser,
};
