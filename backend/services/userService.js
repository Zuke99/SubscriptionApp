const UserModel = require("../models/User");

const addUser = async (data) => {
  const addUserObject = {
    username: data.username,
    password: data.password,
    email: data.email,
  };
  let result;
  try {
    result = await UserModel.create(addUserObject);
  } catch (err) {
    console.log(err);
  }
  return result;
};

module.exports = {
  addUser,
};
