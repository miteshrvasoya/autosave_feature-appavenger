const blogSchema = require("../db/schema/blogSchema");


//Save blog in the DB
const autosaveController = async (req, res) => {
    const message = "Message Passed";

    const {blogId, blogTitle, blogContent, userId, status} = req.body;

    if (blogId === "" || blogId === undefined || blogId === null) {
        const savedBlog = await blogSchema.create({
            title: blogTitle, content: blogContent, userId: userId, status: status,
        });

        console.log("Blog Id : ", blogId, "Blog new Title : ", req.body);

        const updateInfo = {
            date: savedBlog[0]?.updatedAt.toLocaleDateString(), time: savedBlog[0]?.updatedAt.toLocaleTimeString()
        };

        const responseJSON = {
            blogData: savedBlog, updateInfo
        }

        console.log("SAVED INFO : ", savedBlog)
        res.status(200).json(responseJSON);
    } else {
        const updateBlog = await blogSchema.findByIdAndUpdate(blogId, {
            title: blogTitle, content: blogContent, updatedAt: Date.now()
        });
        const findBlog = await blogSchema.find({userId: req.body.userId, status: "draft"});

        console.log("Blog Update Title : ", blogTitle);

        const updateInfo = {
            date: findBlog[0].updatedAt.toLocaleDateString(), time: findBlog[0].updatedAt.toLocaleTimeString()
        };

        const responseJSON = {
            blogData: findBlog[0], updateInfo
        }
        res.status(200).json(responseJSON);
    }
};


//Find and return users draft blog (if there any...)
const fetchDraftBlogController = async (req, res) => {
    const findDraftedBlog = await blogSchema.find({userId: req.body.userId, status: "draft"});

    const updateInfo = {
        date: findDraftedBlog[0]?.updatedAt.toLocaleDateString(),
        time: findDraftedBlog[0]?.updatedAt.toLocaleTimeString()
    };

    const responseJSON = {
        blogData: findDraftedBlog[0], updateInfo
    }
    res.status(200).json(responseJSON);
};

const createNewBlog = async (req, res) => {
    const createBlog = await blogSchema.create({
        title: "", content: "", userId: req.body.userId, status: "draft",
    });

    const updateInfo = {
        date: createBlog?.updatedAt.toLocaleDateString(),
        time: createBlog?.updatedAt.toLocaleTimeString()
    };

    const responseJSON = {
        blogData: createBlog, updateInfo
    }
    res.status(200).json(responseJSON);
};

module.exports = {
    autosaveController, fetchDraftBlogController, createNewBlog
}