const PostsModel = require('../models/Posts');
const getPosts = async() => {
    const posts = await PostsModel.find();
 
     let postsArray = posts.map((post) => ({
        id:post._id,
        description: post.description,
        price: post.price,
        type: post.type
    }))
    return postsArray;
}

module.exports = {
    getPosts
}