const blogSchema = require("../db/schema/blogSchema");


//Save blog in the DB
const autosaveController = async (req, res) => {
    const message = "Message Passed";

    const {blogId, blogTitle, blogContent, userId, status} = req.body;

    if (blogId === "" || blogId === undefined || blogId === null) {
        const savedBlog = await blogSchema.create({
            title: blogTitle, content: blogContent, userId: userId, status: status,
        });
        console.log("Saved Blog : ", savedBlog);
        setTimeout(() => {
            res.status(200).json(savedBlog);
        }, 4000);
    } else {
        const updateBlog = await blogSchema.findByIdAndUpdate(blogId, {title: blogTitle, content: blogContent});
        const findBlog = await blogSchema.find({userId: req.body.userId, status: "draft"});
        console.log("Found Blog : ", findBlog);
        setTimeout(() => {
            res.status(200).json(findBlog);
        }, 4000);
    }
};


//Find and return users draft blog (if there any...)
const fetchDraftBlogController = async (req, res) => {
    const findDraftedBlog = await blogSchema.find({userId: req.body.userId, status: "draft"});
    console.log("FIND DRAFT : ", findDraftedBlog);
    res.status(200).json(findDraftedBlog);
};

module.exports = {
    autosaveController, fetchDraftBlogController
}