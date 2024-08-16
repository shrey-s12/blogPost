const express = require('express');
const app = express();
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const blogpostRouter = require('./routes/blogRouters');
const authRoutes = require('./routes/authRouters');
const PORT = 3000;

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(morgan('dev'));
app.use(express.static('public'));


// CONSTANTS
const USER_NAME = "shreys12";
const PASSWORD = "Shrey1210";
const DB_NAME = "merndb";

const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.lidry.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;

const promObj = mongoose.connect(dbURI);
promObj
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`Server is listen on port ${PORT}`);
        });
    }).catch((error) => {
        console.error('Failed to connect to database', error);
        process.exit(1); // Exit the process with a failure code
    });


app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// TODO: middleware -> checkUser
app.use(cookieParser());

function checkUser(req, res, next) {
    const token = req.cookies.authtoken;
    if (token) {
        jwt.verify(token, "veryComplexSecret", (error, decodedToken) => {
            if (error) {
                res.locals.user = null;
            }
            else {
                res.locals.user = decodedToken;
            }
        });
    }
    else {
        res.locals.user = null;
    }
    next();
}

app.use(checkUser);


// routers
app.get('/', (req, res) => {
    res.render('index', { title: "Home" });
});
app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

// auth routers
app.use('/auth', authRoutes);

// blog routes
app.use('/blogs', blogpostRouter);


// 404 page
app.use((req, res) => {
    res.status(404).render('error', { title: 'Error' });
});