const UserModel = require('../models/User')
const checkUsernameExists = async (req, res, next) => {
    if(req.body?.username) {
        const user = await UserModel.findOne({username: req.body?.username})
        if(user) {
            return res.status(200).json({status: "success", message: 'Username Already Exists'});
        }
    } else {
        const isEmailExisting = checkEmailExists(req);
        if( isEmailExisting ){
            return res.status(200).json({status: "success", message: 'Email Already Exists'});
        }
    }
    next();
}

const checkEmailExists = async (req) => {
    if(req.body?.email) {
        const user = await UserModel.findOne({ email: req.body.email });
        if(user) {
            return true;
        }
        return false;
    }
}

module.exports = {
    checkUsernameExists,
    checkEmailExists
}