const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/userSignup');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const router = express.Router();

router.get('/login', (req, res) => {
    res.cookie('authtoken', '', { maxAge: 1 });
    res.render('auth/login', { title: "Login" });
});

router.get('/signup', (req, res) => {
    res.render('auth/signup', { title: "Sign Up" });
});

// Middleware to parse form data
router.use(bodyParser.urlencoded());
// Use the cookie parser middleware
router.use(cookieParser());


router.use(express.urlencoded({ extended: true }));
// Signup route POST
router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const data = new User({
        username,
        email,
        password
    });

    data.save()
        .then(user => {
            const token = getToken(user.email);
            res.cookie('authtoken', token);
            res.render('auth/signupSuccess', { title: "Success", data });
        })
        .catch(error => {
            res.status(400).send(`Error creating user: ${error}`);
        })
});

function getToken(email) {
    const secret = "veryComplexSecret";
    const token = jwt.sign({ email }, secret);
    return token;
}

// Login route POST
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user && user.password === password) {
                const token = getToken(user.email);
                res.cookie('authtoken', token);
                res.redirect('/blogs');
            } else {
                res.status(404).send("User Not Found");
            }
        })
        .catch(error => {
            res.status(404).send("User Not Found");
        });
});

module.exports = router;