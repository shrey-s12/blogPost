const express = require('express');
const bodyParser = require('body-parser');
const BlogPost = require('../models/blogModel');
const { create } = require('domain');

const router = express.Router();

// blog routes
router.get('/', (req, res) => {
    BlogPost.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs', { title: 'All blogs', blogs});
        })
        .catch((error) => {
            res.redirect('/error');
        });
});

// New route to view a single blog post
router.get('/id/:id', (req, res) => {
    BlogPost.findById(req.params.id)
        .then((blog) => {
            res.render('singleBlog', { title: blog.title, blog });
        })
        .catch((error) => {
            res.status(404).render('error', { title: 'Blog Not Found' });
        })
});

// Middleware to parse form data
router.use(bodyParser.json());

// POST request to add a new blog
router.post('/', (req, res) => {
    const blog = req.body;
    const blogpost = new BlogPost(blog);
    blogpost.save()
        .then((result) => {
            res.redirect('/success');
        })
        .catch((error) => {
            res.redirect('/fail');
        })
});

router.delete('/id/:id', (req, res) => {
    BlogPost.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.redirect('/successDelete');
        })
        .catch((error) => {
            res.redirect('/failDelete');
        })
});

module.exports = router;