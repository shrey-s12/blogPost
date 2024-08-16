const express = require('express');
const bodyParser = require('body-parser');

const blogController = require('../controllers/blogControllers');

const router = express.Router();

function isUserLoggedIn(req,res,next){
    if(res.locals.user){
        next();
    }else{
        res.redirect('/auth/login');
    }
}

router.use(isUserLoggedIn);

router.get('/newBlog', (req, res) => {
    res.render('newBlog', { title: "NewBlogs" });
});

router.get('/success', (req, res) => {
    res.render('success', { title: "Success" });
});

router.get('/fail', (req, res) => {
    res.render('fail', { title: "Fail" });
});

router.get('/successDelete', (req, res) => {
    res.render('successDelete', { title: "Delete Successfully" });
});

router.get('/failDelete', (req, res) => {
    res.render('failDelete', { title: "Delete Fail" });
});


// blog routes
router.get('/', blogController.blog_get);

// New route to view a single blog post
router.get('/id/:id', blogController.blog_id_get);

// Middleware to parse form data
// router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// POST request to add a new blog
router.post('/', blogController.blog_post);

// Deleete request
router.delete('/id/:id', blogController.blog_id_delete);


module.exports = router;