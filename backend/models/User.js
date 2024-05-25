const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
 username: { type: String },
 password: { type: String},
 email: {type: String},
 roles: {type: [String] , default: ['common']},
 unlocked: {type: [String]}
 }, {collection: 'Users'});
module.exports = mongoose.model('User', userSchema);