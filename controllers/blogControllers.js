const BlogPost = require('../models/blogModel');


// blog_index_get
const blog_get = (req, res) => {
    BlogPost.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs', { title: 'All blogs', blogs: result });
        })
        .catch((error) => {
            res.redirect('/error');
        });
};


// blog_id_get
function blog_id_get(req, res) {
    console.log("Inside the id_get")
    console.log(req.params.id);
    BlogPost.findById(req.params.id)
        .then((blog) => {
            res.render('singleBlog', { title: blog.title, blog });
        })
        .catch((error) => {
            res.status(404).render('error', { title: 'Blog Not Found' });
        })
};


// blog_create_post
function blog_post(req, res){
    const blog = req.body;
    const blogpost = new BlogPost(blog);
    blogpost.save()
        .then((result) => {
            res.redirect('/blogs/success');
        })
        .catch((error) => {
            res.redirect('/blogs/fail');
        })
};


// blog_delete
function blog_id_delete(req, res) {
    BlogPost.findByIdAndDelete(req.params.id)
        .then((result) => {
            console.log("Deleted Successfully");
            res.redirect('/blogs/successDelete');
        })
        .catch((error) => {
            res.redirect('/failDelete');
        })
};

module.exports = {
    blog_get,
    blog_id_get,
    blog_post,
    blog_id_delete
};