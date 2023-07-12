const express = require("express");
const router = express.Router();

const {autosaveController} = require("../controller/controller");

router.post("/autosave", autosaveController);

module.exports = router;