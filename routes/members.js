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

    var fullname = req.body.fullname;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;
    var profileimage = req.files.profileimage;

    // check if user submitted profile image
    if (profileimage) {
        console.log("Uploading image...");
        var profileImageOrigName = req.files.profileimage.originalname;
        var profileImageName = req.files.profileimage.name;
        var profileImageMimeType = req.files.profileimage.mimetype;
        var profileImagePath = req.files.profileimage.path;
        var profileImageSize = req.files.profileimage.size;
        var profileImageExt = req.files.profileimage.extension;
    } else {
        var profileImageName = 'default-image.png';
    }

    // Validators
    req.checkBody('fullname', 'Full Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('confirmpassword', 'Confirm Password field is required').notEmpty();
    req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.password);

    // Error checking
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            title: 'Register',
            errors: errors,
            fullname: fullname,
            email: email,
            username: username
        });
    } else {
        
        // create new user in mongo
        var newuser = new User({
            fullname: fullname,
            email: email,
            username: username,
            password: password,
            profileImage: profileImageName
        });
        
        User.createUser(newuser, function(err, user) {
            if (err) throw err;
            console.log("New user successfully created");
        });
        
        // success msg
        req.flash('success', 'You are now a registered user');
        res.location('/users/login');
        res.redirect('/users/login');
    }

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