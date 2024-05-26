const UserService = require("../services/userService");

const registerUser = async (req, res) => {
  try {
    const result = await UserService.addUser(req.body);
    return res.status(200).json({ status: "success", message: "User Registered, Login With Same Credentials", data: result });
    
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
};

const loginUser = async (req, res) => {
  try{
    const result = await UserService.userLogin(req.body);
    if (result === null)
      return res.status(200).json({ status: "success", message: "Wrong ID or Password", data: result });
    return res.status(200).json({ status: "success", message: "User Loggedin Successfully", data: result });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
}

const getUserInfo = async (req, res) => {
  try{
    const result = await UserService.getUserInfo(req.body);
    if (result)
      return res.status(200).json({ status: "success", message: "User Loggedin Successfully", data: result });
    return res.status(500).json({ status: "error", message: "User Details Not found", data: result });
    
  } catch (err) {
    return res.status(500).json({ status: "error", message: err });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo
};
