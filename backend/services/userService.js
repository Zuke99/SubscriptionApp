const UserModel = require("../models/User");
const { generateToken } = require("../utils/generateToken");

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

const userLogin = async(data) => {
  try{
    let user;
    if(data?.username){
       user = await UserModel.findOne({ username : data?.username})
    } else {
      user = await UserModel.findOne({ email: data.email }) 
    }
    if(user && user?.username && user.password === data.password) {
      console.log("User Verified")
      return generateToken(user);
    } else if (user && user?.email) {
      return generateToken(user);
    }
    else {
      console.log("Id or Password Incorrect");
      return null;
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  addUser,
  userLogin
};
