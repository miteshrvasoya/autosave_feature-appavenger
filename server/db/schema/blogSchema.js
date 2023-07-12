const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String, require: true,
    }, content: {
        type: String, require: true,
    },
    userId: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    updatedAt: {
        type: Date, require: true, default: Date.now(),
    }
})

module.exports = mongoose.model("Blogs", blogSchema);