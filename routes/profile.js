var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Experience = require('../models/experience');
var Education = require('../models/education');
var Certificate = require('../models/certificate');
var Award = require('../models/award');
// Get Homepage
router.get('/getprofile', ensureAuthenticated, (req, res) => {
    User.findOne({ email: req.user.email }, (err, user) => {
        if (err) {
            req.flash('error_msg', 'Some error occured');
            res.render('profile')
        } else {
            res.render('profile', { user });
        }
    })
})


router.post('/editprofile/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    let message;
    User.findById(user_id, (err, user) => {
        if (err) {
            message = "Some erro occured";
            res.status(404).send({ message: message, data: {} });
        } else if (user) {
            city = req.body.city;
            state = req.body.state;
            pincode = req.body.pincode;
            country = req.body.country;
            address = req.body.address;
            profile_overview = req.body.profile_overview;
            if (city) user.address.city = city;
            if (state) user.address.state = state;
            if (pincode) user.address.pincode = pincode;
            if (country) user.address.country = country;
            if (address) user.address.address = address;
            if (profile_overview) user.profile_overview = profile_overview;
            user.save((err, user) => {
                if (err) {
                    message = "Duplicate Entry found";
                    res.status(422).send({ message: message, data: {} });
                }
                message = "Your profile is updated";
                res.status(201).send({ message: message, data: user });
            });
        } else {
            message = "User not found with id";
            res.status(404).send({ message: message, data: {} });
        }
    })
})

router.post('/experience/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            job_title = req.body.job_title;
            company_name = req.body.company_name;
            start_date = req.body.start_date;
            end_date = req.body.end_date;
            location = req.body.location;
            description = req.body.description;
            projects = req.body.projects;

            var experienceadd = new Experience({
                job_title: job_title,
                company_name: company_name,
                start_date: start_date,
                end_date: end_date,
                location: location,
                description: description,
                projects: projects,
                user_id: user_id
            });
            experienceadd.save((err, experience) => {
                if (err) return err;
                req.flash('success_msg', 'You profile is saved!');
                res.json(experience);
            });
        } else {
            let msg = "User not found with id";
            res.json(msg);
        }

    });
})

router.post('/education/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            degree = req.body.degree;
            institute_name = req.body.institute_name;
            start_date = req.body.start_date;
            end_date = req.body.end_date;
            location = req.body.location;
            description = req.body.description;

            var expeducation = new Education({
                degree: degree,
                institute_name: institute_name,
                start_date: start_date,
                end_date: end_date,
                location: location,
                description: description,
                user_id: user_id
            });
            expeducation.save((err, education) => {
                if (err) return err;
                req.flash('success_msg', 'You profile is saved!');
                res.json(education);
            });
        } else {
            let msg = "User not found with id";
            res.json(msg);
        }

    });
})

router.post('/certificate/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            certificate_name = req.body.certificate_name;
            institute_name = req.body.institute_name;
            start_date = req.body.start_date;
            end_date = req.body.end_date;
            location = req.body.location;
            description = req.body.description;

            var certificate = new Certificate({
                certificate_name: certificate_name,
                institute_name: institute_name,
                start_date: start_date,
                end_date: end_date,
                location: location,
                description: description,
                user_id: user_id
            });
            certificate.save((err, certificate) => {
                if (err) return err;
                req.flash('success_msg', 'You profile is saved!');
                res.json(certificate);
            });
        } else {
            let msg = "User not found with id";
            res.json(msg);
        }

    });
})

router.post('/award/:id', ensureAuthenticated, (req, res) => {
    user_id = req.params.id;
    let message;
    User.findById(user_id, (err, user) => {
        if (err) throw err;
        else if (user) {
            award_name = req.body.award_name;
            date = req.body.date;
            institute_name = req.body.institute_name;
            description = req.body.description;

            var award = new Award({
                award_name: award_name,
                date: date,
                institute_name: institute_name,
                description: description,
                user_id: user_id
            });
            award.save((err, award) => {
                if (err) {
                    message = "Duplicate Entry found";
                    res.status(422).send({ message: message, data: {} });
                }
                message = "Award is Added to your profile";
                res.status(201).send({ message: message, data: award });
            });
        } else {
            message = "User not found with id";
            res.status(404).send({ message: message, data: {} });
        }

    });
})

router.get('/experience/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) {
            message = "Some erro occured";
            res.status(404).send({ message: message, data: {} });
        } else if (user) {
            Experience.find({ user_id: user_id }, (err, experience) => {
                if (err) {
                    message = "No experience found with user_id";
                    res.status(400).send({ message: message, data: {} });
                }
                res.status(200).send({ message: "", data: experience })
            });
        } else {
            message = "User not found with id";
            res.status(404).send({ message: message, data: {} });
        }
    });
})


router.get('/education/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) {
            message = "Some erro occured";
            res.status(404).send({ message: message, data: {} });
        } else if (user) {
            Education.find({ user_id: user_id }, (err, education) => {
                if (err) {
                    message = "No education found with user_id";
                    res.status(400).send({ message: message, data: {} });
                }
                res.status(200).send({ message: "", data: education })
            });
        } else {
            message = "User not found with id";
            res.status(404).send({ message: message, data: {} });
        }
    });
})

router.get('/certificate/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) {
            message = "Some erro occured";
            res.status(404).send({ message: message, data: {} });
        } else if (user) {
            Certificate.find({ user_id: user_id }, (err, certificate) => {
                if (err) {
                    message = "No certificate found with user_id";
                    res.status(400).send({ message: message, data: {} });
                }
                res.status(200).send({ message: "", data: certificate })
            });
        } else {
            message = "User not found with id";
            res.status(404).send({ message: message, data: {} });
        }
    });
})

router.get('/award/:id', ensureAuthenticated, (req, res) => {
    var user_id = req.params.id;
    User.findById(user_id, (err, user) => {
        if (err) {
            message = "Some erro occured";
            res.status(404).send({ message: message, data: {} });
        } else if (user) {
            Award.find({ user_id: user_id }, (err, award) => {
                if (err) {
                    message = "No award found with user_id";
                    res.status(400).send({ message: message, data: {} });
                }
                res.status(200).send({ message: "", data: award })
            });
        } else {
            message = "User not found with id";
            res.status(404).send({ message: message, data: {} });
        }
    });
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