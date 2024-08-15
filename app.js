const express = require('express');
const app = express();
const ejs = require('ejs');
const morgan = require('morgan');
const blogpostRouter = require('./routes/blogRouters');
const { default: mongoose } = require('mongoose');
const PORT = 3000;

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.set(morgan('dev'));
app.use(express.static('public'));

// CONSTANTS
const USER_NAME = "shreys12";
const PASSWORD = "Shrey1210";
const DB_NAME = "merndb";

const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.lidry.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;

const promObj = mongoose.connect(dbURI);
promObj.then((result) => {
    app.listen(PORT, () => {
        console.log(`Server is listen on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to database', err);
    process.exit(1); // Exit the process with a failure code
});


// blog routes
app.get('/blogs', blogpostRouter);


// more routers
app.get('/', (req, res) => {
    res.render('index', { title: "Home" });
});
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

app.get('/newBlog', (req, res) => {
    res.render('newBlog', { title: "NewBlogs" });
});

app.get('/success', (req, res) => {
    res.render('success', { title: "Success" });
});

app.get('/fail', (req, res) => {
    res.render('fail', { title: "Fail" });
});

app.get('/successDelete', (req, res) => {
    res.render('successDelete', { title: "Delete Successfully" });
});

app.get('/failDelete', (req, res) => {
    res.render('failDelete', { title: "Delete Fail" });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('error', { title: 'Error' });
});