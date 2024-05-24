const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_name : {type: String}
})

const userSchema = new mongoose.Schema({
 username: { type: String },
 password: { type: String},
 email: {type: String},
 roles: {type: roleSchema}
 }, {collection: 'Users'});
module.exports = mongoose.model('User', userSchema);