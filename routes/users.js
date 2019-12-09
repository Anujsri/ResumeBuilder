var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


// Register
router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/profile/getprofile');
    } else {
        res.render('register');
    }
});

// Login
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/profile/getprofile');
    } else {
        res.render('login');
    }

});


var Userid;

// Register User
router.post('/register', (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var phone = req.body.phone;

    let message;
    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('phone', 'Phone is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        //checking for email and username are already taken
        User.findOne({ $or: [{ email: email }, { username: username }] }, function(err, user) {
            if (err) {
                message = "Some error occured";
                res.status(400).send({ errorMessage: message, data: award });
            }
            if (user) {
                message = 'Email/Username is already in use';
                res.status(200).send({ errorMessage: message, data: user });
            } else {
                var newUser = new User({
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    phone: phone

                });
                User.createUser(newUser, function(err, user) {
                    if (err) {
                        message = "Some error occured";
                        res.status(400).send({ errorMessage: message, data: {} });
                    } else {
                        message = 'You are registered now you can login';
                        res.status(201).send({ message: message, data: user });
                    }
                });
            }

        });
    }
});


passport.use(new LocalStrategy(
    (username, password, done) => {
        User.getUserByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }

            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/profile/getprofile',
        failureRedirect: '/users/login',
        failureFlash: true
    }),
    (req, res) => {
        Userid = user._id;
        res.redirect('/profile/getprofile');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/users/login');
    }
}


module.exports = router;