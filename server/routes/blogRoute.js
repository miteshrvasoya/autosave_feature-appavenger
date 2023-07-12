const express = require("express");
const router = express.Router();

const {autosaveController, fetchDraftBlogController} = require("../controller/controller");

//Route for save blog
router.post("/autosave", autosaveController);

//Route for fetch draft blog
router.post("/blog/draft", fetchDraftBlogController);

module.exports = router;