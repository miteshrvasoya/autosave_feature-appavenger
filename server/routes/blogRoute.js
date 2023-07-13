const express = require("express");
const router = express.Router();

const {autosaveController, fetchDraftBlogController, createNewBlog} = require("../controller/controller");

//Route for save blog
router.post("/autosave", autosaveController);

//Route for fetch draft blog
router.post("/blog/draft", fetchDraftBlogController);

//Route for create new empty blog
router.post("/blog/create", createNewBlog);

module.exports = router;