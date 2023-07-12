const blogSchema = require("../db/schema/blogSchema");

const autosaveController = async (req, res) => {
    const message = "Message Passed";

    const {blogTitle, blogContent, status} = req.body;

    const newBlog = await blogSchema.find();
    res.json(newBlog);
}

module.exports = {
    autosaveController
}