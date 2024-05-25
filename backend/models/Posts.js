const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    file_name: {type: String},
    content_type: {type: String},
    image_id: {type: String},
    imageUrl: {type: String},
    description : { type: String},
    price: { type: Number},
    type: { type: String },
}, {collection: 'Posts'})
module.exports = mongoose.model('Posts', postSchema);
