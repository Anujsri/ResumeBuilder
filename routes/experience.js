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
            projects = req.body.projects;
            arr = experience.projects;

            if (projects && projects.length === 'undefined') {
                console.log("projects length : " + projects.end_date)
                arr.push(projects);
                experience.projects = arr;
            }
            if (req.body.job_title)
                experience.job_title = req.body.job_title;
            if (req.body.company_name)
                experience.company_name = req.body.company_name;
            if (req.body.start_date)
                experience.start_date = req.body.start_date;
            if (req.body.end_date)
                experience.end_date = req.body.end_date;
            if (req.body.location)
                experience.location = req.body.location;
            if (req.body.description)
                experience.description = req.body.description;
            if (projects && projects.length !== 'undefined') {
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

router.put('/editproject/:id', ensureAuthenticated, (req, res) => {
    let message;
    var experience_id = req.params.id;
    projectId = req.body.projectId;
    Experience.update({ _id: experience_id, 'projects._id': projectId }, {
            '$set': {
                'projects.$': req.body
            }
        },
        function(err, experience) {
            if (err) {
                console.log(err);
                res.status(400).send({ message: "Some Error occured", data: {} });
            } else if (experience) {
                message = "Experience is changed";
                res.status(200).send({ message: message, data: experience });
            } else {
                message = "Experience not found";
                res.status(404).send({ message: message, data: {} });
            }
        });
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