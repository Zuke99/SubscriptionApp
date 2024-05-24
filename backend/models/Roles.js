const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role_name : {type: String}
},{collection: 'Roles'})

module.exports = mongoose.model("Roles", roleSchema);