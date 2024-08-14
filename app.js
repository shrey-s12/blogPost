const express = require("express");
const app = express();
const ejs = require('ejs');
const bodyParser = require("body-parser");

const port = 3000;

app.listen(port, () => {
    console.log(`Server is listen on port ${port}`);
});

app.set("view engine", 'ejs');
app.set("views", "views");
app.use(express.static('public'));

let blogs = [
    { id: 1, title: 'Blog Title 1', summary: 'Summary of blog 1', content: 'Content of blog 1', author: 'Author 1', time: 'Time 1' },
    { id: 2, title: 'Blog Title 2', summary: 'Summary of blog 2', content: 'Content of blog 2', author: 'Author 2', time: 'Time 2' },
    { id: 3, title: 'Blog Title 3', summary: 'Summary of blog 3', content: 'Content of blog 3', author: 'Author 3', time: 'Time 3' },
];

app.get('/', (req, res) => {
    res.render('index', { title: "Home" });
});
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});
app.get('/blogs', (req, res) => {
    res.render('blogs', { title: "Blogs", blogs });
});
app.get('/newBlog', (req, res) => {
    res.render('newBlog', { title: "NewBlogs" });
});

// app.get('/singleBlog', (req, res) => {
//     res.render('singleBlog', { title: "NewBlogs" });
// });


function getBlogById(id) {
    return blogs.find(blog => blog.id === id);
};

app.get('/blogs/id/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const blog = getBlogById(blogId);
    if (blog) {
        res.render('singleBlog', { title: "blog.title", blog });
    } else {
        res.status(404).render('error', { title: "Blog Not Found" });
    }
});


// write a function to add a new blog
function addBlog(blog) {
    blogs.push(blog);
}

// Middleware to parse form data
app.use(bodyParser.json());

// POST request to add a new blog
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/blogs', (req, res) => {
    const blog = req.body;
    blog.id = blogs.length + 1;
    blog.time = new Date().toLocaleString();
    addBlog(blog);
    res.redirect('/success');
});


// write a function to delete a blog by id
function deleteBlog(id) {
    // findIndex returns the index of the first matching blog. If no match is found, findIndex returns -1.
    const index = blogs.findIndex(blog => blog.id === id);
    if (index !== -1) {
        blogs.splice(index, 1);
    }
}

// DELETE request to delete a blog
app.get('/delete/id/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    deleteBlog(blogId);
    if (getBlogById(blogId)) {
        res.redirect('/failDelete');
    } else {
        res.redirect('/successDelete');
    }
});

app.get('/success', (req, res) => {
    res.render('success', { title: "Success" });
});

app.get('/successDelete', (req, res) => {
    res.render('successDelete', { title: "Delete Successfully" });
});

app.get('/failDelete', (req, res) => {
    res.render('failDelete', { title: "Delete Fail" });
});


app.use((req, res) => {
    res.status(404).render('error', { title: 'Error' });
});