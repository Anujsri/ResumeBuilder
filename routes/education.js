var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Education = require('../models/education');

router.post('/education/:id', ensureAuthenticated, (req, res) => {
	let message;
    user_id = req.params.id;
    User.findById(user_id)
        .then((user) => {
            var result = user._id;
            return result;
        })
        .then((result) => {
            education_obj = req.body;
            education_obj['user_id'] = result;
            var educationAdd = new Education(education_obj);
            return educationAdd.save().then((education) => {
                return education;
            });
        })
        .then(function(education) {
            message = "Education is Added to your profile";
            res.status(201).send({ message: message, data: education });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})


router.put('/education/:id', ensureAuthenticated, (req, res) => {
	let message;
    var education_id = req.params.id;
    let newvalues = {$set: req.body};
    Education.findByIdAndUpdate(education_id,newvalues, { new: true })
        .then((education) => {
            return education;
        })
        .then(function(education) {
            message = "Education is changed";
            res.status(200).send({ message: message, data: education });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})


router.get('/education/:id', ensureAuthenticated, (req, res) => {
	var user_id = req.params.id;
    User.findById(user_id)
        .then((user) => {
            var result = user._id;
            return result;
        })
        .then((result) => {
            return Education.find({user_id: user_id}).exec()
            then((education) => {
                return education;
            });
        })
        .then(function(education) {
            message = "Education is Added to your profile";
            res.status(200).send({ message: message, data: education });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;