const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogpost = new Schema({
    title: { type: String, required: true },
    summery: { type: String, require: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
}, { timestamps: true });

const BlogPost = mongoose.model("BlogPost", blogpost, "blogposts");


module.exports = BlogPost;