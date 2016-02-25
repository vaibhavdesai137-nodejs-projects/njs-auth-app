var express = require('express');
var router = express.Router();

// get all members
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Members'
    });
});

// render register page
router.get('/register', function (req, res, next) {
    res.render('register', {
        title: 'Register'
    });
});

// register member
router.post('/register', function (req, res, next) {
    res.send("Not implemented");
});

// render login page
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

// login member
router.post('/login', function (req, res, next) {
    res.send("Not implemented");
});

// logout member
router.post('/logout', function (req, res, next) {
    res.send("Not implemented");
});

module.exports = router;