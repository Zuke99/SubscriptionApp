const postsService = require("../services/postsService");

const getPosts = async (req, res) => {
    try{
        const result = await postsService.getPosts();
        if(result)
        res.status(200).json({status: "success", data: result})
        
    } catch (err) {
        return res.status(500).json({ status: "error", message: err });
    }
}

module.exports = {
    getPosts
}