var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Experience = require('../models/experience');

router.post('/experience/:id', ensureAuthenticated, (req, res) => {
    let message;
    user_id = req.params.id;
    User.findById(user_id)
        .then((user) => {
            var result = user._id;
            return result;
        })
        .then((result) => {
            experience_obj = req.body;
            experience_obj['user_id'] = result;
            var experiencedAdd = new Experience(experience_obj);
            return experiencedAdd.save().then((experience) => {
                return experience;
            });
        })
        .then(function(experience) {
            message = "Experience is Added to your profile";
            res.status(201).send({ message: message, data: experience });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})


router.put('/experience/:id', ensureAuthenticated, (req, res) => {

    let message;
    var experience_id = req.params.id;
    Experience.findById(experience_id)
        .then((experience) => {
            return experience;
        })
        .then(function(experience) {
            let arr = []
            experience.job_title = req.body.job_title;
            experience.company_name = req.body.company_name;
            experience.start_date = req.body.start_date;
            experience.end_date = req.body.end_date;
            experience.location = req.body.location;
            experience.description = req.body.description;
            projects = req.body.projects;

            if (projects) {
                arr = experience.projects;
                experience.projects = arr.concat(projects);
            }
            experience.save()
                .then((experience) => {
                    return experience;
                })
        })
        .then(function(experience) {
            message = "Experience is changed";
            res.status(200).send({ message: message, data: experience });
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send({ message: "Some Error occured", data: {} });
        })
})


router.get('/experience/:id', ensureAuthenticated, (req, res) => {

    var user_id = req.params.id;
    User.findById(user_id)
        .then((user) => {
            var result = user._id;
            return result;
        })
        .then((result) => {
            return Experience.find({ user_id: user_id }).exec()
            then((experience) => {
                return experience;
            });
        })
        .then(function(experience) {
            message = "Experience is Added to your profile";
            res.status(200).send({ message: message, data: experience });
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